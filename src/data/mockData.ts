import { CaseReview, Facility, FilterState, MonthlyFacilityData, StateName } from '../types';

export const MONTH_LABELS = [
  'Oct 2025',
  'Nov 2025',
  'Dec 2025',
  'Jan 2026',
  'Feb 2026',
  'Mar 2026',
  'Apr 2026',
  'May 2026',
  'Jun 2026',
  'Jul 2026',
  'Aug 2026',
  'Sep 2026',
];

// Seeded pseudorandom number generator for deterministic datasets
function createSeededRandom(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return function () {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export const FACILITIES: Facility[] = [
  // Lagos (5 facilities)
  {
    id: 'lag-01',
    name: 'Island Maternity Hospital',
    state: 'Lagos',
    lga: 'Lagos Island',
    skilledAttendants: 22,
    hasBloodBank: true,
    onboardedMonthIndex: 0,
    onboardedDate: '2025-10-04',
    facilityLead: 'Dr. Folashade Adeyemi',
  },
  {
    id: 'lag-02',
    name: 'Alimosho General Hospital',
    state: 'Lagos',
    lga: 'Alimosho',
    skilledAttendants: 16,
    hasBloodBank: true,
    onboardedMonthIndex: 1,
    onboardedDate: '2025-11-12',
    facilityLead: 'Dr. Babatunde Sanusi',
  },
  {
    id: 'lag-03',
    name: 'Randle General Hospital',
    state: 'Lagos',
    lga: 'Surulere',
    skilledAttendants: 14,
    hasBloodBank: false,
    onboardedMonthIndex: 2,
    onboardedDate: '2025-12-08',
    facilityLead: 'Nurse Matron N. Okon',
  },
  {
    id: 'lag-04',
    name: 'Ikorodu General Hospital',
    state: 'Lagos',
    lga: 'Ikorodu',
    skilledAttendants: 18,
    hasBloodBank: true,
    onboardedMonthIndex: 3,
    onboardedDate: '2026-01-15',
    facilityLead: 'Dr. Kehinde Balogun',
  },
  {
    id: 'lag-05',
    name: 'Gbagada General Hospital',
    state: 'Lagos',
    lga: 'Kosofe',
    skilledAttendants: 15,
    hasBloodBank: true,
    onboardedMonthIndex: 4,
    onboardedDate: '2026-02-20',
    facilityLead: 'Dr. Olawale Ojo',
  },

  // Delta (5 facilities)
  {
    id: 'del-01',
    name: 'Central Hospital, Warri',
    state: 'Delta',
    lga: 'Warri South',
    skilledAttendants: 17,
    hasBloodBank: true,
    onboardedMonthIndex: 0,
    onboardedDate: '2025-10-10',
    facilityLead: 'Dr. Ejiro Oghenekaro',
  },
  {
    id: 'del-02',
    name: 'Asaba Specialist Hospital',
    state: 'Delta',
    lga: 'Oshimili South',
    skilledAttendants: 19,
    hasBloodBank: true,
    onboardedMonthIndex: 1,
    onboardedDate: '2025-11-05',
    facilityLead: 'Dr. Chinedu Okafor',
  },
  {
    id: 'del-03',
    name: 'General Hospital, Sapele',
    state: 'Delta',
    lga: 'Sapele',
    skilledAttendants: 9,
    hasBloodBank: false,
    onboardedMonthIndex: 2,
    onboardedDate: '2025-12-14',
    facilityLead: 'Midwife Patience Emeke',
  },
  {
    id: 'del-04',
    name: 'Eku Baptist Government Hospital',
    state: 'Delta',
    lga: 'Ethiope East',
    skilledAttendants: 8,
    hasBloodBank: true,
    onboardedMonthIndex: 4,
    onboardedDate: '2026-02-18',
    facilityLead: 'Dr. Onome Igho',
  },
  {
    id: 'del-05',
    name: 'General Hospital, Agbor',
    state: 'Delta',
    lga: 'Ika South',
    skilledAttendants: 11,
    hasBloodBank: false,
    onboardedMonthIndex: 5,
    onboardedDate: '2026-03-22',
    facilityLead: 'Nurse Supervisor B. Ossai',
  },

  // Kano (5 facilities)
  {
    id: 'kan-01',
    name: 'Murtala Muhammad Specialist Hospital',
    state: 'Kano',
    lga: 'Kano Municipal',
    skilledAttendants: 21,
    hasBloodBank: true,
    onboardedMonthIndex: 0,
    onboardedDate: '2025-10-01',
    facilityLead: 'Dr. Aminu Danbatta',
  },
  {
    id: 'kan-02',
    name: 'Muhammad Abdullahi Wase Teaching Hospital',
    state: 'Kano',
    lga: 'Nassarawa',
    skilledAttendants: 18,
    hasBloodBank: true,
    onboardedMonthIndex: 2,
    onboardedDate: '2025-12-02',
    facilityLead: 'Dr. Halima Bello',
  },
  {
    id: 'kan-03',
    name: 'Bichi General Hospital',
    state: 'Kano',
    lga: 'Bichi',
    skilledAttendants: 7,
    hasBloodBank: false,
    onboardedMonthIndex: 3,
    onboardedDate: '2026-01-28',
    facilityLead: 'Malam Ibrahim Gwarzo',
  },
  {
    id: 'kan-04',
    name: 'Wudil General Hospital',
    state: 'Kano',
    lga: 'Wudil',
    skilledAttendants: 8,
    hasBloodBank: false,
    onboardedMonthIndex: 5,
    onboardedDate: '2026-03-10',
    facilityLead: 'Dr. Sani Mustapha',
  },
  {
    id: 'kan-05',
    name: 'Gwarzo General Hospital',
    state: 'Kano',
    lga: 'Gwarzo',
    skilledAttendants: 6,
    hasBloodBank: false,
    onboardedMonthIndex: 6,
    onboardedDate: '2026-04-14',
    facilityLead: 'Midwife Fatima Lawan',
  },

  // Ekiti (5 facilities)
  {
    id: 'eki-01',
    name: 'Ekiti State University Teaching Hospital',
    state: 'Ekiti',
    lga: 'Ado-Ekiti',
    skilledAttendants: 20,
    hasBloodBank: true,
    onboardedMonthIndex: 0,
    onboardedDate: '2025-10-18',
    facilityLead: 'Dr. Kayode Fashanu',
  },
  {
    id: 'eki-02',
    name: 'State Specialist Hospital, Ikole-Ekiti',
    state: 'Ekiti',
    lga: 'Ikole',
    skilledAttendants: 10,
    hasBloodBank: true,
    onboardedMonthIndex: 2,
    onboardedDate: '2025-12-19',
    facilityLead: 'Dr. Ayodele Adeleke',
  },
  {
    id: 'eki-03',
    name: 'General Hospital, Ijero-Ekiti',
    state: 'Ekiti',
    lga: 'Ijero',
    skilledAttendants: 8,
    hasBloodBank: false,
    onboardedMonthIndex: 4,
    onboardedDate: '2026-02-25',
    facilityLead: 'Nurse Bukola Dada',
  },
  {
    id: 'eki-04',
    name: 'Comprehensive Health Centre, Oye-Ekiti',
    state: 'Ekiti',
    lga: 'Oye',
    skilledAttendants: 7,
    hasBloodBank: false,
    onboardedMonthIndex: 6,
    onboardedDate: '2026-04-05',
    facilityLead: 'Midwife Toyin Olatunji',
  },
  {
    id: 'eki-05',
    name: 'General Hospital, Ise-Ekiti',
    state: 'Ekiti',
    lga: 'Ise/Orun',
    skilledAttendants: 6,
    hasBloodBank: false,
    onboardedMonthIndex: 7,
    onboardedDate: '2026-05-11',
    facilityLead: 'Dr. Seyi Alabi',
  },
];

// Generate deterministic monthly data for all 20 facilities across 12 months
export function generateMonthlyData(): MonthlyFacilityData[] {
  const data: MonthlyFacilityData[] = [];
  const rng = createSeededRandom(42981);

  FACILITIES.forEach((facility, fIndex) => {
    // Facility capacity factor based on staffing
    const baseCapacity = 45 + facility.skilledAttendants * 5;

    for (let m = 0; m < 12; m++) {
      // Seasonal/programme progression over 12 months (gradual improvement in early booking and completion)
      const progFactor = 1 + (m / 11) * 0.18;
      const noise = (rng() - 0.5) * 0.15;

      const womenRegistered = Math.round(baseCapacity * progFactor * (1 + noise));

      // ANC visits funnel calculation (stepped dropout)
      // v1 is nearly all registered women
      const v1 = womenRegistered;
      const v2 = Math.round(v1 * (0.92 + rng() * 0.04));
      const v3 = Math.round(v2 * (0.90 + rng() * 0.04));
      // Noticeable drop between v3 and v4 (e.g. 2nd to 3rd trimester transport or harvest season)
      const v4 = Math.round(v3 * (0.80 + rng() * 0.04));
      const v5 = Math.round(v4 * (0.91 + rng() * 0.03));
      const v6 = Math.round(v5 * (0.89 + rng() * 0.03));
      const v7 = Math.round(v6 * (0.88 + rng() * 0.03));
      const v8 = Math.round(v7 * (0.86 + rng() * 0.04));

      const ancVisitsTotal = v1 + v2 + v3 + v4 + v5 + v6 + v7 + v8;
      const ancCompletionRate = Math.min(95, Math.max(40, Math.round((v8 / v1) * 100)));

      // Early booking rate (1st trimester booking) improves over time with outreach
      const stateBonus = facility.state === 'Lagos' ? 8 : facility.state === 'Ekiti' ? 6 : facility.state === 'Delta' ? 4 : 0;
      const earlyBookingRate = Math.min(88, Math.max(30, Math.round(36 + stateBonus + m * 2.2 + (rng() - 0.5) * 6)));

      // Facility deliveries vs TBA vs Transferred
      const deliveryBase = Math.round(womenRegistered * (0.82 + rng() * 0.08));
      const facilityDeliveryShare = 0.72 + (facility.hasBloodBank ? 0.08 : 0) + (m * 0.012) + (rng() - 0.5) * 0.05;
      const clampedFacilityShare = Math.min(0.94, Math.max(0.55, facilityDeliveryShare));

      const formalFacility = Math.round(deliveryBase * clampedFacilityShare);
      const remainingDeliveries = Math.max(0, deliveryBase - formalFacility);
      const transferred = Math.round(remainingDeliveries * (0.35 + rng() * 0.15));
      const tba = Math.max(0, remainingDeliveries - transferred);

      const actualFacilityDeliveryRate = Math.round((formalFacility / deliveryBase) * 100);

      // Complication transfers reasons
      const ob = Math.round(transferred * 0.38);
      const pph = Math.round(transferred * 0.28);
      const ecl = Math.round(transferred * 0.18);
      const fd = Math.round(transferred * 0.10);
      const sa = Math.max(0, transferred - (ob + pph + ecl + fd));

      // Maternal deaths: very rare, mostly 0. Occasionally 1 in large tertiary hospitals (fIndex % 6 === 0)
      let maternalDeaths = 0;
      const deathChance = facility.hasBloodBank ? 0.06 : 0.14;
      if (rng() < deathChance && m % 3 === 0) {
        maternalDeaths = 1;
      }

      const deathFactors = {
        delayedReferral: maternalDeaths > 0 && rng() > 0.4 ? 1 : 0,
        noBloodBank: maternalDeaths > 0 && !facility.hasBloodBank ? 1 : 0,
        noTrainedAttendant: maternalDeaths > 0 && facility.skilledAttendants < 8 ? 1 : 0,
        transportDelay: maternalDeaths > 0 && rng() > 0.6 ? 1 : 0,
        other: 0,
      };
      if (maternalDeaths > 0 && !deathFactors.delayedReferral && !deathFactors.noBloodBank && !deathFactors.noTrainedAttendant && !deathFactors.transportDelay) {
        deathFactors.other = 1;
      }

      // ARS Risk assessment split: roughly 58% Low, 29% Medium, 13% High
      const highRiskCount = Math.max(2, Math.round(womenRegistered * (0.11 + (rng() - 0.5) * 0.03)));
      const medRiskCount = Math.round(womenRegistered * (0.28 + (rng() - 0.5) * 0.04));
      const lowRiskCount = Math.max(5, womenRegistered - highRiskCount - medRiskCount);

      // Follow-up on high risk women
      const highRiskFollowUpCount = Math.round(highRiskCount * (0.88 + rng() * 0.08));

      // Monthly reporting status
      let reportStatus: 'On Time' | 'Late' | 'Missing' = 'On Time';
      const statusRoll = rng();
      if (m === 11) { // Current month
        if (statusRoll < 0.10) {
          reportStatus = 'Missing';
        } else if (statusRoll < 0.25) {
          reportStatus = 'Late';
        } else {
          reportStatus = 'On Time';
        }
      } else {
        if (statusRoll < 0.05) {
          reportStatus = 'Missing';
        } else if (statusRoll < 0.18) {
          reportStatus = 'Late';
        } else {
          reportStatus = 'On Time';
        }
      }

      // Submission date text
      const monthNum = ((m + 9) % 12) + 1;
      const year = m < 3 ? 2025 : 2026;
      const subDay = reportStatus === 'On Time' ? 3 + Math.floor(rng() * 3) : reportStatus === 'Late' ? 8 + Math.floor(rng() * 8) : 0;
      const submissionDate = reportStatus === 'Missing' 
        ? 'Not Received' 
        : `${year}-${String(monthNum).padStart(2, '0')}-${String(subDay).padStart(2, '0')}`;

      // Service utilization
      const newPatients = Math.round(womenRegistered * (0.42 + rng() * 0.06));
      const returningPatients = Math.max(10, Math.round(ancVisitsTotal * 0.35));
      const totalTreated = newPatients + returningPatients;

      const routineAnc = Math.round(totalTreated * 0.62);
      const highRiskManagement = Math.round(totalTreated * 0.22);
      const emergencyObstetricCare = Math.round(totalTreated * 0.11);
      const referralOnly = Math.max(2, totalTreated - (routineAnc + highRiskManagement + emergencyObstetricCare));

      const deceased = maternalDeaths;
      const referred = referralOnly + transferred;
      const recoveredDischarged = Math.round((totalTreated - deceased - referred) * 0.74);
      const ongoingCare = Math.max(5, totalTreated - deceased - referred - recoveredDischarged);

      data.push({
        facilityId: facility.id,
        monthIndex: m,
        monthLabel: MONTH_LABELS[m],
        womenRegistered,
        ancVisitsTotal,
        ancCompletionRate,
        earlyBookingRate,
        ancVisitsFunnel: { v1, v2, v3, v4, v5, v6, v7, v8 },
        facilityDeliveryRate: actualFacilityDeliveryRate,
        deliveries: {
          formalFacility,
          tba,
          transferred,
        },
        transferReasons: {
          obstructedLabor: ob,
          postpartumHemorrhage: pph,
          eclampsia: ecl,
          fetalDistress: fd,
          severeAnemia: sa,
        },
        maternalDeaths,
        deathContributingFactors: deathFactors,
        reportStatus,
        submissionDate,
        riskSplit: {
          low: lowRiskCount,
          medium: medRiskCount,
          high: highRiskCount,
        },
        highRiskFollowUpCount,
        serviceUtilization: {
          newPatients,
          returningPatients,
          routineAnc,
          highRiskManagement,
          emergencyObstetricCare,
          referralOnly,
          recoveredDischarged,
          ongoingCare,
          referred,
          deceased,
        },
      });
    }
  });

  return data;
}

export const ALL_MONTHLY_DATA = generateMonthlyData();

// Case reviews list for Outcome Review page
export const CASE_REVIEWS: CaseReview[] = [
  {
    id: 'CASE-2026-092',
    facilityId: 'kan-03',
    facilityName: 'Bichi General Hospital',
    state: 'Kano',
    date: '18 Aug 2026',
    status: 'Reviewed — Recommendations Issued',
    primaryFactor: 'Delayed Referral & Transport Failure',
    gestationalAge: '39 weeks + 3 days',
    summary: 'Primigravida (age 19) presented with obstructed labor after 16 hours of unassisted labor at home. Transit to tertiary care delayed by 3.5 hours due to lack of dedicated ambulance fuel allocation.',
    recommendations: [
      'Establish guaranteed emergency transport fund at Bichi LGA health authority.',
      'Train community health extension workers on recognizing labor arrest before hour 8.',
      'Equip facility with pneumatic anti-shock garments (NASG).'
    ]
  },
  {
    id: 'CASE-2026-088',
    facilityId: 'del-03',
    facilityName: 'General Hospital, Sapele',
    state: 'Delta',
    date: '02 Aug 2026',
    status: 'Under Review',
    primaryFactor: 'No Blood Bank Access (PPH)',
    gestationalAge: '38 weeks + 1 day',
    summary: 'Gravida 3 Para 2 with severe postpartum hemorrhage following spontaneous vaginal delivery. Facility had zero units of O-negative blood compatible in cold storage.',
    recommendations: [
      'Fast-track hub-and-spoke blood delivery corridor from Central Hospital Warri.',
      'Routine pre-delivery maternal hemoglobin screening at ANC Visit 6.'
    ]
  },
  {
    id: 'CASE-2026-074',
    facilityId: 'lag-03',
    facilityName: 'Randle General Hospital',
    state: 'Lagos',
    date: '14 Jul 2026',
    status: 'Reviewed — Recommendations Issued',
    primaryFactor: 'Severe Eclampsia / Late Arrival',
    gestationalAge: '34 weeks',
    summary: 'Patient had missed ANC visits 3 through 6. Presented with status epilepticus and BP 190/120 mmHg. Resuscitation initiated but delayed magnesium sulfate administration by 45 minutes.',
    recommendations: [
      'Pre-pack emergency magnesium sulfate protocol kits in delivery triage area.',
      'Trigger automatic ARS SMS alerts for mothers missing two consecutive ANC visits.'
    ]
  },
  {
    id: 'CASE-2026-061',
    facilityId: 'eki-03',
    facilityName: 'General Hospital, Ijero-Ekiti',
    state: 'Ekiti',
    date: '26 Jun 2026',
    status: 'Reviewed — Recommendations Issued',
    primaryFactor: 'Delayed Referral from Traditional Birth Attendant',
    gestationalAge: '40 weeks',
    summary: 'Patient spent 22 hours under TBA care before being brought to hospital in septic shock following premature rupture of membranes and uterine rupture.',
    recommendations: [
      'Expand TBA incentive partnership scheme where TBAs receive transport stipend for early facility handoffs.',
      'Community dialogue with traditional village leaders in Ijero local government area.'
    ]
  },
  {
    id: 'CASE-2026-045',
    facilityId: 'kan-04',
    facilityName: 'Wudil General Hospital',
    state: 'Kano',
    date: '11 May 2026',
    status: 'Reported',
    primaryFactor: 'No Trained Attendant Present on Night Shift',
    gestationalAge: '37 weeks + 5 days',
    summary: 'Midnight admission during thunderstorm when duty midwife was stranded offsite. Auxiliary assistant unable to manage shoulder dystocia.',
    recommendations: [
      'Mandatory on-premise quarters for on-call skilled birth attendants.',
      'Standardized night shift roster with backup roster phone tree.'
    ]
  },
];

// Helper to filter data based on selected filters
export function getFilteredData(filters: FilterState) {
  // Determine month range
  // 12m: index 0 to 11
  // 6m: index 6 to 11
  // 3m: index 9 to 11
  const startMonthIndex = filters.dateRange === '3m' ? 9 : filters.dateRange === '6m' ? 6 : 0;
  const currentMonthIndices = Array.from({ length: 12 - startMonthIndex }, (_, i) => startMonthIndex + i);

  // For trend comparison: prior period of equal length
  const periodLength = currentMonthIndices.length;
  const priorStartMonthIndex = Math.max(0, startMonthIndex - periodLength);
  const priorMonthIndices = Array.from({ length: periodLength }, (_, i) => priorStartMonthIndex + i);

  // Facility filter
  let eligibleFacilities = FACILITIES;
  if (filters.selectedState !== 'All') {
    eligibleFacilities = eligibleFacilities.filter((f) => f.state === filters.selectedState);
  }
  if (filters.selectedFacilityId !== 'All') {
    eligibleFacilities = eligibleFacilities.filter((f) => f.id === filters.selectedFacilityId);
  }

  const eligibleFacilityIds = new Set(eligibleFacilities.map((f) => f.id));

  const currentRecords = ALL_MONTHLY_DATA.filter(
    (r) => eligibleFacilityIds.has(r.facilityId) && currentMonthIndices.includes(r.monthIndex)
  );

  const priorRecords = ALL_MONTHLY_DATA.filter(
    (r) => eligibleFacilityIds.has(r.facilityId) && priorMonthIndices.includes(r.monthIndex)
  );

  return {
    facilities: eligibleFacilities,
    currentRecords,
    priorRecords,
    currentMonthIndices,
    priorMonthIndices,
    monthLabels: currentMonthIndices.map((i) => MONTH_LABELS[i]),
  };
}

// Compute aggregate metrics and comparison
export function computeAggregates(filters: FilterState) {
  const { facilities, currentRecords, priorRecords, currentMonthIndices, monthLabels } = getFilteredData(filters);

  // Current sums
  const womenRegistered = currentRecords.reduce((sum, r) => sum + r.womenRegistered, 0);
  const ancVisitsTotal = currentRecords.reduce((sum, r) => sum + r.ancVisitsTotal, 0);
  
  // Prior sums for percentage delta
  const priorWomen = priorRecords.reduce((sum, r) => sum + r.womenRegistered, 0);
  const priorAncVisits = priorRecords.reduce((sum, r) => sum + r.ancVisitsTotal, 0);

  // Rates (weighted averages)
  const avgAncCompletion = currentRecords.length > 0 
    ? Math.round(currentRecords.reduce((sum, r) => sum + r.ancCompletionRate, 0) / currentRecords.length)
    : 0;
  const priorAncCompletion = priorRecords.length > 0 
    ? Math.round(priorRecords.reduce((sum, r) => sum + r.ancCompletionRate, 0) / priorRecords.length)
    : 0;

  const avgEarlyBooking = currentRecords.length > 0
    ? Math.round(currentRecords.reduce((sum, r) => sum + r.earlyBookingRate, 0) / currentRecords.length)
    : 0;
  const priorEarlyBooking = priorRecords.length > 0
    ? Math.round(priorRecords.reduce((sum, r) => sum + r.earlyBookingRate, 0) / priorRecords.length)
    : 0;

  // Deliveries
  const formalDeliveries = currentRecords.reduce((sum, r) => sum + r.deliveries.formalFacility, 0);
  const tbaDeliveries = currentRecords.reduce((sum, r) => sum + r.deliveries.tba, 0);
  const transferredDeliveries = currentRecords.reduce((sum, r) => sum + r.deliveries.transferred, 0);
  const totalDeliveries = formalDeliveries + tbaDeliveries + transferredDeliveries;

  const priorFormal = priorRecords.reduce((sum, r) => sum + r.deliveries.formalFacility, 0);
  const priorTotalDeliveries = priorRecords.reduce((sum, r) => sum + r.deliveries.formalFacility + r.deliveries.tba + r.deliveries.transferred, 0);
  
  const facilityDeliveryRate = totalDeliveries > 0 ? Math.round((formalDeliveries / totalDeliveries) * 100) : 0;
  const priorFacilityDeliveryRate = priorTotalDeliveries > 0 ? Math.round((priorFormal / priorTotalDeliveries) * 100) : 0;

  // Maternal deaths and recorded mortality incidence per 100,000 deliveries
  const totalMaternalDeaths = currentRecords.reduce((sum, r) => sum + r.maternalDeaths, 0);
  const priorMaternalDeaths = priorRecords.reduce((sum, r) => sum + r.maternalDeaths, 0);

  const recordedMortalityIncidence = totalDeliveries > 0 
    ? Math.round((totalMaternalDeaths / totalDeliveries) * 100000) 
    : 0;
  const priorRecordedMortalityIncidence = priorTotalDeliveries > 0 
    ? Math.round((priorMaternalDeaths / priorTotalDeliveries) * 100000) 
    : 0;
  const mortalityIncidenceDelta = recordedMortalityIncidence - priorRecordedMortalityIncidence;

  // Referral completion rate: transferred patients tracked and completed
  const referralCompletionRate = transferredDeliveries > 0 
    ? Math.min(100, Math.round(91 + (currentRecords.length % 5) - 2)) 
    : 92;

  // Target calibrations scaled to filter scope (number of facilities and months)
  const numMonths = currentMonthIndices.length;
  const numFacilities = facilities.length;
  const targetWomenRegistered = Math.round(numFacilities * numMonths * 21);
  const targetAncVisits = Math.round(numFacilities * numMonths * 92);

  // Reporting submissions in period
  const totalExpectedReports = currentRecords.length;
  const submittedReports = currentRecords.filter((r) => r.reportStatus !== 'Missing').length;
  const onTimeReports = currentRecords.filter((r) => r.reportStatus === 'On Time').length;
  const lateReports = currentRecords.filter((r) => r.reportStatus === 'Late').length;
  const missingReports = currentRecords.filter((r) => r.reportStatus === 'Missing').length;

  // ARS Risk classifications
  const totalLowRisk = currentRecords.reduce((sum, r) => sum + r.riskSplit.low, 0);
  const totalMedRisk = currentRecords.reduce((sum, r) => sum + r.riskSplit.medium, 0);
  const totalHighRisk = currentRecords.reduce((sum, r) => sum + r.riskSplit.high, 0);
  const totalAssessed = totalLowRisk + totalMedRisk + totalHighRisk;

  const totalHighRiskFollowUp = currentRecords.reduce((sum, r) => sum + r.highRiskFollowUpCount, 0);
  const highRiskFollowUpRate = totalHighRisk > 0 ? Math.round((totalHighRiskFollowUp / totalHighRisk) * 100) : 0;
  const priorHighRisk = priorRecords.reduce((sum, r) => sum + r.riskSplit.high, 0);
  const priorHighRiskFollowUp = priorRecords.reduce((sum, r) => sum + r.highRiskFollowUpCount, 0);
  const priorHighRiskFollowUpRate = priorHighRisk > 0 ? Math.round((priorHighRiskFollowUp / priorHighRisk) * 100) : 0;
  const highRiskFollowUpDelta = highRiskFollowUpRate - priorHighRiskFollowUpRate;

  // Funnel sums across V1 to V8
  const funnel = {
    v1: currentRecords.reduce((sum, r) => sum + r.ancVisitsFunnel.v1, 0),
    v2: currentRecords.reduce((sum, r) => sum + r.ancVisitsFunnel.v2, 0),
    v3: currentRecords.reduce((sum, r) => sum + r.ancVisitsFunnel.v3, 0),
    v4: currentRecords.reduce((sum, r) => sum + r.ancVisitsFunnel.v4, 0),
    v5: currentRecords.reduce((sum, r) => sum + r.ancVisitsFunnel.v5, 0),
    v6: currentRecords.reduce((sum, r) => sum + r.ancVisitsFunnel.v6, 0),
    v7: currentRecords.reduce((sum, r) => sum + r.ancVisitsFunnel.v7, 0),
    v8: currentRecords.reduce((sum, r) => sum + r.ancVisitsFunnel.v8, 0),
  };

  // Find biggest drop off
  const funnelSteps = [
    { from: 'Visit 1', to: 'Visit 2', drop: funnel.v1 - funnel.v2, pct: funnel.v1 > 0 ? ((funnel.v1 - funnel.v2) / funnel.v1) * 100 : 0 },
    { from: 'Visit 2', to: 'Visit 3', drop: funnel.v2 - funnel.v3, pct: funnel.v2 > 0 ? ((funnel.v2 - funnel.v3) / funnel.v2) * 100 : 0 },
    { from: 'Visit 3', to: 'Visit 4', drop: funnel.v3 - funnel.v4, pct: funnel.v3 > 0 ? ((funnel.v3 - funnel.v4) / funnel.v3) * 100 : 0 },
    { from: 'Visit 4', to: 'Visit 5', drop: funnel.v4 - funnel.v5, pct: funnel.v4 > 0 ? ((funnel.v4 - funnel.v5) / funnel.v4) * 100 : 0 },
    { from: 'Visit 5', to: 'Visit 6', drop: funnel.v5 - funnel.v6, pct: funnel.v5 > 0 ? ((funnel.v5 - funnel.v6) / funnel.v5) * 100 : 0 },
    { from: 'Visit 6', to: 'Visit 7', drop: funnel.v6 - funnel.v7, pct: funnel.v6 > 0 ? ((funnel.v6 - funnel.v7) / funnel.v6) * 100 : 0 },
    { from: 'Visit 7', to: 'Visit 8', drop: funnel.v7 - funnel.v8, pct: funnel.v7 > 0 ? ((funnel.v7 - funnel.v8) / funnel.v7) * 100 : 0 },
  ];
  const biggestDrop = funnelSteps.reduce((max, step) => (step.drop > max.drop ? step : max), funnelSteps[0]);

  // Monthly trends for line charts
  const monthlyTrends = currentMonthIndices.map((mIdx) => {
    const monthRecs = currentRecords.filter((r) => r.monthIndex === mIdx);
    const mWomen = monthRecs.reduce((sum, r) => sum + r.womenRegistered, 0);
    const mEarlyRate = monthRecs.length > 0 ? Math.round(monthRecs.reduce((sum, r) => sum + r.earlyBookingRate, 0) / monthRecs.length) : 0;
    const mAncCompletion = monthRecs.length > 0 ? Math.round(monthRecs.reduce((sum, r) => sum + r.ancCompletionRate, 0) / monthRecs.length) : 0;
    const mFormal = monthRecs.reduce((sum, r) => sum + r.deliveries.formalFacility, 0);
    const mTotDeliv = monthRecs.reduce((sum, r) => sum + r.deliveries.formalFacility + r.deliveries.tba + r.deliveries.transferred, 0);
    const mDelivRate = mTotDeliv > 0 ? Math.round((mFormal / mTotDeliv) * 100) : 0;
    const mDeaths = monthRecs.reduce((sum, r) => sum + r.maternalDeaths, 0);
    const mNew = monthRecs.reduce((sum, r) => sum + r.serviceUtilization.newPatients, 0);
    const mReturning = monthRecs.reduce((sum, r) => sum + r.serviceUtilization.returningPatients, 0);
    const mMortalityIncidence = mTotDeliv > 0 ? Math.round((mDeaths / mTotDeliv) * 100000) : 0;

    return {
      monthLabel: MONTH_LABELS[mIdx],
      earlyBookingRate: mEarlyRate,
      ancCompletionRate: mAncCompletion,
      facilityDeliveryRate: mDelivRate,
      maternalDeaths: mDeaths,
      mortalityIncidence: mMortalityIncidence,
      totalDeliveries: mTotDeliv,
      womenRegistered: mWomen,
      newPatients: mNew,
      returningPatients: mReturning,
    };
  });

  // Facility ranking by ANC completion rate (worst first)
  const facilityAncRankings = facilities.map((fac) => {
    const fRecords = currentRecords.filter((r) => r.facilityId === fac.id);
    const avgCompletion = fRecords.length > 0 
      ? Math.round(fRecords.reduce((sum, r) => sum + r.ancCompletionRate, 0) / fRecords.length)
      : 0;
    const registered = fRecords.reduce((sum, r) => sum + r.womenRegistered, 0);
    const completedV8 = fRecords.reduce((sum, r) => sum + r.ancVisitsFunnel.v8, 0);
    return {
      id: fac.id,
      name: fac.name,
      state: fac.state,
      completionRate: avgCompletion,
      registered,
      completedV8,
      skilledAttendants: fac.skilledAttendants,
      hasBloodBank: fac.hasBloodBank,
    };
  }).sort((a, b) => a.completionRate - b.completionRate); // Worst first

  // Complication transfer reasons
  const transferReasons = [
    { reason: 'Obstructed Labor', count: currentRecords.reduce((sum, r) => sum + r.transferReasons.obstructedLabor, 0) },
    { reason: 'Postpartum Hemorrhage (PPH)', count: currentRecords.reduce((sum, r) => sum + r.transferReasons.postpartumHemorrhage, 0) },
    { reason: 'Severe Eclampsia / Hypertension', count: currentRecords.reduce((sum, r) => sum + r.transferReasons.eclampsia, 0) },
    { reason: 'Fetal Distress', count: currentRecords.reduce((sum, r) => sum + r.transferReasons.fetalDistress, 0) },
    { reason: 'Severe Anemia in Pregnancy', count: currentRecords.reduce((sum, r) => sum + r.transferReasons.severeAnemia, 0) },
  ].sort((a, b) => b.count - a.count);

  // Contributing factors to maternal death (outcome review)
  const deathContributingFactors = [
    { factor: 'Delayed Referral / Late Presentation', count: currentRecords.reduce((sum, r) => sum + r.deathContributingFactors.delayedReferral, 0) },
    { factor: 'No Blood Bank / Blood Storage Stockout', count: currentRecords.reduce((sum, r) => sum + r.deathContributingFactors.noBloodBank, 0) },
    { factor: 'Transport & Ambulance Delay', count: currentRecords.reduce((sum, r) => sum + r.deathContributingFactors.transportDelay, 0) },
    { factor: 'No Trained Attendant Present at Shift', count: currentRecords.reduce((sum, r) => sum + r.deathContributingFactors.noTrainedAttendant, 0) },
    { factor: 'Other Clinical Complications', count: currentRecords.reduce((sum, r) => sum + r.deathContributingFactors.other, 0) },
  ].sort((a, b) => b.count - a.count);

  // Service utilization breakdown
  const treatmentBreakdown = [
    { type: 'Routine ANC Care', count: currentRecords.reduce((sum, r) => sum + r.serviceUtilization.routineAnc, 0) },
    { type: 'High-Risk Management', count: currentRecords.reduce((sum, r) => sum + r.serviceUtilization.highRiskManagement, 0) },
    { type: 'Emergency Obstetric Care (EmOC)', count: currentRecords.reduce((sum, r) => sum + r.serviceUtilization.emergencyObstetricCare, 0) },
    { type: 'Specialist Referral Navigation', count: currentRecords.reduce((sum, r) => sum + r.serviceUtilization.referralOnly, 0) },
  ];

  const outcomesBreakdown = [
    { name: 'Recovered & Discharged', count: currentRecords.reduce((sum, r) => sum + r.serviceUtilization.recoveredDischarged, 0), color: '#10B981' },
    { name: 'Ongoing Clinical Care', count: currentRecords.reduce((sum, r) => sum + r.serviceUtilization.ongoingCare, 0), color: '#4F46E5' },
    { name: 'Referred to Tertiary Care', count: currentRecords.reduce((sum, r) => sum + r.serviceUtilization.referred, 0), color: '#F59E0B' },
    { name: 'Maternal Deaths', count: totalMaternalDeaths, color: '#EF4444' },
  ];

  // Latest month reporting status per facility
  const latestMonthIndex = 11;
  const latestMonthRecords = ALL_MONTHLY_DATA.filter(
    (r) => r.monthIndex === latestMonthIndex && (filters.selectedState === 'All' || facilities.some((f) => f.id === r.facilityId))
  );
  const latestMonthOnTimeCount = latestMonthRecords.filter((r) => r.reportStatus === 'On Time').length;
  const latestMonthTotal = latestMonthRecords.length;
  const latestMonthOnTimeRate = latestMonthTotal > 0 ? Math.round((latestMonthOnTimeCount / latestMonthTotal) * 100) : 0;

  // Cumulative facilities onboarded over 12 months
  const cumulativeFacilitiesTrend = MONTH_LABELS.map((mLabel, mIdx) => {
    const count = FACILITIES.filter((f) => {
      const stateMatch = filters.selectedState === 'All' || f.state === filters.selectedState;
      return stateMatch && f.onboardedMonthIndex <= mIdx;
    }).length;
    return {
      monthLabel: mLabel,
      onboardedCount: count,
    };
  });

  // Facility count by state
  const facilityCountByState: { state: StateName; count: number; attendants: number; bloodBanks: number }[] = [
    {
      state: 'Lagos',
      count: FACILITIES.filter((f) => f.state === 'Lagos').length,
      attendants: FACILITIES.filter((f) => f.state === 'Lagos').reduce((s, f) => s + f.skilledAttendants, 0),
      bloodBanks: FACILITIES.filter((f) => f.state === 'Lagos' && f.hasBloodBank).length,
    },
    {
      state: 'Delta',
      count: FACILITIES.filter((f) => f.state === 'Delta').length,
      attendants: FACILITIES.filter((f) => f.state === 'Delta').reduce((s, f) => s + f.skilledAttendants, 0),
      bloodBanks: FACILITIES.filter((f) => f.state === 'Delta' && f.hasBloodBank).length,
    },
    {
      state: 'Kano',
      count: FACILITIES.filter((f) => f.state === 'Kano').length,
      attendants: FACILITIES.filter((f) => f.state === 'Kano').reduce((s, f) => s + f.skilledAttendants, 0),
      bloodBanks: FACILITIES.filter((f) => f.state === 'Kano' && f.hasBloodBank).length,
    },
    {
      state: 'Ekiti',
      count: FACILITIES.filter((f) => f.state === 'Ekiti').length,
      attendants: FACILITIES.filter((f) => f.state === 'Ekiti').reduce((s, f) => s + f.skilledAttendants, 0),
      bloodBanks: FACILITIES.filter((f) => f.state === 'Ekiti' && f.hasBloodBank).length,
    },
  ];

  // Eligible Case reviews filtered
  const filteredCases = CASE_REVIEWS.filter((c) => {
    if (filters.selectedState !== 'All' && c.state !== filters.selectedState) return false;
    if (filters.selectedFacilityId !== 'All' && c.facilityId !== filters.selectedFacilityId) return false;
    return true;
  });

  return {
    facilities,
    // Overview KPIs
    womenRegistered,
    womenRegisteredDelta: priorWomen > 0 ? ((womenRegistered - priorWomen) / priorWomen) * 100 : 0,
    ancVisitsTotal,
    ancVisitsTotalDelta: priorAncVisits > 0 ? ((ancVisitsTotal - priorAncVisits) / priorAncVisits) * 100 : 0,
    avgAncCompletion,
    avgAncCompletionDelta: avgAncCompletion - priorAncCompletion,
    avgEarlyBooking,
    avgEarlyBookingDelta: avgEarlyBooking - priorEarlyBooking,
    facilityDeliveryRate,
    facilityDeliveryRateDelta: facilityDeliveryRate - priorFacilityDeliveryRate,
    submittedReports,
    totalExpectedReports,
    onTimeReports,
    lateReports,
    missingReports,

    // Risk
    totalLowRisk,
    totalMedRisk,
    totalHighRisk,
    totalAssessed,
    highRiskFollowUpRate,
    totalHighRiskFollowUp,

    // Funnel & Drop-off
    funnel,
    biggestDrop,

    // Trends
    monthlyTrends,

    // Rankings & Distributions
    facilityAncRankings,
    deliveries: {
      formalFacility: formalDeliveries,
      tba: tbaDeliveries,
      transferred: transferredDeliveries,
      total: totalDeliveries,
    },
    transferReasons,

    // Outcome Review & Mortality Incidence
    totalMaternalDeaths,
    recordedMortalityIncidence,
    priorRecordedMortalityIncidence,
    mortalityIncidenceDelta,
    deathContributingFactors,
    caseReviews: filteredCases,

    // Targets scaled to scope
    targetWomenRegistered,
    targetAncVisits,
    highRiskFollowUpDelta,
    referralCompletionRate,
    totalDeliveries,

    // Service Utilization
    treatmentBreakdown,
    outcomesBreakdown,

    // Reporting
    latestMonthOnTimeRate,
    latestMonthOnTimeCount,
    latestMonthTotal,

    // Reach
    cumulativeFacilitiesTrend,
    facilityCountByState,
  };
}
