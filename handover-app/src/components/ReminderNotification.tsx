import React from 'react';
import type { ReminderInfo } from '../hooks/useReminders';

interface ReminderNotificationProps {
  reminders: ReminderInfo[];
  onDismiss: (id: string) => void;
  onOpenHandover?: (handover: ReminderInfo['handover']) => void;
}

const ReminderNotification: React.FC<ReminderNotificationProps> = ({
  reminders,
  onDismiss,
  onOpenHandover
}) => {
  if (reminders.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      {reminders.map((reminder) => (
        <div
          key={reminder.id}
          className={`p-4 rounded-xl shadow-lg border-l-4 ${
            reminder.type === 'overdue'
              ? 'bg-red-50 border-red-500'
              : 'bg-blue-50 border-blue-500'
          } animate-slide-in`}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center mb-2">
                <svg 
                  className={`w-5 h-5 mr-2 ${
                    reminder.type === 'overdue' ? 'text-red-600' : 'text-blue-600'
                  }`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  strokeWidth="1.5"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" 
                  />
                </svg>
                <span className={`text-sm font-medium ${
                  reminder.type === 'overdue' ? 'text-red-900' : 'text-blue-900'
                }`}>
                  {reminder.type === 'overdue' ? 'Überfälliger Termin' : 'Anstehender Termin'}
                </span>
              </div>
              
              <div className="mb-2">
                <p className={`text-sm font-medium ${
                  reminder.type === 'overdue' ? 'text-red-800' : 'text-blue-800'
                }`}>
                  {reminder.handover.property.selectedAddress || 'Adresse nicht angegeben'}
                </p>
                <p className={`text-xs ${
                  reminder.type === 'overdue' ? 'text-red-600' : 'text-blue-600'
                }`}>
                  {reminder.handover.general.rentalType === 'start' ? 'Einzugsübergabe' : 'Auszugsübergabe'}
                </p>
              </div>
              
              <div className={`text-xs ${
                reminder.type === 'overdue' ? 'text-red-600' : 'text-blue-600'
              }`}>
                <div className="flex items-center mb-1">
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5a2.25 2.25 0 002.25-2.25m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5a2.25 2.25 0 012.25 2.25v7.5" />
                  </svg>
                  {reminder.scheduledDate.toLocaleDateString('de-DE', { 
                    day: '2-digit', 
                    month: '2-digit', 
                    year: 'numeric' 
                  })}
                  {reminder.handover.scheduling?.scheduledTime && (
                    <span className="ml-2">
                      {reminder.handover.scheduling.scheduledTime}
                    </span>
                  )}
                </div>
                <div className="font-medium">
                  {reminder.timeUntil}
                </div>
              </div>
              
              {onOpenHandover && (
                <button
                  onClick={() => onOpenHandover(reminder.handover)}
                  className={`mt-2 text-xs font-medium underline ${
                    reminder.type === 'overdue' ? 'text-red-700 hover:text-red-800' : 'text-blue-700 hover:text-blue-800'
                  }`}
                >
                  Übergabe öffnen
                </button>
              )}
            </div>
            
            <button
              onClick={() => onDismiss(reminder.id)}
              className={`ml-2 p-1 rounded-full hover:bg-gray-200 transition-colors ${
                reminder.type === 'overdue' ? 'text-red-600' : 'text-blue-600'
              }`}
              aria-label="Erinnerung schließen"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReminderNotification;