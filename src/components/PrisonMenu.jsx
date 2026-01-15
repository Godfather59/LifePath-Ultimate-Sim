import React from 'react';
import './Modal.css';

export function PrisonMenu({ person, onAction, onClose }) {
    // If we wanted a sub-modal state, we could add it here

    const handleAction = (action) => {
        onAction(action);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content" style={{ border: '2px solid #ff4444' }}>
                <div className="modal-header">
                    <h2 className="modal-title" style={{ color: '#ff4444' }}>🚔 STATE PENITENTIARY</h2>
                    {/* No close button, you are in prison! (Until you click 'Back' or something, strictly usually only Age Up is allowed outside menu) */}
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>

                <div className="modal-body">
                    <div style={{ textAlign: 'center', marginBottom: '20px', padding: '15px', background: 'rgba(255,0,0,0.1)', borderRadius: '8px' }}>
                        <div style={{ fontSize: '3rem' }}>🔒</div>
                        <h3>Sentence Remaining</h3>
                        <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{person.prisonSentence} Years</div>
                        <div style={{ fontSize: '0.9rem', color: '#aaa', marginTop: '5px' }}>
                            Respect: {person.notoriety || 0}% | Gang: {person.mafia.family ? 'Affiliated' : 'None'}
                        </div>
                    </div>

                    <h3 style={{ borderBottom: '1px solid #ff4444' }}>Prison Yard</h3>
                    <div className="activites-grid">
                        <button className="activity-btn" onClick={() => handleAction('workout')}>
                            <span>💪</span>
                            <span>Yard Workout</span>
                        </button>
                        <button className="activity-btn" onClick={() => handleAction('library')}>
                            <span>📚</span>
                            <span>Prison Library</span>
                        </button>
                        <button className="activity-btn" onClick={() => handleAction('gang')}>
                            <span>🤐</span>
                            <span>Gang Interaction</span>
                        </button>
                    </div>

                    <h3 style={{ borderBottom: '1px solid #ff4444', marginTop: '20px' }}>Legal & Illegal</h3>
                    <div className="activites-grid">
                        <button className="activity-btn" onClick={() => handleAction('appeal')}>
                            <span>⚖️</span>
                            <span>Appeal Sentence ($5,000)</span>
                        </button>
                        <button className="activity-btn" onClick={() => handleAction('riot')} style={{ borderColor: '#ff4444', color: '#ff4444' }}>
                            <span>🔥</span>
                            <span>Incite Riot</span>
                        </button>
                        <button className="activity-btn" onClick={() => handleAction('escape')} style={{ borderColor: '#ff4444', color: '#ff4444' }}>
                            <span>🏃</span>
                            <span>Escape!</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
