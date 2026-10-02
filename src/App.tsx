import React, { useState } from 'react';
import { Sidebar, PageId } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { DashboardHeader } from './components/DashboardHeader';
import { OverviewPage } from './components/pages/OverviewPage';
import { AncCoveragePage } from './components/pages/AncCoveragePage';
import { DeliveryReferralPage } from './components/pages/DeliveryReferralPage';
import { OutcomeReviewPage } from './components/pages/OutcomeReviewPage';
import { ServiceUtilizationPage } from './components/pages/ServiceUtilizationPage';
import { FacilityReportingPage } from './components/pages/FacilityReportingPage';
import { ProgrammeReachPage } from './components/pages/ProgrammeReachPage';
import { FACILITIES } from './data/mockData';
import { DateRangeOption, FilterState, StateName } from './types';
import { RotateCcw } from 'lucide-react';
import { AskHeliumMumDrawer } from './components/AskHeliumMumDrawer';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('overview');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [ragDrawerOpen, setRagDrawerOpen] = useState(false);

  // Facility map for quick lookups
  const facilityNameMap = React.useMemo(
    () => Object.fromEntries(FACILITIES.map((f) => [f.id, f.name])),
    []
  );

  // Global filters
  const [filters, setFilters] = useState<FilterState>({
    dateRange: '12m',
    selectedState: 'All',
    selectedFacilityId: 'All',
    searchQuery: '',
  });

  const handleDateRangeChange = (val: DateRangeOption) => {
    setFilters((prev) => ({ ...prev, dateRange: val }));
  };

  const handleStateChange = (val: 'All' | StateName) => {
    setFilters((prev) => ({
      ...prev,
      selectedState: val,
      selectedFacilityId: 'All', // Reset facility on state change
    }));
  };

  const handleFacilityChange = (val: 'All' | string) => {
    setFilters((prev) => ({ ...prev, selectedFacilityId: val }));
  };

  const resetFilters = () => {
    setFilters({
      dateRange: '12m',
      selectedState: 'All',
      selectedFacilityId: 'All',
      searchQuery: '',
    });
  };

  const hasActiveFilters =
    filters.selectedState !== 'All' ||
    filters.selectedFacilityId !== 'All' ||
    filters.dateRange !== '12m';

  const selectedFacilityObj =
    filters.selectedFacilityId !== 'All'
      ? FACILITIES.find((f) => f.id === filters.selectedFacilityId)
      : null;

  const getPageHeaderInfo = () => {
    switch (currentPage) {
      case 'overview':
        return {
          title: 'HeliumMum Programme Dashboard',
          subtitle: 'Monitoring maternal health risk assessment, care navigation and programme outcomes.',
        };
      case 'anc-coverage':
        return {
          title: 'Antenatal Care (ANC) Coverage & Retention',
          subtitle: 'Tracking patient attendance across the eight recommended clinical consultations and timely first-trimester booking.',
        };
      case 'delivery-referral':
        return {
          title: 'Delivery Setting & Complication Referrals',
          subtitle: 'Monitoring safe childbirth locations, traditional birth attendant transitions, and emergency navigation.',
        };
      case 'outcome-review':
        return {
          title: 'Outcome Surveillance & Audit Reviews',
          subtitle: 'Surveillance of maternal deaths, critical contributing clinical factors, and health facility preparedness.',
        };
      case 'service-utilization':
        return {
          title: 'Maternal Service Utilization',
          subtitle: 'Volume of pregnant women receiving routine ANC, high-risk specialized care, and clinical discharge outcomes.',
        };
      case 'facility-reporting':
        return {
          title: 'Facility Reporting & Submission Compliance',
          subtitle: 'Monthly data submission status and timeliness across participating primary health centres.',
        };
      case 'programme-reach':
        return {
          title: 'Programme Reach & Onboarding Progress',
          subtitle: 'Expansion across Local Government Areas and facility network onboarding.',
        };
    }
  };

  const pageInfo = getPageHeaderInfo();

  return (
    <div className="min-h-screen bg-[#F4F6FB] flex flex-col text-[#111827]">
      {/* Sidebar Navigation */}
      <Sidebar
        currentPage={currentPage}
        onSelectPage={(page) => setCurrentPage(page)}
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
        selectedState={filters.selectedState}
      />

      {/* Main Content Area offset by sidebar width (lg:ml-64) */}
      <div className="lg:ml-64 flex flex-col min-h-screen transition-all">
        {/* Sticky Top Bar (Matching reference benchmark) */}
        <TopBar
          onOpenMobileMenu={() => setMobileSidebarOpen(true)}
          onOpenRagAssistant={() => setRagDrawerOpen(true)}
        />

        {/* Filter Summary Pill Bar (when non-default filters active) */}
        {hasActiveFilters && (
          <div className="bg-indigo-50/80 border-b border-indigo-100 px-4 sm:px-6 py-2 flex items-center justify-between text-xs">
            <div className="flex flex-wrap items-center gap-2 text-[#4F46E5]">
              <span className="font-semibold">Active Filter Scope:</span>
              <span className="bg-white px-2 py-0.5 rounded-md border border-indigo-200 font-medium">
                {filters.dateRange === '3m'
                  ? 'Last 3 Months'
                  : filters.dateRange === '6m'
                  ? 'Last 6 Months'
                  : 'Last 12 Months'}
              </span>
              {filters.selectedState !== 'All' && (
                <span className="bg-white px-2 py-0.5 rounded-md border border-indigo-200 font-medium">
                  {filters.selectedState} State
                </span>
              )}
              {selectedFacilityObj && (
                <span className="bg-white px-2 py-0.5 rounded-md border border-indigo-200 font-medium">
                  {selectedFacilityObj.name}
                </span>
              )}
            </div>
            <button
              onClick={resetFilters}
              className="inline-flex items-center space-x-1 font-semibold text-[#4F46E5] hover:text-[#4338CA] transition-colors ml-2 shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          </div>
        )}

        {/* Page Content Viewport */}
        <main className="flex-1 p-4 sm:p-6 lg:p-7 max-w-[1400px] w-full mx-auto space-y-6">
          {/* Header with Title and Inline Filters matching reference benchmark */}
          <DashboardHeader
            title={pageInfo.title}
            subtitle={pageInfo.subtitle}
            dateRange={filters.dateRange}
            onChangeDateRange={handleDateRangeChange}
            selectedState={filters.selectedState}
            onChangeState={handleStateChange}
            selectedFacilityId={filters.selectedFacilityId}
            onChangeFacility={handleFacilityChange}
            facilities={FACILITIES}
          />

          {currentPage === 'overview' && (
            <OverviewPage
              filters={filters}
              onNavigateToPage={(page) => setCurrentPage(page as PageId)}
            />
          )}
          {currentPage === 'anc-coverage' && <AncCoveragePage filters={filters} />}
          {currentPage === 'delivery-referral' && <DeliveryReferralPage filters={filters} />}
          {currentPage === 'outcome-review' && <OutcomeReviewPage filters={filters} />}
          {currentPage === 'service-utilization' && (
            <ServiceUtilizationPage filters={filters} />
          )}
          {currentPage === 'facility-reporting' && (
            <FacilityReportingPage filters={filters} />
          )}
          {currentPage === 'programme-reach' && <ProgrammeReachPage filters={filters} />}
        </main>
      </div>

      {/* RAG Analytical Assistant Drawer: Ask HeliumMum */}
      <AskHeliumMumDrawer
        isOpen={ragDrawerOpen}
        onClose={() => setRagDrawerOpen(false)}
        filters={filters}
        onClearFilters={resetFilters}
        facilityNameMap={facilityNameMap}
      />
    </div>
  );
}

