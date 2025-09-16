import React from 'react';
import Select from '../Select';
import InputField from '../InputField';
import { useHandoverArrayStep } from '../../hooks/useHandoverStep';
import type { Photo } from '../../types/handover';

const BilderZumMietobjekt: React.FC = () => {
  const { data: photos, addItem, removeItem, updateItem } = useHandoverArrayStep('photos');

  const addPhoto = () => {
    const newPhoto: Photo = {
      id: Date.now(),
      room: 'wohnzimmer',
      customRoom: '',
      description: ''
    };
    addItem(newPhoto);
  };

  const removePhoto = (id: number) => {
    const index = photos.findIndex(photo => photo.id === id);
    if (index !== -1) {
      removeItem(index);
    }
  };

  const updatePhoto = (id: number, field: string, value: string) => {
    const index = photos.findIndex(photo => photo.id === id);
    if (index !== -1) {
      updateItem(index, { [field]: value });
    }
  };



  return (
    <div className="max-w-2xl mx-auto px-4 py-4 space-y-6">
      <h2 className="text-lg font-medium text-blue-500 mb-4 flex items-center">
        <div className="bg-blue-500 rounded-lg p-2 mr-3">
          <svg className="w-6 h-6" fill="none" stroke="white" viewBox="0 0 24 24" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
          </svg>
        </div>
        Bilder
      </h2>

      {photos.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
          <div className="mb-6">
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Bilder hinzufügen</h3>
            <p className="text-gray-600">Dokumentieren Sie den Zustand der Wohnung mit Fotos</p>
          </div>
          
          <button
            type="button"
            onClick={addPhoto}
            className="px-8 py-3 bg-blue-500 text-white font-medium rounded-xl hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          >
            Bild hinzufügen
          </button>
        </div>
      )}

      {/* Photo Cards */}
      {photos.map((photo, index) => (
        <div key={photo.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-md font-medium text-gray-500">
              Bild {photos.length > 1 ? `${index + 1}` : ''}
            </h3>
            <button
              type="button"
              onClick={() => removePhoto(photo.id)}
              className="text-red-600 hover:text-red-700 text-sm"
            >
              Entfernen
            </button>
          </div>
          
          <Select
            label="Raum"
            options={[
              { value: 'wohnzimmer', label: 'Wohnzimmer' },
              { value: 'schlafzimmer', label: 'Schlafzimmer' },
              { value: 'kueche', label: 'Küche' },
              { value: 'bad', label: 'Bad' },
              { value: 'wc', label: 'WC' },
              { value: 'flur', label: 'Flur' },
              { value: 'balkon', label: 'Balkon' },
              { value: 'terrasse', label: 'Terrasse' },
              { value: 'keller', label: 'Keller' },
              { value: 'custom', label: 'Eigene Angabe' }
            ]}
            value={photo.room}
            onChange={(value) => updatePhoto(photo.id, 'room', value)}
            required
          />

          {/* Eingabefeld nur anzeigen wenn "Eigene Angabe" ausgewählt */}
          {photo.room === 'custom' && (
            <InputField
              label="Eigener Raum"
              value={photo.customRoom || ''}
              onChange={(value) => updatePhoto(photo.id, 'customRoom', value)}
              required
            />
          )}
          
          <InputField
            label="Beschreibung (optional)"
            value={photo.description}
            onChange={(value) => updatePhoto(photo.id, 'description', value)}
          />
          
          <button
            type="button"
            className="w-full px-4 py-3 mt-4 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors flex items-center justify-center gap-0"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
            </svg>
            Foto aufnehmen
          </button>
        </div>
      ))}
      
      {/* Bilder hinzufügen Button - Always at bottom if photos exist */}
      {photos.length > 0 && (
        <button
          type="button"
          onClick={addPhoto}
          className="w-full px-4 py-3 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        >
          Bild hinzufügen
        </button>
      )}
    </div>
  );
};

export default BilderZumMietobjekt;