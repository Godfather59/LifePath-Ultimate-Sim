import React, { useState } from 'react';
import { MAFIA_FAMILIES, MAFIA_ACTIONS, MAFIA_RANKS } from '../logic/MafiaLogic';
import './Modal.css';

export function MafiaMenu({ person, onJoin, onAction, onClose }) {
    const [selectedFamily, setSelectedFamily] = useState(null);

    const renderJoinScreen = () => {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <h3>Join a Family</h3>
                <p style={{ color: '#aaa', fontSize: '0.9em' }}>
                    You must have at least 30 Notoriety to be taken seriously.
                </p>
                <div style={{ marginBottom: '10px', color: person.notoriety >= 30 ? '#4caf50' : '#f44336' }}>
                    Your Notoriety: {person.notoriety}/100
                </div>

                <div style={{ display: 'grid', gap: '8px' }}>
                    {MAFIA_FAMILIES.map(fam => (
                        <button
                            key={fam.id}
                            onClick={() => {
                                if (person.notoriety < 30) {
                                    alert("You are not notorious enough!");
                                    return;
                                }
                                onJoin(fam);
                            }}
                            style={{
                                padding: '12px',
                                background: '#333',
                                color: 'white',
                                border: '1px solid #444',
                                borderRadius: '4px',
                                textAlign: 'left',
                                cursor: 'pointer',
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}
                        >
                            <span>{fam.name}</span>
                            <span style={{ fontSize: '0.8em', color: '#888' }}>{fam.difficulty}</span>
                        </button>
                    ))}
                </div>
            </div>
        );
    };

    const renderDashboard = () => {
        const family = person.mafia.family;
        const rank = MAFIA_RANKS.find(r => r.id === person.mafia.rank);
        const standing = person.mafia.standing;

        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div style={{ textAlign: 'center', padding: '15px', background: 'rgba(255,0,0,0.1)', borderRadius: '8px', border: '1px solid #500' }}>
                    <h2 style={{ margin: '0 0 5px 0', color: '#ff5252' }}>{family.name}</h2>
                    <div style={{ fontSize: '1.1em', fontWeight: 'bold' }}>{rank?.title || 'Unknown'}</div>
                    <div style={{ marginTop: '10px' }}>
                        Standing:
                        <div style={{ height: '8px', background: '#333', borderRadius: '4px', marginTop: '4px', overflow: 'hidden' }}>
                            <div style={{ width: `${standing}%`, height: '100%', background: standing > 50 ? '#4caf50' : '#f44336' }}></div>
                        </div>
                    </div>
                </div>

                <h3>Orders</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    {MAFIA_ACTIONS.map(action => (
                        <button
                            key={action.id}
                            onClick={() => onAction(action.id)}
                            style={{
                                padding: '15px',
                                background: '#333',
                                color: action.id === 'snitch' ? '#ef5350' : 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '5px'
                            }}
                        >
                            <div style={{ fontWeight: 'bold' }}>{action.label}</div>
                            <div style={{ fontSize: '0.7em', color: '#aaa' }}>Risk: {Math.floor(action.risk * 100)}%</div>
                        </button>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content" style={{ maxWidth: '450px', background: '#1a1a1a', color: '#fff' }}>
                <div className="modal-header">
                    <h2 className="modal-title">Organized Crime</h2>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>
                <div className="modal-body">
                    {person.mafia.family ? renderDashboard() : renderJoinScreen()}
                </div>
            </div>
        </div>
    );
}
