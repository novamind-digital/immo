import { useState, useEffect, useCallback } from 'react';
import type { HandoverData } from '../types/handover';

export interface ReminderInfo {
  id: string;
  handover: HandoverData & { id: string };
  reminderDate: Date;
  scheduledDate: Date;
  type: 'upcoming' | 'overdue';
  timeUntil: string;
}

interface UseRemindersReturn {
  reminders: ReminderInfo[];
  hasActiveReminders: boolean;
  dismissReminder: (id: string) => void;
  checkReminders: () => void;
}

// Store dismissed reminders in localStorage to avoid showing them again
const DISMISSED_REMINDERS_KEY = 'handover_dismissed_reminders';

const getDismissedReminders = (): string[] => {
  try {
    const dismissed = localStorage.getItem(DISMISSED_REMINDERS_KEY);
    return dismissed ? JSON.parse(dismissed) : [];
  } catch {
    return [];
  }
};

const addDismissedReminder = (reminderId: string) => {
  try {
    const dismissed = getDismissedReminders();
    const updated = [...dismissed, reminderId];
    localStorage.setItem(DISMISSED_REMINDERS_KEY, JSON.stringify(updated));
  } catch (error) {
    console.warn('Failed to save dismissed reminder:', error);
  }
};

const formatTimeUntil = (date: Date): string => {
  const now = new Date();
  const diffMs = date.getTime() - now.getTime();
  const diffHours = Math.ceil(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);
  
  if (diffMs < 0) {
    return 'Überfällig';
  } else if (diffHours < 1) {
    return 'In weniger als 1 Stunde';
  } else if (diffHours < 24) {
    return `In ${diffHours} Stunden`;
  } else if (diffDays === 1) {
    return 'Morgen';
  } else {
    return `In ${diffDays} Tagen`;
  }
};

export const useReminders = (handovers: (HandoverData & { id: string })[]): UseRemindersReturn => {
  const [reminders, setReminders] = useState<ReminderInfo[]>([]);
  
  const checkReminders = useCallback(() => {
    const now = new Date();
    const dismissedIds = getDismissedReminders();
    
    const activeReminders: ReminderInfo[] = [];
    
    handovers.forEach(handover => {
      // Skip if no scheduling info or reminder not set
      if (!handover.scheduling?.scheduledDate || !handover.scheduling?.reminderSet) {
        return;
      }
      
      const scheduledDate = new Date(handover.scheduling.scheduledDate);
      const reminderDate = handover.scheduling.reminderDate 
        ? new Date(handover.scheduling.reminderDate)
        : new Date(scheduledDate.getTime() - 24 * 60 * 60 * 1000); // Default: 24h before
      
      // Create reminder ID based on handover ID and scheduled date
      const reminderId = `${handover.id}-${scheduledDate.getTime()}`;
      
      // Skip if already dismissed
      if (dismissedIds.includes(reminderId)) {
        return;
      }
      
      // Check if reminder should be shown (within 48 hours of scheduled date)
      const hoursUntilScheduled = (scheduledDate.getTime() - now.getTime()) / (1000 * 60 * 60);
      const hoursUntilReminder = (reminderDate.getTime() - now.getTime()) / (1000 * 60 * 60);
      
      // Show reminder if:
      // 1. Reminder time has passed (negative hours until reminder)
      // 2. And appointment is within next 48 hours or overdue
      if (hoursUntilReminder <= 0 && hoursUntilScheduled <= 48) {
        const type: 'upcoming' | 'overdue' = hoursUntilScheduled < 0 ? 'overdue' : 'upcoming';
        
        activeReminders.push({
          id: reminderId,
          handover,
          reminderDate,
          scheduledDate,
          type,
          timeUntil: formatTimeUntil(scheduledDate)
        });
      }
    });
    
    // Sort by scheduled date (most urgent first)
    activeReminders.sort((a, b) => a.scheduledDate.getTime() - b.scheduledDate.getTime());
    
    setReminders(activeReminders);
  }, [handovers]);
  
  const dismissReminder = useCallback((reminderId: string) => {
    addDismissedReminder(reminderId);
    setReminders(prev => prev.filter(r => r.id !== reminderId));
  }, []);
  
  // Check reminders on mount and when handovers change
  useEffect(() => {
    checkReminders();
  }, [checkReminders]);
  
  // Check reminders every minute
  useEffect(() => {
    const interval = setInterval(checkReminders, 60 * 1000);
    return () => clearInterval(interval);
  }, [checkReminders]);
  
  return {
    reminders,
    hasActiveReminders: reminders.length > 0,
    dismissReminder,
    checkReminders
  };
};

// Hook for requesting notification permissions
export const useNotificationPermission = () => {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  
  useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }
  }, []);
  
  const requestPermission = useCallback(async () => {
    if ('Notification' in window && Notification.permission === 'default') {
      const result = await Notification.requestPermission();
      setPermission(result);
      return result;
    }
    return permission;
  }, [permission]);
  
  const showNotification = useCallback((title: string, options?: NotificationOptions) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      return new Notification(title, options);
    }
    return null;
  }, []);
  
  return {
    permission,
    requestPermission,
    showNotification,
    isSupported: 'Notification' in window
  };
};