import React from 'react';
import { X, Building2, Calendar, CheckCircle2, AlertTriangle, AlertOctagon, User, ShieldCheck } from 'lucide-react';
import { Facility, MonthlyFacilityData } from '../types';

interface SubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  facility: Facility | null;
  report: MonthlyFacilityData | null;
}

export const SubmissionModal: React.FC<SubmissionModalProps> = ({
  isOpen,
  onClose,
  facility,
  report,
}) => {
  if (!isOpen || !facility || !report) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/40 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        id="facility-submission-modal"
        className="bg-white rounded-xl border border-[#E5E7EB] shadow-lg max-w-2xl w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-[#E5E7EB] flex items-center justify-between bg-[#F9FAFB]">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-[#EEF2FF] border border-[#E5E7EB] flex items-center justify-center text-[#4F46E5]">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-[#111827]">
                Monthly Facility Submission Form
              </h3>
              <p className="text-xs text-[#6B7280]">
                {facility.name} • {facility.state} State ({facility.lga} LGA)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#9CA3AF] hover:text-[#111827] rounded-lg hover:bg-gray-200/60 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Submission Status Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-lg border bg-[#F9FAFB] border-[#E5E7EB] gap-2">
            <div className="flex items-center space-x-2.5">
              {report.reportStatus === 'On Time' ? (
                <CheckCircle2 className="w-5 h-5 text-[#10B981]" />
              ) : report.reportStatus === 'Late' ? (
                <AlertTriangle className="w-5 h-5 text-[#F59E0B]" />
              ) : (
                <AlertOctagon className="w-5 h-5 text-[#EF4444]" />
              )}
              <div>
                <span className="text-xs text-[#6B7280]">Filing Status:</span>{' '}
                <span
                  className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                    report.reportStatus === 'On Time'
                      ? 'bg-emerald-50 text-[#10B981]'
                      : report.reportStatus === 'Late'
                      ? 'bg-amber-50 text-[#F59E0B]'
                      : 'bg-red-50 text-[#EF4444]'
                  }`}
                >
                  {report.reportStatus}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-xs text-[#6B7280]">
              <Calendar className="w-4 h-4 text-[#9CA3AF]" />
              <span>Reporting Month: <strong className="text-[#111827]">{report.monthLabel}</strong></span>
              <span>• Filed: <strong className="text-[#111827]">{report.submissionDate}</strong></span>
            </div>
          </div>

          {/* Officer in Charge */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3 bg-white border border-[#E5E7EB] rounded-lg">
              <div className="flex items-center space-x-2 text-xs text-[#6B7280] mb-1">
                <User className="w-3.5 h-3.5" />
                <span>Certified By</span>
              </div>
              <p className="text-sm font-medium text-[#111827]">{facility.facilityLead}</p>
              <p className="text-xs text-[#6B7280]">Chief Medical Officer / Lead Matron</p>
            </div>

            <div className="p-3 bg-white border border-[#E5E7EB] rounded-lg">
              <div className="flex items-center space-x-2 text-xs text-[#6B7280] mb-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>ARS Clinical Verification</span>
              </div>
              <p className="text-sm font-medium text-[#111827]">Audit Passed</p>
              <p className="text-xs text-[#6B7280]">Validated against register logs</p>
            </div>
          </div>

          {/* Metric Breakdown Table */}
          <div>
            <h4 className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-3">
              Submitted Registry Indicators
            </h4>
            <div className="border border-[#E5E7EB] rounded-lg divide-y divide-[#E5E7EB] text-xs">
              <div className="flex justify-between p-2.5 bg-[#F9FAFB] font-medium text-[#374151]">
                <span>Indicator Name</span>
                <span>Submitted Value</span>
              </div>
              <div className="flex justify-between p-2.5">
                <span className="text-[#4B5563]">Pregnant Women Newly Registered</span>
                <span className="font-semibold text-[#111827]">{report.womenRegistered}</span>
              </div>
              <div className="flex justify-between p-2.5">
                <span className="text-[#4B5563]">Total ANC Consultations Recorded</span>
                <span className="font-semibold text-[#111827]">{report.ancVisitsTotal}</span>
              </div>
              <div className="flex justify-between p-2.5">
                <span className="text-[#4B5563]">1st Trimester Booking (Early Booking)</span>
                <span className="font-semibold text-[#111827]">{report.earlyBookingRate}%</span>
              </div>
              <div className="flex justify-between p-2.5">
                <span className="text-[#4B5563]">8-Visit ANC Completion Rate</span>
                <span className="font-semibold text-[#111827]">{report.ancCompletionRate}%</span>
              </div>
              <div className="flex justify-between p-2.5">
                <span className="text-[#4B5563]">Formal Facility Deliveries</span>
                <span className="font-semibold text-[#111827]">{report.deliveries.formalFacility}</span>
              </div>
              <div className="flex justify-between p-2.5">
                <span className="text-[#4B5563]">TBA Deliveries Reported in Catchment</span>
                <span className="font-semibold text-[#111827]">{report.deliveries.tba}</span>
              </div>
              <div className="flex justify-between p-2.5">
                <span className="text-[#4B5563]">Complication Transfers Initiated</span>
                <span className="font-semibold text-[#111827]">{report.deliveries.transferred}</span>
              </div>
              <div className="flex justify-between p-2.5">
                <span className="text-[#4B5563]">Maternal Deaths Logged</span>
                <span className={`font-semibold ${report.maternalDeaths > 0 ? 'text-[#111827]' : 'text-[#10B981]'}`}>
                  {report.maternalDeaths}
                </span>
              </div>
            </div>
          </div>

          {/* ARS Risk Distribution in Report */}
          <div>
            <h4 className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-2">
              ARS Risk Assessment Profile
            </h4>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-100">
                <span className="text-xs text-[#10B981] font-medium block">Low Risk</span>
                <span className="text-lg font-bold text-[#10B981]">{report.riskSplit.low}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-100">
                <span className="text-xs text-[#F59E0B] font-medium block">Medium Risk</span>
                <span className="text-lg font-bold text-[#F59E0B]">{report.riskSplit.medium}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-red-50 border border-red-100">
                <span className="text-xs text-[#EF4444] font-medium block">High Risk</span>
                <span className="text-lg font-bold text-[#EF4444]">{report.riskSplit.high}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-[#E5E7EB] bg-[#F9FAFB] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white border border-[#E5E7EB] text-sm font-medium text-[#374151] rounded-lg hover:bg-gray-50 transition-colors"
          >
            Close Form
          </button>
        </div>
      </div>
    </div>
  );
};
