import React from 'react';
import { ACHIEVEMENTS } from '../logic/Achievements';

export function AchievementsMenu({ unlockedIds, onClose }) {
    return (
        <div className="achievements-menu animate-fade-in" style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.85)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            zIndex: 200
        }}>
            <div className="animate-slide-up" style={{
                backgroundColor: '#1a1a1a', // Dark theme for trophies
                color: 'white',
                borderRadius: '12px',
                width: '100%',
                maxHeight: '80%',
                overflowY: 'auto',
                padding: '20px'
            }}>
                <div className="flex justify-between items-center" style={{ marginBottom: '20px', borderBottom: '1px solid #333', paddingBottom: '10px' }}>
                    <h2 style={{ margin: 0, color: '#ffd700' }}>🏆 Trophy Case</h2>
                    <button onClick={onClose} style={{ padding: '8px 16px', background: '#333', color: 'white', border: 'none', borderRadius: '4px' }}>Close</button>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                    <span style={{ fontSize: '0.9em', color: '#888' }}>
                        Unlocked: {unlockedIds.length} / {ACHIEVEMENTS.length}
                    </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    {ACHIEVEMENTS.map(ach => {
                        const unlocked = unlockedIds.includes(ach.id);
                        return (
                            <div key={ach.id} style={{
                                padding: '12px',
                                border: `1px solid ${unlocked ? '#ffd700' : '#444'}`,
                                borderRadius: '8px',
                                backgroundColor: unlocked ? '#2a2a2a' : '#111',
                                opacity: unlocked ? 1 : 0.5,
                                textAlign: 'center'
                            }}>
                                <div style={{ fontSize: '2em', marginBottom: '4px' }}>{ach.icon}</div>
                                <div style={{ fontWeight: 'bold', fontSize: '0.9em', color: unlocked ? 'white' : '#666' }}>{ach.title}</div>
                                <div style={{ fontSize: '0.7em', color: '#888' }}>{ach.description}</div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
