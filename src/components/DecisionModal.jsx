import React from 'react';
import './Modal.css';

export function DecisionModal({ event, onChoice }) {
    return (
        <div className="modal-overlay">
            <div className="modal-content" style={{ maxWidth: '360px' }}>
                <div className="modal-header">
                    <h2 className="modal-title">Event</h2>
                </div>

                <div className="modal-body">
                    <p style={{ fontSize: '1.2em', lineHeight: '1.5', margin: '0 0 24px 0' }}>
                        {event.text}
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {event.choices.map((choice, index) => (
                            <button
                                key={index}
                                onClick={() => onChoice(choice)}
                                className="btn-secondary"
                                style={{
                                    textAlign: 'left',
                                    padding: '16px',
                                    backgroundColor: 'rgba(255,255,255,0.08)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    transition: 'background 0.2s'
                                }}
                            >
                                {choice.text}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

