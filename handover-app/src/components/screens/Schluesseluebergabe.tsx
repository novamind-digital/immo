import React, { useState } from 'react';
import Select from '../Select';
import InputField from '../InputField';

const Schluesseluebergabe: React.FC = () => {
  const [keys, setKeys] = useState<{id: number, type: string, quantity: string}[]>([]);

  const addKey = () => {
    const newKey = {
      id: Date.now(),
      type: 'haustuerschluessel',
      quantity: '1'
    };
    setKeys([...keys, newKey]);
  };

  const removeKey = (id: number) => {
    setKeys(keys.filter(key => key.id !== id));
  };

  const updateKey = (id: number, field: string, value: string) => {
    setKeys(keys.map(key => 
      key.id === id ? { ...key, [field]: value } : key
    ));
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
      <h2 className="text-lg font-medium text-blue-500 mb-4 flex items-center">
        <div className="bg-blue-500 rounded-lg p-2 mr-3">
          <svg className="w-6 h-6" fill="none" stroke="white" viewBox="0 0 24 24" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
          </svg>
        </div>
        Schlüssel
      </h2>
      
      {keys.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
          <div className="mb-6">
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Ersten Schlüssel hinzufügen</h3>
            <p className="text-gray-600">Erfassen Sie alle übergebenen Schlüssel für eine vollständige Dokumentation</p>
          </div>
          
          <button
            type="button"
            onClick={addKey}
            className="px-8 py-3 bg-blue-500 text-white font-medium rounded-xl hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          >
            Schlüssel hinzufügen
          </button>
        </div>
      )}
      
      {/* Schlüssel Cards */}
      {keys.map((key, index) => (
        <div key={key.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-md font-medium text-gray-500">
              Angaben zum Schlüssel {keys.length > 1 ? `${index + 1}` : ''}
            </h3>
            <button
              type="button"
              onClick={() => removeKey(key.id)}
              className="text-red-600 hover:text-red-700 text-sm"
            >
              Entfernen
            </button>
          </div>
          
          <Select
            label="Art"
            options={[
              { value: 'haustuerschluessel', label: 'Haustür' },
              { value: 'wohnungsschluessel', label: 'Wohnung' },
              { value: 'kellerschluessel', label: 'Keller' },
              { value: 'briefkastenschluessel', label: 'Briefkasten' },
              { value: 'garagenschluessel', label: 'Garage' }
            ]}
            value={key.type}
            onChange={(value) => updateKey(key.id, 'type', value)}
            required
          />
          
          <InputField
            label="Anzahl"
            value={key.quantity}
            onChange={(value) => updateKey(key.id, 'quantity', value)}
            placeholder="z.B. 2"
            type="number"
            required
          />
          
          <button
            type="button"
            className="w-full px-4 py-3 mt-4 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
            </svg>
            Foto machen
          </button>
        </div>
      ))}
      
      {/* Schlüssel hinzufügen Button - Always at bottom if keys exist */}
      {keys.length > 0 && (
        <button
          type="button"
          onClick={addKey}
          className="w-full px-4 py-3 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        >
          Schlüssel hinzufügen
        </button>
      )}
    </div>
  );
};

export default Schluesseluebergabe;