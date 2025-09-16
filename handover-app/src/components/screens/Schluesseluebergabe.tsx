import React from 'react';
import Select from '../Select';
import InputField from '../InputField';
import { useHandoverArrayStep } from '../../hooks/useHandoverStep';
import type { Key } from '../../types/handover';

const Schluesseluebergabe: React.FC = () => {
  const { data: keys, addItem, removeItem, updateItem } = useHandoverArrayStep('keys');

  const addKey = () => {
    const newKey: Key = {
      id: Date.now(),
      type: 'haustuerschluessel',
      customType: '',
      quantity: '1'
    };
    addItem(newKey);
  };

  const removeKey = (id: number) => {
    const index = keys.findIndex(key => key.id === id);
    if (index !== -1) {
      removeItem(index);
    }
  };

  const updateKey = (id: number, field: string, value: string) => {
    const index = keys.findIndex(key => key.id === id);
    if (index !== -1) {
      updateItem(index, { [field]: value });
    }
  };



  return (
    <div className="max-w-2xl mx-auto px-4 py-4 space-y-6">
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
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Schlüssel hinzufügen</h3>
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
        <div key={key.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
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
              { value: 'haustuerschluessel', label: 'Haustürschlüssel' },
              { value: 'wohnungsschluessel', label: 'Wohnungsschlüssel' },
              { value: 'haustur_wohnungsschluessel', label: 'Haustür-/Wohnungsschlüssel' },
              { value: 'kellerschluessel', label: 'Kellerschlüssel' },
              { value: 'briefkastenschluessel', label: 'Briefkastenschlüssel' },
              { value: 'garagenschluessel', label: 'Garagenschlüssel' },
              { value: 'custom', label: 'Eigene Bezeichnung' }
            ]}
            value={key.type}
            onChange={(value) => updateKey(key.id, 'type', value)}
            required
          />

          {/* Eingabefeld nur anzeigen wenn "Eigene Bezeichnung" ausgewählt */}
          {key.type === 'custom' && (
            <InputField
              label="Eigene Schlüsselart"
              value={key.customType || ''}
              onChange={(value) => updateKey(key.id, 'customType', value)}
              required
            />
          )}
          
          {/* Anzahl Schieberegler */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Anzahl: {key.quantity}
            </label>
            <input
              type="range"
              min="0"
              max="10"
              value={key.quantity}
              onChange={(e) => updateKey(key.id, 'quantity', e.target.value)}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${(parseInt(key.quantity) / 10) * 100}%, #E5E7EB ${(parseInt(key.quantity) / 10) * 100}%, #E5E7EB 100%)`
              }}
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0</span>
              <span>5</span>
              <span>10</span>
            </div>
          </div>
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