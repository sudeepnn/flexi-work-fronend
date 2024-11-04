import React from 'react';
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
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
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
                <p><strong>Organizer ID:</strong> {event.organizer_id}</p>
                <p><strong>Venue ID:</strong> {event.venue_id}</p>
                <p><strong>Start Time:</strong> {event.start_time}</p>
                <p><strong>End Time:</strong> {event.end_time}</p>
            </div>
        </div>
    );
};

export default EventCard;
