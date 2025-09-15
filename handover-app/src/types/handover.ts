// Base types
export interface Address {
  street: string;
  postalCode: string;
  city: string;
}

export interface Tenant {
  id: number;
  type: 'person' | 'company';
  title?: 'herr' | 'frau' | 'divers';
  firstName?: string;
  lastName?: string;
  companyName?: string;
  contactPerson?: string;
  address?: Address;
  phone: string;
  email: string;
  present: 'ja' | 'nein';
  bankDetails?: {
    iban: string;
    bic: string;
    bankName: string;
  };
}

export interface Manager {
  type: 'verwalter' | 'eigentuemer';
  selectedId: string;
  customData?: {
    type: 'person' | 'company';
    title?: 'herr' | 'frau' | 'divers';
    firstName?: string;
    lastName?: string;
    companyName?: string;
    address: Address;
  };
}

export interface Defect {
  id: number;
  room: string;
  customRoom?: string;
  notes: string;
  photos?: string[];
}

export interface Meter {
  id: number;
  readingDate: string;
  meterType: string;
  customMeterType?: string;
  meterLocation: string;
  customMeterLocation?: string;
  meterNumber: string;
  meterReading: string;
  photos?: string[];
}

export interface Key {
  id: number;
  type: string;
  customType?: string;
  quantity: string;
}

export interface Photo {
  id: number;
  room: string;
  customRoom?: string;
  description: string;
  imageUrl?: string;
  uploadedAt?: Date;
}

export interface Agreement {
  id: number;
  subject: string;
  description: string;
}

export interface Signature {
  name: string;
  signatureUrl?: string;
  signedAt?: Date;
}

// Main handover document structure
export interface HandoverData {
  meta: {
    createdAt: Date;
    updatedAt: Date;
    status: 'draft' | 'completed' | 'archived';
    version: number;
  };
  general: {
    rentalType: 'start' | 'end';
    rentalDate: string;
    manager: Manager;
    tenants: Tenant[];
  };
  property: {
    selectedAddress: string;
    customAddress?: Address;
    propertyType: string;
    customPropertyType?: string;
    selectedFloors: string[];
    designations?: {
      wohneinheit?: string;
      stellplatz?: string;
      gewerbeeinheit?: string;
    };
  };
  condition: {
    overallCondition: string;
    cleanlinessConditions: string[];
    defects: Defect[];
  };
  meters: Meter[];
  keys: Key[];
  photos: Photo[];
  agreements: Agreement[];
  signatures: {
    date: string;
    location: string;
    landlord: Signature;
    tenants: (Signature & { tenantId: number })[];
  };
}

// Partial types for form updates
export type PartialHandoverData = Partial<HandoverData>;

// Template types
export interface PropertyTemplate {
  id: string;
  address: Address;
  propertyType: string;
  floors: string[];
  designations: {
    wohneinheit?: string;
    stellplatz?: string;
    gewerbeeinheit?: string;
  };
}

export interface ManagerTemplate {
  id: string;
  type: 'verwalter' | 'eigentuemer';
  companyName: string;
  contactPerson?: string;
  address: Address;
}

export interface AgreementTemplate {
  id: string;
  subject: string;
  description: string;
  category: string;
}

export interface HandoverTemplate {
  id: string;
  name: string;
  propertyDefaults: Partial<HandoverData['property']>;
  agreementTemplates: string[]; // IDs of agreement templates
}