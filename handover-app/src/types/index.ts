export interface Person {
  firstName: string;
  lastName: string;
  street: string;
  postalCode: string;
  city: string;
  phone?: string;
  email?: string;
}

export interface Owner extends Person {
  type: 'person' | 'company';
  title?: 'herr' | 'frau' | 'divers';
}

export interface Tenant extends Person {
  type: 'person' | 'company';
  title?: 'herr' | 'frau' | 'divers';
  isPresent: boolean;
}

export interface HandoverFormData {
  rentalType: 'start' | 'end';
  startDate?: string;
  owner: Owner;
  tenants: Tenant[];
}

export interface Step {
  id: number;
  title: string;
  icon: string;
  isCompleted: boolean;
  isActive: boolean;
}

export interface FormFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
}

export interface RadioOption {
  value: string;
  label: string;
}

export interface RadioGroupProps {
  name: string;
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
}