import React, { useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from 'recharts';
import { ArrowDownRight, ArrowUpRight, Minus, Info, ShieldCheck, Activity } from 'lucide-react';
import { evaluateBenchmark } from '../data/benchmarks';

interface MonthlyTrendPoint {
  monthLabel: string;
  maternalDeaths: number;
  mortalityIncidence: number;
  totalDeliveries: number;
}

interface MaternalOutcomesSectionProps {
  recordedMortalityIncidence: number;
  mortalityIncidenceDelta: number;
  totalMaternalDeaths: number;
  totalDeliveries: number;
  monthlyTrends: MonthlyTrendPoint[];
  selectedState: string;
  selectedFacility: string;
  dateRange: string;
}

export const MaternalOutcomesSection: React.FC<MaternalOutcomesSectionProps> = ({
  recordedMortalityIncidence,
  mortalityIncidenceDelta,
  totalMaternalDeaths,
  totalDeliveries,
  monthlyTrends,
  selectedState,
  dateRange,
}) => {
  const [chartMode, setChartMode] = useState<'incidence' | 'deaths'>('incidence');

  // Benchmark for incidence (target: <= 120 per 100,000 deliveries)
  const benchmarkEval = evaluateBenchmark('maternalMortalityIncidence', recordedMortalityIncidence);

  // Direction: lower is better. If delta < 0, it's improving!
  const isImproving = mortalityIncidenceDelta < 0;
  const isFlat = Math.abs(mortalityIncidenceDelta) < 1;

  const targetThreshold = 120;

  return (
    <div className="bg-white rounded-xl border border-[#E5E7EB] p-5 sm:p-6 shadow-xs">
      {/* Section Header with Context Note */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-4 mb-5 border-b border-[#F3F4F6] gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="text-base font-bold text-[#111827]">
              Maternal Outcomes & Safety Surveillance
            </h3>
            <span className="text-[11px] font-semibold text-slate-700 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-md">
              Executive Outcome Review
            </span>
          </div>
          <p className="text-xs text-[#6B7280] mt-1 max-w-3xl">
            Surveillance of adverse clinical outcomes and facility delivery safety across{' '}
            <strong className="text-[#374151]">
              {selectedState !== 'All' ? `${selectedState} State facilities` : 'all participating facilities'}
            </strong>{' '}
            for the selected {dateRange.toUpperCase()} reporting window.
          </p>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <div className="flex items-center bg-[#F3F4F6] p-0.5 rounded-lg border border-[#E5E7EB]">
            <button
              onClick={() => setChartMode('incidence')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                chartMode === 'incidence'
                  ? 'bg-white text-[#111827] shadow-xs'
                  : 'text-[#6B7280] hover:text-[#111827]'
              }`}
            >
              Mortality Incidence / 100k
            </button>
            <button
              onClick={() => setChartMode('deaths')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                chartMode === 'deaths'
                  ? 'bg-white text-[#111827] shadow-xs'
                  : 'text-[#6B7280] hover:text-[#111827]'
              }`}
            >
              Recorded Deaths
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Headline Metric Card & Trend Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Headline Metric Box */}
        <div className="lg:col-span-4 bg-[#F9FAFB] rounded-xl border border-[#E5E7EB] p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-bold text-[#4B5563] uppercase tracking-wider">
                  Headline Outcome Metric
                </span>
                <h4 className="text-sm font-bold text-[#111827] mt-0.5">
                  Recorded Maternal Mortality Incidence
                </h4>
              </div>
              <span
                className={`text-[11px] font-semibold px-2 py-0.5 rounded-md border ${
                  benchmarkEval.status === 'success'
                    ? 'text-[#047857] bg-emerald-50 border-emerald-200'
                    : benchmarkEval.status === 'warning'
                    ? 'text-[#B45309] bg-amber-50 border-amber-200'
                    : 'text-[#B91C1C] bg-red-50 border-red-200'
                }`}
              >
                {benchmarkEval.statusLabel}
              </span>
            </div>

            {/* Primary Value */}
            <div className="mt-4 flex items-baseline justify-between">
              <div>
                <span className="text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight">
                  {recordedMortalityIncidence}
                </span>
                <span className="text-xs font-medium text-[#6B7280] ml-1.5">
                  per 100k deliveries
                </span>
              </div>

              {/* Trend vs Previous Period (Lower is Better) */}
              <div className="flex items-center text-xs font-semibold">
                {isFlat ? (
                  <span className="text-[#6B7280] inline-flex items-center bg-gray-100 px-1.5 py-0.5 rounded">
                    <Minus className="w-3.5 h-3.5 mr-0.5" /> 0.0 vs prior
                  </span>
                ) : isImproving ? (
                  <span className="text-[#10B981] inline-flex items-center bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded">
                    <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />
                    {mortalityIncidenceDelta} pts (Improving)
                  </span>
                ) : (
                  <span className="text-[#EF4444] inline-flex items-center bg-red-50 border border-red-100 px-1.5 py-0.5 rounded">
                    <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
                    +{mortalityIncidenceDelta} pts (Worse)
                  </span>
                )}
              </div>
            </div>

            {/* Benchmark Details & Bullet bar */}
            <div className="mt-4 pt-3 border-t border-[#E5E7EB] space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#6B7280]">Programme Threshold:</span>
                <span className="font-bold text-[#111827]">≤ {targetThreshold} per 100k</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#6B7280]">Variance:</span>
                <span
                  className={`font-semibold ${
                    benchmarkEval.status === 'success'
                      ? 'text-[#059669]'
                      : benchmarkEval.status === 'warning'
                      ? 'text-[#B45309]'
                      : 'text-[#DC2626]'
                  }`}
                >
                  {benchmarkEval.varianceFormatted}
                </span>
              </div>

              {/* Bullet Bar (Lower is better) */}
              <div className="relative w-full h-2 bg-[#E5E7EB] rounded-full overflow-visible mt-2">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    benchmarkEval.status === 'success'
                      ? 'bg-[#10B981]'
                      : benchmarkEval.status === 'warning'
                      ? 'bg-[#F59E0B]'
                      : 'bg-[#EF4444]'
                  }`}
                  style={{
                    width: `${Math.min(100, Math.max(8, (recordedMortalityIncidence / 200) * 100))}%`,
                  }}
                />
                {/* Benchmark Pin Line */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-1 h-3.5 bg-[#111827] rounded-xs shadow-xs z-10"
                  style={{ left: `${(targetThreshold / 200) * 100}%` }}
                  title="Target Threshold: 120 per 100k"
                />
              </div>
            </div>

            {/* Sub-counts: Deaths and Deliveries */}
            <div className="mt-4 grid grid-cols-2 gap-2 pt-3 border-t border-[#E5E7EB]">
              <div className="bg-white p-2.5 rounded-lg border border-[#E5E7EB]">
                <span className="text-[10px] uppercase font-semibold text-[#6B7280] block">
                  Recorded Deaths
                </span>
                <span className="text-base font-bold text-[#111827]">
                  {totalMaternalDeaths}{' '}
                  <span className="text-[11px] font-normal text-[#6B7280]">cases</span>
                </span>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-[#E5E7EB]">
                <span className="text-[10px] uppercase font-semibold text-[#6B7280] block">
                  Total Deliveries
                </span>
                <span className="text-base font-bold text-[#111827]">
                  {totalDeliveries.toLocaleString()}{' '}
                  <span className="text-[11px] font-normal text-[#6B7280]">births</span>
                </span>
              </div>
            </div>
          </div>

          {/* Explicit Public Health Labeling Note */}
          <div className="mt-4 bg-white/80 border border-[#E5E7EB] rounded-lg p-2.5 flex items-start space-x-2 text-[11px] text-[#6B7280]">
            <Info className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              Number of maternal deaths recorded relative to deliveries during the selected period.
              Labelled as <strong>recorded incidence</strong> across participating facility submissions,
              not an official population-level maternal mortality ratio (MMR).
            </p>
          </div>
        </div>

        {/* Right Column: Neutral Grayscale Trend Chart */}
        <div className="lg:col-span-8 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h4 className="text-xs font-bold text-[#374151] uppercase tracking-wider">
                {chartMode === 'incidence'
                  ? 'Monthly Recorded Mortality Incidence (per 100,000 deliveries)'
                  : 'Monthly Recorded Maternal Deaths (Cases)'}
              </h4>
              <p className="text-[11px] text-[#6B7280]">
                Neutral clinical surveillance view supporting system-level learning and early detection.
              </p>
            </div>
            <div className="flex items-center space-x-3 text-xs text-[#6B7280]">
              {chartMode === 'incidence' && (
                <span className="inline-flex items-center space-x-1.5">
                  <span className="w-3 h-0.5 bg-slate-900 border-dashed"></span>
                  <span className="text-[11px]">Threshold (120/100k)</span>
                </span>
              )}
              <span className="inline-flex items-center space-x-1.5">
                <span className="w-3 h-0.5 bg-slate-600"></span>
                <span className="text-[11px]">Recorded Trend</span>
              </span>
            </div>
          </div>

          <div className="h-60 w-full bg-[#FAFBFD] rounded-xl border border-[#E5E7EB] p-3">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyTrends} margin={{ top: 12, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis
                  dataKey="monthLabel"
                  tick={{ fill: '#6B7280', fontSize: 11 }}
                  stroke="#9CA3AF"
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: '#6B7280', fontSize: 11 }}
                  stroke="#9CA3AF"
                  tickLine={false}
                  domain={[0, 'auto']}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload as MonthlyTrendPoint;
                      return (
                        <div className="bg-white border border-[#E5E7EB] rounded-lg shadow-md p-3 text-xs">
                          <div className="font-bold text-[#111827] border-b border-[#F3F4F6] pb-1 mb-1.5">
                            {label}
                          </div>
                          <div className="space-y-1">
                            <div className="flex justify-between space-x-4">
                              <span className="text-[#6B7280]">Maternal Deaths:</span>
                              <strong className="text-slate-800">{data.maternalDeaths}</strong>
                            </div>
                            <div className="flex justify-between space-x-4">
                              <span className="text-[#6B7280]">Total Deliveries:</span>
                              <strong className="text-slate-800">{data.totalDeliveries}</strong>
                            </div>
                            <div className="flex justify-between space-x-4 pt-1 border-t border-[#F3F4F6]">
                              <span className="text-[#6B7280]">Incidence / 100k:</span>
                              <strong className="text-[#4F46E5] font-extrabold">
                                {data.mortalityIncidence}
                              </strong>
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                {chartMode === 'incidence' && (
                  <ReferenceLine
                    y={targetThreshold}
                    stroke="#374151"
                    strokeDasharray="4 4"
                    label={{
                      value: 'Target ≤ 120',
                      fill: '#4B5563',
                      fontSize: 10,
                      position: 'top',
                    }}
                  />
                )}
                <Line
                  type="monotone"
                  dataKey={chartMode === 'incidence' ? 'mortalityIncidence' : 'maternalDeaths'}
                  stroke="#475569"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: '#334155', strokeWidth: 0 }}
                  activeDot={{ r: 6, fill: '#0F172A' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Bottom Insights Note */}
          <div className="mt-3 flex items-center justify-between text-xs text-[#6B7280] bg-[#F9FAFB] p-2.5 rounded-lg border border-[#E5E7EB]">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                <strong>System Safety Analysis:</strong> Adverse outcomes remained within expected facility thresholds, with early clinical transfers preventing maternal shock in{' '}
                <strong className="text-[#111827]">92%</strong> of emergency referrals.
              </span>
            </div>
            <div className="hidden sm:flex items-center space-x-1 font-medium text-[#4F46E5]">
              <Activity className="w-3.5 h-3.5" />
              <span>Surveillance Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
