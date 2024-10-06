import React, { useState } from 'react';
import CalendarView from '../components/Calendar';
import EventModal from '../components/EventModal';
import EventForm from '../components/EventForm';
import { useEventsContext } from '../context/EventsContext';
import Spline from '@splinetool/react-spline';
import './CalendarPage.css';  // Add your custom styles here

export default function Home() {
  const { events, addEvent, editEvent, deleteEvent } = useEventsContext();
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventToEdit, setEventToEdit] = useState(null);
  const [filterCategory, setFilterCategory] = useState('All');

  // Handle click on calendar date
  const handleDateClick = (date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  // Add or Edit Event
  const handleAddEvent = (eventData) => {
    if (eventToEdit) {
      editEvent(eventToEdit.id, eventData);  // Edit the existing event
    } else {
      const uniqueId = Date.now(); // Create a unique ID if adding new
      addEvent({ id: uniqueId, ...eventData, date: selectedDate });  // Add a new event
    }
    setIsModalOpen(false);
    setSelectedDate(null);  // Clear selected date after adding
    setEventToEdit(null);   // Clear edit state
  };

  // Set the event to edit
  const handleEditEvent = (event) => {
    setSelectedDate(new Date(event.date));
    setEventToEdit(event);
    setIsModalOpen(true);
  };

  // Handle event deletion
  const handleDeleteEvent = (eventId) => {
    deleteEvent(eventId);
  };

  // Handle filtering events by category
  const handleFilterChange = (category) => {
    setFilterCategory(category);
  };

  // Filter events by category if a filter is applied
  const filteredEvents = filterCategory === 'All'
    ? events
    : events.filter(event => event.category === filterCategory);

  return (
    <div className="container">
    {/* Full-screen Spline background */}
    <div className="spline-background">
      <Spline scene="https://prod.spline.design/v0jFGBCfwgKNBNyC/scene.splinecode" />
    </div>

    {/* Calendar content above the Spline background */}
    <div className="calendar-container">
      <h1>My Calendar</h1>
      <CalendarView events={events} onDateClick={handleDateClick} />

      <EventModal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
        <EventForm
          onSubmit={handleAddEvent}
          initialData={eventToEdit}
        />
      </EventModal>

      <div className="filter-container">
        <label htmlFor="category-filter">Filter by Category:</label>
        <select
          id="category-filter"
          value={filterCategory}
          onChange={(e) => handleFilterChange(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <h2>All Events</h2>
      {filteredEvents.length === 0 ? (
        <p>No events available.</p>
      ) : (
        <table className="event-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Date</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEvents.map((event, index) => {
              const isValidDate = !isNaN(new Date(event.date));
              return (
                <tr key={event.id || `event-${index}`}>
                  <td>{event.title}</td>
                  <td>{isValidDate ? new Date(event.date).toLocaleDateString() : 'Invalid Date'}</td>
                  <td>{event.category}</td>
                  <td>
                    <button onClick={() => handleEditEvent(event)}>Edit</button>
                    <button onClick={() => handleDeleteEvent(event.id)}>Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
    <div className="quote-container">
        <p className="quote">
          "The key is in not spending time, but in investing it."
        </p>
        <p className="author">- Stephen R. Covey</p>
      </div>
    </div>
  );
}