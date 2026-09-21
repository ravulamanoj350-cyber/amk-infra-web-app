import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../api';
import { translations } from '../i18n/translations';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Read initial query params for deep-linking
  const getInitialParams = () => {
    if (typeof window === 'undefined') return {};
    const params = new URLSearchParams(window.location.search);
    return {
      mode: params.get('mode'),
      tab: params.get('tab') || 'home',
      device: params.get('device') || 'iphone',
      division: params.get('division'),
      service: params.get('service'),
      code: params.get('code')
    };
  };

  const initialParams = getInitialParams();

  const [activeTab, setActiveTab] = useState(initialParams.tab || 'home');
  const [mobileMode, setMobileMode] = useState(initialParams.mode === 'mobile');
  const [deviceSkin, setDeviceSkin] = useState(initialParams.device || 'iphone');
  const [selectedServiceId, setSelectedServiceId] = useState(initialParams.service || null);
  const [selectedDivisionId, setSelectedDivisionId] = useState(initialParams.division || null);
  const [activeDivisionTab, setActiveDivisionTab] = useState(initialParams.division || 'all');
  const [serviceModalOpen, setServiceModalOpen] = useState(false);
  const [estimatorModalOpen, setEstimatorModalOpen] = useState(false);
  const [webMobileSyncModalOpen, setWebMobileSyncModalOpen] = useState(false);
  const [jobApplicationModalOpen, setJobApplicationModalOpen] = useState(false);
  const [selectedJobForApplication, setSelectedJobForApplication] = useState(null);
  const [staffIntranetModalOpen, setStaffIntranetModalOpen] = useState(false);
  const [searchTrackingCode, setSearchTrackingCode] = useState(initialParams.code || '');

  // Language state (en = English, te = Telugu, hi = Hindi)
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem('amk_lang') || 'en';
    } catch {
      return 'en';
    }
  });

  const changeLanguage = (newLang) => {
    setLang(newLang);
    try {
      localStorage.setItem('amk_lang', newLang);
    } catch (e) {
      console.error(e);
    }
    const langName = newLang === 'te' ? 'తెలుగు' : newLang === 'hi' ? 'हिन्दी' : 'English';
    showToast('Language Updated', `Switched to ${langName}.`, 'success');
  };

  const t = (key, fallback = '') => {
    if (translations[lang] && translations[lang][key]) {
      return translations[lang][key];
    }
    if (translations.en && translations.en[key]) {
      return translations.en[key];
    }
    return fallback || key;
  };
  
  // Admin auth
  const [adminUser, setAdminUser] = useState(() => {
    try {
      const saved = localStorage.getItem('amk_admin_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Customer auth
  const [customerUser, setCustomerUser] = useState(() => {
    try {
      const saved = localStorage.getItem('amk_customer_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Notifications
  const [notifications, setNotifications] = useState([
    {
      id: 'notif-1',
      title: 'Site Progress Update',
      message: 'Excavation phase completed for Hunter Road Villa project (AMK-2026-1042).',
      time: '10 mins ago',
      read: false,
      type: 'info'
    },
    {
      id: 'notif-2',
      title: 'Quotation Ready',
      message: 'Er. Sandeep Goud uploaded itemized BOQ for your custom home request.',
      time: '2 hours ago',
      read: false,
      type: 'success'
    },
    {
      id: 'notif-3',
      title: 'Corporate Divisions Activated',
      message: 'Explore 7 specialized engineering wings with dedicated directors & modern fleet.',
      time: '5 hours ago',
      read: false,
      type: 'brand'
    },
    {
      id: 'notif-4',
      title: 'Welcome to AMK INFRA',
      message: 'Call Founder A. Charan Patel directly at 9032477292 for urgent tenders.',
      time: '1 day ago',
      read: true,
      type: 'brand'
    }
  ]);

  // Toasts
  const [toasts, setToasts] = useState([]);

  // Data prefetch
  const [company, setCompany] = useState(null);
  const [services, setServices] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadInitialData() {
      try {
        const [compRes, servRes, divRes] = await Promise.all([
          api.getCompany(),
          api.getServices(),
          api.getDivisions()
        ]);
        if (compRes.success) setCompany(compRes.data);
        if (servRes.success) setServices(servRes.data);
        if (divRes.success) setDivisions(divRes.data);
      } catch (err) {
        console.error('Error loading initial data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadInitialData();
  }, []);

  const showToast = (title, message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const addNotification = (notif) => {
    const newNotif = {
      id: `notif-${Date.now()}`,
      time: 'Just now',
      read: false,
      ...notif
    };
    setNotifications(prev => [newNotif, ...prev]);
    showToast(notif.title, notif.message, notif.type || 'info');
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const navigateTo = (tab, options = {}) => {
    setActiveTab(tab);
    if (options.serviceId) {
      setSelectedServiceId(options.serviceId);
    }
    if (options.divisionId) {
      setSelectedDivisionId(options.divisionId);
      setActiveDivisionTab(options.divisionId);
    }
    if (options.trackingCode) {
      setSearchTrackingCode(options.trackingCode);
    }
    if (options.switchToMobile) {
      setMobileMode(true);
    }
    if (options.switchToWeb) {
      setMobileMode(false);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openServiceModal = (serviceId) => {
    setSelectedServiceId(serviceId);
    setServiceModalOpen(true);
  };

  const closeServiceModal = () => {
    setServiceModalOpen(false);
  };

  const handleAdminLogin = (user) => {
    setAdminUser(user);
    localStorage.setItem('amk_admin_user', JSON.stringify(user));
    showToast('Admin Logged In', `Welcome back, ${user.name}!`, 'success');
  };

  const handleAdminLogout = () => {
    setAdminUser(null);
    localStorage.removeItem('amk_admin_user');
    showToast('Logged Out', 'You have been signed out of Admin Dashboard.', 'info');
    if (activeTab === 'admin') setActiveTab('home');
  };

  const handleCustomerLogin = (user) => {
    setCustomerUser(user);
    localStorage.setItem('amk_customer_user', JSON.stringify(user));
    showToast('Welcome Back!', `Signed in as ${user.name}`, 'success');
  };

  const handleCustomerLogout = () => {
    setCustomerUser(null);
    localStorage.removeItem('amk_customer_user');
    showToast('Signed Out', 'You have been logged out of Client Portal.', 'info');
  };

  const openJobApplication = (job = null) => {
    setSelectedJobForApplication(job);
    setJobApplicationModalOpen(true);
  };

  const closeJobApplication = () => {
    setJobApplicationModalOpen(false);
    setSelectedJobForApplication(null);
  };

  const openStaffIntranet = () => {
    setStaffIntranetModalOpen(true);
  };

  const closeStaffIntranet = () => {
    setStaffIntranetModalOpen(false);
  };

  const unreadCount = (notifications || []).filter(n => !n.read).length;

  return (
    <AppContext.Provider
      value={{
        lang,
        setLang,
        changeLanguage,
        t,
        activeTab,
        setActiveTab,
        navigateTo,
        mobileMode,
        setMobileMode,
        deviceSkin,
        setDeviceSkin,
        selectedServiceId,
        setSelectedServiceId,
        selectedDivisionId,
        setSelectedDivisionId,
        activeDivisionTab,
        setActiveDivisionTab,
        serviceModalOpen,
        openServiceModal,
        closeServiceModal,
        estimatorModalOpen,
        setEstimatorModalOpen,
        webMobileSyncModalOpen,
        setWebMobileSyncModalOpen,
        jobApplicationModalOpen,
        setJobApplicationModalOpen,
        selectedJobForApplication,
        openJobApplication,
        closeJobApplication,
        staffIntranetModalOpen,
        setStaffIntranetModalOpen,
        openStaffIntranet,
        closeStaffIntranet,
        searchTrackingCode,
        setSearchTrackingCode,
        adminUser,
        loginAdmin: handleAdminLogin,
        logoutAdmin: handleAdminLogout,
        customerUser,
        loginCustomer: handleCustomerLogin,
        logoutCustomer: handleCustomerLogout,
        notifications,
        addNotification,
        markAllNotificationsAsRead,
        unreadCount,
        toasts,
        showToast,
        removeToast,
        company,
        services,
        divisions,
        loading
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
