import { useState, useEffect } from 'react';
import axios from 'axios';

const useEvents = () => {
  const [events, setEvents] = useState([]);

  // Fetch events on initial load
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('https://calendar-api.free.beeceptor.com/events');
        if (Array.isArray(response.data)) {
          setEvents(response.data);  // Ensure data is an array before setting it
        } else {
          console.error('Unexpected response format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);  // Empty dependency array means this effect runs once when component mounts

  // Add a new event
  const addEvent = async (newEvent) => {
    try {
      const response = await axios.post('https://calendar-api.free.beeceptor.com/events', newEvent);
      if (response.data) {
        setEvents((prevEvents) => [...prevEvents, response.data]);
      }
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  // Edit an existing event
  const editEvent = async (eventId, updatedEvent) => {
    try {
      const response = await axios.put(`https://calendar-api.free.beeceptor.com/events/${eventId}`, updatedEvent);
      if (response.data) {
        setEvents((prevEvents) =>
          prevEvents.map((event) => (event.id === eventId ? response.data : event))
        );
      }
    } catch (error) {
      console.error(`Error editing event with id ${eventId}:`, error);
    }
  };

  // Delete an event
  const deleteEvent = async (eventId) => {
    try {
      await axios.delete(`https://calendar-api.free.beeceptor.com/events/${eventId}`);
      setEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId));
    } catch (error) {
      console.error(`Error deleting event with id ${eventId}:`, error);
    }
  };

  return { events, addEvent, editEvent, deleteEvent };
};

export default useEvents;
