import React from 'react';
import { StateName } from '../types';

interface StatePartnerLogoProps {
  selectedState?: 'All' | StateName;
  compact?: boolean;
}

export const StatePartnerLogo: React.FC<StatePartnerLogoProps> = ({
  selectedState = 'All',
  compact = false,
}) => {
  // Derive state-specific partner department name
  const getPartnerDetails = () => {
    switch (selectedState) {
      case 'Lagos':
        return {
          title: 'Lagos State MoH',
          department: 'Primary Health Care Board',
          abbrev: 'LASG',
          stateColor: '#059669', // Emerald green
        };
      case 'Delta':
        return {
          title: 'Delta State MoH',
          department: 'Primary Health Care Dev. Agency',
          abbrev: 'DTSG',
          stateColor: '#047857',
        };
      case 'Kano':
        return {
          title: 'Kano State MoH',
          department: 'Primary Health Care Mgt. Board',
          abbrev: 'KNSG',
          stateColor: '#065F46',
        };
      case 'Ekiti':
        return {
          title: 'Ekiti State MoH',
          department: 'Primary Health Care Dev. Agency',
          abbrev: 'EKSG',
          stateColor: '#047857',
        };
      default:
        return {
          title: 'State Health Partners',
          department: 'Maternal Care Directorate',
          abbrev: 'SG-MOH',
          stateColor: '#047857',
        };
    }
  };

  const partner = getPartnerDetails();

  if (compact) {
    return (
      <div className="flex items-center space-x-2">
        {/* Dual Co-Branded Mini Shield */}
        <div className="relative flex items-center">
          {/* Government Green Shield */}
          <div className="w-7 h-7 rounded-lg bg-[#047857] flex items-center justify-center text-white shadow-xs border border-emerald-600/30">
            <svg
              className="w-4 h-4 text-emerald-100"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="M12 8v8" />
              <path d="M8 12h8" />
            </svg>
          </div>
          {/* Helium Tech Shield overlapping */}
          <div className="w-5 h-5 -ml-2 -mb-2 rounded-md bg-[#4F46E5] flex items-center justify-center text-white shadow-xs border-2 border-white">
            <svg
              className="w-2.5 h-2.5 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </div>
        </div>

        <div className="leading-tight">
          <div className="flex items-center space-x-1">
            <span className="text-xs font-bold text-[#111827]">{partner.title}</span>
            <span className="text-[10px] px-1 py-0.2 rounded bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
              Partner
            </span>
          </div>
          <div className="flex items-center space-x-1 text-[10px] text-[#6B7280]">
            <span>powered by</span>
            <span className="font-semibold text-[#4F46E5]">HeliumMum</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Top Co-Branded Insignia & Titles */}
      <div className="flex items-start space-x-3">
        {/* Official Partnership Dual Emblem */}
        <div className="relative shrink-0 pt-0.5">
          {/* Primary: State Government Partner Coat of Arms / Shield */}
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#065F46] to-[#047857] flex flex-col items-center justify-center text-white shadow-xs border border-emerald-600/40 relative overflow-hidden">
            {/* Subtle Nigerian Green-White-Green micro ribbon across top */}
            <div className="absolute top-0 inset-x-0 h-1 flex">
              <span className="w-1/3 h-full bg-[#008751]" />
              <span className="w-1/3 h-full bg-white" />
              <span className="w-1/3 h-full bg-[#008751]" />
            </div>

            <svg
              className="w-5 h-5 text-emerald-50 mt-0.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Government Health Shield with Cross & Laurel Accent */}
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="M12 7v8" stroke="white" strokeWidth="2.2" />
              <path d="M8 11h8" stroke="white" strokeWidth="2.2" />
            </svg>
          </div>

          {/* Connected Floating Badge: HeliumMum Tech & Algorithm Seal */}
          <div
            className="absolute -bottom-1 -right-1 w-5 h-5 rounded-md bg-[#4F46E5] flex items-center justify-center text-white shadow-xs ring-2 ring-white"
            title="Powered by HeliumMum Clinical AI"
          >
            <svg
              className="w-3 h-3 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 12 2 2 4-4" />
            </svg>
          </div>
        </div>

        {/* Partner Branding Titles */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center space-x-1.5 flex-wrap">
            <h1 className="text-sm font-bold text-[#111827] tracking-tight truncate leading-tight">
              {partner.title}
            </h1>
          </div>
          <p className="text-[11px] text-[#4B5563] font-medium leading-snug mt-0.5 truncate">
            {partner.department}
          </p>

          {/* Powered by HeliumMum Lockup */}
          <div className="mt-1 flex items-center space-x-1 text-[11px]">
            <span className="text-[#6B7280] font-normal">powered by</span>
            <span className="font-bold text-[#4F46E5] tracking-tight inline-flex items-center space-x-0.5">
              <span>HeliumMum</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] inline-block animate-pulse" />
            </span>
          </div>
        </div>
      </div>

      {/* State Partnership Status Ribbon */}
      <div className="mt-3 px-2.5 py-1.5 bg-gradient-to-r from-emerald-50/80 to-indigo-50/80 rounded-lg border border-emerald-100/90 flex items-center justify-between text-[10px]">
        <div className="flex items-center space-x-1.5 text-emerald-800 font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-[#059669]" />
          <span>State Government Partner Portal</span>
        </div>
        <span className="text-[9px] font-bold text-[#4F46E5] uppercase tracking-wider bg-white/80 px-1.5 py-0.5 rounded border border-indigo-100">
          ARS v2.4
        </span>
      </div>
    </div>
  );
};
