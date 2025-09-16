import React, { useState } from 'react';
import InputField from './InputField';
import DatePicker from './DatePicker';
import Toggle from './Toggle';
import Select from './Select';

interface Address {
  street: string;
  postalCode: string;
  city: string;
}

interface BankDetails {
  iban: string;
  bic: string;
  bankName: string;
}

interface Tenant {
  id: number;
  type: 'person' | 'company';
  title: 'herr' | 'frau' | 'divers';
  firstName: string;
  lastName: string;
  companyName: string;
  contactPerson: string;
  phone: string;
  email: string;
  present: 'ja' | 'nein';
  address?: Address;
  bankDetails?: BankDetails;
}

interface Manager {
  type: 'verwalter' | 'eigentuemer';
  selectedId: string;
  customData?: {
    type: 'person' | 'company';
    title: 'herr' | 'frau' | 'divers';
    firstName: string;
    lastName: string;
    companyName: string;
    address: Address;
  };
}

interface FormData {
  rentalType: 'start' | 'end';
  rentalDate: string;
  manager: Manager;
  tenants: Tenant[];
}

const SimpleForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    rentalType: 'start',
    rentalDate: '',
    manager: {
      type: 'verwalter',
      selectedId: '',
    },
    tenants: [{
      id: Date.now(),
      type: 'person',
      title: 'herr',
      firstName: '',
      lastName: '',
      companyName: '',
      contactPerson: '',
      phone: '',
      email: '',
      present: 'ja',
    }]
  });



  // Helper functions for updating state
  const updateRentalType = (rentalType: 'start' | 'end') => {
    setFormData(prev => ({ ...prev, rentalType }));
  };

  const updateManagerType = (type: 'verwalter' | 'eigentuemer') => {
    setFormData(prev => ({
      ...prev,
      manager: { ...prev.manager, type }
    }));
  };

  // Wrapper functions for Toggle component compatibility
  const handleRentalTypeChange = (value: string) => {
    updateRentalType(value as 'start' | 'end');
  };

  const handleManagerTypeChange = (value: string) => {
    updateManagerType(value as 'verwalter' | 'eigentuemer');
  };

  const updateSelectedOwner = (selectedId: string) => {
    setFormData(prev => ({
      ...prev,
      manager: { ...prev.manager, selectedId }
    }));
  };

  const updateOwnerCustomData = (field: string, value: any) => {
    const currentCustomData = formData.manager.customData || {
      type: 'person' as const,
      title: 'herr' as const,
      firstName: '',
      lastName: '',
      companyName: '',
      address: { street: '', postalCode: '', city: '' }
    };

    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        manager: {
          ...prev.manager,
          customData: {
            ...currentCustomData,
            [parent]: {
              ...(currentCustomData[parent as keyof typeof currentCustomData] as any),
              [child]: value
            }
          }
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        manager: {
          ...prev.manager,
          customData: {
            ...currentCustomData,
            [field]: value
          }
        }
      }));
    }
  };

  const updateRentalDate = (rentalDate: string) => {
    setFormData(prev => ({ ...prev, rentalDate }));
  };

  const addTenant = () => {
    const newTenant: Tenant = {
      id: Date.now(),
      type: 'person',
      title: 'herr',
      firstName: '',
      lastName: '',
      companyName: '',
      contactPerson: '',
      phone: '',
      email: '',
      present: 'ja',
    };
    setFormData(prev => ({
      ...prev,
      tenants: [...prev.tenants, newTenant]
    }));
  };

  const removeTenant = (id: number) => {
    setFormData(prev => ({
      ...prev,
      tenants: prev.tenants.filter(tenant => tenant.id !== id)
    }));
  };

  const updateTenant = (id: number, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      tenants: prev.tenants.map(tenant => {
        if (tenant.id === id) {
          if (field.includes('.')) {
            const [parent, child] = field.split('.');
            return {
              ...tenant,
              [parent]: {
                ...(tenant[parent as keyof Tenant] as any),
                [child]: value
              }
            };
          }
          return { ...tenant, [field]: value };
        }
        return tenant;
      })
    }));
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h2 className="text-lg font-medium text-blue-500 mb-4 flex items-center">
        <div className="bg-blue-500 rounded-lg p-2 mr-3">
          <svg className="w-6 h-6" fill="none" stroke="white" viewBox="0 0 24 24" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
        </div>
        Allgemein
      </h2>
      
      {/* Card 1: Angaben zur Miete */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <h3 className="text-md font-medium text-gray-500 mb-4">Angaben zur Miete</h3>
        
        <Toggle
          name="rentalType"
          options={[
            { value: 'start', label: 'Mietbeginn' },
            { value: 'end', label: 'Mietende' }
          ]}
          value={formData.rentalType}
          onChange={handleRentalTypeChange}
        />

        <DatePicker
          label={formData.rentalType === 'start' ? 'Beginn Mietverhältnis' : 'Ende Mietverhältnis'}
          value={formData.rentalDate}
          onChange={updateRentalDate}
          required
        />
      </div>

      {/* Card 2: Angaben zum Eigentümer */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <h3 className="text-md font-medium text-gray-500 mb-4">Angaben zum {formData.manager.type === 'verwalter' ? 'Verwalter' : 'Eigentümer'}</h3>
        
        <Toggle
          name="managerType"
          options={[
            { value: 'verwalter', label: 'Verwalter' },
            { value: 'eigentuemer', label: 'Eigentümer' }
          ]}
          value={formData.manager.type}
          onChange={handleManagerTypeChange}
        />

        <Select
          label={`${formData.manager.type === 'verwalter' ? 'Verwalter' : 'Eigentümer'} auswählen`}
          options={[
            { value: 'owner1', label: 'Mustermann GmbH' },
            { value: 'owner2', label: 'Schmidt Immobilien AG' },
            { value: 'owner3', label: 'Weber Properties KG' },
            { value: 'custom', label: 'Eigene Eingabe' }
          ]}
          value={formData.manager.selectedId}
          onChange={updateSelectedOwner}
          required
        />
        
        {/* Felder nur anzeigen wenn "Eigene Eingabe" ausgewählt */}
        {formData.manager.selectedId === 'custom' && (
          <>
            <Toggle
              name="ownerType"
              options={[
                { value: 'person', label: 'Person' },
                { value: 'company', label: 'Firma' }
              ]}
              value={formData.manager.customData?.type || 'person'}
              onChange={(value) => updateOwnerCustomData('type', value)}
            />

            {/* Anrede Toggle - nur bei Person */}
            {formData.manager.customData?.type === 'person' && (
              <Toggle
                name="ownerTitle"
                options={[
                  { value: 'herr', label: 'Herr' },
                  { value: 'frau', label: 'Frau' },
                  { value: 'divers', label: 'Divers' }
                ]}
                value={formData.manager.customData?.title || 'herr'}
                onChange={(value) => updateOwnerCustomData('title', value)}
              />
            )}

            {formData.manager.customData?.type === 'person' && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <InputField
                    label="Vorname"
                    value={formData.manager.customData?.firstName || ''}
                    onChange={(value) => updateOwnerCustomData('firstName', value)}
                    required
                  />
                  <InputField
                    label="Nachname"
                    value={formData.manager.customData?.lastName || ''}
                    onChange={(value) => updateOwnerCustomData('lastName', value)}
                    required
                  />
                </div>
                
                <InputField
                  label="Straße und Hausnummer"
                  value={formData.manager.customData?.address?.street || ''}
                  onChange={(value) => updateOwnerCustomData('address.street', value)}
                  required
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <InputField
                    label="PLZ"
                    value={formData.manager.customData?.address?.postalCode || ''}
                    onChange={(value) => updateOwnerCustomData('address.postalCode', value)}
                    required
                  />
                  <InputField
                    label="Ort"
                    value={formData.manager.customData?.address?.city || ''}
                    onChange={(value) => updateOwnerCustomData('address.city', value)}
                    required
                  />
                </div>
              </>
            )}

            {formData.manager.customData?.type === 'company' && (
              <>
                <InputField
                  label="Firmenname"
                  value={formData.manager.customData?.companyName || ''}
                  onChange={(value) => updateOwnerCustomData('companyName', value)}
                  required
                />
                
                <InputField
                  label="Straße und Hausnummer"
                  value={formData.manager.customData?.address?.street || ''}
                  onChange={(value) => updateOwnerCustomData('address.street', value)}
                  required
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <InputField
                    label="PLZ"
                    value={formData.manager.customData?.address?.postalCode || ''}
                    onChange={(value) => updateOwnerCustomData('address.postalCode', value)}
                    required
                  />
                  <InputField
                    label="Ort"
                    value={formData.manager.customData?.address?.city || ''}
                    onChange={(value) => updateOwnerCustomData('address.city', value)}
                    required
                  />
                </div>
              </>
            )}
          </>
        )}
      </div>

      {/* Mieter Sektion */}
      {formData.tenants.map((tenant, index) => (
        <div key={tenant.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-md font-medium text-gray-500">
              Angaben zum Mieter {formData.tenants.length > 1 ? `${index + 1}` : ''}
            </h3>
            {formData.tenants.length > 1 && (
              <button
                type="button"
                onClick={() => removeTenant(tenant.id)}
                className="text-red-600 hover:text-red-700 text-sm"
              >
                Entfernen
              </button>
            )}
          </div>
          
          <Toggle
            name={`tenantType-${tenant.id}`}
            options={[
              { value: 'person', label: 'Person' },
              { value: 'company', label: 'Firma' }
            ]}
            value={tenant.type}
            onChange={(value) => updateTenant(tenant.id, 'type', value)}
          />

          {/* Felder für Person */}
          {tenant.type === 'person' && (
            <>
              <Toggle
                name={`tenantTitle-${tenant.id}`}
                options={[
                  { value: 'herr', label: 'Herr' },
                  { value: 'frau', label: 'Frau' },
                  { value: 'divers', label: 'Divers' }
                ]}
                value={tenant.title}
                onChange={(value) => updateTenant(tenant.id, 'title', value)}
              />

              <div className="grid grid-cols-2 gap-4">
                <InputField
                  label="Vorname"
                  value={tenant.firstName}
                  onChange={(value) => updateTenant(tenant.id, 'firstName', value)}
                  required
                />
                <InputField
                  label="Nachname"
                  value={tenant.lastName}
                  onChange={(value) => updateTenant(tenant.id, 'lastName', value)}
                  required
                />
              </div>

              {/* Neue Adresse nur bei Mietende */}
              {formData.rentalType === 'end' && (
                <>
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Neue Adresse</h4>
                    
                    <InputField
                      label="Straße und Hausnummer"
                      value={tenant.address?.street || ''}
                      onChange={(value) => updateTenant(tenant.id, 'address.street', value)}
                      required
                    />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <InputField
                        label="PLZ"
                        value={tenant.address?.postalCode || ''}
                        onChange={(value) => updateTenant(tenant.id, 'address.postalCode', value)}
                        required
                      />
                      <InputField
                        label="Ort"
                        value={tenant.address?.city || ''}
                        onChange={(value) => updateTenant(tenant.id, 'address.city', value)}
                        required
                      />
                    </div>
                  </div>
                </>
              )}
            </>
          )}

          {/* Felder für Firma */}
          {tenant.type === 'company' && (
            <>
              <InputField
                label="Firmenname"
                value={tenant.companyName}
                onChange={(value) => updateTenant(tenant.id, 'companyName', value)}
                required
              />
              <InputField
                label="Ansprechpartner"
                value={tenant.contactPerson}
                onChange={(value) => updateTenant(tenant.id, 'contactPerson', value)}
                required
              />
              
              <InputField
                label="Straße und Hausnummer"
                value={tenant.address?.street || ''}
                onChange={(value) => updateTenant(tenant.id, 'address.street', value)}
                required
              />
              
              <div className="grid grid-cols-2 gap-4">
                <InputField
                  label="PLZ"
                  value={tenant.address?.postalCode || ''}
                  onChange={(value) => updateTenant(tenant.id, 'address.postalCode', value)}
                  required
                />
                <InputField
                  label="Ort"
                  value={tenant.address?.city || ''}
                  onChange={(value) => updateTenant(tenant.id, 'address.city', value)}
                  required
                />
              </div>
            </>
          )}

          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Telefon"
              value={tenant.phone}
              onChange={(value) => updateTenant(tenant.id, 'phone', value)}
              type="tel"
              required
            />
            <InputField
              label="E-Mail"
              value={tenant.email}
              onChange={(value) => updateTenant(tenant.id, 'email', value)}
              type="email"
              required
            />
          </div>

          <Toggle
            label="Ist der Mieter anwesend?"
            name={`tenantPresent-${tenant.id}`}
            options={[
              { value: 'ja', label: 'Ja' },
              { value: 'nein', label: 'Nein' }
            ]}
            value={tenant.present}
            onChange={(value) => updateTenant(tenant.id, 'present', value)}
          />

          {/* Bankdaten Button */}
          {!tenant.bankDetails && (
            <button
              type="button"
              onClick={() => updateTenant(tenant.id, 'bankDetails', { iban: '', bic: '', bankName: '' })}
              className="w-full px-4 py-3 mt-4 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              Bankdaten hinzufügen
            </button>
          )}

          {/* Bankdaten Felder */}
          {tenant.bankDetails && (
            <>
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Bankdaten</h4>
                <InputField
                  label="IBAN"
                  value={tenant.bankDetails.iban}
                  onChange={(value) => updateTenant(tenant.id, 'bankDetails.iban', value)}
                  required
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <InputField
                    label="BIC"
                    value={tenant.bankDetails.bic}
                    onChange={(value) => updateTenant(tenant.id, 'bankDetails.bic', value)}
                    required
                  />
                  <InputField
                    label="Bankname"
                    value={tenant.bankDetails.bankName}
                    onChange={(value) => updateTenant(tenant.id, 'bankDetails.bankName', value)}
                    required
                  />
                </div>
                
                <button
                  type="button"
                  onClick={() => updateTenant(tenant.id, 'bankDetails', undefined)}
                  className="text-sm text-red-600 hover:text-red-700 mt-2"
                >
                  Bankdaten entfernen
                </button>
              </div>
            </>
          )}
        </div>
      ))}

      {/* Mieter hinzufügen Button */}
      <button
        type="button"
        onClick={addTenant}
        className="w-full px-4 py-3 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
      >
        Mieter hinzufügen
      </button>


    </div>
  );
};

export default SimpleForm;