import React from 'react';
import { Activity, Users, Stethoscope, HeartPulse, CheckCircle2 } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { computeAggregates } from '../../data/mockData';
import { FilterState } from '../../types';

interface ServiceUtilizationPageProps {
  filters: FilterState;
}

export const ServiceUtilizationPage: React.FC<ServiceUtilizationPageProps> = ({ filters }) => {
  const data = computeAggregates(filters);

  // Stacked bar chart data: New vs Returning patients over time
  const patientVolumeData = data.monthlyTrends.map((m) => ({
    monthLabel: m.monthLabel,
    newPatients: m.newPatients,
    returningPatients: m.returningPatients,
    total: m.newPatients + m.returningPatients,
  }));

  const totalPatientsServed = patientVolumeData.reduce((sum, p) => sum + p.total, 0);

  return (
    <div className="space-y-6">
      {/* 1. Stacked Bar Chart: Patients Served Over Time (New vs Returning) */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <div>
            <h3 className="text-base font-semibold text-[#111827]">
              Patient Volume & Repeat Engagement
            </h3>
            <p className="text-xs text-[#6B7280] mt-0.5">
              Monthly breakdown of first-time registrants versus mothers returning for follow-up visits.
            </p>
          </div>
          <div className="flex items-center space-x-3 text-xs">
            <span className="flex items-center space-x-1.5 font-medium text-[#111827]">
              <span className="w-3 h-3 rounded-xs bg-[#4F46E5]" />
              <span>Returning Care (Recurring)</span>
            </span>
            <span className="flex items-center space-x-1.5 font-medium text-[#6B7280]">
              <span className="w-3 h-3 rounded-xs bg-[#93C5FD]" />
              <span>New Registrations</span>
            </span>
          </div>
        </div>

        <div className="mt-6 h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={patientVolumeData}
              margin={{ top: 10, right: 15, left: -5, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
              <XAxis
                dataKey="monthLabel"
                axisLine={{ stroke: '#E5E7EB' }}
                tickLine={false}
                tick={{ fill: '#4B5563', fontSize: 11 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#6B7280', fontSize: 11 }}
                tickFormatter={(val) => val.toLocaleString()}
              />
              <Tooltip
                formatter={(val: number, name: string) => [
                  `${val.toLocaleString()} patients`,
                  name === 'returningPatients' ? 'Returning Patients' : 'New Patients',
                ]}
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '8px',
                  border: '1px solid #E5E7EB',
                  fontSize: '12px',
                }}
              />
              <Bar
                dataKey="returningPatients"
                stackId="a"
                fill="#4F46E5"
                radius={[0, 0, 0, 0]}
              />
              <Bar
                dataKey="newPatients"
                stackId="a"
                fill="#93C5FD"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 p-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg text-xs text-[#4B5563]">
          <strong>Capacity Indicator:</strong> High returning patient volume confirms sustained care continuity and trust in clinical health workers.
        </div>
      </div>

      {/* Row 2: Treatment Types Received (Horizontal Bar) & Patient Outcomes (Donut) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Horizontal Bar Chart: Treatment Type Received */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-[#E5E7EB] p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-base font-semibold text-[#111827]">
                  Clinical Services Rendered
                </h3>
                <p className="text-xs text-[#6B7280] mt-0.5">
                  Proportion of consults across preventative routine care, high-risk case navigation, and emergency interventions.
                </p>
              </div>
            </div>

            <div className="mt-6 h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={data.treatmentBreakdown}
                  margin={{ top: 5, right: 25, left: 10, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F3F4F6" />
                  <XAxis
                    type="number"
                    axisLine={{ stroke: '#E5E7EB' }}
                    tickLine={false}
                    tick={{ fill: '#6B7280', fontSize: 11 }}
                    tickFormatter={(val) => val.toLocaleString()}
                  />
                  <YAxis
                    type="category"
                    dataKey="type"
                    width={180}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#374151', fontSize: 11, fontWeight: 500 }}
                  />
                  <Tooltip
                    formatter={(val: number) => [`${val.toLocaleString()} procedures`, 'Volume']}
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
          </div>

          <div className="mt-4 pt-3 border-t border-[#E5E7EB] text-xs text-[#6B7280]">
            Emergency Obstetric Care (EmOC) includes parenteral antibiotics, oxytocin administration, and manual placenta management.
          </div>
        </div>

        {/* Donut Chart: Patient Outcomes */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-[#E5E7EB] p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-base font-semibold text-[#111827]">
                  Patient Care Outcomes
                </h3>
                <p className="text-xs text-[#6B7280] mt-0.5">
                  Clinical status at conclusion of treatment period.
                </p>
              </div>
            </div>

            <div className="mt-4 flex flex-col items-center justify-center">
              <div className="w-48 h-48 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data.outcomesBreakdown}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={80}
                      paddingAngle={3}
                      dataKey="count"
                      stroke="none"
                    >
                      {data.outcomesBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(val: number) => [`${val.toLocaleString()} patients`, 'Outcome']}
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
                  <span className="text-xl font-bold text-[#10B981]">
                    {data.outcomesBreakdown[0].count > 0 && totalPatientsServed > 0
                      ? `${Math.round((data.outcomesBreakdown[0].count / totalPatientsServed) * 100)}%`
                      : '74%'}
                  </span>
                  <span className="text-[10px] text-[#6B7280] font-medium">Discharged Well</span>
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              {data.outcomesBreakdown.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between p-2 rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] text-xs"
                >
                  <div className="flex items-center space-x-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="font-medium text-[#111827]">{item.name}</span>
                  </div>
                  <span className="font-semibold text-[#111827]">
                    {item.count.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#E5E7EB] text-[11px] text-[#6B7280]">
            Over 94% of patients successfully recover or maintain stabilized care status within primary facility networks.
          </div>
        </div>
      </div>
    </div>
  );
};
