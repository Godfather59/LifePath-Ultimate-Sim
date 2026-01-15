import React from 'react';
import './ActionMenu.css';

export function ActionMenu({ onAgeUp, onAction, onAgeSkip }) {
    return (
        <div className="action-menu">
            <div className="action-menu-grid">
                <button className="action-btn" onClick={() => onAction('occupation')}>
                    <span className="action-icon">💼</span>
                    <span className="action-label">Occupation</span>
                </button>

                <button className="action-btn" onClick={() => onAction('activities')}>
                    <span className="action-icon">🎯</span>
                    <span className="action-label">Activities</span>
                </button>

                <button className="action-btn" onClick={() => onAction('relationships')}>
                    <span className="action-icon">❤️</span>
                    <span className="action-label">Relationships</span>
                </button>

                <button className="action-btn" onClick={() => onAction('assets')}>
                    <span className="action-icon">🏠</span>
                    <span className="action-label">Assets</span>
                </button>

                <button className="action-btn" onClick={() => onAction('education')}>
                    <span className="action-icon">📚</span>
                    <span className="action-label">Education</span>
                </button>

                <button className="action-btn" onClick={() => onAction('pets')}>
                    <span className="action-icon">🐾</span>
                    <span className="action-label">Pets</span>
                </button>
            </div>

            {/* Age Up Section */}
            <div style={{
                marginTop: '20px',
                display: 'flex',
                gap: '10px',
                justifyContent: 'center'
            }}>
                <button
                    className="age-up-btn"
                    onClick={onAgeUp}
                    style={{
                        flex: 2,
                        padding: '10px 15px',
                        fontSize: '1.1em',
                        fontWeight: 'bold',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                        transition: 'background-color 0.3s ease'
                    }}
                >
                    Age Up
                </button>
                <button
                    className="age-skip-btn"
                    onClick={() => onAgeSkip(5)}
                    style={{
                        flex: 1,
                        padding: '10px 15px',
                        fontSize: '1em',
                        backgroundColor: '#2196F3',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                        transition: 'background-color 0.3s ease'
                    }}
                >
                    Skip 5 Years
                </button>
                <button
                    className="age-skip-btn"
                    onClick={() => onAgeSkip(10)}
                    style={{
                        flex: 1,
                        padding: '10px 15px',
                        fontSize: '1em',
                        backgroundColor: '#FF9800',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                        transition: 'background-color 0.3s ease'
                    }}
                >
                    Skip 10 Years
                </button>
            </div>
        </div>
    );
}
