import React, { useState } from 'react';
import {
  FileSpreadsheet,
  CheckCircle2,
  Clock,
  Building2,
  FileText,
  Eye,
  Shield,
  Layers,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import { computeAggregates } from '../../data/mockData';
import { CaseReview, FilterState } from '../../types';
import { CaseDetailModal } from '../CaseDetailModal';

interface OutcomeReviewPageProps {
  filters: FilterState;
}

export const OutcomeReviewPage: React.FC<OutcomeReviewPageProps> = ({ filters }) => {
  const data = computeAggregates(filters);
  const [selectedCase, setSelectedCase] = useState<CaseReview | null>(null);

  return (
    <div className="space-y-6 text-slate-800">
      {/* Top Audit Badge */}
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-medium text-slate-700">
          <Shield className="w-3.5 h-3.5 text-slate-600" />
          <span>Confidential Maternal Death Surveillance & Response (MPDSR) Audit</span>
        </div>
      </div>

      {/* Row 1: Line Chart of Maternal Deaths & Horizontal Bar Chart of Contributing Factors */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Line Chart: Maternal Deaths Recorded per Month (Muted Slate / Gray) */}
        <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-base font-semibold text-slate-900">
                  Monthly Maternal Mortality Incidence
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Absolute events documented in facility surveillance registers.
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-500 block">Filtered Total</span>
                <span className="text-lg font-bold text-slate-800">
                  {data.totalMaternalDeaths} {data.totalMaternalDeaths === 1 ? 'event' : 'events'}
                </span>
              </div>
            </div>

            <div className="mt-6 h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={data.monthlyTrends}
                  margin={{ top: 10, right: 15, left: -15, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis
                    dataKey="monthLabel"
                    axisLine={{ stroke: '#E2E8F0' }}
                    tickLine={false}
                    tick={{ fill: '#64748B', fontSize: 11 }}
                  />
                  <YAxis
                    allowDecimals={false}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#64748B', fontSize: 11 }}
                  />
                  <Tooltip
                    formatter={(val: number) => [`${val} maternal deaths recorded`, 'Documented Events']}
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      fontSize: '12px',
                    }}
                  />
                  {/* Muted Slate Gray Line - deliberate neutrality as mandated */}
                  <Line
                    type="monotone"
                    dataKey="maternalDeaths"
                    stroke="#475569"
                    strokeWidth={2}
                    dot={{ fill: '#475569', r: 3.5 }}
                    activeDot={{ r: 5, fill: '#334155' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-4 p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600">
            Systemic objective: Early detection of risk through validated algorithms to intercept critical complications before institutional admission.
          </div>
        </div>

        {/* Horizontal Bar Chart: Contributing Factors (Muted Slate / Gray) */}
        <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-base font-semibold text-slate-900">
                  Primary Contributing Factors
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Underlying structural and clinical delays identified during maternal death review committee hearings.
                </p>
              </div>
            </div>

            <div className="mt-6 h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={data.deathContributingFactors}
                  margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F1F5F9" />
                  <XAxis
                    type="number"
                    allowDecimals={false}
                    axisLine={{ stroke: '#E2E8F0' }}
                    tickLine={false}
                    tick={{ fill: '#64748B', fontSize: 11 }}
                  />
                  <YAxis
                    type="category"
                    dataKey="factor"
                    width={180}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#475569', fontSize: 11, fontWeight: 500 }}
                  />
                  <Tooltip
                    formatter={(val: number) => [`${val} cases linked`, 'Frequency']}
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      fontSize: '12px',
                    }}
                  />
                  {/* Slate monochromatic bar */}
                  <Bar dataKey="count" fill="#64748B" radius={[0, 4, 4, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-4 p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600">
            Structural interventions prioritize establishing 24/7 blood bank hubs and rapid transport links for late-presenting cases.
          </div>
        </div>
      </div>

      {/* Row 2: Facility Readiness List */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-semibold text-slate-900">
              Facility Clinical Readiness Registry
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Readiness inventory: Skilled birth attendants deployed on duty rosters and certified functioning cold-chain blood banks.
            </p>
          </div>
          <span className="text-xs text-slate-600 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-md font-medium">
            {data.facilities.length} Facilities in View
          </span>
        </div>

        <div className="mt-5 border border-slate-200 rounded-lg overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold">
              <tr>
                <th className="px-4 py-3">Facility Name</th>
                <th className="px-4 py-3">State & LGA</th>
                <th className="px-4 py-3">Trained Skilled Birth Attendants</th>
                <th className="px-4 py-3">Functioning Blood Bank</th>
                <th className="px-4 py-3">Onboarded Since</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-800">
              {data.facilities.map((fac) => (
                <tr key={fac.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-4 py-3 font-medium text-slate-900">{fac.name}</td>
                  <td className="px-4 py-3 text-slate-600">
                    {fac.state} State ({fac.lga})
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-semibold text-slate-900">{fac.skilledAttendants}</span>{' '}
                    <span className="text-slate-500 text-[11px]">certified attendants</span>
                  </td>
                  <td className="px-4 py-3">
                    {fac.hasBloodBank ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 text-slate-800 border border-slate-300">
                        Operational Bank
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-slate-50 text-slate-500 border border-slate-200">
                        External Depot Dependent
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-slate-500">{fac.onboardedDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Row 3: Case-Review Status Tracker */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-semibold text-slate-900">
              Case-Review Surveillance Status Tracker
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Audited case dossiers reviewed by the Maternal & Perinatal Death Surveillance and Response (MPDSR) committee.
            </p>
          </div>
          <span className="text-xs text-slate-600 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-md font-medium">
            {data.caseReviews.length} Active Dossiers
          </span>
        </div>

        <div className="mt-5 border border-slate-200 rounded-lg overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold">
              <tr>
                <th className="px-4 py-3">Case ID</th>
                <th className="px-4 py-3">Facility & State</th>
                <th className="px-4 py-3">Review Status</th>
                <th className="px-4 py-3">Identified Systemic Factor</th>
                <th className="px-4 py-3">Date Logged</th>
                <th className="px-4 py-3 text-right">Dossier</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-800">
              {data.caseReviews.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-4 py-3 font-semibold text-slate-900">{c.id}</td>
                  <td className="px-4 py-3">
                    <span className="font-medium text-slate-900 block">{c.facilityName}</span>
                    <span className="text-[11px] text-slate-500">{c.state} State</span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border ${
                        c.status === 'Reviewed — Recommendations Issued'
                          ? 'bg-slate-100 text-slate-900 border-slate-300 font-semibold'
                          : c.status === 'Under Review'
                          ? 'bg-slate-50 text-slate-700 border-slate-200'
                          : 'bg-slate-50 text-slate-500 border-slate-200'
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-700 max-w-xs truncate">
                    {c.primaryFactor}
                  </td>
                  <td className="px-4 py-3 text-slate-500">{c.date}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => setSelectedCase(c)}
                      className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 hover:text-slate-900 font-medium transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Audit Notes</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Case Audit Detail Modal */}
      <CaseDetailModal
        isOpen={!!selectedCase}
        onClose={() => setSelectedCase(null)}
        caseReview={selectedCase}
      />
    </div>
  );
};
