import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

interface KPICardProps {
  id?: string;
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ComponentType<{ className?: string }>;
  delta?: number;
  deltaLabel?: string;
  isPositiveGood?: boolean;
  valueSuffix?: string;
  neutralTrend?: boolean;
}

export const KPICard: React.FC<KPICardProps> = ({
  id,
  title,
  value,
  subtitle,
  icon: Icon,
  delta,
  deltaLabel = 'vs prev period',
  isPositiveGood = true,
  valueSuffix = '',
  neutralTrend = false,
}) => {
  const hasDelta = delta !== undefined;
  const isPositive = hasDelta && delta > 0;
  const isZero = hasDelta && Math.abs(delta) < 0.1;
  const isGood = isPositiveGood ? isPositive : !isPositive;

  return (
    <div
      id={id}
      className="bg-white rounded-xl border border-[#E5E7EB] p-5 shadow-xs transition-all hover:border-[#D1D5DB] flex flex-col justify-between"
    >
      <div className="flex items-start justify-between">
        <span className="text-xs font-medium text-[#6B7280] uppercase tracking-wider line-clamp-1">
          {title}
        </span>
        <div className="w-8 h-8 rounded-lg bg-[#F9FAFB] border border-[#E5E7EB] flex items-center justify-center text-[#4F46E5] shrink-0">
          <Icon className="w-4 h-4" />
        </div>
      </div>

      <div className="mt-3">
        <div className="flex items-baseline space-x-1">
          <span className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111827]">
            {value}
          </span>
          {valueSuffix && (
            <span className="text-sm font-medium text-[#6B7280]">{valueSuffix}</span>
          )}
        </div>
        {subtitle && (
          <p className="mt-1 text-xs text-[#6B7280] line-clamp-1">{subtitle}</p>
        )}
      </div>

      {hasDelta && (
        <div className="mt-3.5 pt-3 border-t border-[#F3F4F6] flex items-center space-x-1.5 text-xs">
          {neutralTrend || isZero ? (
            <span className="inline-flex items-center text-[#6B7280] font-medium">
              <Minus className="w-3.5 h-3.5 mr-0.5" />
              0.0%
            </span>
          ) : (
            <span
              className={`inline-flex items-center font-medium ${
                isGood ? 'text-[#10B981]' : 'text-[#EF4444]'
              }`}
            >
              {isPositive ? (
                <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
              ) : (
                <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />
              )}
              {isPositive ? '+' : ''}
              {delta.toFixed(1)}%
            </span>
          )}
          <span className="text-[#9CA3AF] text-[11px] truncate">{deltaLabel}</span>
        </div>
      )}
    </div>
  );
};
