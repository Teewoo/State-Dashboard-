import React from 'react';
import { Search, Calendar, Bell, Menu, Sparkles } from 'lucide-react';

interface TopBarProps {
  onOpenMobileMenu: () => void;
  onOpenRagAssistant: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  onOpenMobileMenu,
  onOpenRagAssistant,
}) => {
  return (
    <header
      id="app-topbar"
      className="sticky top-0 z-30 bg-white border-b border-[#E5E7EB] px-4 sm:px-6 py-2.5 transition-colors"
    >
      <div className="flex items-center justify-between gap-4">
        {/* Left Section: Menu Toggle + Search Box */}
        <div className="flex items-center space-x-3 flex-1 max-w-md">
          <button
            id="mobile-menu-trigger"
            onClick={onOpenMobileMenu}
            className="p-1.5 rounded-lg border border-[#E5E7EB] text-[#4B5563] hover:bg-[#F4F6FB] hover:text-[#111827] transition-colors shrink-0"
            aria-label="Toggle navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Search field with magnifying glass on right (matching benchmark) */}
          <div className="relative flex-1">
            <input
              type="text"
              id="global-search-input"
              placeholder="Search"
              readOnly
              className="w-full pl-3.5 pr-9 py-1.5 text-xs bg-white border border-[#E5E7EB] rounded-lg text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#4F46E5] focus:border-[#4F46E5] transition-all cursor-default"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF] pointer-events-none" />
          </div>
        </div>

        {/* Right Section: Ask HeliumMum + Calendar + Notification + User Avatar */}
        <div className="flex items-center space-x-2.5 shrink-0">
          {/* Ask HeliumMum AI Assistant Button */}
          <button
            id="ask-heliummum-btn"
            onClick={onOpenRagAssistant}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-[#4F46E5] hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-2xs transition-all shrink-0 active:scale-98"
            title="Open Ask HeliumMum assistant"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-200" />
            <span className="hidden sm:inline">Ask HeliumMum</span>
            <span className="sm:hidden">Assistant</span>
          </button>

          {/* Calendar Icon Button */}
          <button
            type="button"
            className="p-1.5 text-[#6B7280] hover:text-[#111827] hover:bg-[#F4F6FB] rounded-lg border border-[#E5E7EB] transition-colors"
            title="Calendar & Scheduling"
            aria-label="Calendar"
          >
            <Calendar className="w-4 h-4" />
          </button>

          {/* Notification Bell with indicator */}
          <button
            type="button"
            className="relative p-1.5 text-[#6B7280] hover:text-[#111827] hover:bg-[#F4F6FB] rounded-lg border border-[#E5E7EB] transition-colors"
            title="Notifications"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#EF4444] ring-1 ring-white" />
          </button>

          {/* Profile User Avatar Circle */}
          <div
            className="w-8 h-8 rounded-full bg-[#10B981] text-white flex items-center justify-center font-bold text-xs shadow-2xs ring-2 ring-emerald-100 cursor-pointer select-none"
            title="Public Health Programme Lead"
          >
            PH
          </div>
        </div>
      </div>
    </header>
  );
};

