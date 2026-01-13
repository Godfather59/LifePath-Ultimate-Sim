import React from 'react';
import { ACTIVITIES } from '../logic/Activities';
import './Modal.css';

export function ActivitiesMenu({ person, onDoActivity, onClose }) {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2 className="modal-title">Activities</h2>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>

                <div className="modal-body">
                    {/* Social Media Button */}
                    <div
                        className="list-item"
                        onClick={() => onDoActivity({ isSocial: true })}
                        style={{ cursor: 'pointer' }}
                    >
                        <span className="list-item-title">📱 Social Media</span>
                        <span className="list-item-subtitle">Manage your BitBook, TokTik, etc.</span>
                    </div>

                    {/* Music Activities */}
                    <div className="list-item" onClick={() => onDoActivity({ isMusic: true })} style={{ cursor: 'pointer', background: 'rgba(233, 30, 99, 0.1)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span className="list-item-title">🎵 Music & Instruments</span>
                            <span>$0</span>
                        </div>
                        <span className="list-item-subtitle">Practice instrument or take voice lessons.</span>
                    </div>

                    {/* Standard Activities */}
                    {ACTIVITIES.map((act, idx) => (
                        <div
                            key={idx}
                            className="list-item"
                            onClick={() => {
                                if (act.isDating) {
                                    onDoActivity({ isLove: true });
                                } else {
                                    onDoActivity(act);
                                }
                            }}
                            style={{ cursor: 'pointer' }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span className="list-item-title">{act.title}</span>
                                <span style={{ color: 'var(--success-color)' }}>{act.cost > 0 ? `$${act.cost}` : 'Free'}</span>
                            </div>
                            <span className="list-item-subtitle">
                                {act.type === 'good' ? 'Boost Happiness/Health' : 'Risky Business'}
                            </span>
                        </div>
                    ))}

                    {/* Mafia Activity */}
                    <div className="list-item" onClick={() => onDoActivity({ isMafia: true })} style={{ cursor: 'pointer', background: '#212121', color: '#fff' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span className="list-item-title">🕵️‍♂️ Organized Crime</span>
                        </div>
                        <span className="list-item-subtitle" style={{ color: '#aaa' }}>Join the family.</span>
                    </div>

                    {/* Politics Button */}
                    <div className="list-item" onClick={() => onDoActivity({ isPolitics: true })} style={{ cursor: 'pointer', background: 'linear-gradient(135deg, #1e88e5, #1565c0)', color: '#fff' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span className="list-item-title">🏛️ Politics</span>
                        </div>
                        <span className="list-item-subtitle" style={{ color: '#eee' }}>Run for office.</span>
                    </div>

                    {/* Casino Button */}
                    <div className="list-item" onClick={() => onDoActivity({ isGambling: true })} style={{ cursor: 'pointer', background: 'linear-gradient(135deg, #ffd700, #ff8f00)', color: '#000' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span className="list-item-title">🎰 Casino</span>
                        </div>
                        <span className="list-item-subtitle" style={{ color: '#333' }}>Feeling lucky?</span>
                    </div>

                    {/* Doctor Button */}
                    <div className="list-item" onClick={() => onDoActivity({ isDoctor: true })} style={{ cursor: 'pointer', background: 'linear-gradient(135deg, #00e676, #00b09b)', color: '#fff' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span className="list-item-title">💉 Doctor & Surgery</span>
                        </div>
                        <span className="list-item-subtitle" style={{ color: '#eee' }}>Stay healthy... or pretty.</span>
                    </div>
                </div>
            </div>
        </div >
    );
}
