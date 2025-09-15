import React, { useState } from 'react';
import Select from '../Select';
import InputField from '../InputField';
import RadioGroup from '../RadioGroup';
import Toggle from '../Toggle';

interface PropertyData {
  selectedAddress: string;
  customAddress?: { street: string; postalCode: string; city: string };
  propertyType: string;
  customPropertyType?: string;
  selectedFloors: string[];
  designations?: { wohneinheit?: string; stellplatz?: string; gewerbeeinheit?: string };
}

const AngabenZumMietobjekt: React.FC = () => {
  const [property, setProperty] = useState<PropertyData>({
    selectedAddress: '',
    propertyType: '',
    selectedFloors: []
  });

  const [errors, setErrors] = useState<string[]>([]);
  const [showErrors, setShowErrors] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: string[] = [];

    // Validate address selection
    if (!property.selectedAddress) {
      newErrors.push('Bitte wählen Sie eine Anschrift aus');
    }

    // Validate custom address if selected
    if (property.selectedAddress === 'custom') {
      if (!property.customAddress?.street) {
        newErrors.push('Straße ist erforderlich');
      }
      if (!property.customAddress?.postalCode) {
        newErrors.push('PLZ ist erforderlich');
      }
      if (!property.customAddress?.city) {
        newErrors.push('Ort ist erforderlich');
      }
    }

    // Validate property type
    if (!property.propertyType) {
      newErrors.push('Bitte wählen Sie die Art des Mietobjekts aus');
    }

    // Validate custom property type if selected
    if (property.propertyType === 'custom' && !property.customPropertyType) {
      newErrors.push('Bitte geben Sie die Art des Mietobjekts an');
    }

    // Validate floors selection
    if (property.selectedFloors.length === 0) {
      newErrors.push('Bitte wählen Sie mindestens eine Etage aus');
    }

    setErrors(newErrors);
    const isValid = newErrors.length === 0;
    
    return isValid;
  };
  
  const [showDesignations, setShowDesignations] = useState(
    !!(property.designations?.wohneinheit || property.designations?.stellplatz || property.designations?.gewerbeeinheit)
  );
  const [hasBuiltInKitchen, setHasBuiltInKitchen] = useState('nein');
  const [kitchenCondition, setKitchenCondition] = useState('neu');
  const [cellars, setCellars] = useState<{id: number, name: string}[]>([]);
  const [inventories, setInventories] = useState<{id: number, name: string, condition: string}[]>([]);

  const floors = [
    '3. UG', '2. UG', '1. UG', 'EG',
    '1. OG', '2. OG', '3. OG', '4. OG',
    '5. OG', '6. OG', '7. OG', 'DG'
  ];

  // Helper functions for updating property data
  const updateSelectedAddress = (selectedAddress: string) => {
    setProperty(prev => ({ ...prev, selectedAddress }));
  };

  const updateCustomAddress = (field: string, value: string) => {
    setProperty(prev => ({
      ...prev,
      customAddress: {
        ...prev.customAddress,
        [field]: value
      }
    }));
  };

  const updatePropertyType = (propertyType: string) => {
    setProperty(prev => ({ ...prev, propertyType }));
  };

  const updateCustomPropertyType = (customPropertyType: string) => {
    setProperty(prev => ({ ...prev, customPropertyType }));
  };

  const toggleFloor = (floor: string) => {
    setProperty(prev => {
      const newFloors = prev.selectedFloors.includes(floor) 
        ? prev.selectedFloors.filter(f => f !== floor)
        : [...prev.selectedFloors, floor];
      return { ...prev, selectedFloors: newFloors };
    });
  };

  const updateDesignation = (field: string, value: string) => {
    setProperty(prev => ({
      ...prev,
      designations: {
        ...prev.designations,
        [field]: value
      }
    }));
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
    <div className="max-w-2xl mx-auto px-4 py-4 space-y-6">
      <h2 className="text-lg font-medium text-blue-500 mb-4 flex items-center">
        <div className="bg-blue-500 rounded-lg p-2 mr-3">
          <svg className="w-6 h-6" fill="none" stroke="white" viewBox="0 0 24 24" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>
        </div>
        Mietobjekt
      </h2>
      
      {/* Card: Angaben zum Mietobjekt */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <h3 className="text-md font-medium text-gray-500 mb-4">Angaben zum Mietobjekt</h3>
        
        <Select
          label="Anschrift"
          options={[
            { value: 'address1', label: 'Musterstraße 123, 12345 Berlin' },
            { value: 'address2', label: 'Beispielweg 456, 10115 Berlin' },
            { value: 'address3', label: 'Testgasse 789, 80331 München' },
            { value: 'custom', label: 'Eigene Eingabe' }
          ]}
          value={property.selectedAddress}
          onChange={updateSelectedAddress}
          required
        />
        
        {/* Felder nur anzeigen wenn "Eigene Eingabe" ausgewählt */}
        {property.selectedAddress === 'custom' && (
          <>
            <InputField
              label="Straße und Hausnummer"
              value={property.customAddress?.street || ''}
              onChange={(value) => updateCustomAddress('street', value)}
              required
            />
            
            <div className="grid grid-cols-2 gap-4">
              <InputField
                label="PLZ"
                value={property.customAddress?.postalCode || ''}
                onChange={(value) => updateCustomAddress('postalCode', value)}
                required
              />
              <InputField
                label="Ort"
                value={property.customAddress?.city || ''}
                onChange={(value) => updateCustomAddress('city', value)}
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
            { value: 'wg_zimmer', label: 'WG-Zimmer' },
            { value: 'custom', label: 'Eigene Angabe' }
          ]}
          value={property.propertyType}
          onChange={updatePropertyType}
          required
        />

        {/* Eingabefeld nur anzeigen wenn "Eigene Angabe" ausgewählt */}
        {property.propertyType === 'custom' && (
          <InputField
            label="Eigene Art des Mietobjekts"
            value={property.customPropertyType || ''}
            onChange={updateCustomPropertyType}
            required
          />
        )}
        
        {/* Etagen wählen */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Etage(n) wählen<span className="ml-0.5 text-gray-700">*</span>
          </label>
          <div className="grid grid-cols-4 gap-3">
            {floors.map((floor) => (
              <button
                key={floor}
                type="button"
                onClick={() => toggleFloor(floor)}
                className={`px-4 py-3 rounded-xl text-sm font-medium border transition-colors ${
                  property.selectedFloors.includes(floor)
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                {floor}
              </button>
            ))}
          </div>
        </div>

        {/* Bezeichnungen Button */}
        {!showDesignations && (
          <button
            type="button"
            onClick={() => setShowDesignations(true)}
            className="w-full px-4 py-3 mt-4 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors flex items-center justify-center gap-0"
          >
            Bezeichnungen eingeben
          </button>
        )}

        {/* Bezeichnungen Felder */}
        {showDesignations && (
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Bezeichnungen</h4>
            
            <InputField
              label="Wohneinheit"
              value={property.designations?.wohneinheit || ''}
              onChange={(value) => updateDesignation('wohneinheit', value)}
            />
            
            <InputField
              label="Stellplatz"
              value={property.designations?.stellplatz || ''}
              onChange={(value) => updateDesignation('stellplatz', value)}
            />
            
            <InputField
              label="Gewerbeeinheit"
              value={property.designations?.gewerbeeinheit || ''}
              onChange={(value) => updateDesignation('gewerbeeinheit', value)}
            />
            
            <button
              type="button"
              onClick={() => {
                setShowDesignations(false);
                setProperty(prev => ({ ...prev, designations: undefined }));
              }}
              className="text-sm text-red-600 hover:text-red-700 mt-2"
            >
              Bezeichnungen entfernen
            </button>
          </div>
        )}
        
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
                className="w-full px-4 py-3 mt-4 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors flex items-center justify-center gap-0"
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
        <div key={cellar.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
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

      {/* Inventar Cards */}
      {inventories.map((inventory, index) => (
        <div key={inventory.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
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

      {/* Error display */}
      {showErrors && errors.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
            <div>
              <h3 className="text-sm font-medium text-red-800 mb-2">
                Bitte korrigieren Sie folgende Fehler:
              </h3>
              <ul className="text-sm text-red-700 space-y-1">
                {errors.map((error, index) => (
                  <li key={index}>• {error}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AngabenZumMietobjekt;