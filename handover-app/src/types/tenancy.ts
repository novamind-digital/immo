// Tenancy Management Types for Managing Lease Terminations and Renovations

export interface TenancyProperty {
  // Property Identification
  address: string;
  postalCode: string;
  city: string;
  district: string;
  propertyType: 'apartment' | 'house' | 'commercial' | 'room' | 'other';
  
  // Property Details
  rooms: number;
  size: number; // in sqm
  floor?: number;
  buildingYear?: number;
  heatingType: 'central' | 'individual' | 'district' | 'electric' | 'other';
  
  // Legal Information
  propertyId: string;
  landRegisterNumber?: string;
  unitNumber?: string;
}

export interface TenancyParties {
  // Landlord Information
  landlordType: 'individual' | 'company' | 'cooperative' | 'other';
  landlordName: string;
  landlordCompany?: string;
  landlordAddress: string;
  landlordPostalCode: string;
  landlordCity: string;
  landlordPhone: string;
  landlordEmail: string;
  
  // Property Management (if applicable)
  propertyManagerName?: string;
  propertyManagerCompany?: string;
  propertyManagerAddress?: string;
  propertyManagerPhone?: string;
  propertyManagerEmail?: string;
  
  // Tenant Information
  tenantNames: string[]; // Can have multiple tenants
  tenantAddress: string;
  tenantPostalCode: string;
  tenantCity: string;
  tenantPhone: string;
  tenantEmail: string;
  tenantCount: number;
}

export interface TenancyContract {
  // Contract Details
  contractId: string;
  contractType: 'unlimited' | 'limited' | 'furnished' | 'commercial' | 'room' | 'other';
  startDate: Date;
  endDate?: Date; // For limited contracts
  
  // Rent Information
  baseRent: number; // Kaltmiete
  additionalCosts: number; // Nebenkosten
  totalRent: number; // Warmmiete
  deposit: number; // Kaution
  rentLastPaid: Date;
  
  // Payment Information
  paymentMethod: 'bank_transfer' | 'cash' | 'check' | 'direct_debit' | 'other';
  paymentDay: number; // Day of month
  bankAccount?: string;
  
  // Contract Terms
  noticePeriod: number; // in months
  rentIncreaseClauses: boolean;
  petPolicy: 'allowed' | 'not_allowed' | 'with_permission';
  smokingPolicy: 'allowed' | 'not_allowed' | 'balcony_only';
  sublettingPolicy: 'allowed' | 'not_allowed' | 'with_permission';
  
  // Special Clauses
  specialClauses: string[];
  restrictions: string[];
}

export interface TenancyTermination {
  // Termination Details
  terminationType: 'ordinary' | 'extraordinary' | 'mutual' | 'renovation' | 'sale' | 'personal_use';
  terminationReason: TerminationReason;
  terminationDate: Date;
  vacancyDate: Date;
  
  // Legal Requirements
  noticePeriodRequired: number; // in months
  noticePeriodGiven: number; // in months
  noticeServedDate: Date;
  noticeMethod: 'registered_mail' | 'personal_delivery' | 'email' | 'court_bailiff';
  
  // Documentation
  terminationLetter: string; // File reference
  terminationConfirmation?: string; // File reference
  legalAdviceObtained: boolean;
  
  // Tenant Response
  tenantResponse?: 'accepted' | 'disputed' | 'no_response';
  tenantResponseDate?: Date;
  tenantResponseDetails?: string;
  
  // Legal Proceedings
  legalProceedingsRequired: boolean;
  courtCase?: string;
  lawyerInvolved?: boolean;
  lawyerDetails?: string;
}

export type TerminationReason = 
  | 'renovation' // Sanierung/Modernisierung
  | 'personal_use' // Eigenbedarf
  | 'sale' // Verkauf
  | 'rent_default' // Mietschulden
  | 'contract_violation' // Vertragsverletzung
  | 'disturbance' // Störung des Hausfriedens
  | 'illegal_subletting' // Unerlaubte Untervermietung
  | 'damage' // Beschädigung der Mietsache
  | 'mutual_agreement' // Einvernehmlich
  | 'contract_expiry' // Vertragsende
  | 'other'; // Sonstige

export interface RenovationPlanning {
  // Renovation Details
  renovationType: 'modernization' | 'basic_renovation' | 'luxury_renovation' | 'energy_efficiency' | 'structural';
  renovationScope: RenovationScope[];
  
  // Timeline
  plannedStartDate: Date;
  estimatedDuration: number; // in months
  estimatedCompletionDate: Date;
  actualStartDate?: Date;
  actualCompletionDate?: Date;
  
  // Budget
  estimatedCost: number;
  actualCost?: number;
  financingSecured: boolean;
  financingDetails?: string;
  
  // Permits and Approvals
  permitsRequired: boolean;
  permitsObtained: boolean;
  permitDetails: RenovationPermit[];
  
  // Contractors
  contractors: RenovationContractor[];
  
  // Legal Compliance
  tenantNotificationRequired: boolean;
  tenantNotificationDate?: Date;
  rentIncreasePermitted: boolean;
  estimatedRentIncrease?: number;
}

export interface RenovationScope {
  area: 'kitchen' | 'bathroom' | 'living_room' | 'bedroom' | 'hallway' | 'balcony' | 'facade' | 'roof' | 'heating' | 'electrical' | 'plumbing' | 'flooring' | 'windows' | 'other';
  description: string;
  estimatedCost: number;
  priority: 'high' | 'medium' | 'low';
  status: 'planned' | 'in_progress' | 'completed' | 'on_hold';
}

export interface RenovationPermit {
  permitType: 'building_permit' | 'demolition_permit' | 'electrical_permit' | 'plumbing_permit' | 'structural_permit' | 'other';
  authority: string;
  applicationDate?: Date;
  approvalDate?: Date;
  permitNumber?: string;
  expiryDate?: Date;
  conditions?: string[];
}

export interface RenovationContractor {
  company: string;
  contactPerson: string;
  specialty: string;
  phone: string;
  email: string;
  address: string;
  licenseNumber?: string;
  insuranceVerified: boolean;
  contractSigned: boolean;
  estimatedCost: number;
}

export interface LegalCompliance {
  // Tenant Rights
  tenantRightsRespected: boolean;
  compensationOffered: boolean;
  compensationAmount?: number;
  alternativeAccommodationOffered: boolean;
  alternativeAccommodationDetails?: string;
  
  // Legal Requirements
  legalNoticesPeriodComplied: boolean;
  modernizationNoticeProvided: boolean;
  rentIncreaseNoticeProvided: boolean;
  
  // Dispute Resolution
  disputesRaised: boolean;
  disputeDetails?: string[];
  mediationAttempted?: boolean;
  legalProceedingsInitiated?: boolean;
  
  // Compliance Documentation
  complianceDocuments: string[]; // File references
  legalAdvice: string[]; // Legal advice obtained
}

export interface FinancialTracking {
  // Costs
  legalCosts: number;
  renovationCosts: number;
  compensationCosts: number;
  lostRentIncome: number;
  otherCosts: number;
  totalCosts: number;
  
  // Income
  rentIncreaseAchieved?: number;
  propertyValueIncrease?: number;
  taxBenefits?: number;
  
  // Timeline Impact
  delaysCaused: boolean;
  delayDuration?: number; // in months
  delayCosts?: number;
  
  // ROI Calculation
  estimatedROI?: number;
  actualROI?: number;
  paybackPeriod?: number; // in years
}

export interface TenancyDocuments {
  // Contract Documents
  originalContract: string; // File reference
  contractAmendments: string[];
  
  // Termination Documents
  terminationNotice: string;
  tenantResponse?: string;
  legalDocuments: string[];
  
  // Renovation Documents
  renovationPlans: string[];
  permits: string[];
  contractorAgreements: string[];
  invoices: string[];
  
  // Correspondence
  tenantCorrespondence: string[];
  authorityCorrespondence: string[];
  legalCorrespondence: string[];
  
  // Photos and Evidence
  propertyPhotos: string[];
  damagePhotos: string[];
  renovationProgressPhotos: string[];
}

export interface TenancyHistory {
  id: string;
  date: Date;
  action: TenancyAction;
  description: string;
  performedBy: string;
  details?: Record<string, any>;
  documents?: string[];
}

export type TenancyAction = 
  | 'contract_created' // Vertrag erstellt
  | 'tenant_moved_in' // Mieter eingezogen
  | 'rent_increase' // Mieterhöhung
  | 'termination_initiated' // Kündigung eingeleitet
  | 'termination_served' // Kündigung zugestellt
  | 'tenant_response' // Mieterantwort
  | 'legal_proceedings' // Gerichtsverfahren
  | 'renovation_planned' // Sanierung geplant
  | 'renovation_started' // Sanierung begonnen
  | 'renovation_completed' // Sanierung abgeschlossen
  | 'property_vacated' // Wohnung geräumt
  | 'new_rental' // Neuvermietung
  | 'dispute_resolved' // Streit beigelegt
  | 'other'; // Sonstige

export interface TenancyMeta {
  createdAt: Date;
  updatedAt: Date;
  status: 'active' | 'terminated' | 'in_renovation' | 'completed' | 'archived';
  version: number;
  userId: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
}

export interface TenancyData {
  meta: TenancyMeta;
  property: TenancyProperty;
  parties: TenancyParties;
  contract: TenancyContract;
  termination?: TenancyTermination;
  renovation?: RenovationPlanning;
  compliance: LegalCompliance;
  financial: FinancialTracking;
  documents: TenancyDocuments;
  history: TenancyHistory[];
}

// Service Types
export interface TenancyContextType {
  tenancyData: TenancyData;
  updateProperty: (property: Partial<TenancyProperty>) => void;
  updateParties: (parties: Partial<TenancyParties>) => void;
  updateContract: (contract: Partial<TenancyContract>) => void;
  updateTermination: (termination: Partial<TenancyTermination>) => void;
  updateRenovation: (renovation: Partial<RenovationPlanning>) => void;
  updateCompliance: (compliance: Partial<LegalCompliance>) => void;
  updateFinancial: (financial: Partial<FinancialTracking>) => void;
  updateDocuments: (documents: Partial<TenancyDocuments>) => void;
  addHistoryEntry: (entry: Omit<TenancyHistory, 'id'>) => void;
  saveTenancyData: () => Promise<void>;
  loadTenancyData: (id: string) => Promise<void>;
  createNewTenancy: () => void;
  resetTenancyData: () => void;
}