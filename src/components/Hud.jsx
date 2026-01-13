import React from 'react';
import './Hud.css';

export function Hud({ person, onOpenMenu }) {
    if (!person) return null;

    // Helper for currency formatting
    const formatMoney = (amt) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amt);
    };

    // Dynamic Avatar Emoji (Basic version)
    // Dynamic Avatar Emoji (Basic version)
    const getAvatar = () => {
        const isMale = person.gender.toLowerCase() === 'male';
        if (person.age < 3) return "👶";
        if (person.age < 13) return isMale ? "👦" : "👧";
        if (person.age < 65) return isMale ? "👨" : "👩";
        return isMale ? "👴" : "👵";
    };

    return (
        <div className="hud-container">
            {/* Header Section: Avatar + Name/Details */}
            <div className="hud-header">
                <div className="avatar-circle">
                    {getAvatar()}
                    {/* Status Dot: Green if alive/healthy, could change later */}
                    <div className="status-dot"></div>
                    {person.social?.isInfluencer && (
                        <div style={{
                            position: 'absolute', bottom: '-5px', right: '-5px',
                            fontSize: '1.2rem', background: '#333', borderRadius: '50%',
                            width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            border: '2px solid #fff'
                        }}>
                            ✨
                        </div>
                    )}
                </div>

                <div className="person-info">
                    <h2 className="person-name">{person.getFullName()}</h2>
                    <div className="person-details">
                        {person.gender} • {person.age} years old
                        <div style={{ color: '#ffd700', marginTop: '4px', fontWeight: '600' }}>
                            {formatMoney(person.money)}
                        </div>
                        <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>
                            {person.job ? person.job.title : (person.currentSchool ? "Student" : "Unemployed")}
                        </div>
                    </div>
                </div>

                {/* Settings / Pause Button */}
                <button
                    className="settings-btn"
                    onClick={onOpenMenu}
                    aria-label="Open Menu"
                >
                    ⚙️
                </button>
            </div>

            {/* Stats Grid */}
            <div className="stat-grid">
                <StatBar label="Happiness" value={person.happiness} type="happiness" />
                <StatBar label="Health" value={person.health} type="health" />
                <StatBar label="Smarts" value={person.smarts} type="smarts" />
                <StatBar label="Looks" value={person.looks} type="looks" />
            </div>
        </div>
    );
}

function StatBar({ label, value, type }) {
    return (
        <div className="stat-row">
            <div className="stat-header">
                <span>{label}</span>
                <span>{value}%</span>
            </div>
            <div className="progress-track">
                <div
                    className={`progress-fill fill-${type}`}
                    style={{ width: `${value}%` }}
                />
            </div>
        </div>
    );
}
