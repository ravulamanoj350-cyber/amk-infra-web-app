import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { db } from './data/store.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.resolve(__dirname, '../dist');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// 1. Company Information
app.get('/api/company', (req, res) => {
  const data = db.get();
  res.json({ success: true, data: data.company });
});

// 2. Divisions Endpoints (NEW: Corporate Divisions)
app.get('/api/divisions', (req, res) => {
  const data = db.get();
  const divisions = data.divisions || [];
  res.json({ success: true, count: divisions.length, data: divisions });
});

app.get('/api/divisions/:id', (req, res) => {
  const data = db.get();
  const divisions = data.divisions || [];
  const division = divisions.find(d => d.id === req.params.id || d.code === req.params.id.toUpperCase());
  if (!division) {
    return res.status(404).json({ success: false, message: 'Division not found with id: ' + req.params.id });
  }

  // Attach associated services and portfolio projects
  const associatedServices = (data.services || []).filter(s => s.divisionId === division.id || (division.serviceIds && division.serviceIds.includes(s.id)));
  const associatedProjects = (data.portfolio || []).filter(p => p.divisionId === division.id || (division.serviceIds && division.serviceIds.includes(p.category)));

  res.json({
    success: true,
    data: {
      ...division,
      services: associatedServices,
      portfolio: associatedProjects
    }
  });
});

// 3. Services Endpoints
app.get('/api/services', (req, res) => {
  const data = db.get();
  let list = [...data.services];
  const { division } = req.query;

  if (division && division !== 'all') {
    list = list.filter(s => s.divisionId === division || s.id === division);
  }

  res.json({ success: true, count: list.length, data: list });
});

app.get('/api/services/:id', (req, res) => {
  const data = db.get();
  const service = data.services.find(s => s.id === req.params.id || s.slug === req.params.id);
  if (!service) {
    return res.status(404).json({ success: false, message: 'Service not found' });
  }
  res.json({ success: true, data: service });
});

// 4. Inquiries / Requests Endpoints
app.get('/api/inquiries', (req, res) => {
  const data = db.get();
  let list = [...data.inquiries];

  const { status, service, division, search, phone } = req.query;

  if (status && status !== 'all') {
    list = list.filter(item => item.status.toLowerCase() === status.toLowerCase());
  }
  if (service && service !== 'all') {
    list = list.filter(item => item.serviceCategory === service || item.serviceTitle.toLowerCase().includes(service.toLowerCase()));
  }
  if (division && division !== 'all') {
    list = list.filter(item => item.divisionId === division || (item.divisionName && item.divisionName.toLowerCase().includes(division.toLowerCase())));
  }
  if (phone) {
    list = list.filter(item => item.phone.includes(phone));
  }
  if (search) {
    const s = search.toLowerCase();
    list = list.filter(item =>
      item.id.toLowerCase().includes(s) ||
      item.customerName.toLowerCase().includes(s) ||
      item.phone.includes(s) ||
      item.location.toLowerCase().includes(s) ||
      item.serviceTitle.toLowerCase().includes(s) ||
      (item.divisionName && item.divisionName.toLowerCase().includes(s))
    );
  }

  // Sort by updatedAt or createdAt desc
  list.sort((a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt));

  res.json({ success: true, count: list.length, data: list });
});

app.get('/api/inquiries/:id', (req, res) => {
  const data = db.get();
  const inquiry = data.inquiries.find(i => i.id.toUpperCase() === req.params.id.toUpperCase());
  if (!inquiry) {
    return res.status(404).json({ success: false, message: 'Inquiry not found with tracking code: ' + req.params.id });
  }
  res.json({ success: true, data: inquiry });
});

app.post('/api/inquiries', (req, res) => {
  const data = db.get();
  const {
    customerName,
    phone,
    email,
    serviceCategory,
    divisionId,
    projectType,
    location,
    siteSize,
    budgetRange,
    timeline,
    details
  } = req.body;

  if (!customerName || !phone || !serviceCategory) {
    return res.status(400).json({
      success: false,
      message: 'Please provide Customer Name, Phone Number, and Service Category.'
    });
  }

  // Find matching service & division
  const serviceObj = data.services.find(s => s.id === serviceCategory) || { title: serviceCategory };
  const targetDivId = divisionId || serviceObj.divisionId || 'civil-commercial';
  const divisionObj = (data.divisions || []).find(d => d.id === targetDivId) || { name: 'Civil Infrastructure & Commercial Division', divisionHead: 'Er. Sandeep Goud' };

  // Generate unique tracking ID e.g., AMK-2026-4821
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const newId = `AMK-2026-${randomSuffix}`;
  const now = new Date().toISOString();

  const newInquiry = {
    id: newId,
    customerName: customerName.trim(),
    phone: phone.trim(),
    email: email ? email.trim() : '',
    serviceCategory,
    divisionId: targetDivId,
    divisionName: divisionObj.name || serviceObj.divisionName || 'AMK Infrastructure Wing',
    serviceTitle: serviceObj.title || serviceCategory,
    projectType: projectType || 'General Project',
    location: location || 'Hanamkonda / Warangal Area',
    siteSize: siteSize || 'Not specified',
    budgetRange: budgetRange || 'Flexible',
    timeline: timeline || 'Standard',
    details: details || '',
    status: 'Received',
    statusNote: `Inquiry assigned to ${divisionObj.divisionHead || 'AMK INFRA Engineering Wing'}. Our team will connect shortly.`,
    estimatedQuote: 'Under Assessment',
    assignedEngineer: divisionObj.divisionHead ? `${divisionObj.divisionHead} (${divisionObj.shortName || 'Lead'})` : 'A. Charan Patel (Site Director)',
    createdAt: now,
    updatedAt: now,
    history: [
      {
        status: 'Received',
        time: now,
        note: `Online request generated under ${divisionObj.name}. Assigned to ${divisionObj.divisionHead}.`
      }
    ]
  };

  data.inquiries.unshift(newInquiry);
  db.save(data);

  // Generate pre-formatted WhatsApp deep link
  const waMessage = encodeURIComponent(
    `Hello AMK INFRA!\nI have submitted a service request:\n- Tracking ID: ${newId}\n- Name: ${newInquiry.customerName}\n- Division: ${newInquiry.divisionName}\n- Service: ${newInquiry.serviceTitle}\n- Location: ${newInquiry.location}\n- Phone: ${newInquiry.phone}\nPlease connect with me regarding this project.`
  );
  const whatsappUrl = `https://wa.me/919032477292?text=${waMessage}`;

  res.status(201).json({
    success: true,
    message: 'Service request submitted successfully! Your tracking code is ' + newId,
    data: newInquiry,
    whatsappNotificationUrl: whatsappUrl
  });
});

app.patch('/api/inquiries/:id/status', (req, res) => {
  const data = db.get();
  const { status, statusNote, estimatedQuote, assignedEngineer } = req.body;

  const inquiryIndex = data.inquiries.findIndex(i => i.id.toUpperCase() === req.params.id.toUpperCase());
  if (inquiryIndex === -1) {
    return res.status(404).json({ success: false, message: 'Inquiry not found' });
  }

  const validStatuses = ['Received', 'Contacted', 'Quoted', 'In Progress', 'Completed'];
  if (status && !validStatuses.includes(status)) {
    return res.status(400).json({ success: false, message: 'Invalid status. Must be one of: ' + validStatuses.join(', ') });
  }

  const inquiry = data.inquiries[inquiryIndex];
  const now = new Date().toISOString();

  if (status) inquiry.status = status;
  if (statusNote) inquiry.statusNote = statusNote;
  if (estimatedQuote !== undefined) inquiry.estimatedQuote = estimatedQuote;
  if (assignedEngineer) inquiry.assignedEngineer = assignedEngineer;
  inquiry.updatedAt = now;

  // Add history entry
  inquiry.history = inquiry.history || [];
  inquiry.history.push({
    status: status || inquiry.status,
    time: now,
    note: statusNote || `Status updated to ${status || inquiry.status} by AMK Admin team.`
  });

  db.save(data);

  res.json({
    success: true,
    message: `Inquiry ${inquiry.id} updated to ${inquiry.status}`,
    data: inquiry
  });
});

app.delete('/api/inquiries/:id', (req, res) => {
  const data = db.get();
  const inquiryIndex = data.inquiries.findIndex(i => i.id.toUpperCase() === req.params.id.toUpperCase());
  if (inquiryIndex === -1) {
    return res.status(404).json({ success: false, message: 'Inquiry not found' });
  }

  const deleted = data.inquiries.splice(inquiryIndex, 1);
  db.save(data);

  res.json({ success: true, message: 'Inquiry deleted', data: deleted[0] });
});

// 5. Portfolio Endpoints
app.get('/api/portfolio', (req, res) => {
  const data = db.get();
  let list = [...data.portfolio];
  const { category, division, featured } = req.query;

  if (category && category !== 'all') {
    list = list.filter(item => item.category === category);
  }
  if (division && division !== 'all') {
    list = list.filter(item => item.divisionId === division);
  }
  if (featured === 'true') {
    list = list.filter(item => item.featured === true);
  }

  res.json({ success: true, count: list.length, data: list });
});

app.post('/api/portfolio', (req, res) => {
  const data = db.get();
  const {
    title,
    category,
    divisionId,
    location,
    area,
    cost,
    completionDate,
    client,
    description,
    image,
    beforeImage,
    highlights,
    featured
  } = req.body;

  if (!title || !category || !image) {
    return res.status(400).json({ success: false, message: 'Title, category, and image URL are required' });
  }

  const categoryMap = {
    construction: 'Commercial & Civil Construction',
    residential: 'Residential Custom Homes',
    infrastructure: 'Heavy Civil & Infrastructure',
    renovation: 'Renovation & Remodeling',
    electrical: 'Electrical & Power Works',
    security: 'CC Camera & Security',
    interior: 'Interior Design & Fitouts',
    painting: 'Painting & Waterproofing'
  };

  const newProject = {
    id: `proj-${Date.now()}`,
    title,
    category,
    divisionId: divisionId || 'civil-commercial',
    categoryLabel: categoryMap[category] || category,
    location: location || 'Hanamkonda, Warangal',
    area: area || 'Custom Area',
    cost: cost || 'Confidential',
    completionDate: completionDate || 'Recently Completed',
    client: client || 'Private Client',
    description: description || 'High-quality infrastructure and construction execution by AMK INFRA.',
    image,
    beforeImage: beforeImage || '',
    hasBeforeAfter: Boolean(beforeImage),
    featured: Boolean(featured),
    highlights: Array.isArray(highlights) ? highlights : (highlights ? highlights.split(',').map(s => s.trim()) : ['Quality Verified', 'On-Time Handover'])
  };

  data.portfolio.unshift(newProject);
  db.save(data);

  res.status(201).json({ success: true, message: 'Project added to portfolio', data: newProject });
});

app.put('/api/portfolio/:id', (req, res) => {
  const data = db.get();
  const index = data.portfolio.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Project not found' });
  }

  const updated = { ...data.portfolio[index], ...req.body };
  if (req.body.beforeImage) {
    updated.hasBeforeAfter = true;
  }
  data.portfolio[index] = updated;
  db.save(data);

  res.json({ success: true, message: 'Project updated', data: updated });
});

app.delete('/api/portfolio/:id', (req, res) => {
  const data = db.get();
  const index = data.portfolio.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Project not found' });
  }

  const deleted = data.portfolio.splice(index, 1);
  db.save(data);

  res.json({ success: true, message: 'Project deleted', data: deleted[0] });
});

// 6. Testimonials
app.get('/api/testimonials', (req, res) => {
  const data = db.get();
  res.json({ success: true, data: data.testimonials });
});

app.post('/api/testimonials', (req, res) => {
  const data = db.get();
  const { name, role, location, rating, content, serviceTag } = req.body;

  if (!name || !content) {
    return res.status(400).json({ success: false, message: 'Name and review content are required' });
  }

  const newTestimonial = {
    id: `test-${Date.now()}`,
    name,
    role: role || 'Valued Client',
    location: location || 'Warangal',
    rating: Number(rating) || 5,
    avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80`,
    content,
    serviceTag: serviceTag || 'Construction',
    verified: true
  };

  data.testimonials.unshift(newTestimonial);
  db.save(data);

  res.status(201).json({ success: true, message: 'Review added', data: newTestimonial });
});

// 7. Analytics & Statistics
app.get('/api/stats', (req, res) => {
  const data = db.get();
  const inquiries = data.inquiries || [];
  const divisions = data.divisions || [];

  const totalInquiries = inquiries.length;
  const statusCounts = {
    Received: inquiries.filter(i => i.status === 'Received').length,
    Contacted: inquiries.filter(i => i.status === 'Contacted').length,
    Quoted: inquiries.filter(i => i.status === 'Quoted').length,
    'In Progress': inquiries.filter(i => i.status === 'In Progress').length,
    Completed: inquiries.filter(i => i.status === 'Completed').length
  };

  // Service & Division distribution
  const serviceDistribution = {};
  data.services.forEach(s => {
    serviceDistribution[s.title] = inquiries.filter(i => i.serviceCategory === s.id).length;
  });

  const divisionDistribution = {};
  divisions.forEach(d => {
    divisionDistribution[d.shortName || d.name] = inquiries.filter(i => i.divisionId === d.id).length;
  });

  const conversionRate = totalInquiries > 0
    ? Math.round(((statusCounts['In Progress'] + statusCounts['Completed']) / totalInquiries) * 100)
    : 0;

  res.json({
    success: true,
    data: {
      totalInquiries,
      statusCounts,
      serviceDistribution,
      divisionDistribution,
      divisionsCount: divisions.length,
      conversionRate: `${conversionRate}%`,
      activeProjects: statusCounts['In Progress'],
      completedInquiries: statusCounts['Completed'],
      portfolioCount: data.portfolio.length,
      lastUpdated: new Date().toISOString()
    }
  });
});

// 8. Instant Cost Estimator Calculation Engine
app.post('/api/estimate', (req, res) => {
  const {
    category = 'residential',
    builtUpArea = 1500, // sq.ft
    floors = 1,
    packageType = 'premium', // standard, premium, luxury
    customOptions = {}
  } = req.body;

  const area = Number(builtUpArea) || 1200;
  const numFloors = Number(floors) || 1;

  // Base rate per sq.ft by category
  const baseRates = {
    residential: { standard: 1650, premium: 1950, luxury: 2400 },
    construction: { standard: 1550, premium: 1850, luxury: 2250 },
    renovation: { standard: 450, premium: 750, luxury: 1200 },
    interior: { standard: 900, premium: 1350, luxury: 1900 },
    painting: { standard: 18, premium: 28, luxury: 45 },
    electrical: { standard: 45, premium: 70, luxury: 110 },
    security: { standard: 14999, premium: 29999, luxury: 54999 },
    infrastructure: { standard: 2200, premium: 3100, luxury: 4500 }
  };

  const selectedRate = baseRates[category] ? baseRates[category][packageType] || baseRates[category].premium : 1800;

  let totalEstimate = 0;
  let breakdown = {};

  if (category === 'security') {
    totalEstimate = selectedRate;
    breakdown = {
      equipment: Math.round(totalEstimate * 0.65),
      wiringAndSwitches: Math.round(totalEstimate * 0.2),
      installationAndConfiguration: Math.round(totalEstimate * 0.15)
    };
  } else if (category === 'painting') {
    const wallArea = area * 3.5;
    totalEstimate = Math.round(wallArea * selectedRate);
    breakdown = {
      primerAndWallPutty: Math.round(totalEstimate * 0.28),
      premiumEmulsionPaints: Math.round(totalEstimate * 0.42),
      skilledLaborAndMasking: Math.round(totalEstimate * 0.30)
    };
  } else {
    const totalSqFt = area * numFloors;
    totalEstimate = Math.round(totalSqFt * selectedRate);
    breakdown = {
      structureAndMasonry: Math.round(totalEstimate * 0.45),
      finishesAndFlooring: Math.round(totalEstimate * 0.22),
      plumbingAndSanitary: Math.round(totalEstimate * 0.12),
      electricalAndFixtures: Math.round(totalEstimate * 0.11),
      architecturalAndProjectManagement: Math.round(totalEstimate * 0.10)
    };
  }

  res.json({
    success: true,
    data: {
      category,
      packageType,
      builtUpArea: area,
      floors: numFloors,
      ratePerSqFt: category !== 'security' ? `₹${selectedRate}/sq.ft` : `₹${selectedRate} (Kit)`,
      totalEstimateFormatted: `₹${totalEstimate.toLocaleString('en-IN')}`,
      totalEstimateNumber: totalEstimate,
      breakdown,
      currency: 'INR',
      disclaimer: 'This is an approximate computer estimate based on Warangal market rates. Final BOQ will be finalized after on-site structural inspection.'
    }
  });
});

// 9. Mobile Pairing & Device Sync Endpoints
app.get('/api/mobile-sync/info', (req, res) => {
  const host = req.hostname;
  res.json({
    success: true,
    data: {
      appName: 'AMK INFRA Companion Mobile App',
      version: 'v2.4.0-pro',
      serverHost: host,
      apiEndpoint: '/api',
      pwaUrl: `http://${host}:5173/?mode=mobile`,
      syncStatus: 'Active',
      features: [
        'Real-time Construction Milestone Push Alerts',
        'Live Site Camera Feeds & Video Call',
        'One-Tap WhatsApp Engineer Direct Line',
        'Itemized BOQ & Architectural Blueprint Viewer',
        'Offline Blueprint Caching & Biometric Access'
      ]
    }
  });
});

// 10. Authentication (Admin & Customer mock auth)
app.post('/api/auth/admin-login', (req, res) => {
  const { email, password } = req.body;
  if ((email === 'admin@amkinfra.com' || email === 'charan@amkinfra.com' || email === 'admin') && (password === 'amk1234' || password === 'admin123' || password === 'amk')) {
    return res.json({
      success: true,
      token: 'jwt-amk-admin-token-2026',
      user: {
        id: 'usr-admin-1',
        name: 'A. Charan Patel',
        role: 'Managing Director & Founder',
        email: 'charan@amkinfra.com',
        phone: '9032477292',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
      }
    });
  }

  res.status(401).json({ success: false, message: 'Invalid Admin credentials. Use admin@amkinfra.com / amk1234' });
});

app.post('/api/auth/customer-login', (req, res) => {
  const { identifier, password } = req.body;
  const data = db.get();
  
  const cleanId = (identifier || '').trim().toLowerCase();
  const matchedInquiries = data.inquiries.filter(i =>
    (i.phone && i.phone.includes(cleanId)) ||
    (i.email && i.email.toLowerCase() === cleanId) ||
    cleanId === 'client@amkinfra.com' || cleanId === '9032477292' || cleanId === 'demo'
  );

  const customerName = matchedInquiries[0]?.customerName || 'Valued Client';
  const customerPhone = matchedInquiries[0]?.phone || (identifier.length >= 10 ? identifier : '9848022334');
  const customerEmail = matchedInquiries[0]?.email || (identifier.includes('@') ? identifier : 'client@amkinfra.com');

  return res.json({
    success: true,
    token: `jwt-customer-${Date.now()}`,
    user: {
      id: `usr-client-${Date.now()}`,
      name: customerName,
      role: 'Project Client',
      email: customerEmail,
      phone: customerPhone,
      inquiriesCount: matchedInquiries.length || 2,
      savedInquiries: matchedInquiries.map(i => i.id)
    }
  });
});

app.post('/api/auth/customer-register', (req, res) => {
  const { name, phone, email, password } = req.body;
  if (!name || !phone) {
    return res.status(400).json({ success: false, message: 'Name and phone number are required.' });
  }

  return res.json({
    success: true,
    message: 'Customer account created successfully!',
    token: `jwt-customer-${Date.now()}`,
    user: {
      id: `usr-client-${Date.now()}`,
      name: name.trim(),
      role: 'Project Client',
      email: email ? email.trim() : `${phone}@amkinfra.com`,
      phone: phone.trim(),
      inquiriesCount: 0,
      savedInquiries: []
    }
  });
});

// 11. Careers & Engineering Recruitment Endpoints
app.get('/api/careers/jobs', (req, res) => {
  const data = db.get();
  let list = [...(data.careersJobs || [])];
  const { division } = req.query;

  if (division && division !== 'all') {
    list = list.filter(j => j.divisionId === division);
  }

  res.json({ success: true, count: list.length, data: list });
});

app.get('/api/careers/jobs/:id', (req, res) => {
  const data = db.get();
  const job = (data.careersJobs || []).find(j => j.id.toUpperCase() === req.params.id.toUpperCase());
  if (!job) {
    return res.status(404).json({ success: false, message: 'Job opening not found' });
  }
  res.json({ success: true, data: job });
});

app.post('/api/careers/apply', (req, res) => {
  const data = db.get();
  const {
    jobId,
    fullName,
    phone,
    email,
    qualification,
    experienceYears,
    currentCompany,
    expectedSalary,
    portfolioUrl,
    coverNote
  } = req.body;

  if (!fullName || !phone || !qualification) {
    return res.status(400).json({
      success: false,
      message: 'Please provide Full Name, Contact Phone, and Engineering Qualification.'
    });
  }

  const job = (data.careersJobs || []).find(j => j.id === jobId) || { title: 'General Engineering Application', divisionName: 'AMK Engineering Corps' };
  const appId = `AMK-APP-${Math.floor(1000 + Math.random() * 9000)}`;
  const now = new Date().toISOString();

  const newApplication = {
    id: appId,
    jobId: jobId || 'GENERAL',
    jobTitle: job.title,
    divisionName: job.divisionName || 'AMK INFRA',
    fullName: fullName.trim(),
    phone: phone.trim(),
    email: email ? email.trim() : '',
    qualification: qualification.trim(),
    experienceYears: experienceYears || 'Fresh Graduate / Entry',
    currentCompany: currentCompany || 'Not disclosed',
    expectedSalary: expectedSalary || 'As per norms',
    portfolioUrl: portfolioUrl || '',
    coverNote: coverNote || '',
    status: 'Shortlisted for Review',
    submittedAt: now
  };

  data.careerApplications = data.careerApplications || [];
  data.careerApplications.unshift(newApplication);
  db.save(data);

  res.status(201).json({
    success: true,
    message: `Application submitted successfully! Your application reference code is ${appId}. Our Talent Acquisition Lead will contact you.`,
    data: newApplication
  });
});

// 12. Corporate & Government Tenders Desk
app.get('/api/tenders/pre-qual', (req, res) => {
  const data = db.get();
  res.json({
    success: true,
    data: data.tenders || {}
  });
});

app.post('/api/tenders/submit-rfp', (req, res) => {
  const data = db.get();
  const {
    organizationName,
    contactPerson,
    officialEmail,
    officialPhone,
    tenderType,
    projectScope,
    estimatedBoqValue,
    submissionDeadline,
    rfpDocumentLink,
    notes
  } = req.body;

  if (!organizationName || !officialPhone || !projectScope) {
    return res.status(400).json({
      success: false,
      message: 'Please provide Organization Name, Phone, and Project Scope.'
    });
  }

  const tenderId = `AMK-TENDER-${Math.floor(10000 + Math.random() * 90000)}`;
  const now = new Date().toISOString();

  const newTenderSubmission = {
    id: tenderId,
    organizationName: organizationName.trim(),
    contactPerson: contactPerson || 'Procurement Officer',
    officialEmail: officialEmail || '',
    officialPhone: officialPhone.trim(),
    tenderType: tenderType || 'Commercial / Infrastructure RFP',
    projectScope: projectScope.trim(),
    estimatedBoqValue: estimatedBoqValue || 'Custom BOQ',
    submissionDeadline: submissionDeadline || 'Standard',
    rfpDocumentLink: rfpDocumentLink || '',
    notes: notes || '',
    status: 'Pre-Qualification Review',
    assignedDirector: 'A. Charan Patel (Managing Director)',
    submittedAt: now
  };

  data.tenderSubmissions = data.tenderSubmissions || [];
  data.tenderSubmissions.unshift(newTenderSubmission);
  db.save(data);

  res.status(201).json({
    success: true,
    message: `Enterprise RFP/Tender Proposal received under ref ${tenderId}. Our Director of Civil Works will review the BOQ.`,
    data: newTenderSubmission
  });
});

// 13. Quality & Safety Compliance Metrics
app.get('/api/safety-quality', (req, res) => {
  const data = db.get();
  res.json({
    success: true,
    data: data.safetyQuality || {}
  });
});

// 14. Staff & Field Intranet (Daily Progress Reports)
app.get('/api/staff/dpr', (req, res) => {
  const data = db.get();
  res.json({
    success: true,
    count: (data.staffDprLogs || []).length,
    data: data.staffDprLogs || []
  });
});

app.post('/api/staff/dpr', (req, res) => {
  const data = db.get();
  const {
    siteCode,
    siteName,
    divisionId,
    supervisorName,
    weather,
    workforceCount,
    machineryRunning,
    activitiesCompleted,
    safetyToolboxTopic,
    incidentReported
  } = req.body;

  if (!siteName || !supervisorName || !activitiesCompleted) {
    return res.status(400).json({
      success: false,
      message: 'Please provide Site Name, Supervisor Name, and Activities Completed.'
    });
  }

  const dprId = `DPR-2026-${Math.floor(100 + Math.random() * 900)}`;
  const now = new Date().toISOString().split('T')[0];

  const newDpr = {
    id: dprId,
    siteCode: siteCode || 'AMK-SITE-GEN',
    siteName: siteName.trim(),
    divisionId: divisionId || 'civil-commercial',
    supervisorName: supervisorName.trim(),
    date: now,
    weather: weather || 'Clear / 30°C',
    workforceCount: Number(workforceCount) || 12,
    machineryRunning: machineryRunning || 'Vibrators & Levelers',
    activitiesCompleted: activitiesCompleted.trim(),
    safetyToolboxTopic: safetyToolboxTopic || 'Daily Site PPE & Fall Protection Audit',
    incidentReported: incidentReported || 'None. Zero hazard logged.',
    status: 'Verified by MD'
  };

  data.staffDprLogs = data.staffDprLogs || [];
  data.staffDprLogs.unshift(newDpr);
  db.save(data);

  res.status(201).json({
    success: true,
    message: `DPR ${dprId} filed successfully for ${newDpr.siteName}.`,
    data: newDpr
  });
});

// 15. Photographic Feeds & Real-Time Site Cameras (NEW)
app.get('/api/live-cameras', (req, res) => {
  const data = db.get();
  const cameras = data.liveCameras || [];
  const { division } = req.query;

  let list = [...cameras];
  if (division && division !== 'all') {
    list = list.filter(c => c.divisionId === division);
  }

  res.json({
    success: true,
    count: list.length,
    timestamp: new Date().toISOString(),
    data: list
  });
});

app.get('/api/live-cameras/:id', (req, res) => {
  const data = db.get();
  const cameras = data.liveCameras || [];
  const camera = cameras.find(c => c.id.toUpperCase() === req.params.id.toUpperCase());
  if (!camera) {
    return res.status(404).json({ success: false, message: 'Camera channel not found' });
  }

  res.json({
    success: true,
    timestamp: new Date().toISOString(),
    data: camera
  });
});

app.get('/api/photo-feed', (req, res) => {
  const data = db.get();
  let list = data.photoFeed || [];
  const { division, featured, category } = req.query;

  if (division && division !== 'all') {
    list = list.filter(p => p.divisionId === division);
  }
  if (category && category !== 'all') {
    list = list.filter(p => p.category.toLowerCase().includes(category.toLowerCase()));
  }
  if (featured === 'true') {
    list = list.filter(p => p.featured);
  }

  res.json({
    success: true,
    count: list.length,
    data: list
  });
});

app.post('/api/photo-feed/upload', (req, res) => {
  const data = db.get();
  const { title, divisionId, category, stage, imageUrl, caption, location } = req.body;

  if (!title || !imageUrl || !divisionId) {
    return res.status(400).json({
      success: false,
      message: 'Please provide Title, Division ID, and Image URL.'
    });
  }

  const newPhoto = {
    id: `PHOTO-${Math.floor(100 + Math.random() * 900)}`,
    title: title.trim(),
    divisionId,
    category: category || 'General Construction',
    stage: stage || 'In Progress',
    imageUrl,
    caption: caption || '',
    date: new Date().toISOString().split('T')[0],
    location: location || 'Warangal / Hanamkonda Site',
    featured: false,
    dimensions: '4K UHD'
  };

  data.photoFeed = data.photoFeed || [];
  data.photoFeed.unshift(newPhoto);
  db.save(data);

  res.status(201).json({
    success: true,
    message: 'Site progress photo published to photographic feed.',
    data: newPhoto
  });
});

app.get('/api/drone-reels', (req, res) => {
  const data = db.get();
  res.json({
    success: true,
    count: (data.droneReels || []).length,
    data: data.droneReels || []
  });
});

app.get('/api/project-timelapses', (req, res) => {
  const data = db.get();
  const { division } = req.query;
  let list = data.projectTimelapses || [];
  if (division && division !== 'all') {
    list = list.filter(t => t.divisionId === division);
  }
  res.json({
    success: true,
    count: list.length,
    data: list
  });
});

app.get('/api/panoramas', (req, res) => {
  const data = db.get();
  res.json({
    success: true,
    count: (data.panoramas || []).length,
    data: data.panoramas || []
  });
});

// Root & Health
app.get('/api/health', (req, res) => {
  const data = db.get();
  res.json({
    status: 'ok',
    serverTime: new Date().toISOString(),
    app: 'AMK INFRA Enterprise Photographic API Server',
    divisions: (data.divisions || []).length,
    services: (data.services || []).length,
    inquiries: (data.inquiries || []).length,
    liveCameras: (data.liveCameras || []).length,
    photoFeed: (data.photoFeed || []).length
  });
});

// Static client files (for unified single-link production serving)
app.use(express.static(distPath));

// Fallback to index.html for React SPA routes
app.get('*', (req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ success: false, message: 'API endpoint not found' });
  }
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 AMK INFRA Server running on http://localhost:${PORT}`);
});

