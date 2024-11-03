import React from 'react';
import './venue.css'
type VenueCardProps = {
  venueName: string;
  capacity: number;
  isAvailable: boolean;
  imgUrl: string;
};

const VenueCard: React.FC<VenueCardProps> = ({ venueName, capacity, isAvailable, imgUrl }) => {
  return (
    <div className="venue-card">
      <img src={imgUrl} alt={venueName} />
      <h4>{venueName}</h4>
      <p>Capacity: {capacity}</p>
      <p>Status: {isAvailable ? 'Available' : 'Not Available'}</p>
    </div>
  );
};

export default VenueCard;
