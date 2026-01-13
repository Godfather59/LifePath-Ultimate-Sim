import React, { useState } from 'react';
import { RelationshipManager } from '../logic/Relationships';
import './Modal.css';

export function LoveMenu({ person, onDate, onClose }) {
    const [view, setView] = useState('menu'); // 'menu' | 'dating_app'
    const [candidates, setCandidates] = useState([]);

    const generateCandidates = () => {
        // Simple preference logic: opposite gender by default, but could be expanded
        const pref = person.gender === 'Male' ? 'female' : 'male';
        setCandidates(RelationshipManager.generateBatch(3, pref));
        setView('dating_app');
    };

    const handleBlindDate = () => {
        const pref = person.gender === 'Male' ? 'female' : 'male';
        const candidate = RelationshipManager.generateCandidate(pref);
        onDate(candidate);
    };

    const renderDatingApp = () => (
        <div className="dating-app">
            <h3 className="text-center" style={{ color: '#e91e63' }}>🔥 BitLove 🔥</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
                {candidates.map(candidate => (
                    <div key={candidate.id} style={{
                        background: 'white',
                        padding: '16px',
                        borderRadius: '12px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                        border: '1px solid #eee'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '1.2em', fontWeight: 'bold' }}>{candidate.name}</span>
                            <span style={{ background: '#f0f0f0', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8em' }}>Age {candidate.age}</span>
                        </div>
                        <div style={{ color: '#666', marginBottom: '8px' }}>{candidate.job}</div>

                        {/* Stats Preview */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '0.9em', color: '#555' }}>
                            <div>Looks: <span style={{ color: candidate.looks > 70 ? 'green' : 'inherit' }}>{candidate.looks}%</span></div>
                            <div>Smarts: <span style={{ color: candidate.smarts > 70 ? 'green' : 'inherit' }}>{candidate.smarts}%</span></div>
                            <div>Money: <span style={{ color: candidate.money > 50000 ? 'green' : 'inherit' }}>${candidate.money.toLocaleString()}</span></div>
                            <div>Crazy: <span style={{ color: candidate.craziness > 50 ? 'red' : 'inherit' }}>{candidate.craziness}%</span></div>
                        </div>

                        <button
                            className="btn-primary"
                            style={{ width: '100%', marginTop: '12px', background: '#e91e63' }}
                            onClick={() => onDate(candidate)}
                        >
                            Ask Out
                        </button>
                    </div>
                ))}
            </div>
            <button
                onClick={() => setView('menu')}
                style={{ marginTop: '20px', width: '100%', padding: '12px', background: 'transparent', border: 'none', color: '#666' }}
            >
                Back
            </button>
        </div>
    );

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2 className="modal-title">Find Love</h2>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>

                <div className="modal-body">
                    {view === 'menu' ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <button
                                className="list-item"
                                onClick={generateCandidates}
                                style={{ textAlign: 'left', cursor: 'pointer', padding: '20px' }}
                            >
                                <div style={{ fontSize: '1.2em', fontWeight: 'bold', color: '#e91e63' }}>📱 Dating App ($100)</div>
                                <div style={{ color: '#666' }}>Browse profiles and pick your match.</div>
                            </button>

                            <button
                                className="list-item"
                                onClick={handleBlindDate}
                                style={{ textAlign: 'left', cursor: 'pointer', padding: '20px' }}
                            >
                                <div style={{ fontSize: '1.2em', fontWeight: 'bold' }}>❓ Blind Date (Free)</div>
                                <div style={{ color: '#666' }}>Let fate decide! Risk of weirdos.</div>
                            </button>
                        </div>
                    ) : renderDatingApp()}
                </div>
            </div>
        </div>
    );
}
