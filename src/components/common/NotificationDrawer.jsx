import React from 'react';
import { useApp } from '../../context/AppContext';
import { Bell, X, Check, Shield, Info, CheckCircle2, Clock } from 'lucide-react';

export function NotificationDrawer({ isOpen, onClose }) {
  const { notifications, markAllNotificationsAsRead, navigateTo } = useApp();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-full max-w-md bg-[#FFFFFF] border-l border-neutral-300 text-[#4B4B4B] shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-5 bg-[#181818] border-b border-neutral-800 flex items-center justify-between text-white">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#F59E0B] text-[#1C1C1C] flex items-center justify-center font-bold">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white font-display text-base">
                  Project & Activity Alerts
                </h3>
                <p className="text-[11px] text-[#E8E8E5]">Live push updates from AMK INFRA site team</p>
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-[#242424] text-neutral-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Action toolbar */}
          <div className="px-5 py-2.5 bg-[#F5F5F3] border-b border-neutral-200 flex justify-between items-center text-xs">
            <span className="text-[#737373]">
              {notifications.length} Total Alerts
            </span>
            <button
              onClick={markAllNotificationsAsRead}
              className="text-[#D97706] hover:underline flex items-center gap-1 font-semibold"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Mark all as read</span>
            </button>
          </div>

          {/* Notifications List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {notifications.length === 0 ? (
              <div className="text-center py-12 text-[#737373] text-xs">
                No active notifications right now.
              </div>
            ) : (
              notifications.map(notif => (
                <div
                  key={notif.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    notif.read
                      ? 'bg-[#F5F5F3] border-neutral-200 text-[#737373]'
                      : 'bg-[#FFFFFF] border-[#F59E0B]/50 text-[#4B4B4B] shadow-sm'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#F59E0B]/15 text-[#D97706] flex items-center justify-center flex-shrink-0 mt-0.5">
                      {notif.type === 'success' ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                      ) : notif.type === 'brand' ? (
                        <Shield className="w-4 h-4 text-[#D97706]" />
                      ) : (
                        <Info className="w-4 h-4 text-blue-700" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline mb-1">
                        <h4 className="text-xs font-bold text-[#1C1C1C] truncate">
                          {notif.title}
                        </h4>
                        <span className="text-[10px] text-[#737373] flex items-center gap-1">
                          <Clock className="w-2.5 h-2.5" />
                          {notif.time}
                        </span>
                      </div>
                      <p className="text-xs text-[#4B4B4B] leading-relaxed">
                        {notif.message}
                      </p>

                      <div className="mt-2.5 flex items-center gap-2">
                        <button
                          onClick={() => {
                            onClose();
                            navigateTo('tracker');
                          }}
                          className="text-[11px] font-bold text-[#D97706] hover:underline"
                        >
                          View Tracker &rarr;
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Helpline */}
          <div className="p-4 bg-[#F5F5F3] border-t border-neutral-200 text-center text-xs text-[#737373]">
            Need urgent assistance? Call Managing Director{' '}
            <a href="tel:9032477292" className="text-[#D97706] font-bold hover:underline">
              9032477292
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
