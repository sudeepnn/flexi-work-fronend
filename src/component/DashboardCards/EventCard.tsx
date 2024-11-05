import React, { useState, useEffect } from 'react';
import './eventcard.css';

interface EventCardProps {
    event: {
        _id: string;
        event_name: string;
        organizer_id: string;
        venue_id: string;
        start_time: string;
        end_time: string;
        imgurl: string;
        venue_name: string;

        
    };
    onCancel: (_id: string) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event,onCancel }) => {
    const [statusMessage, setStatusMessage] = useState<string | null>(null);

    // Function to hide the snackbar after a delay
    useEffect(() => {
        if (statusMessage) {
            const timer = setTimeout(() => setStatusMessage(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [statusMessage]);

    return (
        <div className="event-card">
            {/* Image section */}
            <div className="event-card-image-wrapper">
                <img 
                    src={event.imgurl} 
                    alt={`${event.venue_name}`} 
                    className="event-card-image" 
                />
            </div>
            
            {/* Card Content */}
            <div className="event-card-content">
                <h5 className="event-card-title">{event.event_name}</h5>
                <p><strong>Venue:</strong> {event.venue_name}</p>
                <p><strong>Start Time:</strong> {event.start_time}</p>
                <p><strong>End Time:</strong> {event.end_time}</p>

                {/* Cancel button */}
                <button onClick={() => onCancel(event._id)} className="event-card-cancel-button">
                    Cancel Event
                </button>
            </div>

            {/* Inline Snackbar */}
            {statusMessage && (
                <div className="snackbar">
                    {statusMessage}
                </div>
            )}
        </div>
    );
};

export default EventCard;
