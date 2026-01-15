import React from 'react';
import { ACTIVITIES } from '../logic/Activities';
import './Modal.css';

export function ActivitiesMenu({ person, onDoActivity, onClose }) {
    return (
        <div className="modal-overlay">
            <div className="modal-content" style={{ maxWidth: '500px' }}>
                <div className="modal-header">
                    <h2 className="modal-title">Activities</h2>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>

                <div className="modal-body">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '12px' }}>

                        {/* Social Media */}
                        <div
                            className="list-item"
                            onClick={() => onDoActivity({ isSocial: true })}
                            style={{
                                cursor: 'pointer',
                                borderLeft: '3px solid #03a9f4',
                                display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center'
                            }}
                        >
                            <span style={{ fontSize: '1.5em', marginBottom: '8px' }}>📱</span>
                            <span className="list-item-title">Social Media</span>
                        </div>

                        {/* Love */}
                        <div
                            className="list-item"
                            onClick={() => onDoActivity({ isLove: true })}
                            style={{
                                cursor: 'pointer',
                                borderLeft: '3px solid #e91e63',
                                display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center'
                            }}
                        >
                            <span style={{ fontSize: '1.5em', marginBottom: '8px' }}>💘</span>
                            <span className="list-item-title">Love</span>
                        </div>

                        {/* Music */}
                        <div
                            className="list-item"
                            onClick={() => onDoActivity({ isMusic: true })}
                            style={{
                                cursor: 'pointer',
                                borderLeft: '3px solid #9c27b0',
                                display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center'
                            }}
                        >
                            <span style={{ fontSize: '1.5em', marginBottom: '8px' }}>🎵</span>
                            <span className="list-item-title">Instruments</span>
                        </div>

                        {/* Doctor */}
                        <div
                            className="list-item"
                            onClick={() => onDoActivity({ isDoctor: true })}
                            style={{
                                cursor: 'pointer',
                                borderLeft: '3px solid #00e676',
                                display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center'
                            }}
                        >
                            <span style={{ fontSize: '1.5em', marginBottom: '8px' }}>🩺</span>
                            <span className="list-item-title">Doctor</span>
                        </div>

                        {/* Politics */}
                        <div
                            className="list-item"
                            onClick={() => onDoActivity({ isPolitics: true })}
                            style={{
                                cursor: 'pointer',
                                borderLeft: '3px solid #1e88e5',
                                display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center'
                            }}
                        >
                            <span style={{ fontSize: '1.5em', marginBottom: '8px' }}>🗳️</span>
                            <span className="list-item-title">Politics</span>
                        </div>

                        {/* Mafia */}
                        <div
                            className="list-item"
                            onClick={() => onDoActivity({ isMafia: true })}
                            style={{
                                cursor: 'pointer',
                                borderLeft: '3px solid #333',
                                display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center'
                            }}
                        >
                            <span style={{ fontSize: '1.5em', marginBottom: '8px' }}>🕵️‍♂️</span>
                            <span className="list-item-title">Crime</span>
                        </div>

                        {/* Casino */}
                        <div
                            className="list-item"
                            onClick={() => onDoActivity({ isGambling: true })}
                            style={{
                                cursor: 'pointer',
                                borderLeft: '3px solid #ffb300',
                                display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center'
                            }}
                        >
                            <span style={{ fontSize: '1.5em', marginBottom: '8px' }}>🎰</span>
                            <span className="list-item-title">Casino</span>
                        </div>
                    </div>

                    <h3 style={{ fontSize: '0.8rem', color: '#666', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '20px', marginBottom: '10px' }}>
                        More Activities
                    </h3>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px' }}>
                        {ACTIVITIES.map((act, idx) => (
                            !act.isDating && !act.isSocial && !act.isMusic && !act.isMafia && !act.isPolitics && !act.isGambling && !act.isDoctor && (
                                <div
                                    key={idx}
                                    className="list-item"
                                    onClick={() => onDoActivity(act)}
                                    style={{
                                        cursor: 'pointer',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        padding: '12px 16px',
                                        marginBottom: 0
                                    }}
                                >
                                    <span className="list-item-title" style={{ margin: 0 }}>{act.title}</span>
                                    <span style={{ color: act.cost > 0 ? '#ffb74d' : '#81c784', fontSize: '0.9em', background: 'rgba(0,0,0,0.2)', padding: '4px 8px', borderRadius: '4px' }}>
                                        {act.cost > 0 ? `$${act.cost}` : 'Free'}
                                    </span>
                                </div>
                            )
                        ))}
                    </div>
                </div>
            </div>
        </div >
    );
}
