// Transfer Protocol Types for Property Sale/Purchase Handovers

export interface TransferParticipants {
  // Seller Information
  sellerName: string;
  sellerAddress: string;
  sellerPhone: string;
  sellerEmail: string;
  sellerIdNumber: string; // Personalausweis/Reisepass

  // Buyer Information
  buyerName: string;
  buyerAddress: string;
  buyerPhone: string;
  buyerEmail: string;
  buyerIdNumber: string;

  // Additional Parties
  notaryName?: string;
  notaryOffice?: string;
  realEstateAgent?: string;
  agentCompany?: string;
}

export interface TransferProperty {
  // Property Details
  propertyType: 'apartment' | 'house' | 'commercial' | 'land' | 'other';
  address: string;
  postalCode: string;
  city: string;
  country: string;
  propertySize: number; // in sqm
  landSize?: number; // in sqm for houses/land
  rooms?: number;
  buildingYear?: number;
  
  // Legal Information
  landRegisterNumber: string; // Grundbuchnummer
  plotNumber: string; // Flurstück
  cadastralOffice: string; // Katasteramt
  
  // Financial Details
  purchasePrice: number;
  deposits: number;
  commissions: number;
  transferTax: number; // Grunderwerbsteuer
  notaryFees: number;
  landRegistryFees: number;
}

export interface TransferCondition {
  // Structural Condition
  buildingCondition: 'excellent' | 'good' | 'satisfactory' | 'needs_renovation' | 'poor';
  roofCondition: 'excellent' | 'good' | 'satisfactory' | 'needs_repair' | 'poor';
  windowsCondition: 'excellent' | 'good' | 'satisfactory' | 'needs_replacement' | 'poor';
  heatingSystem: 'gas' | 'oil' | 'electric' | 'heat_pump' | 'district_heating' | 'other';
  heatingCondition: 'excellent' | 'good' | 'satisfactory' | 'needs_repair' | 'poor';
  
  // Defects and Issues
  knownDefects: TransferDefect[];
  warrantyExclusions: string[];
  
  // Equipment Included
  kitchenIncluded: boolean;
  kitchenCondition?: 'excellent' | 'good' | 'satisfactory' | 'poor';
  bathroomFixtures: boolean;
  flooring: string;
  lightFixtures: boolean;
  
  // Utilities
  electricalSystem: 'excellent' | 'good' | 'satisfactory' | 'needs_update' | 'poor';
  plumbingSystem: 'excellent' | 'good' | 'satisfactory' | 'needs_repair' | 'poor';
  internetConnection: boolean;
  cableTV: boolean;
}

export interface TransferDefect {
  id: string;
  location: string;
  description: string;
  severity: 'minor' | 'moderate' | 'major';
  estimatedCost?: number;
  photos?: string[];
  acknowledged: boolean;
}

export interface TransferKeys {
  // Keys and Access
  houseKeys: number;
  mailboxKeys: number;
  garageDoorOpener: number;
  cellarKeys: number;
  gardenGateKeys: number;
  otherKeys: TransferKeyItem[];
  
  // Access Codes
  alarmCode?: string;
  garageDoorCode?: string;
  buildingEntryCode?: string;
  
  // Security Systems
  securitySystemIncluded: boolean;
  securityProvider?: string;
  securityAccountTransfer: boolean;
}

export interface TransferKeyItem {
  id: string;
  description: string;
  quantity: number;
  handed_over: boolean;
}

export interface TransferDocuments {
  // Property Documents
  titleDeed: boolean; // Grundbuchauiszug
  buildingPlans: boolean;
  energyCertificate: boolean;
  buildingPermits: boolean;
  
  // Legal Documents
  purchaseContract: boolean;
  notaryDeed: boolean;
  landTransferTaxCertificate: boolean;
  
  // Technical Documents
  heatingServiceRecords: boolean;
  electricalInspectionCertificate: boolean;
  waterQualityCertificate: boolean;
  
  // Insurance and Utilities
  buildingInsuranceDocuments: boolean;
  utilityAccountNumbers: string[];
  utilityFinalReadings: TransferUtilityReading[];
  
  // Additional Documents
  warrantyDocuments: boolean;
  applianceManuals: boolean;
  otherDocuments: string[];
}

export interface TransferUtilityReading {
  utilityType: 'electricity' | 'gas' | 'water' | 'heating';
  provider: string;
  accountNumber: string;
  meterNumber: string;
  currentReading: number;
  readingDate: Date;
  estimatedMonthlyUsage: number;
}

export interface TransferPhotos {
  exteriorPhotos: string[];
  interiorPhotos: string[];
  defectPhotos: string[];
  meterPhotos: string[];
  keyPhotos: string[];
  documentPhotos: string[];
}

export interface TransferAgreements {
  // Special Agreements
  specialConditions: string[];
  repairs: TransferRepairAgreement[];
  
  // Timeline
  handoverDate: Date;
  vacancyDate: Date;
  keyHandoverDate: Date;
  
  // Responsibilities
  sellerResponsibilities: string[];
  buyerResponsibilities: string[];
  
  // Costs and Adjustments
  costAdjustments: TransferCostAdjustment[];
  proRatedExpenses: TransferProRatedExpense[];
}

export interface TransferRepairAgreement {
  id: string;
  description: string;
  responsibleParty: 'seller' | 'buyer';
  deadline?: Date;
  estimatedCost?: number;
  completed: boolean;
}

export interface TransferCostAdjustment {
  id: string;
  description: string;
  amount: number;
  responsibleParty: 'seller' | 'buyer';
  reason: string;
}

export interface TransferProRatedExpense {
  id: string;
  description: string;
  annualAmount: number;
  proRatedAmount: number;
  responsibleParty: 'seller' | 'buyer';
  period: string;
}

export interface TransferSignatures {
  sellerSignature?: string;
  sellerSignatureDate?: Date;
  buyerSignature?: string;
  buyerSignatureDate?: Date;
  witnessSignature?: string;
  witnessName?: string;
  witnessSignatureDate?: Date;
  notaryConfirmation?: boolean;
  notaryConfirmationDate?: Date;
}

export interface TransferMeta {
  createdAt: Date;
  updatedAt: Date;
  status: 'draft' | 'in_progress' | 'completed' | 'archived';
  version: number;
  userId: string;
  transferId?: string;
  propertyReference?: string;
}

export interface TransferData {
  meta: TransferMeta;
  participants: TransferParticipants;
  property: TransferProperty;
  condition: TransferCondition;
  keys: TransferKeys;
  documents: TransferDocuments;
  photos: TransferPhotos;
  agreements: TransferAgreements;
  signatures: TransferSignatures;
}

// Service Types
export interface TransferContextType {
  transferData: TransferData;
  updateParticipants: (participants: Partial<TransferParticipants>) => void;
  updateProperty: (property: Partial<TransferProperty>) => void;
  updateCondition: (condition: Partial<TransferCondition>) => void;
  updateKeys: (keys: Partial<TransferKeys>) => void;
  updateDocuments: (documents: Partial<TransferDocuments>) => void;
  updatePhotos: (photos: Partial<TransferPhotos>) => void;
  updateAgreements: (agreements: Partial<TransferAgreements>) => void;
  updateSignatures: (signatures: Partial<TransferSignatures>) => void;
  saveTransfer: () => Promise<void>;
  loadTransfer: (id: string) => Promise<void>;
  createNewTransfer: () => void;
  resetTransfer: () => void;
}