import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ReferenceLine,
  Bar,
  ComposedChart,
} from 'recharts';
import { ShieldCheck, Info, ArrowRight } from 'lucide-react';
import { computeAggregates } from '../../data/mockData';
import { FilterState } from '../../types';
import { HeliumKpiCard } from '../HeliumKpiCard';
import { KpiInfoTooltip } from '../KpiInfoTooltip';

interface OverviewPageProps {
  filters: FilterState;
  onNavigateToPage: (page: string) => void;
}

export const OverviewPage: React.FC<OverviewPageProps> = ({ filters, onNavigateToPage }) => {
  const data = computeAggregates(filters);

  // Scaled target calculations based on selected filter scope
  const targetRegistered = Math.round(data.facilities.length * (filters.dateRange === '3m' ? 3 : filters.dateRange === '6m' ? 6 : 12) * 2100);
  const targetVisits = Math.round(data.facilities.length * (filters.dateRange === '3m' ? 3 : filters.dateRange === '6m' ? 6 : 12) * 9800);

  // Risk Donut Data (Green for Low, Amber for Medium, Red for High)
  const riskDonutData = [
    {
      name: 'Low Risk',
      value: data.totalLowRisk,
      color: '#10B981', // Success green
      pct: data.totalAssessed > 0 ? Math.round((data.totalLowRisk / data.totalAssessed) * 100) : 0,
      protocol: 'Standard ANC pathway (WHO 8 visits)',
    },
    {
      name: 'Medium Risk',
      value: data.totalMedRisk,
      color: '#F59E0B', // Warning amber
      pct: data.totalAssessed > 0 ? Math.round((data.totalMedRisk / data.totalAssessed) * 100) : 0,
      protocol: 'Bi-weekly vitals & midwife monitoring',
    },
    {
      name: 'High Risk',
      value: data.totalHighRisk,
      color: '#EF4444', // Critical red
      pct: data.totalAssessed > 0 ? Math.round((data.totalHighRisk / data.totalAssessed) * 100) : 0,
      protocol: 'Immediate specialist care navigation',
    },
  ];

  // Sparkline arrays from monthly trends
  const sparkRegistered = data.monthlyTrends.map((m) => m.womenRegistered);
  const sparkVisits = data.monthlyTrends.map((m) => Math.round(m.womenRegistered * 4.8));
  const sparkAncCompletion = data.monthlyTrends.map((m) => m.ancCompletionRate);
  const sparkEarlyBooking = data.monthlyTrends.map((m) => m.earlyBookingRate);
  const sparkDeliveryRate = data.monthlyTrends.map((m) => m.facilityDeliveryRate);
  const sparkMortality = data.monthlyTrends.map((m) => m.mortalityIncidence);

  // Calculate reporting rate for programme summary
  const reportingRate = data.latestMonthTotal > 0
    ? Math.round((data.latestMonthOnTimeCount / data.latestMonthTotal) * 100)
    : 0;

  return (
    <div className="space-y-6">
      {/* =====================================================
          1. OVERVIEW KPI ROW (6 CARDS WITH SPARKLINES)
         ===================================================== */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4">
        {/* KPI 1: Pregnant women registered */}
        <HeliumKpiCard
          id="kpi-registered"
          title="Pregnant women registered"
          value={data.womenRegistered.toLocaleString()}
          trendDelta={data.womenRegisteredDelta}
          trendUnit="%"
          trendLabel="vs prev period"
          benchmarkText={`Target: ${targetRegistered.toLocaleString()}`}
          sparklineData={sparkRegistered}
          sparklineColor="#10B981"
          direction="higher_is_better"
          infoTooltip="This shows the number of pregnant women enrolled in active care tracking. The target reflects expected enrollment to achieve full population coverage across participating facilities."
          onClick={() => onNavigateToPage('programme-reach')}
        />

        {/* KPI 2: ANC visits recorded */}
        <HeliumKpiCard
          id="kpi-anc-visits"
          title="ANC visits recorded"
          value={data.ancVisitsTotal.toLocaleString()}
          trendDelta={data.ancVisitsTotalDelta}
          trendUnit="%"
          trendLabel="vs prev period"
          benchmarkText={`Target: ${targetVisits.toLocaleString()}`}
          sparklineData={sparkVisits}
          sparklineColor="#10B981"
          direction="higher_is_better"
          infoTooltip="This shows the total count of antenatal care consultations conducted across facilities. The target is the expected consultation volume when mothers attend all recommended visits."
          onClick={() => onNavigateToPage('anc-coverage')}
        />

        {/* KPI 3: Completed all 8 ANC visits */}
        <HeliumKpiCard
          id="kpi-anc-completion"
          title="Completed all 8 ANC visits"
          value={`${data.avgAncCompletion}%`}
          trendDelta={data.avgAncCompletionDelta}
          trendUnit=" pts"
          trendLabel="vs prev period"
          benchmarkText={`Target: 70% (${data.avgAncCompletion >= 70 ? '+' : ''}${data.avgAncCompletion - 70} pts)`}
          sparklineData={sparkAncCompletion}
          sparklineColor={data.avgAncCompletion >= 70 ? '#10B981' : '#F59E0B'}
          direction="higher_is_better"
          infoTooltip="This shows the percentage of women who completed all 8 recommended ANC visits. The 70% target is the programme level we aim to reach."
          onClick={() => onNavigateToPage('anc-coverage')}
        />

        {/* KPI 4: 1st trimester booking */}
        <HeliumKpiCard
          id="kpi-early-booking"
          title="1st trimester booking"
          value={`${data.avgEarlyBooking}%`}
          trendDelta={data.avgEarlyBookingDelta}
          trendUnit=" pts"
          trendLabel="vs prev period"
          benchmarkText={`Target: 60% (${data.avgEarlyBooking >= 60 ? '+' : ''}${data.avgEarlyBooking - 60} pts)`}
          sparklineData={sparkEarlyBooking}
          sparklineColor="#10B981"
          direction="higher_is_better"
          infoTooltip="This shows the percentage of women who attended their first ANC visit in the first trimester (before 14 weeks). The 60% target ensures early detection and care for maternal health risks."
          onClick={() => onNavigateToPage('anc-coverage')}
        />

        {/* KPI 5: Facility delivery rate */}
        <HeliumKpiCard
          id="kpi-facility-delivery"
          title="Facility delivery rate"
          value={`${data.facilityDeliveryRate}%`}
          trendDelta={data.facilityDeliveryRateDelta}
          trendUnit=" pts"
          trendLabel="vs prev period"
          benchmarkText={`Target: 80% (${data.facilityDeliveryRate >= 80 ? '+' : ''}${data.facilityDeliveryRate - 80} pts)`}
          sparklineData={sparkDeliveryRate}
          sparklineColor="#10B981"
          direction="higher_is_better"
          infoTooltip="This shows the percentage of deliveries that took place in a formal health facility. The 80% target represents the programme’s desired level."
          onClick={() => onNavigateToPage('delivery-referral')}
        />

        {/* KPI 6: Monthly Maternal Mortality Incidence (Primary Overview KPI) */}
        <HeliumKpiCard
          id="kpi-mortality-incidence"
          title="Monthly Maternal Mortality Incidence"
          value={data.recordedMortalityIncidence}
          unit="per 100k"
          trendDelta={data.mortalityIncidenceDelta}
          trendUnit=" pts"
          trendLabel="vs prev period"
          benchmarkText={`Target: ≤ 100 (${data.recordedMortalityIncidence <= 100 ? 'Within target' : '+' + (data.recordedMortalityIncidence - 100) + ' over'})`}
          sparklineData={sparkMortality}
          sparklineColor={data.mortalityIncidenceDelta <= 0 ? '#10B981' : '#64748B'}
          direction="lower_is_better"
          infoTooltip="This shows the number of recorded maternal deaths relative to 100,000 deliveries. The target is the level we aim to stay at or below."
          onClick={() => onNavigateToPage('outcome-review')}
        />
      </div>

      {/* =====================================================
          2. OVERVIEW CHARTS ROW (3 BALANCED SECTIONS)
         ===================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
        {/* Chart 1: Maternal Risk Assessment (Donut + Breakdown + High-risk follow-up) */}
        <div className="lg:col-span-4 bg-white rounded-[10px] border border-[#E5E7EB] p-5 sm:p-6 flex flex-col justify-between shadow-2xs">
          <div>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-bold text-[#111827]">
                  Maternal risk assessment
                </h3>
                <p className="text-xs text-[#6B7280] mt-0.5">
                  Stratification from validated ARS clinical tool at intake.
                </p>
              </div>
              <span className="text-[11px] font-semibold text-[#4B5563] bg-[#F4F6FB] border border-[#E5E7EB] px-2 py-0.5 rounded-md shrink-0">
                {data.totalAssessed.toLocaleString()} Assessed
              </span>
            </div>

            {/* Donut Chart */}
            <div className="mt-4 flex flex-col items-center justify-center">
              <div className="w-44 h-44 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={riskDonutData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={75}
                      paddingAngle={3}
                      dataKey="value"
                      stroke="none"
                    >
                      {riskDonutData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(val: number) => [`${val.toLocaleString()} women`, 'Count']}
                      contentStyle={{
                        backgroundColor: '#FFFFFF',
                        borderRadius: '8px',
                        border: '1px solid #E5E7EB',
                        fontSize: '12px',
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-xl font-bold text-[#111827]">
                    {data.totalAssessed > 0 ? `${riskDonutData[2].pct}%` : '0%'}
                  </span>
                  <span className="text-[10px] text-[#6B7280] font-medium uppercase tracking-wider">
                    High Risk
                  </span>
                </div>
              </div>
            </div>

            {/* Counts & Percentages Breakdown */}
            <div className="mt-3 space-y-2">
              {riskDonutData.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between p-2 rounded-lg bg-[#F4F6FB]/80 border border-[#E5E7EB]/70 text-xs"
                >
                  <div className="flex items-center space-x-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="font-medium text-[#111827]">{item.name}</span>
                  </div>
                  <div className="text-right flex items-center space-x-2">
                    <span className="font-semibold text-[#111827]">
                      {item.value.toLocaleString()}
                    </span>
                    <span className="text-[#6B7280] text-[11px]">({item.pct}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Simple Metric: High-Risk Follow-Up */}
          <div className="mt-4 pt-3.5 border-t border-[#E5E7EB] flex items-center justify-between">
            <div className="flex items-center space-x-1.5 text-xs text-[#374151]">
              <ShieldCheck className="w-4 h-4 text-[#10B981] shrink-0" />
              <span className="font-medium">High-risk follow-up:</span>
              <KpiInfoTooltip
                title="High-risk follow-up"
                content="This shows the percentage of high-risk pregnant women who received dedicated clinical follow-up. The 90% target ensures vulnerable mothers are safely guided through specialist care."
              />
            </div>
            <div className="text-right">
              <span className="text-sm font-bold text-[#111827]">
                {data.highRiskFollowUpRate}%
              </span>
              <span className="text-[11px] text-[#6B7280] ml-1.5">Target: 90%</span>
            </div>
          </div>
        </div>

        {/* Chart 2: ANC completion over time (Area/Line with target line) */}
        <div className="lg:col-span-4 bg-white rounded-[10px] border border-[#E5E7EB] p-5 sm:p-6 flex flex-col justify-between shadow-2xs">
          <div>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-bold text-[#111827]">
                  ANC completion over time
                </h3>
                <p className="text-xs text-[#6B7280] mt-0.5">
                  Monthly rate of women attending all 8 scheduled visits.
                </p>
              </div>
              <span className="text-[11px] font-semibold text-[#4F46E5] bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-md shrink-0">
                Target: 70%
              </span>
            </div>

            {/* Area Chart with Soft Gradient Fill */}
            <div className="mt-5 h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={data.monthlyTrends}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="ancCompletionGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.28} />
                      <stop offset="95%" stopColor="#4F46E5" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                  <XAxis
                    dataKey="monthLabel"
                    axisLine={{ stroke: '#E5E7EB' }}
                    tickLine={false}
                    tick={{ fill: '#6B7280', fontSize: 11 }}
                  />
                  <YAxis
                    domain={[0, 100]}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6B7280', fontSize: 11 }}
                    tickFormatter={(val) => `${val}%`}
                  />
                  <Tooltip
                    formatter={(val: number) => [`${val}%`, 'ANC Completion Rate']}
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '8px',
                      border: '1px solid #E5E7EB',
                      fontSize: '12px',
                    }}
                  />
                  {/* Dashed Target Reference Line at 70% */}
                  <ReferenceLine
                    y={70}
                    stroke="#F59E0B"
                    strokeDasharray="4 4"
                    strokeWidth={1.5}
                    label={{
                      value: 'Target 70%',
                      position: 'insideTopRight',
                      fill: '#D97706',
                      fontSize: 10,
                      fontWeight: 600,
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="ancCompletionRate"
                    stroke="#4F46E5"
                    strokeWidth={2.2}
                    fillOpacity={1}
                    fill="url(#ancCompletionGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-4 pt-3.5 border-t border-[#E5E7EB] flex items-center justify-between text-xs text-[#6B7280]">
            <span>Active WHO 8-visit protocol</span>
            <button
              onClick={() => onNavigateToPage('anc-coverage')}
              className="text-[#4F46E5] hover:text-indigo-800 font-semibold inline-flex items-center space-x-1"
            >
              <span>Explore ANC Funnel</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Chart 3: Maternal outcomes over time (Line/Composed chart with deaths & incidence) */}
        <div className="lg:col-span-4 bg-white rounded-[10px] border border-[#E5E7EB] p-5 sm:p-6 flex flex-col justify-between shadow-2xs">
          <div>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-bold text-[#111827]">
                  Maternal outcomes over time
                </h3>
                <p className="text-xs text-[#6B7280] mt-0.5">
                  Shows how recorded maternal outcomes are changing over time.
                </p>
              </div>
              <span className="text-[11px] font-semibold text-[#6B7280] bg-[#F4F6FB] border border-[#E5E7EB] px-2 py-0.5 rounded-md shrink-0">
                {data.totalMaternalDeaths} Deaths
              </span>
            </div>

            {/* Line / Composed Chart */}
            <div className="mt-5 h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  data={data.monthlyTrends}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                  <XAxis
                    dataKey="monthLabel"
                    axisLine={{ stroke: '#E5E7EB' }}
                    tickLine={false}
                    tick={{ fill: '#6B7280', fontSize: 11 }}
                  />
                  <YAxis
                    yAxisId="incidence"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6B7280', fontSize: 11 }}
                    domain={[0, 'auto']}
                  />
                  <YAxis
                    yAxisId="deaths"
                    orientation="right"
                    axisLine={false}
                    tickLine={false}
                    hide={true}
                  />
                  <Tooltip
                    formatter={(val: number, name: string) => [
                      name === 'mortalityIncidence'
                        ? `${val} per 100k`
                        : `${val} cases`,
                      name === 'mortalityIncidence'
                        ? 'Mortality Incidence'
                        : 'Recorded Maternal Deaths',
                    ]}
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '8px',
                      border: '1px solid #E5E7EB',
                      fontSize: '12px',
                    }}
                  />
                  {/* Subtle neutral bars for rare maternal deaths */}
                  <Bar
                    yAxisId="deaths"
                    dataKey="maternalDeaths"
                    fill="#E2E8F0"
                    radius={[3, 3, 0, 0]}
                    maxBarSize={20}
                  />
                  {/* Smooth line for incidence per 100k */}
                  <Line
                    yAxisId="incidence"
                    type="monotone"
                    dataKey="mortalityIncidence"
                    stroke="#4F46E5"
                    strokeWidth={2}
                    dot={{ r: 2.5, fill: '#4F46E5' }}
                    activeDot={{ r: 4 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-4 pt-3.5 border-t border-[#E5E7EB] flex items-center justify-between text-xs text-[#6B7280]">
            <span className="text-[11px] text-[#6B7280] leading-tight">
              Facility surveillance data
            </span>
            <button
              onClick={() => onNavigateToPage('outcome-review')}
              className="text-[#4F46E5] hover:text-indigo-800 font-semibold inline-flex items-center space-x-1"
            >
              <span>Audit Reviews</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================
          3. OVERVIEW — PROGRAMME SUMMARY (SECTION 13)
         ===================================================== */}
      <div>
        <div className="mb-3">
          <h3 className="text-sm font-bold text-[#111827]">
            Programme summary
          </h3>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Key reach and facility submission indicators for public health programme officers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: Women reached */}
          <div className="bg-white rounded-[10px] border border-[#E5E7EB] p-4 sm:p-5 flex flex-col justify-between shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-[#6B7280]">
                Women reached
              </span>
              <KpiInfoTooltip
                title="Women reached"
                content="This shows the total unique pregnant women enrolled in active care tracking. It measures overall community reach and onboarding progress."
              />
            </div>
            <div className="my-2">
              <span className="text-2xl sm:text-3xl font-bold text-[#111827] tracking-tight">
                {data.womenRegistered.toLocaleString()}
              </span>
            </div>
            <p className="text-xs text-[#6B7280]">
              Registered women in active programme surveillance.
            </p>
          </div>

          {/* Card 2: High-risk women followed up */}
          <div className="bg-white rounded-[10px] border border-[#E5E7EB] p-4 sm:p-5 flex flex-col justify-between shadow-2xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1.5">
                <span className="text-xs font-medium text-[#6B7280]">
                  High-risk women followed up
                </span>
                <KpiInfoTooltip
                  title="High-risk follow-up"
                  content="This shows the percentage of high-risk pregnant women who received dedicated clinical follow-up. The 90% target ensures vulnerable mothers are safely guided through specialist care."
                />
              </div>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                Target: 90%
              </span>
            </div>
            <div className="my-2 flex items-baseline space-x-2">
              <span className="text-2xl sm:text-3xl font-bold text-[#111827] tracking-tight">
                {data.highRiskFollowUpRate}%
              </span>
              <span className="text-xs text-[#6B7280]">
                ({data.totalHighRiskFollowUp.toLocaleString()} / {data.totalHighRisk.toLocaleString()} women)
              </span>
            </div>
            <p className="text-xs text-[#6B7280]">
              Percentage receiving recommended clinical care navigation.
            </p>
          </div>

          {/* Card 3: Facilities reporting */}
          <div className="bg-white rounded-[10px] border border-[#E5E7EB] p-4 sm:p-5 flex flex-col justify-between shadow-2xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1.5">
                <span className="text-xs font-medium text-[#6B7280]">
                  Facilities reporting
                </span>
                <KpiInfoTooltip
                  title="Facility reporting"
                  content="This shows the percentage of facilities that submitted their monthly health data on time. The 90% target ensures timely and reliable surveillance across all communities."
                />
              </div>
              <span className="text-[11px] font-semibold text-[#4F46E5] bg-indigo-50 px-2 py-0.5 rounded">
                Target: 90%
              </span>
            </div>
            <div className="my-2 flex items-baseline space-x-2">
              <span className="text-2xl sm:text-3xl font-bold text-[#111827] tracking-tight">
                {data.latestMonthOnTimeCount} / {data.latestMonthTotal}
              </span>
              <span className="text-sm font-semibold text-[#4F46E5]">
                ({reportingRate}%)
              </span>
            </div>
            <p className="text-xs text-[#6B7280]">
              Facilities with timely monthly data submissions.
            </p>
          </div>
        </div>
      </div>

      {/* Mandatory clinical disclaimer banner */}
      <div className="p-3 bg-[#F4F6FB] border border-[#E5E7EB] rounded-lg text-xs text-[#6B7280] flex items-center space-x-2">
        <Info className="w-4 h-4 text-[#4F46E5] shrink-0" />
        <span>
          Risk classifications shown are produced by the validated ARS clinical tool. AI is used only to generate explanations, not to determine risk.
        </span>
      </div>
    </div>
  );
};
