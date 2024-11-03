import React, { useEffect, useState } from 'react';
import VenueCard from './VenueCard';

type Venue = {
  _id: string;
  venue_name: string;
  capacity: number;
  isAvailable: boolean;
  imgurl: string;
};

const AdminEvent = () => {
  const [venues, setVenues] = useState<Venue[]>([]);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await fetch('http://localhost:3003/api/v1/venue');
        const data = await response.json();
        setVenues(data);
      } catch (error) {
        console.error('Error fetching venue data:', error);
      }
    };

    fetchVenues();
  }, []);

  return (
    <div className='adminevent'>
      <h3 >Event Venue List:</h3>
      <div className="allvenue">
        {venues.map((venue) => (
          <VenueCard 
            key={venue._id} 
            venueName={venue.venue_name} 
            capacity={venue.capacity} 
            isAvailable={venue.isAvailable} 
            imgUrl={venue.imgurl} 
          />
        ))}
      </div>
    </div>
  );
};

export default AdminEvent;
