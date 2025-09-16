import React from 'react';
import Select from '../Select';
import InputField from '../InputField';
import DatePicker from '../DatePicker';
import { useHandoverArrayStep } from '../../hooks/useHandoverStep';
import type { Meter } from '../../types/handover';

const Zaehlererfassung: React.FC = () => {
  const { data: meters, addItem, removeItem, updateItem } = useHandoverArrayStep('meters');

  const addMeter = () => {
    const newMeter: Meter = {
      id: Date.now(),
      readingDate: '',
      meterType: 'stromzaehler',
      customMeterType: '',
      meterLocation: 'wohnung',
      customMeterLocation: '',
      meterNumber: '',
      meterReading: ''
    };
    addItem(newMeter);
  };

  const removeMeter = (id: number) => {
    const index = meters.findIndex(meter => meter.id === id);
    if (index !== -1) {
      removeItem(index);
    }
  };

  const updateMeter = (id: number, field: string, value: string) => {
    const index = meters.findIndex(meter => meter.id === id);
    if (index !== -1) {
      updateItem(index, { [field]: value });
    }
  };



  return (
    <div className="max-w-2xl mx-auto px-4 py-4 space-y-6">
      <h2 className="text-lg font-medium text-blue-500 mb-4 flex items-center">
        <div className="bg-blue-500 rounded-lg p-2 mr-3">
          <svg className="w-6 h-6" fill="none" stroke="white" viewBox="0 0 24 24" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
          </svg>
        </div>
        Zähler
      </h2>
      
      {meters.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
          <div className="mb-6">
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Zähler hinzufügen</h3>
            <p className="text-gray-600">Erfassen Sie alle relevanten Zähler für eine korrekte Abrechnung</p>
          </div>
          
          <button
            type="button"
            onClick={addMeter}
            className="px-8 py-3 bg-blue-500 text-white font-medium rounded-xl hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          >
            Zähler hinzufügen
          </button>
        </div>
      )}
      
      {/* Zähler Cards */}
      {meters.map((meter, index) => (
        <div key={meter.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-md font-medium text-gray-500">
              Angaben zum Zähler {meters.length > 1 ? `${index + 1}` : ''}
            </h3>
            <button
              type="button"
              onClick={() => removeMeter(meter.id)}
              className="text-red-600 hover:text-red-700 text-sm"
            >
              Entfernen
            </button>
          </div>
          
          <DatePicker
            label="Ablesedatum"
            value={meter.readingDate}
            onChange={(value) => updateMeter(meter.id, 'readingDate', value)}
            required
          />
          
          <Select
            label="Zählerart"
            options={[
              { value: 'heizkostenverteiler', label: 'Heizkostenverteiler' },
              { value: 'stromzaehler', label: 'Stromzähler' },
              { value: 'ht_stromzaehler', label: 'HT Stromzähler' },
              { value: 'nt_stromzaehler', label: 'NT Stromzähler' },
              { value: 'waermemengenzaehler', label: 'Wärmemengenzähler' },
              { value: 'gaszaehler', label: 'Gaszähler' },
              { value: 'ww_wasserzaehler', label: 'WW Wasserzähler' },
              { value: 'kw_wasserzaehler', label: 'KW Wasserzähler' },
              { value: 'custom', label: 'Eigene Bezeichnung' }
            ]}
            value={meter.meterType}
            onChange={(value) => updateMeter(meter.id, 'meterType', value)}
            required
          />

          {/* Eingabefeld nur anzeigen wenn "Eigene Bezeichnung" ausgewählt */}
          {meter.meterType === 'custom' && (
            <InputField
              label="Eigene Zählerart"
              value={meter.customMeterType || ''}
              onChange={(value) => updateMeter(meter.id, 'customMeterType', value)}
              required
            />
          )}
          
          <Select
            label="Lage des Zählers"
            options={[
              { value: 'wohnung', label: 'Wohnung' },
              { value: 'treppenhaus', label: 'Treppenhaus' },
              { value: 'keller', label: 'Keller' },
              { value: 'custom', label: 'Eigene eingeben' }
            ]}
            value={meter.meterLocation}
            onChange={(value) => updateMeter(meter.id, 'meterLocation', value)}
            required
          />

          {/* Eingabefeld nur anzeigen wenn "Eigene eingeben" ausgewählt */}
          {meter.meterLocation === 'custom' && (
            <InputField
              label="Eigene Lage"
              value={meter.customMeterLocation || ''}
              onChange={(value) => updateMeter(meter.id, 'customMeterLocation', value)}
              required
            />
          )}
          
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Zählernummer"
              value={meter.meterNumber}
              onChange={(value) => updateMeter(meter.id, 'meterNumber', value)}
              required
            />
            <InputField
              label="Zählerstand"
              value={meter.meterReading}
              onChange={(value) => updateMeter(meter.id, 'meterReading', value)}
              required
            />
          </div>
          
          <button
            type="button"
            className="w-full px-4 py-3 mt-4 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors flex items-center justify-center gap-0"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
            </svg>
            Foto machen
          </button>
        </div>
      ))}
      
      {/* Zähler hinzufügen Button - Always at bottom if meters exist */}
      {meters.length > 0 && (
        <button
          type="button"
          onClick={addMeter}
          className="w-full px-4 py-3 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        >
          Zähler hinzufügen
        </button>
      )}
    </div>
  );
};

export default Zaehlererfassung;