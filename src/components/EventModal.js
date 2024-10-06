import React from 'react';
import Modal from 'react-modal';

// Modal configuration for accessibility
Modal.setAppElement('#root');

function EventModal({ isOpen, onRequestClose, children }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Event Form Modal"
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.75)', // Dark transparent overlay
          zIndex: 3, // Ensure the modal is above everything
        },
        content: {
          color: 'white',
          backgroundColor: '#222', // Dark background
          borderRadius: '10px',
          padding: '20px',
          maxWidth: '400px', // Adjust modal width
          width: '90%', // Responsive width for smaller screens
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)', // Center the modal
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)', // Add shadow
        },
      }}
    >
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '15px', // Space between form fields
          width: '100%',
        }}
        onSubmit={(e) => {
          e.preventDefault();
          if (typeof children.props.onSubmit === 'function') {
            children.props.onSubmit();
          }
        }}
      >
        {/* Title */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ marginBottom: '5px', fontSize: '16px' }}>Title</label>
          <input
            type="text"
            style={{
              padding: '8px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              backgroundColor: '#333',
              color: 'white',
            }}
            required
          />
        </div>

        {/* Description */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ marginBottom: '5px', fontSize: '16px' }}>Description</label>
          <textarea
            style={{
              padding: '8px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              backgroundColor: '#333',
              color: 'white',
              resize: 'vertical',
            }}
          />
        </div>

        {/* Category */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ marginBottom: '5px', fontSize: '16px' }}>Category</label>
          <select
            style={{
              padding: '8px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              backgroundColor: '#333',
              color: 'white',
            }}
          >
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Save button */}
        <button
          type="submit"
          style={{
            padding: '10px 15px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginTop: '10px',
            alignSelf: 'flex-start',
          }}
        >
          Save
        </button>
      </form>
    </Modal>
  );
}

export default EventModal;
