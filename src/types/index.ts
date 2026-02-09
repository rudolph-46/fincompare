// Types principaux FinCompare Afrique

export type CreditCategory =
  | "immobilier"
  | "auto"
  | "consommation"
  | "pme"
  | "micro_credit"
  | "equipement"
  | "scolaire"
  | "autre";

export type EmploymentStatus =
  | "fonctionnaire"
  | "salarie_prive"
  | "independant"
  | "retraite"
  | "autre";

export type OrganisationType =
  | "banque"
  | "emf_cat1"
  | "emf_cat2"
  | "emf_cat3"
  | "etablissement_paiement";

export interface Organisation {
  id: string;
  name: string;
  slug: string;
  type: OrganisationType;
  logoUrl?: string;
  description?: string;
  totalBranches?: number;
  headquartersCity?: string;
  operatingRegions?: string[];
  isVerified: boolean;
}

export interface CreditProduct {
  id: string;
  organisationId: string;
  organisation?: Organisation;
  name: string;
  category: CreditCategory;
  description?: string;
  minAmount: number;
  maxAmount: number;
  minDurationMonths: number;
  maxDurationMonths: number;
  baseInterestRate: number;
  maxInterestRate?: number;
  rateType: "fixed" | "variable" | "mixed";
  eligibleEmployment?: EmploymentStatus[];
  eligibleRegions?: string[];
  minIncome?: number;
  maxDebtRatio?: number;
  requiresGuarantee: boolean;
  guaranteeType?: string;
  requiresDownPayment: boolean;
  minDownPaymentPct?: number;
  processingFeePct?: number;
  processingFeeFixed?: number;
  insuranceRequired: boolean;
  documentsRequired?: string[];
  avgProcessingDays?: number;
  isPromoted: boolean;
  isActive: boolean;
}

export interface SimulationParams {
  category: CreditCategory;
  amount: number;
  durationMonths: number;
  employmentStatus: EmploymentStatus;
  monthlyIncome?: number;
  region?: string;
}

export interface SimulationResult {
  product: CreditProduct;
  proposedRate: number;
  monthlyPayment: number;
  totalCost: number;
  totalInterest: number;
  processingFee: number;
  eligibilityScore: number;
  eligibilityIssues?: string[];
}

export interface LoanApplication {
  id: string;
  reference: string;
  applicantId: string;
  category: CreditCategory;
  amountRequested: number;
  durationMonths: number;
  purpose?: string;
  monthlyIncome?: number;
  existingDebtMonthly?: number;
  hasDownPayment: boolean;
  downPaymentAmount?: number;
  employmentStatus: EmploymentStatus;
  employerName?: string;
  preferredRegions?: string[];
  status: "draft" | "submitted" | "matching" | "matched" | "closed" | "cancelled";
  submittedAt?: number;
  createdAt: number;
}

export interface ApplicationOffer {
  id: string;
  applicationId: string;
  organisationId: string;
  organisation?: Organisation;
  creditProductId?: string;
  creditProduct?: CreditProduct;
  status: "pending" | "reviewing" | "pre_approved" | "approved" | "rejected" | "counter_offer" | "accepted" | "expired";
  proposedRate?: number;
  proposedAmount?: number;
  proposedDurationMonths?: number;
  proposedMonthlyPayment?: number;
  processingFee?: number;
  conditions?: string;
  rejectionReason?: string;
  respondedAt?: number;
  expiresAt?: number;
  createdAt: number;
}

// Régions du Cameroun
export const CAMEROON_REGIONS = [
  "Adamaoua",
  "Centre",
  "Est",
  "Extrême-Nord",
  "Littoral",
  "Nord",
  "Nord-Ouest",
  "Ouest",
  "Sud",
  "Sud-Ouest",
] as const;

export const CREDIT_CATEGORIES: { value: CreditCategory; label: string; icon: string }[] = [
  { value: "immobilier", label: "Crédit Immobilier", icon: "🏠" },
  { value: "auto", label: "Crédit Auto", icon: "🚗" },
  { value: "consommation", label: "Crédit Consommation", icon: "🛒" },
  { value: "pme", label: "Crédit PME", icon: "🏢" },
  { value: "micro_credit", label: "Micro-crédit", icon: "💰" },
  { value: "equipement", label: "Crédit Équipement", icon: "🔧" },
  { value: "scolaire", label: "Crédit Scolaire", icon: "📚" },
  { value: "autre", label: "Autre", icon: "📋" },
];

export const EMPLOYMENT_STATUS: { value: EmploymentStatus; label: string }[] = [
  { value: "fonctionnaire", label: "Fonctionnaire" },
  { value: "salarie_prive", label: "Salarié du privé" },
  { value: "independant", label: "Indépendant / Entrepreneur" },
  { value: "retraite", label: "Retraité" },
  { value: "autre", label: "Autre" },
];
