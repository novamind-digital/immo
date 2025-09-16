import { useState } from 'react';
import { handoverService } from '../services/handoverService';

const FirebaseTest = () => {
  const [testResult, setTestResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const testFirebaseConnection = async () => {
    setIsLoading(true);
    setTestResult('Testing Firebase connection...');
    
    try {
      // Create a test handover document
      const testData = {
        general: {
          rentalType: 'start' as const,
          rentalDate: '2024-01-01',
          manager: {
            type: 'verwalter' as const,
            selectedId: 'test-manager',
          },
          tenants: [{
            id: Date.now(),
            type: 'person' as const,
            title: 'herr' as const,
            firstName: 'Test',
            lastName: 'User',
            companyName: '',
            contactPerson: '',
            phone: '+49123456789',
            email: 'test@example.com',
            present: 'ja' as const,
          }]
        },
        property: {
          selectedAddress: 'Teststraße 123, 12345 Berlin',
          propertyType: 'wohnung',
          selectedFloors: []
        },
        condition: {
          overallCondition: 'gut' as const,
          cleanlinessConditions: [],
          defects: []
        },
        meters: [],
        keys: [],
        photos: [],
        agreements: [],
        signatures: {
          date: new Date().toLocaleDateString('de-DE'),
          location: 'Berlin',
          landlord: { name: 'Test Landlord' },
          tenants: []
        }
      };

      // Test save to Firebase
      setTestResult('Creating handover in Firebase...');
      const handoverId = await handoverService.createHandover(testData);
      
      if (handoverId) {
        setTestResult(`✅ Success! Created handover with ID: ${handoverId}`);
        
        // Test load from Firebase
        setTimeout(async () => {
          setTestResult(prev => prev + '\n\nTesting data retrieval...');
          const retrievedData = await handoverService.getHandover(handoverId);
          
          if (retrievedData) {
            setTestResult(prev => prev + '\n✅ Successfully retrieved data from Firebase!');
            setTestResult(prev => prev + `\n📄 Retrieved data: ${JSON.stringify(retrievedData.general.tenants[0].firstName, null, 2)}`);
          } else {
            setTestResult(prev => prev + '\n❌ Failed to retrieve data');
          }
        }, 1000);
        
      } else {
        setTestResult('❌ Failed to create handover');
      }
      
    } catch (error) {
      console.error('Firebase test error:', error);
      setTestResult(`❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md m-4">
      <h2 className="text-xl font-bold mb-4">🔥 Firebase Connection Test</h2>
      
      <button
        onClick={testFirebaseConnection}
        disabled={isLoading}
        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed mb-4"
      >
        {isLoading ? 'Testing...' : 'Test Firebase Connection'}
      </button>
      
      {testResult && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Test Results:</h3>
          <pre className="text-sm whitespace-pre-wrap">{testResult}</pre>
        </div>
      )}
      
      <div className="mt-4 text-sm text-gray-600">
        <p>This test will:</p>
        <ul className="list-disc ml-5">
          <li>Create a test handover document in Firestore</li>
          <li>Retrieve the document to verify read access</li>
          <li>Show success/error messages</li>
        </ul>
      </div>
    </div>
  );
};

export default FirebaseTest;