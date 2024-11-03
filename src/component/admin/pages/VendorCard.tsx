import React from 'react';

type VendorProps = {
  vendor: {
    _id: string;
    stallname: string;
    rent: number;
    imgurl: string;
    avalablestatus: boolean;
    bookings: any[]; // Adjust the type based on the structure of bookings
  };
};

const VendorCard: React.FC<VendorProps> = ({ vendor }) => {
  return (
    <div className="vendor-card">
      <img src={vendor.imgurl} alt={vendor.stallname} />
      <h3>{vendor.stallname}</h3>
      <p>Rent: ₹{vendor.rent}</p>
      <p>Status: {vendor.avalablestatus ? 'Available' : 'Not Available'}</p>
      {/* You can add more details or actions here if needed */}
    </div>
  );
};

export default VendorCard;
