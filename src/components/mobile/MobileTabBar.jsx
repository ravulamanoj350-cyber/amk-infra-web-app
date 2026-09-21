import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Home,
  Layers,
  PlusCircle,
  Clock,
  Grid
} from 'lucide-react';

export function MobileTabBar() {
  const { activeTab, navigateTo } = useApp();

  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'divisions', label: 'Divisions', icon: Layers },
    { id: 'request', label: 'Request', icon: PlusCircle, isAction: true },
    { id: 'services', label: 'Services', icon: Grid },
    { id: 'tracker', label: 'Tracker', icon: Clock }
  ];

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-[#181818] backdrop-blur-xl border-t border-neutral-800 px-2 py-1.5 shadow-2xl">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          if (tab.isAction) {
            return (
              <button
                key={tab.id}
                onClick={() => navigateTo(tab.id)}
                className="flex flex-col items-center -mt-5 group"
              >
                <div className="w-12 h-12 rounded-full bg-[#F59E0B] text-[#1C1C1C] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform font-bold">
                  <Icon className="w-6 h-6 stroke-[2.5]" />
                </div>
                <span className="text-[10px] font-extrabold text-[#F59E0B] mt-0.5">
                  {tab.label}
                </span>
              </button>
            );
          }

          return (
            <button
              key={tab.id}
              onClick={() => navigateTo(tab.id)}
              className={`flex flex-col items-center py-1 px-2 rounded-xl transition-all ${
                isActive ? 'text-[#F59E0B] font-bold' : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4 mb-0.5" />
              <span className="text-[10px]">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
