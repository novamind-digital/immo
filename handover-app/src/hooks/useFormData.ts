import { useState, useCallback } from 'react';

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

export const useFormData = () => {
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

  const updateRentalType = useCallback((rentalType: 'start' | 'end') => {
    setFormData(prev => ({ ...prev, rentalType }));
  }, []);

  const updateRentalDate = useCallback((rentalDate: string) => {
    setFormData(prev => ({ ...prev, rentalDate }));
  }, []);

  const updateManagerType = useCallback((type: 'verwalter' | 'eigentuemer') => {
    setFormData(prev => ({
      ...prev,
      manager: { ...prev.manager, type }
    }));
  }, []);

  const updateSelectedOwner = useCallback((selectedId: string) => {
    setFormData(prev => ({
      ...prev,
      manager: { ...prev.manager, selectedId }
    }));
  }, []);

  const updateOwnerCustomData = useCallback((field: string, value: any) => {
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
  }, [formData.manager.customData]);

  const addTenant = useCallback(() => {
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
  }, []);

  const removeTenant = useCallback((id: number) => {
    setFormData(prev => ({
      ...prev,
      tenants: prev.tenants.filter(tenant => tenant.id !== id)
    }));
  }, []);

  const updateTenant = useCallback((id: number, field: string, value: any) => {
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
  }, []);

  return {
    formData,
    updateRentalType,
    updateRentalDate,
    updateManagerType,
    updateSelectedOwner,
    updateOwnerCustomData,
    addTenant,
    removeTenant,
    updateTenant,
  };
};