import React, { useState, useEffect } from 'react';
import './Modal.css';

export function SaveSlotMenu({ onSelectSlot, onNewGame, onClose }) {
    const [slots, setSlots] = useState([]);

    useEffect(() => {
        const meta = localStorage.getItem('bitlife_save_meta');
        if (meta) {
            setSlots(JSON.parse(meta));
        }
    }, []);

    const handleDelete = (e, slotId) => {
        e.stopPropagation();
        if (window.confirm("Are you sure you want to delete this save? This cannot be undone.")) {
            // Remove data
            localStorage.removeItem(`bitlife_save_${slotId}`);

            // Update meta
            const newSlots = slots.filter(s => s.id !== slotId);
            setSlots(newSlots);
            localStorage.setItem('bitlife_save_meta', JSON.stringify(newSlots));
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2 className="modal-title">💾 Load Game</h2>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>
                <div className="modal-body">
                    {slots.length === 0 ? (
                        <div style={{ padding: '20px', textAlign: 'center', color: '#aaa' }}>
                            No saved games found.
                        </div>
                    ) : (
                        slots.map(slot => (
                            <div key={slot.id} className="list-item" onClick={() => onSelectSlot(slot.id)} style={{ cursor: 'pointer' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <div className="list-item-title">{slot.name}</div>
                                        <div className="list-item-subtitle">
                                            Age: {slot.age} • {slot.job}
                                            <br />
                                            <span style={{ fontSize: '0.8em', opacity: 0.6 }}>Last Played: {new Date(slot.lastPlayed).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                    <button
                                        className="btn-danger"
                                        style={{ padding: '5px 10px', fontSize: '0.8em' }}
                                        onClick={(e) => handleDelete(e, slot.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    )}

                    <div style={{ marginTop: '20px', borderTop: '1px solid #444', paddingTop: '20px' }}>
                        <button className="btn-primary" style={{ width: '100%' }} onClick={onNewGame}>
                            + Start New Life
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
