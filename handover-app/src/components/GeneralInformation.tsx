import React, { useState } from 'react';
import type { HandoverFormData, Owner, Tenant } from '../types';
import RadioGroup from './RadioGroup';
import InputField from './InputField';
import DatePicker from './DatePicker';
import Toggle from './Toggle';
import ActionButton from './ActionButton';

interface GeneralInformationProps {
  data: HandoverFormData;
  onUpdate: (data: HandoverFormData) => void;
}

const GeneralInformation: React.FC<GeneralInformationProps> = ({ data, onUpdate }) => {
  const [, setShowOwnerDetails] = useState(false);

  const handleRentalTypeChange = (value: string) => {
    onUpdate({
      ...data,
      rentalType: value as 'start' | 'end'
    });
  };

  const handleStartDateChange = (value: string) => {
    onUpdate({
      ...data,
      startDate: value
    });
  };

  const handleOwnerChange = (field: keyof Owner, value: string | boolean) => {
    onUpdate({
      ...data,
      owner: {
        ...data.owner,
        [field]: value
      }
    });
  };

  const handleTenantChange = (index: number, field: keyof Tenant, value: string | boolean) => {
    const updatedTenants = [...data.tenants];
    const processedValue = field === 'isPresent' ? value === 'true' : value;
    updatedTenants[index] = {
      ...updatedTenants[index],
      [field]: processedValue
    };
    onUpdate({
      ...data,
      tenants: updatedTenants
    });
  };

  const addTenant = () => {
    const newTenant: Tenant = {
      firstName: '',
      lastName: '',
      street: '',
      postalCode: '',
      city: '',
      type: 'person',
      isPresent: true
    };
    onUpdate({
      ...data,
      tenants: [...data.tenants, newTenant]
    });
  };

  const removeTenant = (index: number) => {
    const updatedTenants = data.tenants.filter((_, i) => i !== index);
    onUpdate({
      ...data,
      tenants: updatedTenants
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h2 className="text-lg font-medium text-primary-500 mb-4 flex items-center">
          <span className="text-2xl mr-2">📋</span>
          Allgemeine Angaben
        </h2>
        
        {/* Step Progress */}
        <p className="text-sm text-gray-500 mb-6">0 von 7 Schritten abgeschlossen</p>

        {/* Rental Type Selection */}
        <div className="mb-6">
          <p className="text-sm font-medium text-gray-700 mb-3">Angaben zur Miete</p>
          <RadioGroup
            name="rentalType"
            options={[
              { value: 'start', label: 'Mietbeginn' },
              { value: 'end', label: 'Mietende' }
            ]}
            value={data.rentalType}
            onChange={handleRentalTypeChange}
          />
        </div>

        {/* Date Picker */}
        <DatePicker
          label="Beginn Mietverhältnis"
          value={data.startDate || ''}
          onChange={handleStartDateChange}
          placeholder="TT.MM.JJ"
        />

        {/* Owner Section */}
        <div className="mb-8">
          <p className="text-sm font-medium text-gray-700 mb-4">Angaben zum Eigentümer</p>
          
          {/* Owner Type */}
          <RadioGroup
            name="ownerType"
            options={[
              { value: 'company', label: 'Verwalter' },
              { value: 'person', label: 'Eigentümer' }
            ]}
            value={data.owner.type}
            onChange={(value) => handleOwnerChange('type', value)}
          />

          {data.owner.type === 'person' && (
            <>
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Eigentümer auswählen</p>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  onChange={() => setShowOwnerDetails(true)}
                >
                  <option>Eigene Eingabe</option>
                </select>
              </div>

              <RadioGroup
                name="ownerTitle"
                options={[
                  { value: 'person', label: 'Person' },
                  { value: 'company', label: 'Firma' }
                ]}
                value={data.owner.type}
                onChange={(value) => handleOwnerChange('type', value)}
              />

              {data.owner.type === 'person' && (
                <RadioGroup
                  name="ownerGender"
                  options={[
                    { value: 'herr', label: 'Herr' },
                    { value: 'frau', label: 'Frau' },
                    { value: 'divers', label: 'Divers' }
                  ]}
                  value={data.owner.title || 'herr'}
                  onChange={(value) => handleOwnerChange('title', value)}
                />
              )}

              {/* Owner Details */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <InputField
                  label="Vorname"
                  value={data.owner.firstName}
                  onChange={(value) => handleOwnerChange('firstName', value)}
                />
                <InputField
                  label="Nachname"
                  value={data.owner.lastName}
                  onChange={(value) => handleOwnerChange('lastName', value)}
                />
              </div>

              <InputField
                label="Straße und Hausnummer"
                value={data.owner.street}
                onChange={(value) => handleOwnerChange('street', value)}
              />

              <div className="grid grid-cols-2 gap-4">
                <InputField
                  label="Postleitzahl"
                  value={data.owner.postalCode}
                  onChange={(value) => handleOwnerChange('postalCode', value)}
                />
                <InputField
                  label="Ort"
                  value={data.owner.city}
                  onChange={(value) => handleOwnerChange('city', value)}
                />
              </div>
            </>
          )}
        </div>

        {/* Tenant Section */}
        <div className="mb-8">
          <p className="text-sm font-medium text-gray-700 mb-4">Angaben zum Mieter</p>
          
          {data.tenants.map((tenant, index) => (
            <div key={index} className="mb-6 p-4 border border-gray-200 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-medium text-gray-900">
                  Mieter {index + 1}
                </h4>
                {data.tenants.length > 1 && (
                  <button
                    onClick={() => removeTenant(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Entfernen
                  </button>
                )}
              </div>

              <RadioGroup
                name={`tenantType${index}`}
                options={[
                  { value: 'person', label: 'Person' },
                  { value: 'company', label: 'Firma' }
                ]}
                value={tenant.type}
                onChange={(value) => handleTenantChange(index, 'type', value)}
              />

              {tenant.type === 'person' && (
                <RadioGroup
                  name={`tenantGender${index}`}
                  options={[
                    { value: 'herr', label: 'Herr' },
                    { value: 'frau', label: 'Frau' },
                    { value: 'divers', label: 'Divers' }
                  ]}
                  value={tenant.title || 'herr'}
                  onChange={(value) => handleTenantChange(index, 'title', value)}
                />
              )}

              <div className="grid grid-cols-2 gap-4 mb-4">
                <InputField
                  label="Vorname"
                  value={tenant.firstName}
                  onChange={(value) => handleTenantChange(index, 'firstName', value)}
                />
                <InputField
                  label="Nachname"
                  value={tenant.lastName}
                  onChange={(value) => handleTenantChange(index, 'lastName', value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <InputField
                  label="Telefonnummer"
                  value={tenant.phone || ''}
                  onChange={(value) => handleTenantChange(index, 'phone', value)}
                />
                <InputField
                  label="E-Mail"
                  value={tenant.email || ''}
                  onChange={(value) => handleTenantChange(index, 'email', value)}
                />
              </div>

              <Toggle
                label="Ist der Mieter bei der Übergabe anwesend?"
                value={tenant.isPresent.toString()}
                onChange={(value) => handleTenantChange(index, 'isPresent', value)}
                options={[
                  { value: 'true', label: 'Anwesend' },
                  { value: 'false', label: 'Nicht anwesend' }
                ]}
                name={`tenant-present-${index}`}
              />
            </div>
          ))}

          <div className="flex gap-4">
            <ActionButton onClick={() => {}} variant="link">
              + Bankdaten hinzufügen
            </ActionButton>
            <ActionButton onClick={addTenant} variant="link">
              + Mieter hinzufügen
            </ActionButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralInformation;