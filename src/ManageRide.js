import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDatabase, ref, onValue, update, remove, get, set } from 'firebase/database';
import { AuthContext } from './AuthContext';

function ManageRide({ match }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const db = getDatabase();
  const { currentUser } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [rideName, setRideName] = useState('');
  const [locations, setLocations] = useState('');
  const [rideSlots, setRideSlots] = useState('');
  const userId = currentUser.uid
  const rideId = id

  useEffect(() => {
    const rideRef = ref(db, 'rides/' + userId + '/' + rideId);
    onValue(rideRef, (snapshot) => {
      const data = snapshot.val();
      setRideName(data.name);
      setLocations(data.locations);
      setRideSlots(data.rideSlots);
    });
  }, [db, rideId]);


  const handleSave = () => {
    const rideRef = ref(db, 'rides/' + userId + '/' + rideId);
    set(rideRef, {
      name: rideName,
      locations: locations,
      rideSlots: rideSlots,
    });
  };

  const handleLocationsChange = (event) => {
    setLocations(event.target.value.split(',').map(location => location.trim()));
  };

  const handleSlotsChange = (event) => {
    setRideSlots(event.target.value.split(',').map(slot => slot.trim()));
  };

  // Handle deleting a ride
  const handleDelete = () => {
    const rideRef = ref(db, 'rides/' + userId + '/' + rideId);
    remove(rideRef);
    navigate('/myaccount');
  };

  return (
    <div>
      <h1>Manage Ride: {rideName}</h1>
      <input type="text" value={rideName} onChange={(e) => setRideName(e.target.value)} />

      <p>Ride Locations: {locations.join(', ')}</p>
      <input type="text" value={locations.join(', ')} onChange={handleLocationsChange} />

      <p>Ride Slots: {rideSlots.join(', ')}</p>
      <input type="text" value={rideSlots.join(', ')} onChange={handleSlotsChange} />

      <button onClick={handleSave}>Save Changes</button>
      <div>
        <button onClick={handleDelete}>Delete Ride</button>
        <button onClick={() => navigate('/myaccount')}>My Account</button>
      </div>
    </div>

  );
}

export default ManageRide;





// import React, { useState, useEffect, useContext } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { getDatabase, ref, onValue, update, remove, get } from 'firebase/database';
// import { AuthContext } from './AuthContext';

// function ManageRide() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const db = getDatabase();
//   const { currentUser } = useContext(AuthContext);
//   const [data, setData] = useState(null);
//   const [rideName, setRideName] = useState('');
//   const [locations, setLocations] = useState('');
//   const [rideSlots, setRideSlots] = useState('');
//   const userId = currentUser.uid
//   const rideId = id

//   useEffect(() => {
//     const dataRef = ref(db, 'rides/' + userId + '/' + rideId);
//     const listener = onValue(dataRef, (snapshot) => {
//       const dataValue = snapshot.val();
//       setData(dataValue);
//     }, {
//       onlyOnce: true, // This option ensures the listener is removed after the initial data is received.
//     });

//     // Clean up function to remove the listener
//     return () => {
//       dataRef.off('value', listener);
//     };
//   }, [db]);


//   // Handle form submission
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const rideRef = ref(db, 'rides/' + userId + '/' + rideId);
//     update(rideRef, {
//       name: rideName,
//       locations: locations.split(',').map(location => location.trim()),
//       rideSlots: rideSlots.split(',').map(rideSlot => rideSlot.trim()),
//     });
//     navigate('/myaccount');
//   };

//   // Handle deleting a ride
//   const handleDelete = () => {
//     const rideRef = ref(db, 'rides/' + userId + '/' + rideId);
//     remove(rideRef);
//     navigate('/myaccount');
//   };

//   return (
//     <div>
//       <h2>Manage Ride: {/*TODO input the name of the ride here */}</h2>
//       <form onSubmit={handleSubmit}>
//         {/* form fields */}
//       </form>
//       <button onClick={handleDelete}>Delete Ride</button>
//     </div>
//   );
// }

// export default ManageRide;