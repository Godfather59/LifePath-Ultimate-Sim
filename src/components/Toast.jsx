import React, { useEffect, useState } from 'react';
import './Toast.css';

export function Toast({ message, type, onClose, duration = 3000 }) {
    const [closing, setClosing] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setClosing(true);
            setTimeout(onClose, 300); // Wait for animation
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    return (
        <div className="toast-container">
            <div
                className={`toast-message toast-type-${type} ${closing ? 'closing' : ''}`}
                onClick={() => { setClosing(true); setTimeout(onClose, 300); }}
                style={{ cursor: 'pointer' }}
            >
                {type === 'bad' && <span style={{ marginRight: '8px' }}>🚫</span>}
                {type === 'good' && <span style={{ marginRight: '8px' }}>✅</span>}
                {message}
            </div>
        </div>
    );
}


