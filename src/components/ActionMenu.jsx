import React from 'react';
import './ActionMenu.css';

export function ActionMenu({ onAgeUp, onAction }) {
    const actions = [
        { id: 'occupation', label: 'Occupation', icon: '💼' },
        { id: 'education', label: 'Education', icon: '🎓' },
        { id: 'assets', label: 'Assets', icon: '🏠' },
        { id: 'relationships', label: 'Relationships', icon: '💕' },
        { id: 'activities', label: 'Activities', icon: '🧘‍♀️' },
        { id: 'achievements', label: 'Trophies', icon: '🏆' },
    ];

    return (
        <div className="action-menu-container">
            {/* Primary Action */}
            <button className="age-up-btn" onClick={onAgeUp}>
                <span style={{ marginRight: '12px' }}>📅</span> Age Up
            </button>

            {/* Grid of Menus */}
            <h3 className="section-label">Menu</h3>
            <div className="actions-grid">
                {actions.map(action => (
                    <button
                        key={action.id}
                        className="action-card"
                        onClick={() => onAction(action.id)}
                    >
                        <span className="action-icon">{action.icon}</span>
                        <span className="action-label">{action.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}

