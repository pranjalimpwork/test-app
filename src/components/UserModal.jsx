import React, { useState } from 'react';
import ReactDOM from 'react-dom'; // Assuming using ReactDOM for modal rendering

const UserDetailModal = ({ open, onClose, onSubmit }) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, address, phone }); // Pass user details to parent function
    onClose(); // Close the modal after submission
  };

  const handleInputChange = (event) => {
    const { target } = event;
    const value = target.type === 'number' ? Number(target.value) : target.value;
    switch (target.name) {
      case 'name':
        setName(value);
        break;
      case 'address':
        setAddress(value);
        break;
      case 'phone':
        setPhone(value);
        break;
      default:
        break;
    }
  };

  if (!open) return null; // Don't render modal if not open

  return (
    <div className='modal'>
      <div className='modal-content'>
        <h2>Enter User Details</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor='name'>Name:</label>
          <input type='text' id='name' name='name' value={name} onChange={handleInputChange} required />
          <label htmlFor='address'>Address:</label>
          <textarea id='address' name='address' value={address} onChange={handleInputChange} required />
          <label htmlFor='phone'>Phone Number:</label>
          <input
            type='tel' // This sets the input type for phone number
            id='phone'
            name='phone'
            value={phone}
            onChange={handleInputChange}
            required
          />
          <button type='submit' onClick={onClose}>
            Submit
          </button>
        </form>
        <button onClick={onClose}>Close</button>
      </div>
      <div className='modal-overlay' onClick={onClose} />
    </div>
  );
};

export default UserDetailModal;
