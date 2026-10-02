import React from 'react';
import { Baby, Hospital, AlertCircle, ArrowUpRight, ShieldCheck, Ambulance } from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar,
} from 'recharts';
import { computeAggregates } from '../../data/mockData';
import { FilterState } from '../../types';

interface DeliveryReferralPageProps {
  filters: FilterState;
}

export const DeliveryReferralPage: React.FC<DeliveryReferralPageProps> = ({ filters }) => {
  const data = computeAggregates(filters);

  // Delivery location donut data
  const deliveryLocationData = [
    {
      name: 'Formal Health Facility',
      count: data.deliveries.formalFacility,
      color: '#10B981', // Success color for formal facility delivery
      desc: 'Skilled birth attendant present',
      pct: data.deliveries.total > 0 ? Math.round((data.deliveries.formalFacility / data.deliveries.total) * 100) : 0,
    },
    {
      name: 'Traditional Birth Attendant (TBA)',
      count: data.deliveries.tba,
      color: '#F59E0B', // Warning color
      desc: 'Community unassisted home delivery',
      pct: data.deliveries.total > 0 ? Math.round((data.deliveries.tba / data.deliveries.total) * 100) : 0,
    },
    {
      name: 'Transferred for Complications',
      count: data.deliveries.transferred,
      color: '#4F46E5', // Primary brand color
      desc: 'Emergency referral to higher level',
      pct: data.deliveries.total > 0 ? Math.round((data.deliveries.transferred / data.deliveries.total) * 100) : 0,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Row 1: Deliveries by Location (Donut) & Facility Delivery Rate Over Time (Line) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Deliveries by Location Donut */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-[#E5E7EB] p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-base font-semibold text-[#111827]">
                  Birth Location Distribution
                </h3>
                <p className="text-xs text-[#6B7280] mt-0.5">
                  Split of reported deliveries by setting.
                </p>
              </div>
              <span className="text-xs text-[#6B7280] bg-[#F9FAFB] border border-[#E5E7EB] px-2.5 py-1 rounded-md font-medium">
                {data.deliveries.total.toLocaleString()} Total
              </span>
            </div>

            {/* Donut Chart */}
            <div className="mt-4 flex flex-col items-center justify-center">
              <div className="w-48 h-48 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={deliveryLocationData}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={80}
                      paddingAngle={3}
                      dataKey="count"
                      stroke="none"
                    >
                      {deliveryLocationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(val: number) => [`${val.toLocaleString()} deliveries`, 'Volume']}
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
                  <span className="text-2xl font-bold text-[#111827]">
                    {deliveryLocationData[0].pct}%
                  </span>
                  <span className="text-[11px] text-[#6B7280] font-medium">In Facility</span>
                </div>
              </div>
            </div>

            {/* Breakdown List */}
            <div className="mt-4 space-y-2.5">
              {deliveryLocationData.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between p-2.5 rounded-lg border border-[#E5E7EB] bg-[#F9FAFB]"
                >
                  <div className="flex items-center space-x-2.5">
                    <span
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <div>
                      <span className="text-xs font-semibold text-[#111827] block">
                        {item.name}
                      </span>
                      <span className="text-[10px] text-[#6B7280]">{item.desc}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-[#111827] block">
                      {item.count.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-[#6B7280]">{item.pct}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#E5E7EB] text-[11px] text-[#6B7280]">
            Formal facility deliveries reflect births supervised by registered midwives or obstetric doctors.
          </div>
        </div>

        {/* Facility-Delivery Rate Over Time (Line Chart) */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-[#E5E7EB] p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <div>
                <h3 className="text-base font-semibold text-[#111827]">
                  Facility Delivery Rate Over Time
                </h3>
                <p className="text-xs text-[#6B7280] mt-0.5">
                  Monthly trend of women delivering in equipped health institutions.
                </p>
              </div>
              <div className="flex items-center space-x-1.5 text-xs text-[#10B981] font-semibold bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100">
                <ArrowUpRight className="w-3.5 h-3.5" />
                <span>+6.4% Annual Uptake</span>
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
                    domain={[50, 100]}
                    unit="%"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6B7280', fontSize: 11 }}
                  />
                  <Tooltip
                    formatter={(val: number) => [`${val}%`, 'Facility Delivery Rate']}
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '8px',
                      border: '1px solid #E5E7EB',
                      fontSize: '12px',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="facilityDeliveryRate"
                    stroke="#10B981"
                    strokeWidth={2.5}
                    dot={{ fill: '#10B981', r: 3.5 }}
                    activeDot={{ r: 6, fill: '#10B981' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-4 p-3 rounded-lg bg-[#F9FAFB] border border-[#E5E7EB] flex items-center space-x-2 text-xs text-[#4B5563]">
            <ShieldCheck className="w-4 h-4 text-[#10B981] shrink-0" />
            <span>
              Community health worker birth-plan navigation has shifted approximately{' '}
              <strong className="text-[#111827]">
                {data.deliveries.formalFacility.toLocaleString()} mothers
              </strong>{' '}
              away from unsafe domestic deliveries.
            </span>
          </div>
        </div>
      </div>

      {/* Row 2: Horizontal Bar Chart of Complication-Related Transfer Reasons */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <div>
            <h3 className="text-base font-semibold text-[#111827]">
              Emergency Referral Reasons (Complications in Transit)
            </h3>
            <p className="text-xs text-[#6B7280] mt-0.5">
              Primary clinical reasons why women were transferred to secondary or tertiary specialized care centers.
            </p>
          </div>
          <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-indigo-50 border border-indigo-100 text-[#4F46E5]">
            {data.deliveries.transferred.toLocaleString()} Total Transfers
          </span>
        </div>

        <div className="mt-6 h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={data.transferReasons}
              margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F3F4F6" />
              <XAxis
                type="number"
                axisLine={{ stroke: '#E5E7EB' }}
                tickLine={false}
                tick={{ fill: '#6B7280', fontSize: 11 }}
              />
              <YAxis
                type="category"
                dataKey="reason"
                width={190}
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#374151', fontSize: 11, fontWeight: 500 }}
              />
              <Tooltip
                formatter={(val: number) => [`${val.toLocaleString()} emergency transfers`, 'Referrals']}
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '8px',
                  border: '1px solid #E5E7EB',
                  fontSize: '12px',
                }}
              />
              <Bar dataKey="count" fill="#4F46E5" radius={[0, 6, 6, 0]} barSize={22} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 p-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg text-xs text-[#4B5563] leading-relaxed">
          <strong className="text-[#111827]">Actionable Insight:</strong> Obstructed labor and postpartum hemorrhage (PPH) account for over 65% of emergency referrals. Priority ambulance agreements and ready blood cross-matching at receiving general hospitals directly shorten critical transfer times.
        </div>
      </div>
    </div>
  );
};
