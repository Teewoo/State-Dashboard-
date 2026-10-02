export interface BenchmarkItem {
  id: string;
  name: string;
  target: number; // numeric target (e.g. 70 for 70%, 120 for 120 per 100k, etc.)
  unit: string; // '%', 'per 100k', 'count', etc.
  format: 'percentage' | 'rate' | 'count' | 'ratio';
  direction: 'higher_is_better' | 'lower_is_better';
  description: string;
  warningThresholdDelta: number; // e.g. -5 points is warning, worse is critical
}

export const PROGRAMME_BENCHMARKS: Record<string, BenchmarkItem> = {
  womenRegistered: {
    id: 'womenRegistered',
    name: 'Pregnant Women Registered',
    target: 2400, // Benchmark scaled to period/network
    unit: '',
    format: 'count',
    direction: 'higher_is_better',
    description: 'Target maternal registrations for active facilities',
    warningThresholdDelta: -200,
  },
  ancVisitsTotal: {
    id: 'ancVisitsTotal',
    name: 'Total ANC Visits Recorded',
    target: 9500,
    unit: '',
    format: 'count',
    direction: 'higher_is_better',
    description: 'Total clinical antenatal consults recorded across facilities',
    warningThresholdDelta: -800,
  },
  ancCompletion: {
    id: 'ancCompletion',
    name: 'ANC 8-Visit Completion',
    target: 70,
    unit: '%',
    format: 'percentage',
    direction: 'higher_is_better',
    description: 'Women completing all 8 recommended ANC visits',
    warningThresholdDelta: -5, // 65-69% is Warning, <65% is Critical
  },
  earlyBooking: {
    id: 'earlyBooking',
    name: '1st Trimester Booking',
    target: 60,
    unit: '%',
    format: 'percentage',
    direction: 'higher_is_better',
    description: 'Women starting ANC in the 1st trimester (before 13 weeks)',
    warningThresholdDelta: -5,
  },
  facilityDelivery: {
    id: 'facilityDelivery',
    name: 'Formal Facility Delivery',
    target: 80,
    unit: '%',
    format: 'percentage',
    direction: 'higher_is_better',
    description: 'Deliveries occurring in a formal accredited health facility',
    warningThresholdDelta: -5,
  },
  highRiskFollowUp: {
    id: 'highRiskFollowUp',
    name: 'High-Risk Follow-Up',
    target: 90,
    unit: '%',
    format: 'percentage',
    direction: 'higher_is_better',
    description: 'High-risk women receiving recommended clinical follow-up',
    warningThresholdDelta: -5,
  },
  maternalMortalityIncidence: {
    id: 'maternalMortalityIncidence',
    name: 'Recorded Maternal Mortality Incidence',
    target: 120, // Programme threshold per 100,000 deliveries
    unit: 'per 100k',
    format: 'ratio',
    direction: 'lower_is_better',
    description: 'Recorded maternal deaths per 100,000 facility deliveries',
    warningThresholdDelta: 20, // >120 up to 140 is Warning, >140 is Critical
  },
  onTimeReporting: {
    id: 'onTimeReporting',
    name: 'On-Time Facility Reporting',
    target: 90,
    unit: '%',
    format: 'percentage',
    direction: 'higher_is_better',
    description: 'Monthly surveillance logs submitted by the 7th of the month',
    warningThresholdDelta: -5,
  },
  referralCompletion: {
    id: 'referralCompletion',
    name: 'Referral Completion Rate',
    target: 90,
    unit: '%',
    format: 'percentage',
    direction: 'higher_is_better',
    description: 'Complication transfers tracked to tertiary receipt',
    warningThresholdDelta: -5,
  },
};

export type BenchmarkStatus = 'success' | 'warning' | 'critical';

export interface BenchmarkEvaluation {
  currentValue: number;
  target: number;
  variance: number; // positive means above target, negative means below
  variancePts: number;
  varianceFormatted: string;
  status: BenchmarkStatus;
  statusLabel: string;
  isAboveTarget: boolean;
  isBetterThanTarget: boolean;
}

export function evaluateBenchmark(
  metricId: keyof typeof PROGRAMME_BENCHMARKS,
  currentValue: number,
  customTarget?: number
): BenchmarkEvaluation {
  const benchmark = PROGRAMME_BENCHMARKS[metricId];
  const target = customTarget !== undefined ? customTarget : benchmark ? benchmark.target : 100;
  const direction = benchmark ? benchmark.direction : 'higher_is_better';
  const unit = benchmark ? benchmark.unit : '%';
  const isPercentage = unit === '%';

  const variance = currentValue - target;
  const variancePts = Math.round(variance * 10) / 10;

  let isBetterThanTarget = false;
  let status: BenchmarkStatus = 'success';

  if (direction === 'higher_is_better') {
    isBetterThanTarget = currentValue >= target;
    if (currentValue >= target) {
      status = 'success';
    } else if (currentValue >= target + (benchmark?.warningThresholdDelta ?? -5)) {
      status = 'warning';
    } else {
      status = 'critical';
    }
  } else {
    // Lower is better (e.g. mortality incidence)
    isBetterThanTarget = currentValue <= target;
    if (currentValue <= target) {
      status = 'success';
    } else if (currentValue <= target + (benchmark?.warningThresholdDelta ?? 20)) {
      status = 'warning';
    } else {
      status = 'critical';
    }
  }

  const sign = variancePts > 0 ? '+' : '';
  const ptsSuffix = isPercentage ? ' pts' : ` ${unit}`.trim();
  const varianceFormatted = `${sign}${variancePts}${ptsSuffix} ${
    isBetterThanTarget ? (direction === 'lower_is_better' ? 'below threshold' : 'above target') : (direction === 'lower_is_better' ? 'above threshold' : 'below target')
  }`;

  const statusLabel =
    status === 'success'
      ? direction === 'lower_is_better' ? 'Within Threshold' : 'Above Target'
      : status === 'warning'
      ? 'Near Target'
      : direction === 'lower_is_better' ? 'Exceeds Threshold' : 'Below Target';

  return {
    currentValue,
    target,
    variance,
    variancePts,
    varianceFormatted,
    status,
    statusLabel,
    isAboveTarget: variance >= 0,
    isBetterThanTarget,
  };
}
