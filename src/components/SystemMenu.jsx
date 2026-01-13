import React from 'react';
import './Modal.css';

export function SystemMenu({ onResume, onSave, onExit, onGodMode }) {
    return (
        <div className="modal-overlay">
            <div className="modal-content" style={{ maxWidth: '300px' }}>
                <div className="modal-header">
                    <h2 className="modal-title">Paused</h2>
                    <button className="close-btn" onClick={onResume}>&times;</button>
                </div>

                <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

                    <button
                        className="btn-primary"
                        onClick={onResume}
                        style={{ padding: '16px', fontSize: '1.1rem' }}
                    >
                        Resume Game
                    </button>

                    <button
                        className="btn-secondary"
                        onClick={onSave}
                        style={{ padding: '16px', fontSize: '1.1rem' }}
                    >
                        💾 Save Game
                    </button>

                    <button
                        className="list-item"
                        onClick={onGodMode}
                        style={{ padding: '16px', fontSize: '1.1rem', background: 'linear-gradient(45deg, #ffd700, #ffa500)', color: 'black', fontWeight: 'bold', border: 'none' }}
                    >
                        ⚡ God Mode
                    </button>

                    <div style={{ borderTop: '1px solid #eee', margin: '8px 0' }}></div>

                    <button
                        className="btn-danger"
                        onClick={() => {
                            if (confirm("Are you sure you want to exit? Unsaved progress will be lost.")) {
                                onExit();
                            }
                        }}
                        style={{ padding: '16px', fontSize: '1.1rem' }}
                    >
                        Exit to Main Menu
                    </button>

                </div>
            </div>
        </div>
    );
}
