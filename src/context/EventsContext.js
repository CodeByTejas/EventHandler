import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const EventsContext = createContext();

export const useEventsContext = () => {
  return useContext(EventsContext);
};

export const EventsProvider = ({ children }) => {
  const [events, setEvents] = useState([]);

  // Fetch events from the mock API or local state
  useEffect(() => {
    axios.get('https://calendar-api2.free.beeceptor.com/events')
      .then(response => {
        setEvents(response.data);  // Ensure events are loaded into the state
      })
      .catch(error => console.error('Error fetching events:', error));
  }, []);

  // Add event
  const addEvent = (eventData) => {
    axios.post('https://calendar-api2.free.beeceptor.com/events', eventData)
      .then(response => {
        setEvents([...events, response.data]);  // Update state with the new event
      })
      .catch(error => console.error('Error adding event:', error));
  };

  // Edit event
  const editEvent = (eventId, updatedEvent) => {
    axios.put(`https://calendar-api2.free.beeceptor.com/events/${eventId}`, updatedEvent)
      .then(response => {
        const updatedEvents = events.map(event => event.id === eventId ? response.data : event);
        setEvents(updatedEvents);  // Update the state with the edited event
      })
      .catch(error => console.error('Error editing event:', error));
  };

  // Delete event
  const deleteEvent = (eventId) => {
    axios.delete(`https://calendar-api2.free.beeceptor.com/events/${eventId}`)
      .then(() => {
        setEvents(events.filter(event => event.id !== eventId));  // Remove event from the state
      })
      .catch(error => console.error('Error deleting event:', error));
  };

  return (
    <EventsContext.Provider value={{ events, addEvent, editEvent, deleteEvent }}>
      {children}
    </EventsContext.Provider>
  );
};
