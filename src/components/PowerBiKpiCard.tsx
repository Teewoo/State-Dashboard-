import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus, AlertCircle, CheckCircle2 } from 'lucide-react';
import { BenchmarkEvaluation } from '../data/benchmarks';

interface PowerBiKpiCardProps {
  title: string;
  subtitle?: string;
  value: string | number;
  benchmark: BenchmarkEvaluation;
  trendDelta: number; // raw delta number, e.g. +3.2 or -1.5
  trendUnit?: string; // '%', 'pts', etc.
  trendLabel?: string; // e.g. 'vs previous period'
  direction?: 'higher_is_better' | 'lower_is_better';
  onClick?: () => void;
  highlighted?: boolean;
}

export const PowerBiKpiCard: React.FC<PowerBiKpiCardProps> = ({
  title,
  subtitle,
  value,
  benchmark,
  trendDelta,
  trendUnit = '%',
  trendLabel = 'vs previous period',
  direction = 'higher_is_better',
  onClick,
  highlighted = false,
}) => {
  // Determine if trend is positive (direction-aware)
  const isTrendImproving =
    direction === 'higher_is_better' ? trendDelta > 0 : trendDelta < 0;
  const isTrendFlat = Math.abs(trendDelta) < 0.05;

  // Status colors based on benchmark
  const statusBadge =
    benchmark.status === 'success' ? (
      <span className="inline-flex items-center space-x-1 text-[11px] font-semibold text-[#047857] bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
        <CheckCircle2 className="w-3 h-3 text-[#10B981]" />
        <span>{benchmark.statusLabel}</span>
      </span>
    ) : benchmark.status === 'warning' ? (
      <span className="inline-flex items-center space-x-1 text-[11px] font-semibold text-[#B45309] bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">
        <AlertCircle className="w-3 h-3 text-[#F59E0B]" />
        <span>{benchmark.statusLabel}</span>
      </span>
    ) : (
      <span className="inline-flex items-center space-x-1 text-[11px] font-semibold text-[#B91C1C] bg-red-50 border border-red-200 px-2 py-0.5 rounded-md">
        <AlertCircle className="w-3 h-3 text-[#EF4444]" />
        <span>{benchmark.statusLabel}</span>
      </span>
    );

  // Bullet bar progress percentage (normalized to 120% of target or max)
  const maxValue = Math.max(benchmark.target * 1.2, benchmark.currentValue * 1.1, 100);
  const currentPct = Math.min(100, Math.max(0, (benchmark.currentValue / maxValue) * 100));
  const targetPct = Math.min(100, Math.max(0, (benchmark.target / maxValue) * 100));

  const bulletColor =
    benchmark.status === 'success'
      ? '#10B981'
      : benchmark.status === 'warning'
      ? '#F59E0B'
      : '#EF4444';

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl border ${
        highlighted ? 'border-[#4F46E5] ring-2 ring-[#4F46E5]/20' : 'border-[#E5E7EB]'
      } p-5 shadow-xs transition-all hover:border-[#D1D5DB] flex flex-col justify-between ${
        onClick ? 'cursor-pointer' : ''
      }`}
    >
      <div>
        {/* Header: Title & Status Badge */}
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <h3 className="text-xs font-semibold text-[#4B5563] uppercase tracking-wider truncate">
              {title}
            </h3>
            {subtitle && (
              <p className="text-[11px] text-[#9CA3AF] mt-0.5 line-clamp-1">
                {subtitle}
              </p>
            )}
          </div>
          <div className="shrink-0">{statusBadge}</div>
        </div>

        {/* Headline Primary Value */}
        <div className="mt-3 flex items-baseline justify-between">
          <span className="text-3xl font-extrabold text-[#111827] tracking-tight">
            {value}
          </span>

          {/* Previous Period Trend */}
          <div className="flex items-center space-x-1 text-xs font-semibold">
            {isTrendFlat ? (
              <span className="text-[#6B7280] inline-flex items-center">
                <Minus className="w-3 h-3 mr-0.5" />
                <span>0.0{trendUnit}</span>
              </span>
            ) : isTrendImproving ? (
              <span className="text-[#10B981] inline-flex items-center bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">
                <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
                <span>
                  {trendDelta > 0 ? `+${trendDelta.toFixed(1)}` : trendDelta.toFixed(1)}
                  {trendUnit}
                </span>
              </span>
            ) : (
              <span className="text-[#EF4444] inline-flex items-center bg-red-50 px-1.5 py-0.5 rounded border border-red-100">
                <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />
                <span>
                  {trendDelta > 0 ? `+${trendDelta.toFixed(1)}` : trendDelta.toFixed(1)}
                  {trendUnit}
                </span>
              </span>
            )}
            <span className="text-[10px] text-[#9CA3AF] font-normal hidden sm:inline">
              {trendLabel}
            </span>
          </div>
        </div>

        {/* Power BI-Style Bullet Visual Bar */}
        <div className="mt-3.5 pt-2 border-t border-[#F3F4F6]">
          <div className="flex items-center justify-between text-[11px] mb-1.5">
            <div className="flex items-center space-x-1.5">
              <span className="font-medium text-[#6B7280]">Target:</span>
              <span className="font-bold text-[#111827]">
                {benchmark.target}
                {trendUnit === 'pts' ? '%' : trendUnit}
              </span>
            </div>
            <span
              className={`font-semibold text-[11px] ${
                benchmark.status === 'success'
                  ? 'text-[#059669]'
                  : benchmark.status === 'warning'
                  ? 'text-[#B45309]'
                  : 'text-[#DC2626]'
              }`}
            >
              {benchmark.varianceFormatted}
            </span>
          </div>

          {/* Bullet Bar Graphic with Target Marker Line */}
          <div className="relative w-full h-2 bg-[#F3F4F6] rounded-full overflow-visible">
            {/* Fill bar */}
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${Math.min(100, currentPct)}%`,
                backgroundColor: bulletColor,
              }}
            />
            {/* Target Marker Pin */}
            <div
              className="absolute top-1/2 -translate-y-1/2 w-1 h-3.5 bg-[#111827] rounded-xs shadow-xs z-10"
              style={{ left: `${Math.min(98, Math.max(2, targetPct))}%` }}
              title={`Target Marker: ${benchmark.target}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
