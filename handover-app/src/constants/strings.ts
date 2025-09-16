// Common UI strings
export const UI_STRINGS = {
  // Navigation
  BACK: 'Zurück',
  NEXT: 'Weiter',
  COMPLETE: 'Abschließen',
  REMOVE: 'Entfernen',
  ADD: 'Hinzufügen',
  
  // Form labels
  RENTAL_TYPE: 'Angaben zur Miete',
  RENTAL_START: 'Mietbeginn',
  RENTAL_END: 'Mietende',
  RENTAL_START_DATE: 'Beginn Mietverhältnis',
  RENTAL_END_DATE: 'Ende Mietverhältnis',
  
  // Manager/Owner
  MANAGER_INFO: 'Angaben zum',
  MANAGER_TYPE_ADMIN: 'Verwalter',
  MANAGER_TYPE_OWNER: 'Eigentümer',
  CUSTOM_INPUT: 'Eigene Eingabe',
  
  // Person details
  PERSON: 'Person',
  COMPANY: 'Firma',
  FIRST_NAME: 'Vorname',
  LAST_NAME: 'Nachname',
  COMPANY_NAME: 'Firmenname',
  CONTACT_PERSON: 'Ansprechpartner',
  
  // Address
  STREET_ADDRESS: 'Straße und Hausnummer',
  POSTAL_CODE: 'PLZ',
  CITY: 'Ort',
  NEW_ADDRESS: 'Neue Adresse',
  
  // Contact
  PHONE: 'Telefon',
  EMAIL: 'E-Mail',
  
  // Tenant
  TENANT_INFO: 'Angaben zum Mieter',
  TENANT_PRESENT: 'Ist der Mieter anwesend?',
  PRESENT: 'Ja',
  NOT_PRESENT: 'Nein',
  ADD_TENANT: 'Mieter hinzufügen',
  
  // Bank details
  BANK_DETAILS: 'Bankdaten',
  ADD_BANK_DETAILS: 'Bankdaten hinzufügen',
  REMOVE_BANK_DETAILS: 'Bankdaten entfernen',
  IBAN: 'IBAN',
  BIC: 'BIC',
  BANK_NAME: 'Bankname',
  
  // Property
  PROPERTY_INFO: 'Angaben zum Mietobjekt',
  PROPERTY_TYPE: 'Objekttyp',
  PROPERTY_FLOORS: 'Geschoss',
  PROPERTY_DESIGNATIONS: 'Objektbezeichnungen',
  
  // Condition
  CONDITION: 'Zustand',
  OVERALL_CONDITION: 'Gesamtzustand',
  CLEANLINESS_CONDITION: 'Sauberkeitszustand',
  DEFECTS: 'Mängel',
  ADD_DEFECT: 'Mangel hinzufügen',
  DEFECT_INFO: 'Angaben zum Mangel',
  AFFECTED_ROOM: 'Betroffener Raum',
  CUSTOM_ROOM: 'Eigener Raum',
  NOTES: 'Bemerkung',
  TAKE_PHOTOS: 'Fotos machen',
  
  // Titles
  MR: 'Herr',
  MS: 'Frau',
  DIVERSE: 'Divers',
  
  // Rooms
  KITCHEN: 'Küche',
  BATHROOM: 'Bad',
  LIVING_ROOM: 'Wohnzimmer',
  BEDROOM: 'Schlafzimmer',
  WC: 'WC',
  
  // Conditions
  FIRST_OCCUPANCY: 'Erstbezug',
  LIKE_NEW: 'Neuwertig',
  GOOD_CONDITION: 'Guter Zustand',
  BASIC_CONDITION: 'Einfacher Zustand',
  
  // Cleanliness
  THOROUGHLY_CLEANED: 'Gründlich gereinigt',
  SWEPT_CLEAN: 'Besenrein',
  NOT_CLEANED: 'Nicht gereinigt',
  HEAVILY_SOILED: 'Stark verschmutzt',
  OBJECTS_TRASH_PRESENT: 'Gegenstände/Müll vorhanden',
  
  // Screen titles
  GENERAL: 'Allgemein',
  PROPERTY: 'Mietobjekt',
  STATE: 'Zustand',
  METERS: 'Zähler',
  KEYS: 'Schlüssel',
  IMAGES: 'Bilder',
  AGREEMENTS: 'Vereinbarungen',
  SIGNATURE: 'Unterzeichnung',
  PROTOCOL_DISPATCH: 'Protokollversand',
  
  // Error messages
  REQUIRED_FIELD: 'Dieses Feld ist erforderlich',
  INVALID_EMAIL: 'Ungültige E-Mail-Adresse',
  INVALID_PHONE: 'Ungültige Telefonnummer',
} as const;

// CSS class utilities
export const CSS_CLASSES = {
  CARD: 'bg-white rounded-xl shadow-sm border border-gray-200 p-4',
  BUTTON_PRIMARY: 'px-6 py-3 rounded-xl font-medium transition-colors bg-blue-500 text-white hover:bg-blue-600',
  BUTTON_SECONDARY: 'px-4 py-3 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors',
  SECTION_TITLE: 'text-lg font-medium text-blue-500 mb-4 flex items-center',
  ICON_CONTAINER: 'bg-blue-500 rounded-lg p-2 mr-3',
} as const;