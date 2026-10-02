import React from 'react';
import { Calendar, MapPin, Building2 } from 'lucide-react';
import { DateRangeOption, Facility, StateName } from '../types';

interface DashboardHeaderProps {
  title?: string;
  subtitle?: string;
  dateRange: DateRangeOption;
  onChangeDateRange: (val: DateRangeOption) => void;
  selectedState: 'All' | StateName;
  onChangeState: (val: 'All' | StateName) => void;
  selectedFacilityId: 'All' | string;
  onChangeFacility: (val: 'All' | string) => void;
  facilities: Facility[];
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  title = 'HeliumMum Programme Dashboard',
  subtitle = 'Monitoring maternal health risk assessment, care navigation and programme outcomes.',
  dateRange,
  onChangeDateRange,
  selectedState,
  onChangeState,
  selectedFacilityId,
  onChangeFacility,
  facilities,
}) => {
  const availableFacilities =
    selectedState === 'All'
      ? facilities
      : facilities.filter((f) => f.state === selectedState);

  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-2">
      {/* Title & Subtitle */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-[#111827] tracking-tight">
          {title}
        </h1>
        <p className="text-xs sm:text-sm text-[#6B7280] mt-0.5">
          {subtitle}
        </p>
      </div>

      {/* Right side: Filter controls & sync status */}
      <div className="flex flex-col items-start lg:items-end gap-1.5 shrink-0">
        <div className="flex flex-wrap items-center gap-2">
          {/* State filter */}
          <div className="flex items-center space-x-1.5 px-2.5 py-1.5 bg-white border border-[#E5E7EB] rounded-lg text-xs font-medium text-[#111827] shadow-2xs hover:border-[#D1D5DB] transition-colors">
            <span className="text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider">STATE</span>
            <MapPin className="w-3.5 h-3.5 text-[#6B7280]" />
            <select
              id="state-filter-select"
              value={selectedState}
              onChange={(e) => {
                onChangeState(e.target.value as 'All' | StateName);
                onChangeFacility('All');
              }}
              aria-label="Filter by state"
              className="bg-transparent border-none text-xs font-medium text-[#111827] focus:outline-none cursor-pointer pr-1"
            >
              <option value="All">All States (4)</option>
              <option value="Lagos">Lagos</option>
              <option value="Delta">Delta</option>
              <option value="Kano">Kano</option>
              <option value="Ekiti">Ekiti</option>
            </select>
          </div>

          {/* Facility filter */}
          <div className="flex items-center space-x-1.5 px-2.5 py-1.5 bg-white border border-[#E5E7EB] rounded-lg text-xs font-medium text-[#111827] shadow-2xs hover:border-[#D1D5DB] transition-colors max-w-[210px] sm:max-w-xs">
            <span className="text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider">FACILITY</span>
            <Building2 className="w-3.5 h-3.5 text-[#6B7280] shrink-0" />
            <select
              id="facility-filter-select"
              value={selectedFacilityId}
              onChange={(e) => onChangeFacility(e.target.value)}
              aria-label="Filter by facility"
              className="bg-transparent border-none text-xs font-medium text-[#111827] focus:outline-none cursor-pointer truncate"
            >
              <option value="All">
                {selectedState === 'All'
                  ? 'All Facilities (20)'
                  : `All in ${selectedState} (${availableFacilities.length})`}
              </option>
              {availableFacilities.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name}
                </option>
              ))}
            </select>
          </div>

          {/* Period date range filter */}
          <div className="flex items-center space-x-1.5 px-2.5 py-1.5 bg-white border border-[#E5E7EB] rounded-lg text-xs font-medium text-[#111827] shadow-2xs hover:border-[#D1D5DB] transition-colors">
            <span className="text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider">PERIOD</span>
            <Calendar className="w-3.5 h-3.5 text-[#6B7280]" />
            <select
              id="period-filter-select"
              value={dateRange}
              onChange={(e) => onChangeDateRange(e.target.value as DateRangeOption)}
              aria-label="Filter date range"
              className="bg-transparent border-none text-xs font-medium text-[#111827] focus:outline-none cursor-pointer pr-1"
            >
              <option value="3m">Last 3 months</option>
              <option value="6m">Last 6 months</option>
              <option value="12m">Last 12 months</option>
            </select>
          </div>
        </div>

        {/* Data Sync & Facility Submissions Label */}
        <div className="text-[11px] text-[#6B7280] flex items-center space-x-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
          <span>Data last synced: <strong>14 Sep 2026, 23:30 WAT</strong></span>
          <span className="text-[#9CA3AF]">·</span>
          <span>Facility submissions (Not live clinical data)</span>
        </div>
      </div>
    </div>
  );
};
