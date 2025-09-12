import React, { useState } from 'react';
import InputField from './InputField';
import RadioGroup from './RadioGroup';
import DatePicker from './DatePicker';
import Toggle from './Toggle';
import Select from './Select';

const SimpleForm: React.FC = () => {
  const [rentalType, setRentalType] = useState('start');
  const [managerType, setManagerType] = useState('verwalter');
  const [selectedOwner, setSelectedOwner] = useState('');
  const [ownerType, setOwnerType] = useState('person');
  const [ownerTitle, setOwnerTitle] = useState('herr');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [ownerStreet, setOwnerStreet] = useState('');
  const [ownerPostalCode, setOwnerPostalCode] = useState('');
  const [ownerCity, setOwnerCity] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [tenants, setTenants] = useState([{
    id: 1,
    type: 'person',
    title: 'herr',
    firstName: '',
    lastName: '',
    companyName: '',
    contactPerson: '',
    street: '',
    postalCode: '',
    city: '',
    phone: '',
    email: '',
    present: 'ja',
    showBankDetails: false,
    bankName: '',
    bic: '',
    iban: ''
  }]);
  const [startDate, setStartDate] = useState('');

  const addTenant = () => {
    const newTenant = {
      id: Date.now(),
      type: 'person',
      title: 'herr',
      firstName: '',
      lastName: '',
      companyName: '',
      contactPerson: '',
      street: '',
      postalCode: '',
      city: '',
      phone: '',
      email: '',
      present: 'ja',
      showBankDetails: false,
      bankName: '',
      bic: '',
      iban: ''
    };
    setTenants([...tenants, newTenant]);
  };

  const removeTenant = (id: number) => {
    setTenants(tenants.filter(tenant => tenant.id !== id));
  };

  const updateTenant = (id: number, field: string, value: any) => {
    setTenants(tenants.map(tenant => 
      tenant.id === id ? { ...tenant, [field]: value } : tenant
    ));
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
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-md font-medium text-gray-500 mb-4">Angaben zur Miete</h3>
        
        <Toggle
          name="rentalType"
          options={[
            { value: 'start', label: 'Mietbeginn' },
            { value: 'end', label: 'Mietende' }
          ]}
          value={rentalType}
          onChange={setRentalType}
        />

        <DatePicker
          label={rentalType === 'start' ? 'Beginn Mietverhältnis' : 'Ende Mietverhältnis'}
          value={startDate}
          onChange={setStartDate}
          required
        />
      </div>

      {/* Card 2: Angaben zum Eigentümer */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-md font-medium text-gray-500 mb-4">Angaben zum {managerType === 'verwalter' ? 'Verwalter' : 'Eigentümer'}</h3>
        
        <Toggle
          name="managerType"
          options={[
            { value: 'verwalter', label: 'Verwalter' },
            { value: 'eigentuemer', label: 'Eigentümer' }
          ]}
          value={managerType}
          onChange={setManagerType}
        />

        <Select
          label={`${managerType === 'verwalter' ? 'Verwalter' : 'Eigentümer'} auswählen`}
          options={[
            { value: 'owner1', label: 'Mustermann GmbH' },
            { value: 'owner2', label: 'Schmidt Immobilien AG' },
            { value: 'owner3', label: 'Weber Properties KG' },
            { value: 'custom', label: 'Eigene Eingabe' }
          ]}
          value={selectedOwner}
          onChange={setSelectedOwner}
          required
        />
        
        {/* Felder nur anzeigen wenn "Eigene Eingabe" ausgewählt */}
        {selectedOwner === 'custom' && (
          <>
            <Toggle
              name="ownerType"
              options={[
                { value: 'person', label: 'Person' },
                { value: 'company', label: 'Firma' }
              ]}
              value={ownerType}
              onChange={setOwnerType}
            />

            {/* Anrede Toggle - nur bei Person */}
            {ownerType === 'person' && (
              <Toggle
                name="ownerTitle"
                options={[
                  { value: 'herr', label: 'Herr' },
                  { value: 'frau', label: 'Frau' },
                  { value: 'divers', label: 'Divers' }
                ]}
                value={ownerTitle}
                onChange={setOwnerTitle}
              />
            )}

            {ownerType === 'person' && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <InputField
                    label="Vorname"
                    value={firstName}
                    onChange={setFirstName}
                    required
                  />
                  <InputField
                    label="Nachname"
                    value={lastName}
                    onChange={setLastName}
                    required
                  />
                </div>
                
                <InputField
                  label="Straße und Hausnummer"
                  value={ownerStreet}
                  onChange={setOwnerStreet}
                  required
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <InputField
                    label="PLZ"
                    value={ownerPostalCode}
                    onChange={setOwnerPostalCode}
                    required
                  />
                  <InputField
                    label="Ort"
                    value={ownerCity}
                    onChange={setOwnerCity}
                    required
                  />
                </div>
              </>
            )}

            {ownerType === 'company' && (
              <>
                <InputField
                  label="Firmenname"
                  value={companyName}
                  onChange={setCompanyName}
                  required
                />
                
                <InputField
                  label="Straße und Hausnummer"
                  value={ownerStreet}
                  onChange={setOwnerStreet}
                  required
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <InputField
                    label="PLZ"
                    value={ownerPostalCode}
                    onChange={setOwnerPostalCode}
                    required
                  />
                  <InputField
                    label="Ort"
                    value={ownerCity}
                    onChange={setOwnerCity}
                    required
                  />
                </div>
              </>
            )}
          </>
        )}
      </div>

      {/* Mieter Sektion */}
      {tenants.map((tenant, index) => (
        <div key={tenant.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-md font-medium text-gray-500">
              Angaben zum Mieter {tenants.length > 1 ? `${index + 1}` : ''}
            </h3>
            {tenants.length > 1 && (
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
                value={tenant.street}
                onChange={(value) => updateTenant(tenant.id, 'street', value)}
                required
              />
              
              <div className="grid grid-cols-2 gap-4">
                <InputField
                  label="PLZ"
                  value={tenant.postalCode}
                  onChange={(value) => updateTenant(tenant.id, 'postalCode', value)}
                  required
                />
                <InputField
                  label="Ort"
                  value={tenant.city}
                  onChange={(value) => updateTenant(tenant.id, 'city', value)}
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
          {!tenant.showBankDetails && (
            <button
              type="button"
              onClick={() => updateTenant(tenant.id, 'showBankDetails', true)}
              className="w-full px-4 py-3 mt-4 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              Bankdaten hinzufügen
            </button>
          )}

          {/* Bankdaten Felder */}
          {tenant.showBankDetails && (
            <>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <InputField
                  label="Bankname"
                  value={tenant.bankName}
                  onChange={(value) => updateTenant(tenant.id, 'bankName', value)}
                  required
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <InputField
                    label="BIC"
                    value={tenant.bic}
                    onChange={(value) => updateTenant(tenant.id, 'bic', value)}
                    required
                  />
                  <InputField
                    label="IBAN"
                    value={tenant.iban}
                    onChange={(value) => updateTenant(tenant.id, 'iban', value)}
                    required
                  />
                </div>
                
                <button
                  type="button"
                  onClick={() => {
                    setTenants(tenants.map(t => 
                      t.id === tenant.id ? { 
                        ...t, 
                        showBankDetails: false,
                        bankName: '',
                        bic: '',
                        iban: ''
                      } : t
                    ));
                  }}
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