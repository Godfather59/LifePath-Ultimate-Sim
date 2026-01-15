import React, { useEffect, useRef } from 'react';
import './EventLog.css';

export function EventLog({ history = [] }) {
    const endRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        // Use scrollTop instead of scrollIntoView checks to prevent bubbling up to the body
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [history]);

    // Display newest at the bottom naturally
    const displayHistory = [...history].reverse();

    return (
        <div className="event-log" ref={containerRef}>
            {displayHistory.map((event, index) => (
                <div key={index} className={`event-card type-${event.type || 'neutral'}`}>
                    <div className="event-text">{event.text}</div>
                    <span className="event-age-badge">Age {event.age}</span>
                </div>
            ))}

            <div ref={endRef} />
        </div>
    );
}
