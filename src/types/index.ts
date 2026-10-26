export type Language = 'ro' | 'en';

export interface CountyOption {
  code: string;
  name: { ro: string; en: string };
}

export interface OfficeService {
  id: string;
  procedureIds: string[];
  label: { ro: string; en: string };
  institutionNames: string[];
}

export interface OfficeRecord {
  id: string;
  name: { ro: string; en: string };
  institutionName: string;
  countyCode: string;
  locality: string;
  address: { ro: string; en: string };
  serviceIds: string[];
  officialUrl: string;
  verification: { status: 'verified' | 'pending_review'; verifiedAt: string | null; sourceUrl: string };
  coordinates: { latitude: number; longitude: number } | null;
}

export interface OfficeSearchFilters {
  serviceId?: string;
  countyCode?: string;
  locality?: string;
  latitude?: number;
  longitude?: number;
}

export type ProcedureCategory = 
  | 'identitate'
  | 'auto'
  | 'stare-civila'
  | 'justitie'
  | 'sanatate'
  | 'imigrare'
  | 'afaceri'
  | 'social'
  | 'munca'
  | 'pensii'
  | 'educatie'
  | 'proprietate'
  | 'mediu-agricultura'
  | 'agricultura'
  | 'cetatenie';

export type AudienceType = 
  | 'ro-citizen'
  | 'eu-citizen'
  | 'non-eu'
  | 'family-member'
  | 'all';

export interface AdministrativeDomainDefinition {
  id: string;
  name: {
    ro: string;
    en: string;
  };
  shortDescription: {
    ro: string;
    en: string;
  };
  officialPortalReference: string;
  badgeColor?: string;
}

export interface LifeEventDefinition {
  id: string;
  iconName: string;
  title: {
    ro: string;
    en: string;
  };
  description: {
    ro: string;
    en: string;
  };
  targetAudience: AudienceType[];
  recommendedDomains: string[];
}

export type SubmissionChannel = 'online' | 'hybrid' | 'in_person' | 'fully_online' | 'partially_online';

export type EditorialStatus = 'verified' | 'published' | 'draft' | 'under_review' | 'archived' | 'pending_review' | 'requires_update' | 'outdated';

export interface FeeItem {
  amount: number;
  currency: 'RON' | 'EUR';
  description: {
    ro: string;
    en: string;
  };
  paymentMethods: string[];
}

export interface RequiredDocument {
  id: string;
  name: {
    ro: string;
    en: string;
  };
  description: {
    ro: string;
    en: string;
  };
  isMandatory: boolean;
  isOriginalRequired: boolean;
  copyCount: number;
  remarks?: {
    ro: string;
    en: string;
  };
}

export interface ProcedureStep {
  stepNumber: number;
  title: {
    ro: string;
    en: string;
  };
  description: {
    ro: string;
    en: string;
  };
  locationOrUrl?: string;
  warningNotice?: {
    ro: string;
    en: string;
  };
}

export interface Procedure {
  id: string;
  slug: string;
  category: ProcedureCategory;
  audience: AudienceType[];
  title: {
    ro: string;
    en: string;
  };
  shortSummary: {
    ro: string;
    en: string;
  };
  targetWho: {
    ro: string;
    en: string;
  };
  prerequisites: {
    ro: string[];
    en: string[];
  };
  institution: {
    name: string;
    shortName: string;
    officialUrl: string;
    bookingUrl?: string;
  };
  legalBasis: {
    law: string;
    url?: string;
  };
  processingTime: {
    standard: string;
    urgent?: string;
    legalDeadline: string;
  };
  fees: FeeItem[];
  requiredDocuments: RequiredDocument[];
  steps: ProcedureStep[];
  warnings: {
    ro: string;
    en: string;
  }[];
  lastVerifiedDate: string;
  verificationStatus: 'verified' | 'pending_review' | 'requires_update';
  officialServiceUrl: string;
  isOnlineSubmissionPossible: boolean;
  onlineServiceNotes?: {
    ro: string;
    en: string;
  };
  administrativeDomain?: string;
  submissionChannel?: SubmissionChannel;
  lifeEvents?: string[];
  editorialStatus?: EditorialStatus;
  editorialReviewDate?: string;
  reviewedBy?: string;
  officeFinderCategory?: string;
}

export interface OfficialSource {
  id: string;
  institutionName: string;
  authorityType: string;
  sourceUrl: string;
  relatedProcedureIds: string[];
  lastCheckedTimestamp: string | null;
  lastSuccessfulCheck: string | null;
  status: 'verified' | 'change_detected' | 'review_required';
  lastChangeSummary?: string;
  notes: string;
  changeHistory: {
    date: string;
    editor: string;
    summary: string;
  }[];
}

export interface AuditLog {
  id: string;
  timestamp: string;
  actor: string;
  action: 'verify' | 'update' | 'check_source' | 'publish' | 'archive';
  procedureId?: string;
  procedureTitle?: string;
  details: string;
}

export interface UserChecklistState {
  procedureId: string;
  checkedDocumentIds: string[];
  completedStepNumbers: number[];
  notes: string;
  reminderDate?: string;
  reminderLabel?: string;
  savedAt: string;
  lastUpdated: string;
}

export interface FormTemplate {
  id: string;
  title: {
    ro: string;
    en: string;
  };
  category: string;
  description: {
    ro: string;
    en: string;
  };
  officialTarget: string;
  fields: FormField[];
}

export interface FormField {
  id: string;
  label: {
    ro: string;
    en: string;
  };
  placeholder?: {
    ro: string;
    en: string;
  };
  type: 'text' | 'date' | 'select' | 'textarea' | 'cnp';
  options?: { value: string; label: { ro: string; en: string } }[];
  required: boolean;
  helpText?: {
    ro: string;
    en: string;
  };
}

export interface County {
  code: string; // e.g. "B", "CJ", "TM"
  name: {
    ro: string;
    en: string;
  };
  capital: string;
  majorLocalities: string[];
}

export interface AdministrativeService {
  id: string;
  code: string;
  title: {
    ro: string;
    en: string;
  };
  category:
    | 'identitate'
    | 'auto'
    | 'imigrare'
    | 'justitie'
    | 'taxe'
    | 'sanatate'
    | 'stare-civila'
    | 'social'
    | 'munca'
    | 'pensii'
    | 'proprietate'
    | 'afaceri'
    | 'educatie'
    | 'agricultura'
    | 'cetatenie';
  responsibleAuthority: string;
  relatedProcedureIds: string[];
  onlineServiceUrl?: string;
  description: {
    ro: string;
    en: string;
  };
}

export interface AdministrativeOffice {
  id: string;
  name: {
    ro: string;
    en: string;
  };
  institutionType:
    | 'SPCLEP'
    | 'PASAPOARTE'
    | 'PERMISE_AUTO'
    | 'INMATRICULARI'
    | 'IGI'
    | 'ANAF'
    | 'CNAS'
    | 'POLITIE_CAZIER'
    | 'STARE_CIVILA'
    | 'ANPIS'
    | 'ANOFM'
    | 'CNPP'
    | 'ANCPI'
    | 'ONRC'
    | 'PREFECTURA_APOSTILA'
    | 'ALTELE';
  county: string; // code e.g. "B", "CJ", "TM"
  city: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  phone?: string;
  email?: string;
  websiteUrl?: string;
  bookingUrl?: string;
  providedServiceIds: string[];
  relatedProcedureIds: string[];
  openingHours: {
    ro: string;
    en: string;
  };
  accessibility: {
    wheelchairAccessible: boolean;
    notes?: {
      ro: string;
      en: string;
    };
  };
  appointmentRequirement: 'mandatory' | 'recommended' | 'walk_in' | 'hybrid';
  appointmentNotes?: {
    ro: string;
    en: string;
  };
  sourceUrl: string;
  lastVerifiedTimestamp: string;
  verificationStatus: 'verified' | 'needs_review' | 'archived';
  distanceKm?: number; // Runtime proximity distance calculation
}

