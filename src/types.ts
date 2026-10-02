export type StateName = 'Lagos' | 'Delta' | 'Kano' | 'Ekiti';

export type DateRangeOption = '3m' | '6m' | '12m';

export type ReportStatus = 'On Time' | 'Late' | 'Missing';

export type CaseStatus = 'Reported' | 'Under Review' | 'Reviewed — Recommendations Issued';

export interface Facility {
  id: string;
  name: string;
  state: StateName;
  lga: string;
  skilledAttendants: number;
  hasBloodBank: boolean;
  onboardedMonthIndex: number; // 0 to 11 (within the past 12 months)
  onboardedDate: string;
  facilityLead: string;
}

export interface MonthlyFacilityData {
  facilityId: string;
  monthIndex: number; // 0 to 11 (0 = Oct 2025, 11 = Sep 2026)
  monthLabel: string;
  womenRegistered: number;
  ancVisitsTotal: number;
  ancCompletionRate: number; // % completing 8 visits
  earlyBookingRate: number; // % 1st trimester booking
  ancVisitsFunnel: {
    v1: number;
    v2: number;
    v3: number;
    v4: number;
    v5: number;
    v6: number;
    v7: number;
    v8: number;
  };
  facilityDeliveryRate: number;
  deliveries: {
    formalFacility: number;
    tba: number;
    transferred: number;
  };
  transferReasons: {
    obstructedLabor: number;
    postpartumHemorrhage: number;
    eclampsia: number;
    fetalDistress: number;
    severeAnemia: number;
  };
  maternalDeaths: number;
  deathContributingFactors: {
    delayedReferral: number;
    noBloodBank: number;
    noTrainedAttendant: number;
    transportDelay: number;
    other: number;
  };
  reportStatus: ReportStatus;
  submissionDate: string;
  riskSplit: {
    low: number;
    medium: number;
    high: number;
  };
  highRiskFollowUpCount: number;
  serviceUtilization: {
    newPatients: number;
    returningPatients: number;
    routineAnc: number;
    highRiskManagement: number;
    emergencyObstetricCare: number;
    referralOnly: number;
    recoveredDischarged: number;
    ongoingCare: number;
    referred: number;
    deceased: number;
  };
}

export interface CaseReview {
  id: string;
  facilityId: string;
  facilityName: string;
  state: StateName;
  date: string;
  status: CaseStatus;
  primaryFactor: string;
  gestationalAge: string;
  summary: string;
  recommendations: string[];
}

export interface FilterState {
  dateRange: DateRangeOption;
  selectedState: 'All' | StateName;
  selectedFacilityId: 'All' | string;
  searchQuery: string;
}
