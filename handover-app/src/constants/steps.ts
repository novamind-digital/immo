export interface Step {
  id: number;
  title: string;
  icon: string;
  isCompleted: boolean;
  isActive: boolean;
}

export const HANDOVER_STEPS: Step[] = [
  { id: 1, title: 'Allgemein', icon: '📋', isCompleted: false, isActive: true },
  { id: 2, title: 'Mietobjekt', icon: '🏠', isCompleted: false, isActive: false },
  { id: 3, title: 'Zustand', icon: '🔍', isCompleted: false, isActive: false },
  { id: 4, title: 'Zähler', icon: '⚡', isCompleted: false, isActive: false },
  { id: 5, title: 'Schlüssel', icon: '🔑', isCompleted: false, isActive: false },
  { id: 6, title: 'Bilder', icon: '📷', isCompleted: false, isActive: false },
  { id: 7, title: 'Vereinbarungen', icon: '📝', isCompleted: false, isActive: false },
  { id: 8, title: 'Unterzeichnung', icon: '✍️', isCompleted: false, isActive: false },
  { id: 9, title: 'Protokollversand', icon: '📤', isCompleted: false, isActive: false },
];