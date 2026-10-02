import React, { useState } from 'react';
import {
  CalendarHeart,
  TrendingDown,
  AlertCircle,
  Clock,
  Building2,
  ChevronRight,
  Filter,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  ReferenceLine,
  Cell,
} from 'recharts';
import { computeAggregates } from '../../data/mockData';
import { FilterState } from '../../types';

interface AncCoveragePageProps {
  filters: FilterState;
}

export const AncCoveragePage: React.FC<AncCoveragePageProps> = ({ filters }) => {
  const data = computeAggregates(filters);
  const [showAllRankings, setShowAllRankings] = useState(false);

  // Stepped Funnel Data for ANC Visit 1 through Visit 8
  const funnelData = [
    { visit: 'Visit 1', label: '1st Consultation', count: data.funnel.v1, pct: 100 },
    { visit: 'Visit 2', label: 'Gestational Wk 16', count: data.funnel.v2, pct: data.funnel.v1 > 0 ? Math.round((data.funnel.v2 / data.funnel.v1) * 100) : 0 },
    { visit: 'Visit 3', label: 'Gestational Wk 20', count: data.funnel.v3, pct: data.funnel.v1 > 0 ? Math.round((data.funnel.v3 / data.funnel.v1) * 100) : 0 },
    { visit: 'Visit 4', label: 'Gestational Wk 26', count: data.funnel.v4, pct: data.funnel.v1 > 0 ? Math.round((data.funnel.v4 / data.funnel.v1) * 100) : 0 },
    { visit: 'Visit 5', label: 'Gestational Wk 30', count: data.funnel.v5, pct: data.funnel.v1 > 0 ? Math.round((data.funnel.v5 / data.funnel.v1) * 100) : 0 },
    { visit: 'Visit 6', label: 'Gestational Wk 34', count: data.funnel.v6, pct: data.funnel.v1 > 0 ? Math.round((data.funnel.v6 / data.funnel.v1) * 100) : 0 },
    { visit: 'Visit 7', label: 'Gestational Wk 36', count: data.funnel.v7, pct: data.funnel.v1 > 0 ? Math.round((data.funnel.v7 / data.funnel.v1) * 100) : 0 },
    { visit: 'Visit 8', label: 'Gestational Wk 38+', count: data.funnel.v8, pct: data.funnel.v1 > 0 ? Math.round((data.funnel.v8 / data.funnel.v1) * 100) : 0 },
  ];

  // Facilities to display in ranking (worst performing first)
  const displayedRankings = showAllRankings
    ? data.facilityAncRankings
    : data.facilityAncRankings.slice(0, 8);

  return (
    <div className="space-y-6">
      {/* 1. Stepped Funnel Chart: Visit 1 through Visit 8 */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <div>
            <h3 className="text-base font-semibold text-[#111827]">
              Maternal Care Continuity Funnel (Visits 1 to 8)
            </h3>
            <p className="text-xs text-[#6B7280] mt-0.5">
              Cumulative number of mothers who remained in active care through each scheduled appointment.
            </p>
          </div>
          <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-[#F9FAFB] border border-[#E5E7EB] text-[#4B5563]">
            Target: 8 Visits (WHO Model)
          </span>
        </div>

        {/* Funnel Chart */}
        <div className="mt-6 h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={funnelData}
              margin={{ top: 10, right: 10, left: 10, bottom: 25 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
              <XAxis
                dataKey="visit"
                axisLine={{ stroke: '#E5E7EB' }}
                tickLine={false}
                tick={{ fill: '#4B5563', fontSize: 12, fontWeight: 500 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#6B7280', fontSize: 11 }}
                tickFormatter={(val) => val.toLocaleString()}
              />
              <Tooltip
                formatter={(val: number, name: string, item: any) => [
                  `${val.toLocaleString()} mothers (${item.payload.pct}% of initial cohort)`,
                  'Active Patients',
                ]}
                labelFormatter={(label, item: any) => `${label}: ${item?.[0]?.payload?.label || ''}`}
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '8px',
                  border: '1px solid #E5E7EB',
                  fontSize: '12px',
                }}
              />
              <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                {funnelData.map((entry, index) => {
                  // highlight the biggest drop step with warning color or indigo gradation
                  const isDropPoint =
                    data.biggestDrop.from === entry.visit || data.biggestDrop.to === entry.visit;
                  return (
                    <Cell
                      key={`cell-${index}`}
                      fill={index === 0 ? '#4F46E5' : isDropPoint ? '#6366F1' : '#818CF8'}
                    />
                  );
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Auto-generated caption naming the biggest drop-off point as required */}
        <div className="mt-4 p-3.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg flex items-start space-x-3">
          <TrendingDown className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" />
          <p className="text-xs text-[#374151] leading-relaxed">
            <strong className="text-[#111827] font-semibold">Critical Retention Drop-off:</strong>{' '}
            The largest single drop occurs between <strong>{data.biggestDrop.from}</strong> and{' '}
            <strong>{data.biggestDrop.to}</strong>, with an attrition of{' '}
            <strong>{data.biggestDrop.drop.toLocaleString()} mothers ({data.biggestDrop.pct.toFixed(1)}% reduction)</strong>.
            Health officers should deploy community reminders between weeks 20 and 26.
          </p>
        </div>
      </div>

      {/* 2. Line Chart: Early-booking rate over the months */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <div>
            <h3 className="text-base font-semibold text-[#111827]">
              Early Booking Rate Trend (1st Trimester Intake)
            </h3>
            <p className="text-xs text-[#6B7280] mt-0.5">
              Percentage of women attending their first antenatal appointment before 12 weeks of pregnancy.
            </p>
          </div>
          <div className="flex items-center space-x-2 text-xs">
            <span className="flex items-center space-x-1 text-[#4F46E5] font-medium">
              <span className="w-2.5 h-0.5 bg-[#4F46E5]" />
              <span>Observed Rate</span>
            </span>
            <span className="flex items-center space-x-1 text-[#10B981] font-medium">
              <span className="w-2.5 h-0.5 border-b border-dashed border-[#10B981]" />
              <span>National Target (60%)</span>
            </span>
          </div>
        </div>

        <div className="mt-6 h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data.monthlyTrends}
              margin={{ top: 10, right: 15, left: -10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
              <XAxis
                dataKey="monthLabel"
                axisLine={{ stroke: '#E5E7EB' }}
                tickLine={false}
                tick={{ fill: '#4B5563', fontSize: 11 }}
              />
              <YAxis
                domain={[20, 90]}
                unit="%"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#6B7280', fontSize: 11 }}
              />
              <Tooltip
                formatter={(val: number) => [`${val}% of registrations`, 'Early Booking Rate']}
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '8px',
                  border: '1px solid #E5E7EB',
                  fontSize: '12px',
                }}
              />
              <ReferenceLine
                y={60}
                stroke="#10B981"
                strokeDasharray="4 4"
                label={{
                  value: 'WHO 60% Benchmark',
                  fill: '#10B981',
                  fontSize: 10,
                  position: 'insideTopRight',
                }}
              />
              <Line
                type="monotone"
                dataKey="earlyBookingRate"
                stroke="#4F46E5"
                strokeWidth={2.5}
                dot={{ fill: '#4F46E5', r: 3.5 }}
                activeDot={{ r: 6, fill: '#4F46E5' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 text-xs text-[#6B7280] leading-relaxed">
          <strong>Why this matters:</strong> First-trimester booking enables early screening for hypertensive disorders, severe anemia, and ultrasound gestational age verification.
        </div>
      </div>

      {/* 3. Ranked List: ANC Completion Rate by Facility (Worst Performing First) */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-semibold text-[#111827]">
              Facility Performance Ranking: 8-Visit Completion Rate
            </h3>
            <p className="text-xs text-[#6B7280] mt-0.5">
              Ranked from lowest to highest completion rate to guide officer resource allocation and mentoring visits.
            </p>
          </div>
          <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-amber-50 text-[#F59E0B] border border-amber-200 shrink-0 self-start">
            Lowest Completion First
          </span>
        </div>

        <div className="mt-5 space-y-3">
          {displayedRankings.map((fac, idx) => {
            const isLow = fac.completionRate < 55;
            const isMedium = fac.completionRate >= 55 && fac.completionRate < 70;
            const barColor = isLow ? '#EF4444' : isMedium ? '#F59E0B' : '#10B981';

            return (
              <div
                key={fac.id}
                className="p-3.5 rounded-lg border border-[#E5E7EB] bg-white hover:border-[#D1D5DB] transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center space-x-3">
                    <span className="w-6 text-xs font-bold text-[#9CA3AF]">
                      #{idx + 1}
                    </span>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-semibold text-[#111827]">
                          {fac.name}
                        </span>
                        <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#F3F4F6] text-[#4B5563] font-medium">
                          {fac.state}
                        </span>
                        {isLow && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded-sm bg-red-50 text-[#EF4444] font-semibold">
                            Needs Support
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-[#6B7280] mt-0.5 block">
                        {fac.completedV8.toLocaleString()} completed of {fac.registered.toLocaleString()} enrolled • {fac.skilledAttendants} midwives
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 sm:self-center">
                    <div className="w-32 sm:w-44 bg-[#F3F4F6] h-2.5 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-300"
                        style={{
                          width: `${fac.completionRate}%`,
                          backgroundColor: barColor,
                        }}
                      />
                    </div>
                    <span className="text-sm font-bold text-[#111827] w-12 text-right">
                      {fac.completionRate}%
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {data.facilityAncRankings.length > 8 && (
          <div className="mt-4 pt-3 border-t border-[#E5E7EB] text-center">
            <button
              onClick={() => setShowAllRankings(!showAllRankings)}
              className="text-xs font-semibold text-[#4F46E5] hover:text-[#4338CA] transition-colors"
            >
              {showAllRankings
                ? 'Show Top 8 Facilities Only'
                : `View All ${data.facilityAncRankings.length} Ranked Facilities`}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
