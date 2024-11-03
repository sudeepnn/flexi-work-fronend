// ParkingCard.tsx
import React from 'react';

type ParkingDetails = {
    _id: string;
    area: string;
    block: string;
    slot_number: string;
    floor: string;
    direction: string;
    parkingtype: string;

    heading: string;
    imgsrc: string; // Image source URL
    color: string;

    onCancel: (_id: string) => void; // Function to handle cancel
};

const ParkingCard: React.FC<ParkingDetails> = ({ _id, area, block, slot_number, floor, direction, parkingtype, onCancel, color, imgsrc, heading }) => {
    return (
        // <div className="parking-card" style={{ border: '1px solid #ddd', padding: '16px', marginBottom: '10px', borderRadius: '8px' }}>
        //     <h3>{`Parking Slot ${slot_number}`}</h3>
        //     <p><strong>Area:</strong> {area}</p>
        //     <p><strong>Block:</strong> {block}</p>
        //     <p><strong>Floor:</strong> {floor}</p>
        //     <p><strong>Direction:</strong> {direction}</p>
        //     <p><strong>Type:</strong> {parkingtype}</p>
        //     <button onClick={() => onCancel(_id)} style={{ marginTop: '10px', padding: '8px 12px', backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '4px' }}>
        //         Cancel
        //     </button>
        // </div>
        <div className='userdashboardcard' style={{ backgroundColor: color }}>
            <div className="userdashboardcardtop">
                <h2>{block + "-" + slot_number}</h2>
                <img src={imgsrc} alt="" />
            </div>

            <div className="userdashboardcardbelow">
            <p>Area: {area}</p>
            <p>floor: {floor}</p>
            <p>Parking type: {parkingtype}</p>
            <button onClick={() => onCancel(_id)} style={{ marginTop: '10px', padding: '8px 12px', backgroundColor: '#bd79f1', color: 'black', border: 'none', borderRadius: '4px' }}>
                Cancel
          </button>
            </div>
        </div>
    );
};

export default ParkingCard;
