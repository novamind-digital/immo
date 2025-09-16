import React from 'react';
import RadioGroup from '../RadioGroup';
import Select from '../Select';
import InputField from '../InputField';
import { useHandoverStep } from '../../hooks/useHandoverStep';
import type { Defect } from '../../types/handover';

const ZustandDesMietobjekts: React.FC = () => {
  const { data: condition, updateData } = useHandoverStep('condition');




  const updateOverallCondition = (overallCondition: string) => {
    updateData({ overallCondition });
  };

  const toggleCleanlinessCondition = (conditionValue: string) => {
    const currentConditions = condition.cleanlinessConditions;
    const newConditions = currentConditions.includes(conditionValue)
      ? currentConditions.filter(c => c !== conditionValue)
      : [...currentConditions, conditionValue];
    updateData({ cleanlinessConditions: newConditions });
  };

  const addDefect = () => {
    const newDefect: Defect = {
      id: Date.now(),
      room: 'kueche',
      customRoom: '',
      notes: ''
    };
    updateData({ defects: [...condition.defects, newDefect] });
  };

  const removeDefect = (id: number) => {
    updateData({ 
      defects: condition.defects.filter(defect => defect.id !== id) 
    });
  };

  const updateDefect = (id: number, field: keyof Defect, value: string) => {
    const updatedDefects = condition.defects.map(defect => 
      defect.id === id ? { ...defect, [field]: value } : defect
    );
    updateData({ defects: updatedDefects });
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-4 space-y-6">
      <h2 className="text-lg font-medium text-blue-500 mb-4 flex items-center">
        <div className="bg-blue-500 rounded-lg p-2 mr-3">
          <svg className="w-6 h-6" fill="none" stroke="white" viewBox="0 0 24 24" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
          </svg>
        </div>
        Zustand
      </h2>
      
      {/* Card: Zustandsbewertung */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        
        {/* Gesamtzustand */}
        <RadioGroup
          label="Gesamtzustand"
          name="overallCondition"
          options={[
            { value: 'erstbezug', label: 'Erstbezug' },
            { value: 'neuwertig', label: 'Neuwertig' },
            { value: 'guter_zustand', label: 'Guter Zustand' },
            { value: 'einfacher_zustand', label: 'Einfacher Zustand' }
          ]}
          value={condition.overallCondition}
          onChange={updateOverallCondition}
        />
        
        {/* Sauberkeitszustand */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Sauberkeitszustand<span className="ml-0.5 text-gray-700">*</span>
          </label>
          <div className="space-y-2">
            {[
              { value: 'gruendlich_gereinigt', label: 'Gründlich gereinigt' },
              { value: 'besenrein', label: 'Besenrein' },
              { value: 'nicht_gereinigt', label: 'Nicht gereinigt' },
              { value: 'stark_verschmutzt', label: 'Stark verschmutzt' },
              { value: 'gegenstaende_muell', label: 'Gegenstände/Müll vorhanden' }
            ].map((cleanlinessOption) => (
              <label key={cleanlinessOption.value} className="flex items-center">
                <input
                  type="checkbox"
                  checked={condition.cleanlinessConditions.includes(cleanlinessOption.value)}
                  onChange={() => toggleCleanlinessCondition(cleanlinessOption.value)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-3 text-sm text-gray-700">{cleanlinessOption.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
      
      {/* Mängel Cards */}
      {condition.defects.map((defect, index) => (
        <div key={defect.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-md font-medium text-gray-500">
              Angaben zum Mangel {condition.defects.length > 1 ? `${index + 1}` : ''}
            </h3>
            <button
              type="button"
              onClick={() => removeDefect(defect.id)}
              className="text-red-600 hover:text-red-700 text-sm"
            >
              Entfernen
            </button>
          </div>
          
          <Select
            label="Betroffener Raum"
            options={[
              { value: 'kueche', label: 'Küche' },
              { value: 'bad', label: 'Bad' },
              { value: 'wohnzimmer', label: 'Wohnzimmer' },
              { value: 'schlafzimmer', label: 'Schlafzimmer' },
              { value: 'wc', label: 'WC' },
              { value: 'custom', label: 'Eigene Angabe' }
            ]}
            value={defect.room}
            onChange={(value) => updateDefect(defect.id, 'room', value)}
            required
          />

          {/* Eingabefeld nur anzeigen wenn "Eigene Angabe" ausgewählt */}
          {defect.room === 'custom' && (
            <InputField
              label="Eigener Raum"
              value={defect.customRoom}
              onChange={(value) => updateDefect(defect.id, 'customRoom', value)}
              required
            />
          )}
          
          <InputField
            label="Bemerkung"
            value={defect.notes}
            onChange={(value) => updateDefect(defect.id, 'notes', value)}
            multiline
            rows={3}
            required
          />
          
          <button
            type="button"
            className="w-full px-4 py-3 mt-4 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors flex items-center justify-center gap-0"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
            </svg>
            Fotos machen
          </button>
        </div>
      ))}
      
      {/* Mangel hinzufügen Button */}
      <button
        type="button"
        onClick={addDefect}
        className="w-full px-4 py-3 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
      >
        Mangel hinzufügen
      </button>
    </div>
  );
};

export default ZustandDesMietobjekts;