import React, { useState, useContext } from 'react';
import { AuthContext } from './AuthContext';
import { getDatabase, ref, push, set } from 'firebase/database';

function CreateRide() {
  const { currentUser } = useContext(AuthContext);
  const [rideName, setRideName] = useState('');
  const [locations, setLocations] = useState('');
  const [rideSlots, setRideSlots] = useState('');

  const handleRideCreation = async (event) => {
    event.preventDefault();

    const db = getDatabase();
    const rideRef = ref(db, `rides/${currentUser.uid}`);
    const newRide = push(rideRef);

    set(newRide, {
      name: rideName,
      locations: locations.split(',').map(location => location.trim()),
      rideSlots: rideSlots.split(',').map(rideSlot => rideSlot.trim()),
    });
  };

  return (
    <div>
      <form onSubmit={handleRideCreation}>
        <label>
          Ride Name:
          <input
            type="text"
            value={rideName}
            onChange={e => setRideName(e.target.value)}
          />
        </label>
        <label>
          Locations (separated by commas):
          <input
            type="text"
            value={locations}
            onChange={e => setLocations(e.target.value)}
          />
        </label>
        <label>
          Ride Slots (separated by commas):
          <input
            type="text"
            value={rideSlots}
            onChange={e => setRideSlots(e.target.value)}
          />
        </label>
        <button type="submit">Create Ride</button>
      </form>
    </div>
  );
}

export default CreateRide;