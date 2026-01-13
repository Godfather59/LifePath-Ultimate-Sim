import React, { useState } from 'react';
import './Modal.css';

export function GodModeMenu({ person, onUpdate, onClose }) {
    const [stats, setStats] = useState({
        money: person.money,
        happiness: person.happiness,
        health: person.health,
        smarts: person.smarts,
        looks: person.looks,
        karma: person.karma || 50
    });

    const handleChange = (field, value) => {
        setStats(prev => ({
            ...prev,
            [field]: Number(value)
        }));
    };

    const handleSave = () => {
        // Create a focused update object
        const updates = { ...stats };

        // We need to construct a new Person or mutate the current one properly via the parent handler
        // The parent handler 'onUpdate' expects a function that takes the current person and modifies it
        onUpdate(p => {
            p.money = updates.money;
            p.happiness = updates.happiness;
            p.health = updates.health;
            p.smarts = updates.smarts;
            p.looks = updates.looks;
            p.karma = updates.karma;
            p.logEvent("⚡ GOD MODE ACTIVATED: Reality has been altered.", "good");
        });
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content" style={{ borderColor: '#ffd700', boxShadow: '0 0 30px rgba(255, 215, 0, 0.3)' }}>
                <div className="modal-header">
                    <h2 className="modal-title" style={{ color: '#ffd700' }}>⚡ God Mode</h2>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>
                <div className="modal-body">
                    <div className="form-group">
                        <label>Money ($)</label>
                        <input
                            type="number"
                            value={stats.money}
                            onChange={(e) => handleChange('money', e.target.value)}
                            className="text-input"
                        />
                    </div>

                    <div className="form-group">
                        <label>Happiness (0-100)</label>
                        <input
                            type="range" min="0" max="100"
                            value={stats.happiness}
                            onChange={(e) => handleChange('happiness', e.target.value)}
                        />
                        <span style={{ float: 'right' }}>{stats.happiness}%</span>
                    </div>

                    <div className="form-group">
                        <label>Health (0-100)</label>
                        <input
                            type="range" min="0" max="100"
                            value={stats.health}
                            onChange={(e) => handleChange('health', e.target.value)}
                        />
                        <span style={{ float: 'right' }}>{stats.health}%</span>
                    </div>

                    <div className="form-group">
                        <label>Smarts (0-100)</label>
                        <input
                            type="range" min="0" max="100"
                            value={stats.smarts}
                            onChange={(e) => handleChange('smarts', e.target.value)}
                        />
                        <span style={{ float: 'right' }}>{stats.smarts}%</span>
                    </div>

                    <div className="form-group">
                        <label>Looks (0-100)</label>
                        <input
                            type="range" min="0" max="100"
                            value={stats.looks}
                            onChange={(e) => handleChange('looks', e.target.value)}
                        />
                        <span style={{ float: 'right' }}>{stats.looks}%</span>
                    </div>

                    <button className="btn-primary" onClick={handleSave} style={{ background: 'linear-gradient(45deg, #ffd700, #ffa500)', color: 'black', fontWeight: 'bold' }}>
                        Alter Reality
                    </button>
                </div>
            </div>
        </div>
    );
}
