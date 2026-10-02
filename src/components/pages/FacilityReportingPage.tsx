import React, { useState } from 'react';
import {
  FileCheck2,
  Calendar,
  Search,
  CheckCircle2,
  AlertTriangle,
  AlertOctagon,
  Eye,
  Building2,
  Filter,
} from 'lucide-react';
import { ALL_MONTHLY_DATA, computeAggregates, FACILITIES } from '../../data/mockData';
import { Facility, FilterState, MonthlyFacilityData, ReportStatus } from '../../types';
import { SubmissionModal } from '../SubmissionModal';

interface FacilityReportingPageProps {
  filters: FilterState;
}

export const FacilityReportingPage: React.FC<FacilityReportingPageProps> = ({ filters }) => {
  const data = computeAggregates(filters);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | ReportStatus>('All');
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);
  const [selectedReport, setSelectedReport] = useState<MonthlyFacilityData | null>(null);

  // Latest month index = 11 (September 2026)
  const currentMonthIdx = 11;

  // Build rows for each eligible facility in the filter
  const facilityRows = data.facilities.map((fac) => {
    const latestRec = ALL_MONTHLY_DATA.find(
      (r) => r.facilityId === fac.id && r.monthIndex === currentMonthIdx
    );
    return {
      facility: fac,
      report: latestRec || null,
      status: latestRec ? latestRec.reportStatus : ('Missing' as ReportStatus),
      lastSubmitted: latestRec ? latestRec.submissionDate : 'Not Received',
      womenRegistered: latestRec ? latestRec.womenRegistered : 0,
      completionRate: latestRec ? latestRec.ancCompletionRate : 0,
    };
  });

  // Filter rows by search and status
  const filteredRows = facilityRows.filter((row) => {
    const matchesSearch =
      row.facility.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.facility.lga.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.facility.state.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || row.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const onTimeCount = facilityRows.filter((r) => r.status === 'On Time').length;
  const lateCount = facilityRows.filter((r) => r.status === 'Late').length;
  const missingCount = facilityRows.filter((r) => r.status === 'Missing').length;
  const onTimePct = facilityRows.length > 0 ? Math.round((onTimeCount / facilityRows.length) * 100) : 0;

  const handleOpenSubmission = (fac: Facility, report: MonthlyFacilityData | null) => {
    if (!report) {
      // Create fallback dummy for viewing if missing
      const dummyReport: MonthlyFacilityData = {
        facilityId: fac.id,
        monthIndex: currentMonthIdx,
        monthLabel: 'Sep 2026',
        womenRegistered: 0,
        ancVisitsTotal: 0,
        ancCompletionRate: 0,
        earlyBookingRate: 0,
        ancVisitsFunnel: { v1: 0, v2: 0, v3: 0, v4: 0, v5: 0, v6: 0, v7: 0, v8: 0 },
        facilityDeliveryRate: 0,
        deliveries: { formalFacility: 0, tba: 0, transferred: 0 },
        transferReasons: { obstructedLabor: 0, postpartumHemorrhage: 0, eclampsia: 0, fetalDistress: 0, severeAnemia: 0 },
        maternalDeaths: 0,
        deathContributingFactors: { delayedReferral: 0, noBloodBank: 0, noTrainedAttendant: 0, transportDelay: 0, other: 0 },
        reportStatus: 'Missing',
        submissionDate: 'Pending Submission',
        riskSplit: { low: 0, medium: 0, high: 0 },
        highRiskFollowUpCount: 0,
        serviceUtilization: {
          newPatients: 0,
          returningPatients: 0,
          routineAnc: 0,
          highRiskManagement: 0,
          emergencyObstetricCare: 0,
          referralOnly: 0,
          recoveredDischarged: 0,
          ongoingCare: 0,
          referred: 0,
          deceased: 0,
        },
      };
      setSelectedFacility(fac);
      setSelectedReport(dummyReport);
    } else {
      setSelectedFacility(fac);
      setSelectedReport(report);
    }
  };

  return (
    <div className="space-y-6">
      {/* Headline Stat Card: % of facilities reported on time this month */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <span className="text-xs font-semibold text-[#4F46E5] uppercase tracking-wider block">
              Timeliness KPI (Current Cycle)
            </span>
            <div className="mt-2 flex items-baseline space-x-3">
              <span className="text-4xl sm:text-5xl font-extrabold text-[#111827] tracking-tight">
                {onTimePct}%
              </span>
              <span className="text-sm font-semibold text-[#10B981] bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100">
                {onTimeCount} of {facilityRows.length} facilities on time
              </span>
            </div>
            <p className="text-xs text-[#6B7280] mt-2 max-w-xl">
              Facility monthly reporting window closes on the 7th calendar day of each month. Submissions logged after the 7th are classified as Late; facilities with no record by the 14th are flagged as Missing.
            </p>
          </div>

          {/* Quick status count pills */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="px-4 py-3 rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] text-center min-w-[100px]">
              <span className="text-[11px] font-medium text-[#10B981] block">On Time</span>
              <span className="text-xl font-bold text-[#111827]">{onTimeCount}</span>
            </div>
            <div className="px-4 py-3 rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] text-center min-w-[100px]">
              <span className="text-[11px] font-medium text-[#F59E0B] block">Late</span>
              <span className="text-xl font-bold text-[#111827]">{lateCount}</span>
            </div>
            <div className="px-4 py-3 rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] text-center min-w-[100px]">
              <span className="text-[11px] font-medium text-[#EF4444] block">Missing</span>
              <span className="text-xl font-bold text-[#111827]">{missingCount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Facility Table with Search and Status Filter */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-xs overflow-hidden">
        {/* Table Toolbar */}
        <div className="p-4 sm:p-5 border-b border-[#E5E7EB] flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white">
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
            <input
              type="text"
              placeholder="Search facility name or LGA..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#4F46E5] focus:border-[#4F46E5]"
            />
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs text-[#6B7280]">Status Filter:</span>
            <div className="flex rounded-lg border border-[#E5E7EB] p-0.5 bg-[#F9FAFB] text-xs">
              {(['All', 'On Time', 'Late', 'Missing'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                    statusFilter === st
                      ? 'bg-white text-[#111827] shadow-xs'
                      : 'text-[#6B7280] hover:text-[#111827]'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F9FAFB] border-b border-[#E5E7EB] text-[#4B5563] font-semibold">
              <tr>
                <th className="px-5 py-3.5">Facility Name</th>
                <th className="px-4 py-3.5">State & LGA</th>
                <th className="px-4 py-3.5">Reporting Status</th>
                <th className="px-4 py-3.5">Submission Date</th>
                <th className="px-4 py-3.5">Mothers Logged</th>
                <th className="px-4 py-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB] text-[#111827]">
              {filteredRows.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-8 text-center text-xs text-[#6B7280]">
                    No facilities matched the selected search or status criteria.
                  </td>
                </tr>
              ) : (
                filteredRows.map((row) => (
                  <tr key={row.facility.id} className="hover:bg-[#F9FAFB]/70 transition-colors">
                    <td className="px-5 py-3.5 font-medium text-[#111827]">
                      <div className="flex items-center space-x-2.5">
                        <Building2 className="w-4 h-4 text-[#9CA3AF] shrink-0" />
                        <span>{row.facility.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-[#6B7280]">
                      {row.facility.state} State ({row.facility.lga})
                    </td>
                    <td className="px-4 py-3.5">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                          row.status === 'On Time'
                            ? 'bg-emerald-50 text-[#10B981]'
                            : row.status === 'Late'
                            ? 'bg-amber-50 text-[#F59E0B]'
                            : 'bg-red-50 text-[#EF4444]'
                        }`}
                      >
                        {row.status === 'On Time' && (
                          <CheckCircle2 className="w-3 h-3 mr-1 text-[#10B981]" />
                        )}
                        {row.status === 'Late' && (
                          <AlertTriangle className="w-3 h-3 mr-1 text-[#F59E0B]" />
                        )}
                        {row.status === 'Missing' && (
                          <AlertOctagon className="w-3 h-3 mr-1 text-[#EF4444]" />
                        )}
                        {row.status}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-[#6B7280]">
                      {row.lastSubmitted}
                    </td>
                    <td className="px-4 py-3.5 font-medium text-[#111827]">
                      {row.womenRegistered > 0 ? row.womenRegistered.toLocaleString() : '—'}
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <button
                        onClick={() => handleOpenSubmission(row.facility, row.report)}
                        className="inline-flex items-center space-x-1 px-3 py-1 rounded-md text-xs font-semibold text-[#4F46E5] hover:text-[#4338CA] hover:bg-indigo-50 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View submission</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Submission Review Modal */}
      <SubmissionModal
        isOpen={!!selectedFacility}
        onClose={() => {
          setSelectedFacility(null);
          setSelectedReport(null);
        }}
        facility={selectedFacility}
        report={selectedReport}
      />
    </div>
  );
};
