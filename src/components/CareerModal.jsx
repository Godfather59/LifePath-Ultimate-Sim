import React, { useState } from 'react';
import { INSTRUMENTS } from '../logic/SpecialCareers';
import './Modal.css';

export function CareerModal({ person, onAction, onClose }) {
    const [view, setView] = useState('menu'); // 'menu' | 'instruments'

    const renderInstruments = () => (
        <div>
            <button onClick={() => setView('menu')} style={{ marginBottom: '16px' }}>&larr; Back</button>
            <h3 className="text-center">Choose an Instrument</h3>
            <div className="list-container">
                {INSTRUMENTS.map(inst => {
                    const skill = person.skills?.instruments?.[inst.id] || 0;
                    return (
                        <div key={inst.id} className="list-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <div className="bold">{inst.name}</div>
                                <div style={{ fontSize: '0.8em', color: '#666' }}>Type: {inst.type}</div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: '0.8em' }}>Skill: {skill}%</div>
                                <button
                                    className="btn-primary"
                                    style={{ padding: '4px 8px', fontSize: '0.8em', marginTop: '4px' }}
                                    onClick={() => onAction('practice', inst.id)}
                                >
                                    Practice
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2 className="modal-title">Music & Talent</h2>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>

                <div className="modal-body">
                    {view === 'menu' ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <div className="text-center" style={{ marginBottom: '20px', padding: '10px', background: '#fce4ec', borderRadius: '8px', color: '#880e4f' }}>
                                🎵 Musical Talent: {person.musicalTalent}%
                            </div>

                            <button className="list-item" onClick={() => onAction('voice')}>
                                <div className="bold">🎤 Take Voice Lessons</div>
                                <div className="list-item-subtitle">Current Skill: {person.skills?.voice || 0}%</div>
                            </button>

                            <button className="list-item" onClick={() => setView('instruments')}>
                                <div className="bold">🎸 Practice an Instrument</div>
                                <div className="list-item-subtitle">Learn Guitar, Piano, Drums...</div>
                            </button>

                            {/* Future band options here */}
                            {person.fame > 0 && (
                                <div style={{ marginTop: '20px', textAlign: 'center', opacity: 0.5 }}>
                                    Band features coming soon!
                                </div>
                            )}
                        </div>
                    ) : renderInstruments()}
                </div>
            </div>
        </div>
    );
}
