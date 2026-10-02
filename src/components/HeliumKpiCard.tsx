import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import { KpiInfoTooltip } from './KpiInfoTooltip';

interface HeliumKpiCardProps {
  id?: string;
  title: string;
  value: string | number;
  unit?: string;
  trendDelta?: number;
  trendUnit?: string;
  trendLabel?: string;
  benchmarkText?: string;
  sparklineData?: number[];
  sparklineColor?: string;
  direction?: 'higher_is_better' | 'lower_is_better';
  infoTooltip?: string;
  onClick?: () => void;
}

export const HeliumKpiCard: React.FC<HeliumKpiCardProps> = ({
  id,
  title,
  value,
  unit,
  trendDelta,
  trendUnit = '%',
  trendLabel = 'vs prev period',
  benchmarkText,
  sparklineData = [12, 16, 14, 19, 22, 25, 29],
  sparklineColor = '#10B981',
  direction = 'higher_is_better',
  infoTooltip,
  onClick,
}) => {
  // Determine trend status color
  const hasTrend = trendDelta !== undefined;
  const isPositive = hasTrend && trendDelta > 0;
  const isZero = hasTrend && Math.abs(trendDelta) < 0.05;

  let isFavorable = true;
  if (hasTrend && !isZero) {
    if (direction === 'higher_is_better') {
      isFavorable = isPositive;
    } else {
      isFavorable = !isPositive;
    }
  }

  // Generate SVG path for sparkline (smooth cubic bezier)
  const width = 64;
  const height = 24;
  const padding = 3;

  let sparklinePath = '';
  let sparklineAreaPath = '';

  if (sparklineData && sparklineData.length > 1) {
    const minVal = Math.min(...sparklineData);
    const maxVal = Math.max(...sparklineData);
    const range = maxVal - minVal || 1;

    const points = sparklineData.map((val, idx) => {
      const x = padding + (idx / (sparklineData.length - 1)) * (width - 2 * padding);
      const y = height - padding - ((val - minVal) / range) * (height - 2 * padding);
      return { x, y };
    });

    // Create smooth SVG path using cubic splines
    sparklinePath = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i === 0 ? 0 : i - 1];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[i + 2] || p2;

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      sparklinePath += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.x.toFixed(1)}`;
    }

    sparklineAreaPath = `${sparklinePath} L ${width - padding} ${height} L ${padding} ${height} Z`;
  }

  const gradientId = `sparkline-grad-${title.replace(/[^a-zA-Z0-9]/g, '')}`;

  return (
    <div
      id={id}
      onClick={onClick}
      className={`bg-white rounded-[10px] border border-[#E5E7EB] p-3.5 sm:p-4 transition-all duration-150 flex flex-col justify-between relative group shadow-2xs ${
        onClick ? 'cursor-pointer hover:border-[#D1D5DB] hover:shadow-xs' : ''
      }`}
    >
      {/* 1. Metric Label Row (Title + Info Tooltip) */}
      <div className="flex items-start justify-between gap-1.5">
        <span
          className="text-xs font-medium text-[#6B7280] line-clamp-1 leading-tight"
          title={title}
        >
          {title}
        </span>
        {infoTooltip && (
          <KpiInfoTooltip content={infoTooltip} title={title} />
        )}
      </div>

      {/* 2. Large Value Row */}
      <div className="mt-2 mb-1">
        <div className="flex items-baseline space-x-1">
          <span className="text-2xl sm:text-[26px] font-bold text-[#111827] tracking-tight leading-none">
            {value}
          </span>
          {unit && (
            <span className="text-xs font-normal text-[#6B7280] ml-1">
              {unit}
            </span>
          )}
        </div>
      </div>

      {/* 3. Benchmark / Variance Row */}
      <div className="text-[11px] text-[#6B7280] font-normal leading-snug min-h-[16px] truncate" title={benchmarkText}>
        {benchmarkText || <span className="opacity-0">—</span>}
      </div>

      {/* 4. Trend Indicator & Sparkline Row (Cleanly bounded and responsive) */}
      <div className="mt-2.5 pt-2 border-t border-[#F3F4F6] flex items-center justify-between gap-1.5 flex-wrap sm:flex-nowrap">
        {/* Trend Indicator */}
        <div className="flex items-center space-x-1 shrink-0">
          {hasTrend ? (
            isZero ? (
              <span className="text-[11px] sm:text-xs font-semibold text-[#6B7280] flex items-center">
                <Minus className="w-3 h-3 mr-0.5" />
                0.0%
              </span>
            ) : (
              <span
                className={`text-[11px] sm:text-xs font-semibold flex items-center ${
                  isFavorable ? 'text-[#10B981]' : 'text-[#EF4444]'
                }`}
              >
                {isPositive ? (
                  <ArrowUpRight className="w-3.5 h-3.5 mr-0.5 stroke-[2.5]" />
                ) : (
                  <ArrowDownRight className="w-3.5 h-3.5 mr-0.5 stroke-[2.5]" />
                )}
                {isPositive ? '+' : ''}
                {trendDelta.toFixed(1)}
                {trendUnit}
              </span>
            )
          ) : (
            <span className="text-[11px] text-[#9CA3AF]">—</span>
          )}

          {trendLabel && (
            <span className="text-[10px] text-[#9CA3AF] hidden 2xl:inline truncate max-w-[70px]">
              {trendLabel}
            </span>
          )}
        </div>

        {/* Mini Sparkline Chart - Strictly bounded with overflow-hidden */}
        {sparklinePath && (
          <div className="w-12 sm:w-14 h-5 sm:h-5.5 shrink-0 overflow-hidden rounded">
            <svg
              className="w-full h-full block"
              viewBox={`0 0 ${width} ${height}`}
              fill="none"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={sparklineColor} stopOpacity={0.25} />
                  <stop offset="100%" stopColor={sparklineColor} stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <path d={sparklineAreaPath} fill={`url(#${gradientId})`} />
              <path
                d={sparklinePath}
                stroke={sparklineColor}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};
