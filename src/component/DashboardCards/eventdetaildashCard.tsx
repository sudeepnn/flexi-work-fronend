// ParkingCard.tsx
import React from 'react';
import '../admin/Sidebar.css'
type workDetails = {
    event_name: string,
    user_id: string,
    _id:string

    heading: string;
    imgsrc: string; // Image source URL
    color: string;

    onCancel: (_id: string) => void; // Function to handle cancel
};

const Eventdetaildashcard: React.FC<workDetails> = ({ _id, user_id, event_name,  onCancel, color, imgsrc, heading }) => {
    return (
        
      
        <div className='workdashboardcard' style={{ backgroundColor: color }}>
            <div className="workdashboardcardtop">
                <h2>{ event_name}</h2>
                <img src={imgsrc} alt="" />
            </div>

            <div className="workdashboardcardbelow">
                {/* <p>: {user_id}</p> */}
                
                {/* <button onClick={() => onCancel(workspace_id)} style={{ marginTop: '10px', padding: '8px 12px', backgroundColor: '#a8dbf8', color: 'black', border: 'none', borderRadius: '4px' }}>
                    Cancel
                </button> */}
            </div>
        </div>
    );
};

export default Eventdetaildashcard;
