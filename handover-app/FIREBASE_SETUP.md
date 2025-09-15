# Firebase Setup für Handover App

## 1. Firebase Projekt erstellen

1. Gehe zu [Firebase Console](https://console.firebase.google.com/)
2. Klicke auf "Projekt hinzufügen"
3. Gib einen Projektnamen ein (z.B. "handover-app")
4. Folge den Setup-Schritten

## 2. Firestore Database einrichten

1. Gehe zu "Firestore Database" im Firebase-Menü
2. Klicke auf "Datenbank erstellen"
3. Wähle "Im Testmodus starten" für die Entwicklung
4. Wähle eine Region (z.B. europe-west3 für Deutschland)

## 3. Storage einrichten

1. Gehe zu "Storage" im Firebase-Menü
2. Klicke auf "Erste Schritte"
3. Wähle "Im Testmodus starten"
4. Wähle dieselbe Region wie für Firestore

## 4. Web-App registrieren

1. Klicke auf das Web-Symbol (</>) in der Projektübersicht
2. Gib einen App-Namen ein
3. Registriere die App
4. Kopiere die Firebase-Konfiguration

## 5. Umgebungsvariablen konfigurieren

1. Kopiere `.env.example` zu `.env`
2. Ersetze die Demo-Werte mit deiner echten Firebase-Konfiguration:

```env
REACT_APP_FIREBASE_API_KEY=your_actual_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

## 6. Firestore Security Rules (Production)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Handover-Dokumente
    match /handovers/{handoverId} {
      allow read, write: if request.auth != null;
    }
    
    // Templates (nur lesen für authentifizierte Benutzer)
    match /properties/{propertyId} {
      allow read: if request.auth != null;
    }
    
    match /managers/{managerId} {
      allow read: if request.auth != null;
    }
    
    match /agreement-templates/{templateId} {
      allow read: if request.auth != null;
    }
  }
}
```

## 7. Storage Security Rules (Production)

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /handovers/{handoverId}/{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## 8. Indizes erstellen

Erstelle diese Composite-Indizes in der Firestore Console:

1. **handovers** Collection:
   - Felder: `meta.createdAt` (Descending), `meta.status` (Ascending)
   - Query scope: Collection

## 9. Authentifizierung (Optional)

Falls Benutzerauthentifizierung gewünscht:

1. Gehe zu "Authentication" im Firebase-Menü
2. Klicke auf "Erste Schritte"
3. Wähle Anmeldeanbieter (Email/Password empfohlen)
4. Aktiviere den gewünschten Anbieter

## Datenbankstruktur

Die App verwendet folgende Firestore-Struktur:

```
/handovers/{handoverId}
├── meta: { createdAt, updatedAt, status, version }
├── general: { rentalType, rentalDate, manager, tenants[] }
├── property: { selectedAddress, propertyType, selectedFloors[], ... }
├── condition: { overallCondition, cleanlinessConditions[], defects[] }
├── meters[]: { id, meterType, meterNumber, meterReading, ... }
├── keys[]: { id, type, quantity, ... }
├── photos[]: { id, room, description, imageUrl, ... }
├── agreements[]: { id, subject, description }
└── signatures: { date, location, landlord, tenants[] }
```

## Entwicklung vs. Produktion

- **Entwicklung**: Verwende die Demo-Werte in `.env` oder Firebase Emulator
- **Produktion**: Ersetze mit echten Firebase-Konfigurationswerten
- Vergiss nicht, die Security Rules für die Produktion zu aktivieren!