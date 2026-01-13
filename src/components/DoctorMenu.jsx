import React, { useState } from 'react';
import { SURGERIES, TREATMENTS } from '../logic/Health';
import './Modal.css';

export function DoctorMenu({ person, onTreat, onSurgery, onClose }) {
    const [tab, setTab] = useState('doctor'); // doctor, surgery

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2 className="modal-title">🏥 Hospital</h2>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>

                <div className="modal-body">
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                        <button
                            className={`btn-secondary ${tab === 'doctor' ? 'active' : ''}`}
                            style={tab === 'doctor' ? { background: '#4caf50' } : {}}
                            onClick={() => setTab('doctor')}
                        >
                            👨‍⚕️ Doctor
                        </button>
                        <button
                            className={`btn-secondary ${tab === 'surgery' ? 'active' : ''}`}
                            style={tab === 'surgery' ? { background: '#e91e63' } : {}}
                            onClick={() => setTab('surgery')}
                        >
                            💉 Plastic Surgery
                        </button>
                    </div>

                    {tab === 'doctor' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {TREATMENTS.map(t => (
                                <button key={t.id} className="list-item" onClick={() => onTreat(t)} style={{ width: '100%' }}>
                                    <div className="bold">{t.name}</div>
                                    <div className="list-item-subtitle">${t.cost}</div>
                                </button>
                            ))}
                        </div>
                    )}

                    {tab === 'surgery' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {SURGERIES.map(s => (
                                <button key={s.id} className="list-item" onClick={() => onSurgery(s)} style={{ width: '100%' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <div className="bold">{s.name}</div>
                                        <div style={{ color: '#e91e63' }}>${s.cost.toLocaleString()}</div>
                                    </div>
                                    <div className="list-item-subtitle">
                                        Risk: {s.risk}% | Looks: +{s.looks_gain}
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
