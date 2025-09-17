import React, { useState } from 'react';
import type { HandoverData } from '../../types/handover';

interface CalendarProps {
  handovers: (HandoverData & { id: string })[];
  onDateSelect?: (date: Date) => void;
  onEventClick?: (handover: HandoverData & { id: string }) => void;
}

const Calendar: React.FC<CalendarProps> = ({ handovers, onDateSelect, onEventClick }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const today = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  // Get first day of month and calculate grid
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const firstDayWeekday = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();
  
  // German month names
  const monthNames = [
    'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
    'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
  ];
  
  // German day names
  const dayNames = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
  
  // Navigate months
  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };
  
  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };
  
  const goToToday = () => {
    setCurrentDate(new Date());
  };
  
  // Get handovers for specific date
  const getHandoversForDate = (date: Date) => {
    return handovers.filter(handover => {
      if (!handover.scheduling?.scheduledDate) return false;
      const scheduledDate = new Date(handover.scheduling.scheduledDate);
      return scheduledDate.getDate() === date.getDate() &&
             scheduledDate.getMonth() === date.getMonth() &&
             scheduledDate.getFullYear() === date.getFullYear();
    });
  };
  
  // Generate calendar grid
  const generateCalendarDays = () => {
    const days = [];
    
    // Add empty cells for days before month starts
    for (let i = 0; i < firstDayWeekday; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-20 p-1 border border-gray-100"></div>
      );
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isToday = date.getDate() === today.getDate() && 
                      date.getMonth() === today.getMonth() && 
                      date.getFullYear() === today.getFullYear();
      const dayHandovers = getHandoversForDate(date);
      
      days.push(
        <div
          key={day}
          className={`h-20 p-1 border border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
            isToday ? 'bg-blue-50 border-blue-200' : ''
          }`}
          onClick={() => onDateSelect?.(date)}
        >
          <div className={`text-sm font-medium mb-1 ${
            isToday ? 'text-blue-600' : 'text-gray-900'
          }`}>
            {day}
          </div>
          
          {/* Handover events */}
          <div className="space-y-1">
            {dayHandovers.slice(0, 2).map((handover, index) => (
              <div
                key={`${handover.id}-${index}`}
                className={`text-xs px-1 py-0.5 rounded truncate cursor-pointer transition-colors ${
                  handover.meta.status === 'completed' 
                    ? 'bg-green-100 text-green-800 hover:bg-green-200'
                    : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  onEventClick?.(handover);
                }}
                title={`${handover.scheduling?.scheduledTime || ''} - ${handover.property.selectedAddress}`}
              >
                {handover.scheduling?.scheduledTime && (
                  <span className="font-medium">{handover.scheduling.scheduledTime} </span>
                )}
                {handover.general.rentalType === 'start' ? '📥' : '📤'}
              </div>
            ))}
            
            {/* Show "+X more" if there are more events */}
            {dayHandovers.length > 2 && (
              <div className="text-xs text-gray-500 px-1">
                +{dayHandovers.length - 2} weitere
              </div>
            )}
          </div>
        </div>
      );
    }
    
    return days;
  };
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Calendar Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h2 className="text-lg font-semibold text-gray-900">
              {monthNames[month]} {year}
            </h2>
            <button
              onClick={goToToday}
              className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
            >
              Heute
            </button>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={previousMonth}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button
              onClick={nextMonth}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Calendar Grid */}
      <div className="grid grid-cols-7">
        {/* Day headers */}
        {dayNames.map(day => (
          <div key={day} className="p-3 text-center text-sm font-medium text-gray-500 bg-gray-50 border-b border-gray-200">
            {day}
          </div>
        ))}
        
        {/* Calendar days */}
        {generateCalendarDays()}
      </div>
      
      {/* Legend */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center justify-center space-x-6 text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-yellow-100 border border-yellow-200 rounded mr-2"></div>
            <span className="text-gray-600">In Bearbeitung</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-100 border border-green-200 rounded mr-2"></div>
            <span className="text-gray-600">Abgeschlossen</span>
          </div>
          <div className="flex items-center">
            <span className="text-gray-600 mr-2">📥 Einzug</span>
            <span className="text-gray-600">📤 Auszug</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;