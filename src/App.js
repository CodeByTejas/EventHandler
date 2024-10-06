import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { EventsProvider } from './context/EventsContext';
import CalendarPage from './pages/CalendarPage';
import EventDetailsPage from './pages/EventDetailsPage';

function App() {
  return (
    <EventsProvider>
      <Router>
        <Routes>
          <Route path="/" element={<CalendarPage />} />
          <Route path="/event/:eventId" element={<EventDetailsPage />} />
        </Routes>
      </Router>
    </EventsProvider>
  );
}

export default App;
