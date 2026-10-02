import React from 'react';
import { MapPin, Building2, Users2, HeartPulse, CheckCircle2, ArrowUpRight } from 'lucide-react';
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
  Cell,
} from 'recharts';
import { computeAggregates, FACILITIES } from '../../data/mockData';
import { FilterState } from '../../types';

interface ProgrammeReachPageProps {
  filters: FilterState;
}

export const ProgrammeReachPage: React.FC<ProgrammeReachPageProps> = ({ filters }) => {
  const data = computeAggregates(filters);

  // Compute summary stats
  const totalFacilities = data.facilities.length;
  const totalAttendants = data.facilities.reduce((sum, f) => sum + f.skilledAttendants, 0);
  const totalBloodBanks = data.facilities.filter((f) => f.hasBloodBank).length;
  const uniqueLgas = new Set(data.facilities.map((f) => f.lga)).size;

  return (
    <div className="space-y-6">
      {/* Network Footprint Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded-xl border border-[#E5E7EB] shadow-xs">
          <div className="flex items-center space-x-2 text-xs text-[#6B7280]">
            <Building2 className="w-4 h-4 text-[#4F46E5]" />
            <span>Participating Facilities</span>
          </div>
          <p className="text-2xl font-bold text-[#111827] mt-1.5">{totalFacilities}</p>
          <span className="text-[11px] text-[#10B981] font-medium mt-1 block">
            100% active in care network
          </span>
        </div>

        <div className="p-4 bg-white rounded-xl border border-[#E5E7EB] shadow-xs">
          <div className="flex items-center space-x-2 text-xs text-[#6B7280]">
            <MapPin className="w-4 h-4 text-[#4F46E5]" />
            <span>Local Government Areas</span>
          </div>
          <p className="text-2xl font-bold text-[#111827] mt-1.5">{uniqueLgas} LGAs</p>
          <span className="text-[11px] text-[#6B7280] mt-1 block">
            Across {data.facilityCountByState.length} participating states
          </span>
        </div>

        <div className="p-4 bg-white rounded-xl border border-[#E5E7EB] shadow-xs">
          <div className="flex items-center space-x-2 text-xs text-[#6B7280]">
            <Users2 className="w-4 h-4 text-[#4F46E5]" />
            <span>Trained Midwives & SBAs</span>
          </div>
          <p className="text-2xl font-bold text-[#111827] mt-1.5">{totalAttendants}</p>
          <span className="text-[11px] text-[#6B7280] mt-1 block">
            Average {(totalAttendants / Math.max(1, totalFacilities)).toFixed(1)} per facility
          </span>
        </div>

        <div className="p-4 bg-white rounded-xl border border-[#E5E7EB] shadow-xs">
          <div className="flex items-center space-x-2 text-xs text-[#6B7280]">
            <HeartPulse className="w-4 h-4 text-[#4F46E5]" />
            <span>Functioning Blood Banks</span>
          </div>
          <p className="text-2xl font-bold text-[#111827] mt-1.5">
            {totalBloodBanks} / {totalFacilities}
          </p>
          <span className="text-[11px] text-[#4F46E5] font-medium mt-1 block">
            {Math.round((totalBloodBanks / Math.max(1, totalFacilities)) * 100)}% coverage
          </span>
        </div>
      </div>

      {/* Row: Cumulative Facilities Onboarded (Line) & Facility Count by State (Bar) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Cumulative Facilities Onboarded Over Time (Line Chart) */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-[#E5E7EB] p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <div>
                <h3 className="text-base font-semibold text-[#111827]">
                  Cumulative Facilities Onboarded
                </h3>
                <p className="text-xs text-[#6B7280] mt-0.5">
                  12-month expansion velocity across public primary and secondary maternity hospitals.
                </p>
              </div>
              <div className="flex items-center space-x-1 text-xs text-[#10B981] font-semibold bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100">
                <ArrowUpRight className="w-3.5 h-3.5" />
                <span>+400% Capacity Growth</span>
              </div>
            </div>

            <div className="mt-6 h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={data.cumulativeFacilitiesTrend}
                  margin={{ top: 10, right: 15, left: -15, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                  <XAxis
                    dataKey="monthLabel"
                    axisLine={{ stroke: '#E5E7EB' }}
                    tickLine={false}
                    tick={{ fill: '#4B5563', fontSize: 11 }}
                  />
                  <YAxis
                    domain={[0, 22]}
                    allowDecimals={false}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6B7280', fontSize: 11 }}
                  />
                  <Tooltip
                    formatter={(val: number) => [`${val} active facilities`, 'Network Size']}
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '8px',
                      border: '1px solid #E5E7EB',
                      fontSize: '12px',
                    }}
                  />
                  <Line
                    type="stepAfter"
                    dataKey="onboardedCount"
                    stroke="#4F46E5"
                    strokeWidth={2.5}
                    dot={{ fill: '#4F46E5', r: 3.5 }}
                    activeDot={{ r: 6, fill: '#4F46E5' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-4 p-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg text-xs text-[#4B5563]">
            <strong>Scale Target:</strong> Onboarding is synchronized with state ministry of health approvals and frontline digital tablet training.
          </div>
        </div>

        {/* Facility Count by State (Bar Chart) */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-[#E5E7EB] p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-base font-semibold text-[#111827]">
                  Facility Distribution by State
                </h3>
                <p className="text-xs text-[#6B7280] mt-0.5">
                  Institutional footprint across active geopolitical zones.
                </p>
              </div>
            </div>

            <div className="mt-6 h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data.facilityCountByState}
                  margin={{ top: 10, right: 10, left: -20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                  <XAxis
                    dataKey="state"
                    axisLine={{ stroke: '#E5E7EB' }}
                    tickLine={false}
                    tick={{ fill: '#374151', fontSize: 11, fontWeight: 500 }}
                  />
                  <YAxis
                    allowDecimals={false}
                    domain={[0, 6]}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6B7280', fontSize: 11 }}
                  />
                  <Tooltip
                    formatter={(val: number, name: string, item: any) => [
                      `${val} facilities (${item.payload.attendants} trained midwives, ${item.payload.bloodBanks} blood banks)`,
                      'State Total',
                    ]}
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '8px',
                      border: '1px solid #E5E7EB',
                      fontSize: '12px',
                    }}
                  />
                  <Bar dataKey="count" fill="#4F46E5" radius={[6, 6, 0, 0]} barSize={36} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-4 space-y-2 text-xs">
            {data.facilityCountByState.map((st) => (
              <div
                key={st.state}
                className="flex items-center justify-between p-2 rounded-lg bg-[#F9FAFB] border border-[#E5E7EB]"
              >
                <span className="font-semibold text-[#111827]">{st.state} State</span>
                <span className="text-[#6B7280]">
                  {st.count} hospitals • {st.attendants} staff • {st.bloodBanks} blood banks
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
