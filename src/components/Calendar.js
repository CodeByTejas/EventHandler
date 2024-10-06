import React, { useMemo } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css'; // Custom styling

function CalendarView({ events = [], onDateClick }) {
  
  // Ensure the getTileContent function is memoized for performance reasons
  const getTileContent = useMemo(() => {
    return ({ date }) => {
      if (!Array.isArray(events)) {
        return null; // Safeguard in case events is not an array
      }

      // Check if there's an event on the current tile's date
      const event = events.find(
        (event) => new Date(event.date).toDateString() === date.toDateString()
      );

      return event ? <div className="event-indicator">{event.title}</div> : null;
    };
  }, [events]);

  return (
    <Calendar
      tileContent={getTileContent}
      onClickDay={onDateClick}
    />
  );
}

export default CalendarView;
