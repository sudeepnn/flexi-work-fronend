// ParkingCard.tsx
import React from 'react';
import '../admin/Sidebar.css'
type workDetails = {
    _id: string;
    userId: string,
    name: string
    contact: string
    startTime: string
    workspace_id:string,
    project:string

    heading: string;
    imgsrc: string; // Image source URL
    color: string;

    onCancel: (_id: string) => void; // Function to handle cancel
};

const WorkspaceCard: React.FC<workDetails> = ({ _id, userId, name, contact, startTime,workspace_id,project, onCancel, color, imgsrc, heading }) => {
    return (
        
      
        <div className='workdashboardcard' style={{ backgroundColor: color }}>
            <div className="workdashboardcardtop">
                <h2>{ workspace_id}</h2>
                <img src={imgsrc} alt="" />
            </div>

            <div className="workdashboardcardbelow">
                <p>Project: {project}</p>
                
                <button onClick={() => onCancel(workspace_id)} style={{ marginTop: '10px', padding: '8px 12px', backgroundColor: '#a8dbf8', color: 'black', border: 'none', borderRadius: '4px' }}>
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default WorkspaceCard;
