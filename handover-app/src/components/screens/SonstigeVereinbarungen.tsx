import React from 'react';
import InputField from '../InputField';
import { useHandoverArrayStep } from '../../hooks/useHandoverStep';
import type { Agreement } from '../../types/handover';

const SonstigeVereinbarungen: React.FC = () => {
  const { data: agreements, addItem, removeItem, updateItem } = useHandoverArrayStep('agreements');

  const addAgreement = () => {
    const newAgreement: Agreement = {
      id: Date.now(),
      subject: '',
      description: ''
    };
    addItem(newAgreement);
  };

  const removeAgreement = (id: number) => {
    const index = agreements.findIndex(agreement => agreement.id === id);
    if (index !== -1) {
      removeItem(index);
    }
  };

  const updateAgreement = (id: number, field: string, value: string) => {
    const index = agreements.findIndex(agreement => agreement.id === id);
    if (index !== -1) {
      updateItem(index, { [field]: value });
    }
  };



  return (
    <div className="max-w-2xl mx-auto px-4 py-4 space-y-6">
      <h2 className="text-lg font-medium text-blue-500 mb-4 flex items-center">
        <div className="bg-blue-500 rounded-lg p-2 mr-3">
          <svg className="w-6 h-6" fill="none" stroke="white" viewBox="0 0 24 24" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
        </div>
        Vereinbarungen
      </h2>
      
      {agreements.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
          <div className="mb-6">
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Vereinbarungen hinzufügen</h3>
            <p className="text-gray-600">Dokumentieren Sie besondere Vereinbarungen zur Wohnungsübergabe</p>
          </div>
          
          <button
            type="button"
            onClick={addAgreement}
            className="px-8 py-3 bg-blue-500 text-white font-medium rounded-xl hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          >
            Vereinbarung hinzufügen
          </button>
        </div>
      )}
      
      {/* Agreement Cards */}
      {agreements.map((agreement, index) => (
        <div key={agreement.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-md font-medium text-gray-500">
              Angaben zur Vereinbarung {agreements.length > 1 ? `${index + 1}` : ''}
            </h3>
            <button
              type="button"
              onClick={() => removeAgreement(agreement.id)}
              className="text-red-600 hover:text-red-700 text-sm"
            >
              Entfernen
            </button>
          </div>
          
          <InputField
            label="Betreff"
            value={agreement.subject}
            onChange={(value) => updateAgreement(agreement.id, 'subject', value)}
            required
          />
          
          <InputField
            label="Beschreibung"
            value={agreement.description}
            onChange={(value) => updateAgreement(agreement.id, 'description', value)}
            multiline
            rows={4}
            required
          />
        </div>
      ))}
      
      {/* Vereinbarung hinzufügen Button - Always at bottom if agreements exist */}
      {agreements.length > 0 && (
        <button
          type="button"
          onClick={addAgreement}
          className="w-full px-4 py-3 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        >
          Vereinbarung hinzufügen
        </button>
      )}
    </div>
  );
};

export default SonstigeVereinbarungen;