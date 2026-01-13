import React, { useState } from 'react';
import { MAFIA_FAMILIES, MAFIA_ACTIONS, MAFIA_RANKS } from '../logic/Mafia';
import './Modal.css';

export function MafiaMenu({ person, onJoin, onAction, onClose }) {

    // If not in mafia, show join screen (Families list)
    if (!person.mafia.family) {
        return (
            <div className="modal-overlay">
                <div className="modal-content">
                    <div className="modal-header">
                        <h2 className="modal-title">Organized Crime</h2>
                        <button className="close-btn" onClick={onClose}>&times;</button>
                    </div>
                    <div className="modal-body">
                        <div style={{ padding: '10px', background: '#333', color: '#fff', borderRadius: '8px', marginBottom: '15px' }}>
                            <div>Your Notoriety: {person.notoriety}/100</div>
                            <div style={{ fontSize: '0.8em', color: '#aaa' }}>Build notoriety by committing crimes to be noticed.</div>
                        </div>

                        <h3>Families</h3>
                        {MAFIA_FAMILIES.map(family => (
                            <div key={family.id} className="list-item">
                                <div>
                                    <div className="bold">{family.name}</div>
                                    <div className="list-item-subtitle">Reputation: {family.reputation}</div>
                                </div>
                                <button className="btn-primary" onClick={() => onJoin(family)}>
                                    Ask to Join
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // Creating a mapping for rank titles would be good, or just find it
    const currentRank = MAFIA_RANKS.find(r => r.id === person.mafia.rank) || MAFIA_RANKS[0];

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2 className="modal-title">{person.mafia.family.name}</h2>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>

                <div className="modal-body">
                    <div style={{ background: '#222', padding: '15px', borderRadius: '8px', color: 'white', marginBottom: '20px', textAlign: 'center' }}>
                        <div style={{ fontSize: '1.2em', fontWeight: 'bold', color: '#ffd700' }}>{currentRank.title}</div>
                        <div style={{ fontSize: '0.9em', color: '#aaa' }}>Standing: {person.mafia.standing}%</div>
                        <div style={{ marginTop: '5px' }}>Notoriety: {person.notoriety}%</div>
                    </div>

                    <h3>Family Orders</h3>
                    {MAFIA_ACTIONS.map(action => (
                        <button
                            key={action.id}
                            className="list-item"
                            style={{ width: '100%', textAlign: 'left', background: '#e3f2fd' }}
                            onClick={() => onAction(action)}
                        >
                            <div className="bold">{action.title}</div>
                            <div className="list-item-subtitle">Risk: {action.risk}% | Notoriety: +{action.notoriety}</div>
                        </button>
                    ))}

                    <div style={{ marginTop: '20px', borderTop: '1px solid #ddd', paddingTop: '10px' }}>
                        <button className="btn-secondary" style={{ width: '100%' }} onClick={onClose}>Leave Meeting</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
