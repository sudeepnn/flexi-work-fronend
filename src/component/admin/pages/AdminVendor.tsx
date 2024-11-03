import React, { useEffect, useState } from 'react';
import VendorCard from './VendorCard'
import './vendorcard.css'
type Vendor = {
  _id: string;
  stallname: string;
  rent: number;
  imgurl: string;
  avalablestatus: boolean;
  bookings: any[]; // Adjust the type based on the structure of bookings
};

const AdminVendor: React.FC = () => {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  
  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await fetch('http://localhost:3008/api/v1/vendorspace');
        const data = await response.json();
        setVendors(data);
      } catch (error) {
        console.error("Error fetching vendor data:", error);
      }
    };

    fetchVendors();
  }, []);

  return (
    <div>
      <h1>Vendor List</h1>
      <div className="vendor-list">
        {vendors.map(vendor => (
          <VendorCard key={vendor._id} vendor={vendor} />
        ))}
      </div>
    </div>
  );
};

export default AdminVendor;
