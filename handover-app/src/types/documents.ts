// Document Request Types for Managing Official Documents for Real Estate Transactions

export interface DocumentRequester {
  // Personal Information
  firstName: string;
  lastName: string;
  company?: string;
  address: string;
  postalCode: string;
  city: string;
  country: string;
  phone: string;
  email: string;
  
  // Legal Information
  idNumber: string; // Personalausweis/Reisepass
  taxNumber?: string;
  profession: string;
  
  // Authorization
  powerOfAttorney?: boolean;
  powerOfAttorneyDocument?: string; // File reference
}

export interface DocumentProperty {
  // Property Identification
  address: string;
  postalCode: string;
  city: string;
  district: string;
  propertyType: 'apartment' | 'house' | 'commercial' | 'land' | 'other';
  
  // Legal References
  landRegisterNumber: string; // Grundbuchnummer
  plotNumber: string; // Flurstück/Gemarkung
  landRegisterOffice: string; // Grundbuchamt
  cadastralOffice: string; // Katasteramt
  
  // Additional References
  buildingNumber?: string;
  unitNumber?: string; // For apartments
  shareNumber?: string; // Anteilsnummer für Eigentumswohnungen
}

export interface DocumentRequest {
  id: string;
  documentType: DocumentType;
  requestDate: Date;
  urgency: 'low' | 'normal' | 'high' | 'urgent';
  purpose: DocumentPurpose;
  status: DocumentStatus;
  
  // Request Details
  authority: Authority;
  requestMethod: 'online' | 'mail' | 'person' | 'email' | 'fax';
  copies: number;
  language: 'german' | 'english' | 'other';
  
  // Processing Information
  expectedProcessingTime?: number; // in business days
  actualProcessingTime?: number;
  estimatedCost?: number;
  actualCost?: number;
  
  // Tracking
  referenceNumber?: string;
  trackingNumber?: string;
  authorityContactPerson?: string;
  authorityPhone?: string;
  authorityEmail?: string;
  
  // Document Delivery
  deliveryMethod: 'mail' | 'pickup' | 'email' | 'portal';
  deliveryAddress?: string;
  receivedDate?: Date;
  
  // Files
  requestDocuments: string[]; // Required documents to submit
  receivedDocuments: string[]; // Documents received from authority
  
  // Notes and History
  notes: string[];
  history: DocumentRequestHistory[];
}

export type DocumentType = 
  // Land Registry Documents
  | 'grundbuchauszug' // Land Register Extract
  | 'grundbuch_beglaubigt' // Certified Land Register
  | 'lastenheft' // Encumbrance Certificate
  | 'eigentumsnachweis' // Proof of Ownership
  
  // Cadastral Documents
  | 'katasterauszug' // Cadastral Extract
  | 'flurkarte' // Parcel Map
  | 'liegenschaftskarte' // Property Map
  | 'abmarkungsprotokoll' // Boundary Survey Protocol
  
  // Building Documents
  | 'baugenehmigung' // Building Permit
  | 'bauakte' // Building File
  | 'bauplantie' // Building Plans
  | 'standsicherheitsnachweis' // Structural Safety Certificate
  | 'brandschutznachweis' // Fire Safety Certificate
  
  // Energy and Environment
  | 'energieausweis' // Energy Performance Certificate
  | 'energieausweis_bedarfs' // Demand-based Energy Certificate
  | 'energieausweis_verbrauchs' // Consumption-based Energy Certificate
  | 'umweltgutachten' // Environmental Assessment
  | 'altlastengutachten' // Contaminated Land Assessment
  
  // Tax and Financial
  | 'einheitswert' // Standard Value
  | 'verkehrswert' // Market Value Assessment
  | 'grundsteuer_bescheid' // Property Tax Assessment
  | 'grunderwerbsteuer' // Real Estate Transfer Tax
  
  // Zoning and Planning
  | 'bebauungsplan' // Development Plan
  | 'flächennutzungsplan' // Land Use Plan
  | 'baulasten' // Building Encumbrances
  | 'vorkaufsrecht' // Right of First Refusal
  
  // Utilities and Infrastructure
  | 'erschliessungsnachweis' // Development Certificate
  | 'anschlussberechtigung' // Connection Entitlement
  | 'leitungsauskunft' // Utility Line Information
  
  // Legal and Administrative
  | 'gewerbeschein' // Trade License
  | 'mietbescheinigung' // Rental Certificate
  | 'unbedenklichkeitsbescheinigung' // Tax Clearance Certificate
  | 'other'; // Custom document type

export type DocumentPurpose = 
  | 'sale' // Verkauf
  | 'purchase' // Kauf
  | 'mortgage' // Finanzierung
  | 'renovation' // Sanierung
  | 'legal_dispute' // Rechtsstreit
  | 'tax_purposes' // Steuerliche Zwecke
  | 'inheritance' // Erbschaft
  | 'divorce' // Scheidung
  | 'business_registration' // Gewerbeanmeldung
  | 'due_diligence' // Due Diligence
  | 'other'; // Sonstige

export type DocumentStatus = 
  | 'draft' // Entwurf
  | 'submitted' // Eingereicht
  | 'in_processing' // In Bearbeitung
  | 'additional_info_required' // Nachfrage
  | 'ready_for_pickup' // Zur Abholung bereit
  | 'delivered' // Zugestellt
  | 'completed' // Abgeschlossen
  | 'rejected' // Abgelehnt
  | 'expired' // Verfallen
  | 'cancelled'; // Storniert

export interface Authority {
  name: string;
  type: AuthorityType;
  address: string;
  postalCode: string;
  city: string;
  phone: string;
  email: string;
  website?: string;
  
  // Office Hours
  openingHours: OfficeHours[];
  
  // Online Services
  onlinePortal?: string;
  onlineAccount?: string;
  apiEndpoint?: string;
}

export type AuthorityType = 
  | 'grundbuchamt' // Land Registry Office
  | 'katasteramt' // Cadastral Office
  | 'bauamt' // Building Authority
  | 'finanzamt' // Tax Office
  | 'umweltamt' // Environmental Authority
  | 'stadtplanung' // Urban Planning
  | 'gewerbeamt' // Trade Office
  | 'energieberatung' // Energy Consulting
  | 'notariat' // Notary Office
  | 'gemeinde' // Municipality
  | 'landkreis' // County
  | 'regierungsprasidium' // Regional Council
  | 'other'; // Other Authority

export interface OfficeHours {
  dayOfWeek: number; // 0-6 (Monday-Sunday)
  openTime: string; // "09:00"
  closeTime: string; // "17:00"
  isOpen: boolean;
}

export interface DocumentRequestHistory {
  id: string;
  date: Date;
  action: DocumentAction;
  description: string;
  performedBy: string; // User or system
  details?: Record<string, any>;
}

export type DocumentAction = 
  | 'created' // Erstellt
  | 'submitted' // Eingereicht
  | 'status_changed' // Status geändert
  | 'document_uploaded' // Dokument hochgeladen
  | 'payment_made' // Zahlung geleistet
  | 'response_received' // Antwort erhalten
  | 'deadline_reminder' // Frist-Erinnerung
  | 'cancelled' // Storniert
  | 'completed'; // Abgeschlossen

export interface DocumentTemplate {
  id: string;
  name: string;
  documentType: DocumentType;
  authority: Authority;
  requiredFields: string[];
  optionalFields: string[];
  requiredDocuments: string[];
  estimatedProcessingTime: number;
  estimatedCost: number;
  template: string; // Template content
}

export interface DocumentBatch {
  id: string;
  name: string;
  description: string;
  requests: string[]; // Document Request IDs
  status: 'draft' | 'submitted' | 'in_progress' | 'completed';
  totalCost: number;
  createdDate: Date;
  completedDate?: Date;
}

export interface DocumentNotification {
  id: string;
  type: 'deadline' | 'status_change' | 'cost_update' | 'document_ready';
  documentRequestId: string;
  message: string;
  isRead: boolean;
  createdDate: Date;
  scheduledDate?: Date;
}

export interface DocumentMeta {
  createdAt: Date;
  updatedAt: Date;
  status: 'active' | 'archived' | 'deleted';
  version: number;
  userId: string;
}

export interface DocumentRequestData {
  meta: DocumentMeta;
  requester: DocumentRequester;
  property: DocumentProperty;
  requests: DocumentRequest[];
  batches: DocumentBatch[];
  notifications: DocumentNotification[];
}

// Service Types
export interface DocumentContextType {
  documentData: DocumentRequestData;
  updateRequester: (requester: Partial<DocumentRequester>) => void;
  updateProperty: (property: Partial<DocumentProperty>) => void;
  addRequest: (request: Omit<DocumentRequest, 'id'>) => void;
  updateRequest: (id: string, request: Partial<DocumentRequest>) => void;
  removeRequest: (id: string) => void;
  createBatch: (requests: string[], name: string) => void;
  updateBatch: (id: string, batch: Partial<DocumentBatch>) => void;
  addNotification: (notification: Omit<DocumentNotification, 'id'>) => void;
  markNotificationRead: (id: string) => void;
  saveDocumentData: () => Promise<void>;
  loadDocumentData: (id: string) => Promise<void>;
  createNewDocumentRequest: () => void;
  resetDocumentData: () => void;
}