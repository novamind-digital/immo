import React, { useState } from 'react';
import Select from '../Select';
import InputField from '../InputField';
import RadioGroup from '../RadioGroup';
import Toggle from '../Toggle';

const AngabenZumMietobjekt: React.FC = () => {
  const [selectedAddress, setSelectedAddress] = useState('');
  const [street, setStreet] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [city, setCity] = useState('');
  const [selectedFloors, setSelectedFloors] = useState<string[]>([]);
  const [propertyType, setPropertyType] = useState('wohnung');
  const [hasBuiltInKitchen, setHasBuiltInKitchen] = useState('nein');
  const [kitchenCondition, setKitchenCondition] = useState('neu');
  const [cellars, setCellars] = useState<{id: number, name: string}[]>([]);
  const [inventories, setInventories] = useState<{id: number, name: string, condition: string}[]>([]);

  const floors = [
    '3. UG', '2. UG', '1. UG', 'EG',
    '1. OG', '2. OG', '3. OG', '4. OG',
    '5. OG', '6. OG', '7. OG', 'DG'
  ];

  const toggleFloor = (floor: string) => {
    setSelectedFloors(prev => 
      prev.includes(floor) 
        ? prev.filter(f => f !== floor)
        : [...prev, floor]
    );
  };

  const addCellar = () => {
    const newCellar = {
      id: Date.now(),
      name: ''
    };
    setCellars([...cellars, newCellar]);
  };

  const removeCellar = (id: number) => {
    setCellars(cellars.filter(cellar => cellar.id !== id));
  };

  const updateCellarName = (id: number, name: string) => {
    setCellars(cellars.map(cellar => 
      cellar.id === id ? { ...cellar, name } : cellar
    ));
  };

  const addInventory = () => {
    const newInventory = {
      id: Date.now(),
      name: '',
      condition: 'neu'
    };
    setInventories([...inventories, newInventory]);
  };

  const removeInventory = (id: number) => {
    setInventories(inventories.filter(inventory => inventory.id !== id));
  };

  const updateInventoryName = (id: number, name: string) => {
    setInventories(inventories.map(inventory => 
      inventory.id === id ? { ...inventory, name } : inventory
    ));
  };

  const updateInventoryCondition = (id: number, condition: string) => {
    setInventories(inventories.map(inventory => 
      inventory.id === id ? { ...inventory, condition } : inventory
    ));
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
      <h2 className="text-lg font-medium text-blue-500 mb-4 flex items-center">
        <div className="bg-blue-500 rounded-lg p-2 mr-3">
          <svg className="w-6 h-6" fill="none" stroke="white" viewBox="0 0 24 24" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>
        </div>
        Mietobjekt
      </h2>
      
      {/* Card: Angaben zum Mietobjekt */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-md font-medium text-gray-500 mb-4">Angaben zum Mietobjekt</h3>
        
        <Select
          label="Anschrift"
          options={[
            { value: 'address1', label: 'Musterstraße 123, 12345 Berlin' },
            { value: 'address2', label: 'Beispielweg 456, 10115 Berlin' },
            { value: 'address3', label: 'Testgasse 789, 80331 München' },
            { value: 'custom', label: 'Eigene Eingabe' }
          ]}
          value={selectedAddress}
          onChange={setSelectedAddress}
          required
        />
        
        {/* Felder nur anzeigen wenn "Eigene Eingabe" ausgewählt */}
        {selectedAddress === 'custom' && (
          <>
            <InputField
              label="Straße und Hausnummer"
              value={street}
              onChange={setStreet}
              required
            />
            
            <div className="grid grid-cols-2 gap-4">
              <InputField
                label="PLZ"
                value={postalCode}
                onChange={setPostalCode}
                required
              />
              <InputField
                label="Ort"
                value={city}
                onChange={setCity}
                required
              />
            </div>
          </>
        )}
        
        {/* Art des Mietobjekts */}
        <Select
          label="Art des Mietobjekts"
          options={[
            { value: 'wohnung', label: 'Wohnung' },
            { value: 'gewerbeeinheit', label: 'Gewerbeeinheit' },
            { value: 'garage', label: 'Garage' },
            { value: 'stellplatz', label: 'Stellplatz' },
            { value: 'wg_zimmer', label: 'WG-Zimmer' }
          ]}
          value={propertyType}
          onChange={setPropertyType}
          required
        />
        
        {/* Etagen wählen */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Etage(n) wählen
          </label>
          <div className="grid grid-cols-4 gap-3">
            {floors.map((floor) => (
              <button
                key={floor}
                type="button"
                onClick={() => toggleFloor(floor)}
                className={`px-4 py-3 rounded-xl text-sm font-medium border transition-colors ${
                  selectedFloors.includes(floor)
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                {floor}
              </button>
            ))}
          </div>
        </div>
        
        {/* Einbauküche */}
        <div className="mt-6">
          <Toggle
            label="Ist eine Einbauküche vorhanden?"
            name="hasBuiltInKitchen"
            options={[
              { value: 'nein', label: 'Nein' },
              { value: 'ja', label: 'Ja' }
            ]}
            value={hasBuiltInKitchen}
            onChange={setHasBuiltInKitchen}
          />
          
          {/* Zusätzliche Felder wenn Einbauküche vorhanden */}
          {hasBuiltInKitchen === 'ja' && (
            <>
              <RadioGroup
                label="Zustand der Einbauküche"
                name="kitchenCondition"
                options={[
                  { value: 'neu', label: 'Neu' },
                  { value: 'neuwertig', label: 'Neuwertig' },
                  { value: 'gebraucht', label: 'Gebraucht' },
                  { value: 'stark_abgenutzt', label: 'Stark abgenutzt' }
                ]}
                value={kitchenCondition}
                onChange={setKitchenCondition}
              />
              
              <button
                type="button"
                className="w-full px-4 py-3 mt-4 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                </svg>
                Fotos von Einbauküche machen
              </button>
            </>
          )}
        </div>
      </div>
      
      {/* Keller Cards */}
      {cellars.map((cellar, index) => (
        <div key={cellar.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-md font-medium text-gray-500">
              Angaben zum Keller {cellars.length > 1 ? `${index + 1}` : ''}
            </h3>
            <button
              type="button"
              onClick={() => removeCellar(cellar.id)}
              className="text-red-600 hover:text-red-700 text-sm"
            >
              Entfernen
            </button>
          </div>
          
          <InputField
            label="Bezeichnung"
            value={cellar.name}
            onChange={(value) => updateCellarName(cellar.id, value)}
            placeholder="z.B. Kellerabteil A-12"
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
            Fotos machen
          </button>
        </div>
      ))}

      {/* Inventar Cards */}
      {inventories.map((inventory, index) => (
        <div key={inventory.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-md font-medium text-gray-500">
              Angaben zum Inventar {inventories.length > 1 ? `${index + 1}` : ''}
            </h3>
            <button
              type="button"
              onClick={() => removeInventory(inventory.id)}
              className="text-red-600 hover:text-red-700 text-sm"
            >
              Entfernen
            </button>
          </div>
          
          <InputField
            label="Bezeichnung"
            value={inventory.name}
            onChange={(value) => updateInventoryName(inventory.id, value)}
            placeholder="z.B. Küche, Badezimmer"
            required
          />
          
          <RadioGroup
            label="Zustand"
            name={`inventoryCondition-${inventory.id}`}
            options={[
              { value: 'neu', label: 'Neu' },
              { value: 'neuwertig', label: 'Neuwertig' },
              { value: 'gebraucht', label: 'Gebraucht' },
              { value: 'stark_abgenutzt', label: 'Stark abgenutzt' }
            ]}
            value={inventory.condition}
            onChange={(value) => updateInventoryCondition(inventory.id, value)}
          />
          
          <button
            type="button"
            className="w-full px-4 py-3 mt-4 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
            </svg>
            Fotos machen
          </button>
        </div>
      ))}
      
      {/* Action Buttons - Always at bottom */}
      <div className="flex gap-4">
        <button
          type="button"
          onClick={addCellar}
          className="flex-1 px-4 py-3 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        >
          Keller hinzufügen
        </button>
        <button
          type="button"
          onClick={addInventory}
          className="flex-1 px-4 py-3 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        >
          Inventar hinzufügen
        </button>
      </div>
    </div>
  );
};

export default AngabenZumMietobjekt;