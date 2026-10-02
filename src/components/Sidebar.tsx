import React from 'react';
import {
  LayoutDashboard,
  CalendarHeart,
  Baby,
  ClipboardList,
  Activity,
  FileCheck2,
  MapPin,
  X,
} from 'lucide-react';
import { StatePartnerLogo } from './StatePartnerLogo';
import { StateName } from '../types';

export type PageId =
  | 'overview'
  | 'anc-coverage'
  | 'delivery-referral'
  | 'outcome-review'
  | 'service-utilization'
  | 'facility-reporting'
  | 'programme-reach';

interface SidebarProps {
  currentPage: PageId;
  onSelectPage: (page: PageId) => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
  selectedState?: 'All' | StateName;
}

interface NavItem {
  id: PageId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'anc-coverage', label: 'ANC Coverage', icon: CalendarHeart },
  { id: 'delivery-referral', label: 'Delivery & Referral', icon: Baby },
  { id: 'outcome-review', label: 'Outcome Review', icon: ClipboardList },
  { id: 'service-utilization', label: 'Service Utilization', icon: Activity },
  { id: 'facility-reporting', label: 'Facility Reporting', icon: FileCheck2 },
  { id: 'programme-reach', label: 'Programme Reach', icon: MapPin },
];

export const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  onSelectPage,
  mobileOpen,
  onCloseMobile,
  selectedState = 'All',
}) => {
  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-neutral-900/30 backdrop-blur-xs z-40 lg:hidden transition-opacity"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      <aside
        id="app-sidebar"
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-white border-r border-[#E5E7EB] flex flex-col justify-between transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header with State Government Partner Co-Branding */}
        <div className="p-4 sm:p-5 border-b border-[#E5E7EB] relative">
          {/* Close button on mobile */}
          <div className="flex items-start justify-between">
            <div className="w-full pr-6">
              <StatePartnerLogo selectedState={selectedState} />
            </div>

            <button
              id="sidebar-close-button"
              onClick={onCloseMobile}
              className="lg:hidden absolute top-4 right-4 p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation items */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                id={`nav-item-${item.id}`}
                onClick={() => {
                  onSelectPage(item.id);
                  onCloseMobile();
                }}
                className={`relative w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all text-left group ${
                  isActive
                    ? 'bg-[#EEF2FF] text-[#4F46E5] font-semibold shadow-xs'
                    : 'text-[#4B5563] hover:text-[#111827] hover:bg-[#F4F6FB]'
                }`}
              >
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-[#4F46E5] rounded-r-full" />
                )}
                <Icon
                  className={`w-4 h-4 shrink-0 transition-colors ${
                    isActive ? 'text-[#4F46E5]' : 'text-[#6B7280] group-hover:text-[#111827]'
                  }`}
                />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer Mandated Disclaimer */}
        <div className="p-4 border-t border-[#E5E7EB] bg-[#F9FAFB]/60">
          <p className="text-[11px] text-[#6B7280] leading-relaxed select-none">
            Risk classifications shown are produced by the validated ARS clinical tool. AI is used
            only to generate explanations, not to determine risk.
          </p>
        </div>
      </aside>
    </>
  );
};
