import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MobileNavbar } from './MobileNavbar';
import { MobileTabBar } from './MobileTabBar';
import {
  Smartphone,
  Phone,
  MessageSquare,
  Bell,
  CheckCircle2,
  X,
  ExternalLink,
  Shield,
  Layers,
  ArrowRight,
  QrCode,
  Sparkles,
  Fingerprint
} from 'lucide-react';

export function MobileAppContainer({ children, onOpenNotifications }) {
  const {
    mobileMode,
    setMobileMode,
    deviceSkin,
    setDeviceSkin,
    setWebMobileSyncModalOpen,
    activeTab,
    navigateTo,
    addNotification,
    showToast
  } = useApp();

  const [simulatedPush, setSimulatedPush] = useState(null);
  const [biometricUnlocked, setBiometricUnlocked] = useState(false);

  const triggerDemoPush = () => {
    const alerts = [
      {
        title: 'Civil & Commercial Division Update',
        msg: 'Er. Sandeep Goud completed M40 grade slab compaction at Hunter Road Villa (AMK-2026-1042).',
        code: 'AMK-2026-1042'
      },
      {
        title: 'Turnkey Interiors Wing Alert',
        msg: 'V. Naveen uploaded 3D photorealistic render for modular kitchen & ceiling profile lighting.',
        code: 'AMK-2026-1088'
      },
      {
        title: 'Surveillance Division Verified',
        msg: '16-Camera 4K AI night vision IP grid test passed with 30-day encrypted NVR storage.',
        code: 'AMK-2026-1120'
      },
      {
        title: 'Infrastructure Roads Inspection',
        msg: 'Er. K. V. Raman scheduled topography survey for internal concrete road paving.',
        code: 'AMK-2026-1155'
      }
    ];
    const picked = alerts[Math.floor(Math.random() * alerts.length)];
    setSimulatedPush(picked);
    addNotification({
      title: picked.title,
      message: picked.msg,
      type: 'info'
    });
    setTimeout(() => {
      setSimulatedPush(null);
    }, 6500);
  };

  const simulateBiometric = () => {
    setBiometricUnlocked(true);
    showToast('Biometric Access Verified', 'FaceID / Fingerprint authenticated client profile.', 'success');
    setTimeout(() => setBiometricUnlocked(false), 3000);
  };

  if (!mobileMode) {
    return children;
  }

  return (
    <div className="min-h-screen bg-[#1C1C1C] py-6 px-2 sm:px-4 flex flex-col items-center justify-start text-white select-none">
      
      {/* Simulator Control Bar */}
      <div className="w-full max-w-4xl bg-[#181818] border border-neutral-800 rounded-2xl p-3 mb-6 flex flex-wrap items-center justify-between gap-3 text-xs shadow-xl">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#F59E0B] text-[#1C1C1C] flex items-center justify-center font-black shadow-sm">
            <Smartphone className="w-4 h-4 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white block">AMK INFRA Mobile Companion App</span>
              <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                Synced
              </span>
            </div>
            <span className="text-[10px] text-neutral-400">Integrated iOS & Android companion client</span>
          </div>
        </div>

        {/* Device Switcher, QR Bridge & Push Test */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex bg-[#242424] p-0.5 rounded-xl border border-neutral-700">
            <button
              onClick={() => setDeviceSkin('iphone')}
              className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-colors ${
                deviceSkin === 'iphone' ? 'bg-[#F59E0B] text-[#1C1C1C] font-black' : 'text-neutral-300'
              }`}
            >
              iPhone 15 Pro
            </button>
            <button
              onClick={() => setDeviceSkin('android')}
              className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-colors ${
                deviceSkin === 'android' ? 'bg-[#F59E0B] text-[#1C1C1C] font-black' : 'text-neutral-300'
              }`}
            >
              Samsung S24
            </button>
            <button
              onClick={() => setDeviceSkin('fullscreen')}
              className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-colors ${
                deviceSkin === 'fullscreen' ? 'bg-[#F59E0B] text-[#1C1C1C] font-black' : 'text-neutral-300'
              }`}
            >
              Responsive PWA
            </button>
          </div>

          <button
            onClick={triggerDemoPush}
            className="px-3 py-1.5 rounded-xl bg-purple-600/30 hover:bg-purple-600 text-purple-200 hover:text-white font-bold text-[11px] border border-purple-500/40 flex items-center gap-1 transition-colors"
            title="Simulate Real Push Alert"
          >
            <Bell className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Push Alert</span>
          </button>

          <button
            onClick={simulateBiometric}
            className="px-3 py-1.5 rounded-xl bg-[#242424] hover:bg-[#2e2e2e] text-[#F59E0B] font-bold text-[11px] border border-neutral-700 flex items-center gap-1 transition-colors"
            title="Simulate Biometric FaceID"
          >
            <Fingerprint className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">FaceID</span>
          </button>

          <button
            onClick={() => setWebMobileSyncModalOpen(true)}
            className="px-3 py-1.5 rounded-xl bg-[#F59E0B]/20 text-[#F59E0B] hover:bg-[#F59E0B] hover:text-[#1C1C1C] font-bold text-[11px] border border-[#F59E0B]/40 flex items-center gap-1 transition-all"
            title="Open Mobile QR Code Bridge"
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>QR Scan</span>
          </button>

          <button
            onClick={() => setMobileMode(false)}
            className="px-3 py-1.5 rounded-xl bg-[#242424] hover:bg-[#2e2e2e] text-neutral-200 font-bold text-[11px] border border-neutral-700 transition-colors"
          >
            Exit Mobile Mode
          </button>
        </div>
      </div>

      {/* Device Frame Container */}
      <div className={`relative transition-all duration-300 ${
        deviceSkin === 'fullscreen'
          ? 'w-full max-w-md'
          : deviceSkin === 'iphone'
          ? 'w-[392px] h-[848px] rounded-[52px] p-3.5 bg-[#141414] border-[10px] border-[#242424] shadow-2xl ring-1 ring-neutral-700'
          : 'w-[412px] h-[862px] rounded-[40px] p-3 bg-[#141414] border-[8px] border-[#242424] shadow-2xl ring-1 ring-neutral-700'
      }`}>
        
        {/* Dynamic Island Notch for iPhone skin */}
        {deviceSkin === 'iphone' && (
          <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-50 flex items-center justify-end px-3 shadow-inner">
            <div className="w-2.5 h-2.5 rounded-full bg-neutral-900 border border-neutral-800" />
          </div>
        )}

        {/* Android Punch Hole Camera */}
        {deviceSkin === 'android' && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-black rounded-full z-50 border border-neutral-800 shadow-inner" />
        )}

        {/* Screen Container */}
        <div className={`relative w-full h-full bg-[#F5F5F3] text-[#1C1C1C] overflow-hidden flex flex-col ${
          deviceSkin !== 'fullscreen' ? 'rounded-[38px]' : 'rounded-2xl border border-neutral-700'
        }`}>
          
          {/* Mobile Top Navbar */}
          <MobileNavbar onOpenNotifications={onOpenNotifications} />

          {/* Simulated In-App Push Notification Banner */}
          {simulatedPush && (
            <div className="absolute top-14 inset-x-3 z-50 bg-[#1C1C1C] border border-[#F59E0B] p-3.5 rounded-2xl shadow-2xl backdrop-blur-xl animate-in slide-in-from-top-4 duration-300 text-white">
              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#F59E0B] text-[#1C1C1C] flex items-center justify-center font-black flex-shrink-0">
                  <Bell className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0 text-xs">
                  <div className="flex justify-between items-start">
                    <strong className="text-white block font-bold truncate">{simulatedPush.title}</strong>
                    <button onClick={() => setSimulatedPush(null)} className="text-neutral-400 p-0.5 hover:text-white">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-[11px] text-neutral-300 mt-0.5 leading-relaxed">{simulatedPush.msg}</p>
                  <button
                    onClick={() => {
                      setSimulatedPush(null);
                      navigateTo('tracker', { trackingCode: simulatedPush.code });
                    }}
                    className="mt-2 text-[10px] font-black text-[#F59E0B] hover:underline flex items-center gap-1"
                  >
                    <span>View Site Milestone in Tracker</span>
                    <ArrowRight className="w-3 3-3" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Biometric verification popup animation */}
          {biometricUnlocked && (
            <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center animate-in zoom-in-95 duration-200 text-white">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3 shadow-glow animate-pulse">
                <Fingerprint className="w-10 h-10" />
              </div>
              <h4 className="text-base font-bold text-white">FaceID & Biometrics Synced</h4>
              <p className="text-xs text-neutral-400 mt-1">Client secure identity confirmed.</p>
            </div>
          )}

          {/* Screen Content Scrollable Area */}
          <div className="flex-1 overflow-y-auto pb-20 no-scrollbar">
            {children}
          </div>

          {/* Sticky Quick Action Mobile Bottom FAB Bar */}
          <div className="absolute bottom-16 right-4 z-40 flex flex-col gap-2.5">
            <a
              href="https://wa.me/919032477292?text=Hello%20AMK%20INFRA%20from%20Mobile%20App!"
              target="_blank"
              rel="noreferrer"
              className="w-11 h-11 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110"
              title="Chat on WhatsApp"
            >
              <MessageSquare className="w-5 h-5 fill-current" />
            </a>

            <a
              href="tel:9032477292"
              className="w-11 h-11 rounded-full bg-[#F59E0B] hover:bg-[#D97706] text-[#1C1C1C] flex items-center justify-center shadow-md transition-transform hover:scale-110 font-black"
              title="Call Founder A. Charan Patel"
            >
              <Phone className="w-5 h-5" />
            </a>
          </div>

          {/* Bottom Tab Bar */}
          <MobileTabBar />
        </div>
      </div>
    </div>
  );
}
