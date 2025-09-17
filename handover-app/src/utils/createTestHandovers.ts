import type { HandoverData } from '../types/handover';

export const createTestHandovers = (): (HandoverData & { id: string })[] => {
  const now = new Date();
  
  // Termin 1: Morgen um 14:00
  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);
  tomorrow.setHours(14, 0, 0, 0);
  
  // Termin 2: Übermorgen um 10:30
  const dayAfterTomorrow = new Date(now);
  dayAfterTomorrow.setDate(now.getDate() + 2);
  dayAfterTomorrow.setHours(10, 30, 0, 0);
  
  // Termin 3: In 5 Tagen um 16:00
  const inFiveDays = new Date(now);
  inFiveDays.setDate(now.getDate() + 5);
  inFiveDays.setHours(16, 0, 0, 0);

  const testHandovers: (HandoverData & { id: string })[] = [
    {
      id: 'test-handover-1',
      meta: {
        createdAt: now,
        updatedAt: now,
        status: 'draft',
        version: 1,
        userId: 'test-user'
      },
      scheduling: {
        scheduledDate: tomorrow,
        scheduledTime: '14:00',
        estimatedDuration: 90,
        location: 'Haupteingang',
        participantNames: ['Max Mustermann', 'Anna Schmidt'],
        reminderSet: true,
        reminderDate: new Date(tomorrow.getTime() - 24 * 60 * 60 * 1000), // 24h vorher
        notes: 'Schlüssel beim Hausmeister abholen'
      },
      general: {
        rentalType: 'start',
        rentalDate: '18.09.25',
        manager: {
          type: 'verwalter',
          selectedId: 'owner1'
        },
        tenants: [{
          id: 1,
          type: 'person',
          title: 'herr',
          firstName: 'Max',
          lastName: 'Mustermann',
          phone: '+49 123 456789',
          email: 'max.mustermann@email.de',
          present: 'ja'
        }]
      },
      property: {
        selectedAddress: 'Musterstraße 123, 12345 Berlin',
        propertyType: 'wohnung',
        selectedFloors: ['erdgeschoss'],
        builtInKitchen: {
          hasBuiltInKitchen: 'ja',
          condition: 'neuwertig'
        },
        cellars: [],
        inventories: []
      },
      condition: {
        overallCondition: 'gut',
        cleanlinessConditions: ['sauber'],
        defects: []
      },
      meters: [],
      keys: [],
      photos: [],
      agreements: [],
      signatures: {
        date: '',
        location: '',
        landlord: { name: '' },
        tenants: []
      }
    },
    {
      id: 'test-handover-2',
      meta: {
        createdAt: now,
        updatedAt: now,
        status: 'draft',
        version: 1,
        userId: 'test-user'
      },
      scheduling: {
        scheduledDate: dayAfterTomorrow,
        scheduledTime: '10:30',
        estimatedDuration: 120,
        location: 'Wohnung 2B',
        participantNames: ['Lisa Weber'],
        reminderSet: true,
        reminderDate: new Date(dayAfterTomorrow.getTime() - 24 * 60 * 60 * 1000),
        notes: 'Protokoll für Kaution mitbringen'
      },
      general: {
        rentalType: 'end',
        rentalDate: '20.09.25',
        manager: {
          type: 'eigentuemer',
          selectedId: 'owner2'
        },
        tenants: [{
          id: 1,
          type: 'person',
          title: 'frau',
          firstName: 'Lisa',
          lastName: 'Weber',
          phone: '+49 987 654321',
          email: 'lisa.weber@email.de',
          present: 'ja'
        }]
      },
      property: {
        selectedAddress: 'Beispielweg 45, 10115 München',
        propertyType: 'wohnung',
        selectedFloors: ['zweites_og'],
        builtInKitchen: {
          hasBuiltInKitchen: 'nein'
        },
        cellars: [],
        inventories: []
      },
      condition: {
        overallCondition: 'gut',
        cleanlinessConditions: ['sauber'],
        defects: []
      },
      meters: [],
      keys: [],
      photos: [],
      agreements: [],
      signatures: {
        date: '',
        location: '',
        landlord: { name: '' },
        tenants: []
      }
    },
    {
      id: 'test-handover-3',
      meta: {
        createdAt: now,
        updatedAt: now,
        status: 'draft',
        version: 1,
        userId: 'test-user'
      },
      scheduling: {
        scheduledDate: inFiveDays,
        scheduledTime: '16:00',
        estimatedDuration: 60,
        location: 'Hausmeisterwohnung',
        participantNames: ['Thomas Müller', 'Sarah Müller'],
        reminderSet: true,
        reminderDate: new Date(inFiveDays.getTime() - 24 * 60 * 60 * 1000),
        notes: 'Gemeinsame Begehung der Wohnung'
      },
      general: {
        rentalType: 'start',
        rentalDate: '22.09.25',
        manager: {
          type: 'verwalter',
          selectedId: 'owner3'
        },
        tenants: [
          {
            id: 1,
            type: 'person',
            title: 'herr',
            firstName: 'Thomas',
            lastName: 'Müller',
            phone: '+49 555 123456',
            email: 'thomas.mueller@email.de',
            present: 'ja'
          },
          {
            id: 2,
            type: 'person',
            title: 'frau',
            firstName: 'Sarah',
            lastName: 'Müller',
            phone: '+49 555 123457',
            email: 'sarah.mueller@email.de',
            present: 'ja'
          }
        ]
      },
      property: {
        selectedAddress: 'Teststraße 78, 20359 Hamburg',
        propertyType: 'wohnung',
        selectedFloors: ['erstes_og'],
        builtInKitchen: {
          hasBuiltInKitchen: 'ja',
          condition: 'gebraucht'
        },
        cellars: [],
        inventories: []
      },
      condition: {
        overallCondition: 'sehr_gut',
        cleanlinessConditions: ['sauber'],
        defects: []
      },
      meters: [],
      keys: [],
      photos: [],
      agreements: [],
      signatures: {
        date: '',
        location: '',
        landlord: { name: '' },
        tenants: []
      }
    }
  ];

  return testHandovers;
};