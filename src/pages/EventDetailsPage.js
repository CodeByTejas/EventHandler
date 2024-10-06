import React from 'react';
import { useParams } from 'react-router-dom';
import { useEventsContext } from '../context/EventsContext';

function EventDetailsPage() {
  const { eventId } = useParams();  // Get the event ID from URL params
  const { events } = useEventsContext();
  const event = events.find(event => event.id === eventId);

  if (!event) return <p>Event not found</p>;

  return (
    <div>
      <h1>{event.title}</h1>
      <p>Date: {new Date(event.date).toDateString()}</p>
      <p>Description: {event.description || 'No description'}</p>
    </div>
  );
}

export default EventDetailsPage;
