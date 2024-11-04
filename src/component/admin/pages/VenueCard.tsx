import React from 'react';
import './venue.css'
type VenueCardProps = {
  venueName: string;
  capacity: number;
  isAvailable: boolean;
  imgUrl: string;
  onClick?: () => void;
};

const VenueCard: React.FC<VenueCardProps> = ({ venueName, capacity, isAvailable, imgUrl ,onClick}) => {
  return (
    <div className="venue-card" onClick={onClick}>
      <img src={imgUrl} alt={venueName} />
      <h4>{venueName}</h4>
      <p>Capacity: {capacity}</p>
      <p>Status: {isAvailable ? 'Available' : 'Not Available'}</p>
    </div>
  );
};

export default VenueCard;
