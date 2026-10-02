import React from 'react';
import { X, FileText, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { CaseReview } from '../types';

interface CaseDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  caseReview: CaseReview | null;
}

export const CaseDetailModal: React.FC<CaseDetailModalProps> = ({
  isOpen,
  onClose,
  caseReview,
}) => {
  if (!isOpen || !caseReview) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        id="case-audit-modal"
        className="bg-white rounded-xl border border-slate-200 shadow-lg max-w-2xl w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-slate-200 border border-slate-300 flex items-center justify-center text-slate-700">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-base font-semibold text-slate-900">
                  Case Audit File: {caseReview.id}
                </h3>
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-200 text-slate-800 font-medium">
                  {caseReview.status}
                </span>
              </div>
              <p className="text-xs text-slate-600">
                {caseReview.facilityName} • {caseReview.state} State • Logged on {caseReview.date}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg hover:bg-slate-200/60 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto text-slate-800">
          {/* Key Facts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 p-3.5 rounded-lg border border-slate-200 text-xs">
            <div>
              <span className="text-slate-600 block">Primary Systemic Factor</span>
              <strong className="text-slate-900 text-sm font-medium">{caseReview.primaryFactor}</strong>
            </div>
            <div>
              <span className="text-slate-600 block">Gestational Age at Admission</span>
              <strong className="text-slate-900 text-sm font-medium">{caseReview.gestationalAge}</strong>
            </div>
          </div>

          {/* Clinical Summary */}
          <div>
            <h4 className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
              Clinical Case Presentation Summary
            </h4>
            <div className="p-3.5 bg-white border border-slate-200 rounded-lg text-xs leading-relaxed text-slate-700">
              {caseReview.summary}
            </div>
          </div>

          {/* Recommendations Issued */}
          <div>
            <h4 className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
              Maternal Mortality Surveillance & Response (MPDSR) Action Items
            </h4>
            <div className="space-y-2">
              {caseReview.recommendations.map((rec, idx) => (
                <div
                  key={idx}
                  className="flex items-start space-x-2.5 p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700"
                >
                  <CheckCircle className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
                  <span>{rec}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Review Committee Note */}
          <div className="p-3 rounded-lg bg-slate-100/70 border border-slate-200 text-[11px] text-slate-600">
            <div className="flex items-center space-x-1.5 font-medium text-slate-800 mb-0.5">
              <AlertCircle className="w-3.5 h-3.5 text-slate-600" />
              <span>Systemic Quality Assurance Protocol</span>
            </div>
            Findings from this audit are utilized solely to update referral routing agreements, address equipment gaps, and train frontline primary healthcare staff.
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white border border-slate-300 text-xs font-medium text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
          >
            Close Audit File
          </button>
        </div>
      </div>
    </div>
  );
};
