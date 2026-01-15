import React from 'react';

export function GameOver({ person, onRestart }) {
    const getNetWorth = () => {
        let worth = person.money;
        person.assets.forEach(a => worth += a.price); // Simplified value
        return worth;
    };

    return (
        <div className="game-over" style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.95)',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            zIndex: 300,
            textAlign: 'center'
        }}>
            <h1 style={{ fontSize: '3em', color: '#ff5252', marginBottom: '10px' }}>R.I.P.</h1>

            <div style={{ marginBottom: '30px' }}>
                <h2 style={{ fontSize: '1.5em', margin: '5px 0' }}>{person.getFullName()}</h2>
                <p style={{ color: '#aaa' }}>{person.gender === 'male' ? 'He' : 'She'} died at the age of {person.age}.</p>
            </div>

            <div style={{
                backgroundColor: '#333',
                padding: '20px',
                borderRadius: '12px',
                width: '100%',
                maxWidth: '400px',
                marginBottom: '30px'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span>Net Worth:</span>
                    <span style={{ color: '#4caf50' }}>${getNetWorth().toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span>Career:</span>
                    <span>{person.job ? person.job.title : 'Unemployed'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span>Education:</span>
                    <span>{person.education}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span>Children:</span>
                    <span>{person.relationships.filter(r => r.type === 'Child').length}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span>Karma:</span>
                    <span style={{ color: person.karma > 50 ? '#4caf50' : '#f44336' }}>{person.karma}/100</span>
                </div>
                {person.fame > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span>Fame:</span>
                        <span style={{ color: '#ffd700' }}>{person.fame}%</span>
                    </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Partners:</span>
                    <span>{person.history.filter(h => h.text.includes('started dating')).length}</span>
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
                <button
                    onClick={onRestart}
                    style={{
                        padding: '16px 32px',
                        fontSize: '1.2em',
                        backgroundColor: '#4caf50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50px',
                        cursor: 'pointer',
                        boxShadow: '0 5px 15px rgba(76, 175, 80, 0.4)'
                    }}
                >
                    Start New Life
                </button>

                {person.relationships.some(r => r.type === 'Child') && (
                    <div style={{ marginTop: '20px' }}>
                        <h3 style={{ margin: '10px' }}>Continue as Child</h3>
                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
                            {person.relationships.filter(r => r.type === 'Child').map(child => (
                                <button
                                    key={child.id}
                                    onClick={() => onRestart(child)}
                                    style={{
                                        padding: '10px 20px',
                                        fontSize: '1em',
                                        backgroundColor: '#2196f3',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '8px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    {child.name} (Age {child.age || '?'})
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
