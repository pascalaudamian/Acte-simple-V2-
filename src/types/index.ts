export type Language = 'ro' | 'en';

export type ProcedureCategory = 
  | 'identitate'
  | 'auto'
  | 'stare-civila'
  | 'justitie'
  | 'sanatate'
  | 'imigrare'
  | 'afaceri';

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
}

export interface OfficialSource {
  id: string;
  institutionName: string;
  authorityType: string;
  sourceUrl: string;
  relatedProcedureIds: string[];
  lastCheckedTimestamp: string;
  lastSuccessfulCheck: string;
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
