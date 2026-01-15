import React from 'react';
import './Modal.css';

export function HobbiesMenu({ person, onPractice, onClose }) {
    const skills = [
        { id: 'martialArts', name: 'Martial Arts', icon: '🥋' },
        { id: 'cooking', name: 'Cooking', icon: '🍳' },
        { id: 'coding', name: 'Coding', icon: '💻' },
        // { id: 'instrument', name: 'Instrument', icon: '🎻' } // Using Instruments menu for this? Or generalize here.
        // User asked for "instrument: 0" in generic skills, so let's allow generic instrument practice here too.
        { id: 'instrument', name: 'Music Theory', icon: '🎼' }
    ];

    return (
        <div className="modal-overlay">
            <div className="modal-content" style={{ maxWidth: '400px' }}>
                <div className="modal-header">
                    <h2 className="modal-title">Hobbies</h2>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>
                <div className="modal-body">
                    <p style={{ color: '#aaa', marginBottom: '16px' }}>Master a skill to improve your life or unlock careers.</p>
                    <div style={{ display: 'grid', gap: '10px' }}>
                        {skills.map(skill => {
                            const level = person.skills[skill.id] || 0;
                            return (
                                <button
                                    key={skill.id}
                                    className="list-item"
                                    onClick={() => onPractice(skill.id)}
                                    style={{
                                        background: 'rgba(255,255,255,0.05)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        padding: '16px',
                                        cursor: 'pointer',
                                        textAlign: 'left'
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <span style={{ fontSize: '1.5em' }}>{skill.icon}</span>
                                        <div>
                                            <div style={{ fontWeight: '600', color: '#eee' }}>{skill.name}</div>
                                            <div style={{ fontSize: '0.8em', color: '#888' }}>
                                                Level: <span style={{ color: level === 100 ? '#4caf50' : '#fff' }}>{level}/100</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ fontSize: '1.2em', color: '#4caf50' }}>
                                        +
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
