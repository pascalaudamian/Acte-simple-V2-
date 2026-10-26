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
  | 'cetatenie';

// 10 Official Administrative Domains aligned with ROePAS & ServiciiPublice.gov.ro
export type AdministrativeDomainId =
  | 'civil_status'           // 1. Birth, marriage, death & civil status (Stare civilă)
  | 'social_benefits'        // 2. Family benefits & social assistance (ANPIS / DGASPC)
  | 'employment'             // 3. Employment, unemployment & professional training (ANOFM / Revisal)
  | 'pensions'               // 4. Pensions & retirement (CNPP)
  | 'education'              // 5. Education & recognition of qualifications (CNRED / MEC)
  | 'cadastre_housing'       // 6. Property, cadastral records, housing & building permits (ANCPI / Urbanism)
  | 'justice_petitions'      // 7. Justice, certificates, petitions & complaints (MJ / Caziers / CNCD)
  | 'business_registry'      // 8. Business registration, company changes & authorizations (ONRC / ANAF)
  | 'environment_agriculture'// 9. Environment, agriculture & veterinary procedures (APIA / AFIR / ANSVSA)
  | 'citizenship_travel';    // 10. Citizenship, travel & cross-border procedures (ANC / MAE / Eviza)

// Major Life Events for Citizen Navigation
export type LifeEventId =
  | 'having_a_child'
  | 'getting_married'
  | 'death_of_relative'
  | 'starting_school_university'
  | 'starting_a_job'
  | 'facing_unemployment'
  | 'retiring'
  | 'buying_selling_property'
  | 'starting_a_business'
  | 'moving_relocating'
  | 'returning_to_romania'
  | 'moving_abroad'
  | 'acquiring_citizenship'
  | 'managing_health';

// Standardized tri-state submission channel
export type SubmissionChannel = 'online' | 'hybrid' | 'in_person';

// Editorial Review & Publication Workflow Status
export type EditorialStatus = 'verified' | 'pending_review' | 'draft' | 'outdated';

export interface AdministrativeDomainDefinition {
  id: AdministrativeDomainId;
  name: {
    ro: string;
    en: string;
  };
  shortDescription: {
    ro: string;
    en: string;
  };
  officialPortalReference: string;
  badgeColor: string;
}

export interface LifeEventDefinition {
  id: LifeEventId;
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
  recommendedDomains: AdministrativeDomainId[];
}

export type AudienceType = 
  | 'ro-citizen'
  | 'eu-citizen'
  | 'non-eu'
  | 'family-member'
  | 'all';

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
  administrativeDomain?: AdministrativeDomainId;
  lifeEvents?: LifeEventId[];
  submissionChannel?: SubmissionChannel;
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
  editorialStatus?: EditorialStatus;
  editorialReviewDate?: string;
  reviewedBy?: string;
  sourceRegistryId?: string;
  officeFinderCategory?: string;
  officialServiceUrl: string;
  isOnlineSubmissionPossible: boolean;
  onlineServiceNotes?: {
    ro: string;
    en: string;
  };
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
    | 'educatie' 
    | 'proprietate' 
    | 'afaceri' 
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
    | 'CNRED'
    | 'ANCPI'
    | 'ONRC'
    | 'APIA'
    | 'ANSVSA'
    | 'PREFECTURA_APOSTILA'
    | 'PRIMARIE'
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

