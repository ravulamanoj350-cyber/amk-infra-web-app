import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { CostEstimatorModal } from './components/common/CostEstimatorModal';
import { WebMobileSyncModal } from './components/common/WebMobileSyncModal';
import { NotificationDrawer } from './components/common/NotificationDrawer';
import { ToastContainer } from './components/common/ToastContainer';
import { ServiceDetailModal } from './components/services/ServiceDetailModal';
import { JobApplicationModal } from './components/careers/JobApplicationModal';
import { StaffIntranetModal } from './components/staff/StaffIntranetModal';

// Pages & Sections
import { HeroSection } from './components/home/HeroSection';
import { DivisionsSection } from './components/home/DivisionsSection';
import { ServicesGrid } from './components/home/ServicesGrid';
import { WhyChooseUsSection } from './components/home/WhyChooseUsSection';
import { BeforeAfterShowcase } from './components/home/BeforeAfterShowcase';
import { FeaturedPortfolio } from './components/home/FeaturedPortfolio';
import { TestimonialsSection } from './components/home/TestimonialsSection';
import { CoverageAreaSection } from './components/home/CoverageAreaSection';
import { CtaBanner } from './components/home/CtaBanner';

import { DivisionsPage } from './components/divisions/DivisionsPage';
import { ServicesPage } from './components/services/ServicesPage';
import { RequestServiceWizard } from './components/request/RequestServiceWizard';
import { PortfolioPage } from './components/portfolio/PortfolioPage';
import { TrackStatusPage } from './components/tracker/TrackStatusPage';
import { AboutPage } from './components/about/AboutPage';
import { ContactPage } from './components/contact/ContactPage';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AuthPage } from './components/auth/AuthPage';
import { CareersPage } from './components/careers/CareersPage';
import { TendersPage } from './components/tenders/TendersPage';
import { SafetyQualityPage } from './components/safety/SafetyQualityPage';
import { MobileAppContainer } from './components/mobile/MobileAppContainer';
import { PhotographicCinematicCanvas } from './components/3d/PhotographicCinematicCanvas';

function MainLayout() {
  const {
    activeTab,
    mobileMode,
    selectedServiceId,
    serviceModalOpen,
    closeServiceModal,
    estimatorModalOpen,
    setEstimatorModalOpen,
    webMobileSyncModalOpen,
    setWebMobileSyncModalOpen
  } = useApp();

  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Active page content router
  const renderPageContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <>
            <HeroSection />
            <DivisionsSection />
            <ServicesGrid />
            <WhyChooseUsSection />
            <BeforeAfterShowcase />
            <FeaturedPortfolio />
            <TestimonialsSection />
            <CoverageAreaSection />
            <CtaBanner />
          </>
        );
      case 'divisions':
        return <DivisionsPage />;
      case 'services':
        return <ServicesPage />;
      case 'tenders':
        return <TendersPage />;
      case 'safety-quality':
        return <SafetyQualityPage />;
      case 'careers':
        return <CareersPage />;
      case 'request':
        return <RequestServiceWizard />;
      case 'portfolio':
        return <PortfolioPage />;
      case 'tracker':
        return <TrackStatusPage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'admin':
        return <AdminDashboard />;
      case 'auth':
      case 'login':
      case 'register':
        return <AuthPage />;
      default:
        return (
          <>
            <HeroSection />
            <DivisionsSection />
            <ServicesGrid />
            <WhyChooseUsSection />
            <BeforeAfterShowcase />
            <FeaturedPortfolio />
            <TestimonialsSection />
            <CoverageAreaSection />
            <CtaBanner />
          </>
        );
    }
  };

  const content = renderPageContent();

  if (mobileMode) {
    return (
      <div className="relative min-h-screen bg-[#F5F5F3] overflow-hidden">
        <PhotographicCinematicCanvas />
        <div className="relative z-10">
          <MobileAppContainer onOpenNotifications={() => setNotificationsOpen(true)}>
            {content}
            
            {/* Modals & Drawers inside mobile view */}
            <CostEstimatorModal
              isOpen={estimatorModalOpen}
              onClose={() => setEstimatorModalOpen(false)}
            />
            <WebMobileSyncModal
              isOpen={webMobileSyncModalOpen}
              onClose={() => setWebMobileSyncModalOpen(false)}
            />
            <ServiceDetailModal
              serviceId={selectedServiceId}
              isOpen={serviceModalOpen}
              onClose={closeServiceModal}
            />
            <JobApplicationModal />
            <StaffIntranetModal />
            <NotificationDrawer
              isOpen={notificationsOpen}
              onClose={() => setNotificationsOpen(false)}
            />
            <ToastContainer />
          </MobileAppContainer>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#F5F5F3] text-[#4B4B4B] flex flex-col selection:bg-[#F59E0B] selection:text-[#1C1C1C] overflow-x-hidden">
      {/* Photographic High-Definition Cinematic Motion Background */}
      <PhotographicCinematicCanvas />

      {/* Top Navbar */}
      <div className="relative z-30">
        <Navbar onOpenNotifications={() => setNotificationsOpen(true)} />
      </div>

      {/* Main Routed Page Content */}
      <main className="relative z-10 flex-1">
        {content}
      </main>

      {/* Global Footer */}
      <div className="relative z-10">
        <Footer />
      </div>

      {/* Global Modals & Drawers */}
      <CostEstimatorModal
        isOpen={estimatorModalOpen}
        onClose={() => setEstimatorModalOpen(false)}
      />
      <WebMobileSyncModal
        isOpen={webMobileSyncModalOpen}
        onClose={() => setWebMobileSyncModalOpen(false)}
      />
      <ServiceDetailModal
        serviceId={selectedServiceId}
        isOpen={serviceModalOpen}
        onClose={closeServiceModal}
      />
      <JobApplicationModal />
      <StaffIntranetModal />
      <NotificationDrawer
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
      />
      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
