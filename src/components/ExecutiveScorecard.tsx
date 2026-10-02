import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus, CheckCircle2, AlertCircle } from 'lucide-react';
import { BenchmarkEvaluation } from '../data/benchmarks';

interface ScorecardMetric {
  name: string;
  value: string | number;
  benchmark: BenchmarkEvaluation;
  trendDelta: number;
  trendUnit?: string;
  direction?: 'higher_is_better' | 'lower_is_better';
}

interface ScorecardGroup {
  category: string;
  description: string;
  metrics: ScorecardMetric[];
}

interface ExecutiveScorecardProps {
  groups: ScorecardGroup[];
}

export const ExecutiveScorecard: React.FC<ExecutiveScorecardProps> = ({ groups }) => {
  return (
    <div className="bg-white rounded-xl border border-[#E5E7EB] p-5 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-[#F3F4F6] gap-2">
        <div>
          <h3 className="text-sm font-bold text-[#111827] uppercase tracking-wider">
            Executive Programme Health Scorecard
          </h3>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Cross-domain operational and clinical metrics evaluated against programme targets.
          </p>
        </div>
        <div className="flex items-center space-x-3 text-xs text-[#6B7280]">
          <span className="inline-flex items-center space-x-1">
            <span className="w-2 h-2 rounded-full bg-[#10B981]"></span>
            <span>Above Target</span>
          </span>
          <span className="inline-flex items-center space-x-1">
            <span className="w-2 h-2 rounded-full bg-[#F59E0B]"></span>
            <span>Near Target</span>
          </span>
          <span className="inline-flex items-center space-x-1">
            <span className="w-2 h-2 rounded-full bg-[#EF4444]"></span>
            <span>Below Target</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {groups.map((group) => (
          <div
            key={group.category}
            className="bg-[#F9FAFB] rounded-lg border border-[#E5E7EB] p-4 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#4B5563] uppercase tracking-wider">
                  {group.category}
                </span>
              </div>
              <p className="text-[11px] text-[#9CA3AF] mb-3">{group.description}</p>

              <div className="space-y-3">
                {group.metrics.map((metric) => {
                  const isImproving =
                    metric.direction === 'lower_is_better'
                      ? metric.trendDelta < 0
                      : metric.trendDelta > 0;
                  const isFlat = Math.abs(metric.trendDelta) < 0.05;

                  return (
                    <div
                      key={metric.name}
                      className="bg-white rounded-md border border-[#E5E7EB] p-2.5 shadow-2xs"
                    >
                      <div className="flex items-start justify-between">
                        <span className="text-xs font-medium text-[#374151] line-clamp-1">
                          {metric.name}
                        </span>
                        {metric.benchmark.status === 'success' ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] shrink-0 ml-1" />
                        ) : metric.benchmark.status === 'warning' ? (
                          <AlertCircle className="w-3.5 h-3.5 text-[#F59E0B] shrink-0 ml-1" />
                        ) : (
                          <AlertCircle className="w-3.5 h-3.5 text-[#EF4444] shrink-0 ml-1" />
                        )}
                      </div>

                      <div className="mt-1.5 flex items-baseline justify-between">
                        <span className="text-lg font-extrabold text-[#111827]">
                          {metric.value}
                        </span>
                        <div className="flex items-center text-[11px] font-semibold">
                          {isFlat ? (
                            <span className="text-[#6B7280] inline-flex items-center">
                              <Minus className="w-3 h-3 mr-0.5" /> 0.0
                            </span>
                          ) : isImproving ? (
                            <span className="text-[#10B981] inline-flex items-center">
                              <ArrowUpRight className="w-3 h-3 mr-0.5" />
                              {metric.trendDelta > 0 ? `+${metric.trendDelta.toFixed(1)}` : metric.trendDelta.toFixed(1)}
                              {metric.trendUnit ?? '%'}
                            </span>
                          ) : (
                            <span className="text-[#EF4444] inline-flex items-center">
                              <ArrowDownRight className="w-3 h-3 mr-0.5" />
                              {metric.trendDelta > 0 ? `+${metric.trendDelta.toFixed(1)}` : metric.trendDelta.toFixed(1)}
                              {metric.trendUnit ?? '%'}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Value -> Benchmark -> Variance */}
                      <div className="mt-1.5 pt-1.5 border-t border-[#F3F4F6] flex items-center justify-between text-[10px]">
                        <span className="text-[#6B7280]">
                          Target: <strong className="text-[#374151]">{metric.benchmark.target}{metric.benchmark.unit}</strong>
                        </span>
                        <span
                          className={`font-semibold ${
                            metric.benchmark.status === 'success'
                              ? 'text-[#059669]'
                              : metric.benchmark.status === 'warning'
                              ? 'text-[#B45309]'
                              : 'text-[#DC2626]'
                          }`}
                        >
                          {metric.benchmark.varianceFormatted}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
