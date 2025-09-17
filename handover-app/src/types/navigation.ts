export type AppModule = 'handover' | 'transfer' | 'documents' | 'tenancy';

export interface NavigationItem {
  id: AppModule;
  title: string;
  description: string;
  icon: string;
  path: string;
  color: string;
}

export const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    id: 'handover',
    title: 'Übergabeprotokoll',
    description: 'Wohnungsübergabe für Mieter',
    icon: 'home',
    path: '/handover',
    color: 'blue'
  },
  {
    id: 'transfer',
    title: 'Transferprotokoll',
    description: 'Objektübergabe bei Verkauf/Ankauf',
    icon: 'transfer',
    path: '/transfer',
    color: 'green'
  },
  {
    id: 'documents',
    title: 'Dokumentenanfrage',
    description: 'Behördliche Dokumente verwalten',
    icon: 'document',
    path: '/documents',
    color: 'purple'
  },
  {
    id: 'tenancy',
    title: 'Mietende',
    description: 'Mietverträge und Kündigungen',
    icon: 'contract',
    path: '/tenancy',
    color: 'orange'
  }
];

export const MODULE_COLORS = {
  blue: {
    bg: 'bg-blue-500',
    bgLight: 'bg-blue-100',
    text: 'text-blue-600',
    hover: 'hover:bg-blue-600'
  },
  green: {
    bg: 'bg-green-500',
    bgLight: 'bg-green-100',
    text: 'text-green-600',
    hover: 'hover:bg-green-600'
  },
  purple: {
    bg: 'bg-purple-500',
    bgLight: 'bg-purple-100',
    text: 'text-purple-600',
    hover: 'hover:bg-purple-600'
  },
  orange: {
    bg: 'bg-orange-500',
    bgLight: 'bg-orange-100',
    text: 'text-orange-600',
    hover: 'hover:bg-orange-600'
  }
};