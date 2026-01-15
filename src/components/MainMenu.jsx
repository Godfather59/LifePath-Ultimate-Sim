import React, { useState } from 'react';
import './Modal.css'; // Ensure we have access to variables if needed, though mostly global
import { generateRandomName } from '../logic/NameGenerator';

const COUNTRIES = [
    "United States", "United Kingdom", "Canada", "Australia",
    "Japan", "France", "Germany", "Italy", "Brazil", "China",
    "India", "Russia", "Mexico", "Spain", "South Korea"
];

export function MainMenu({ onStartGame, onContinue, onLoad, hasSave, saveSummary }) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gender, setGender] = useState("Male");
    const [country, setCountry] = useState("United States");

    const handleStart = () => {
        if (!firstName.trim() || !lastName.trim()) {
            alert("Please enter a full name.");
            return;
        }
        onStartGame({ firstName, lastName, gender, country });
    };

    const randomizeName = () => {
        const { firstName: first, lastName: last } = generateRandomName(gender);
        setFirstName(first);
        setLastName(last);
    };

    return (
        <div className="main-menu animate-fade-in" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            padding: '10px',
            paddingTop: 'max(20px, env(safe-area-inset-top))',
            backgroundColor: '#121212', // Fallback
            background: 'linear-gradient(135deg, #1e1e2e 0%, #2d2d44 100%)',
            textAlign: 'center',
            color: 'white'
        }}>
            <h1 style={{
                marginBottom: '10px',
                fontSize: '2rem',
                fontWeight: '900',
                background: 'linear-gradient(to right, #4facfe, #00f2fe)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 4px 10px rgba(0,0,0,0.3)'
            }}>LifePath</h1>

            <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                padding: '12px',
                borderRadius: '16px',
                width: '100%',
                maxWidth: '400px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                border: '1px solid rgba(255,255,255,0.1)'
            }}>
                <h2 style={{ marginTop: 0, marginBottom: '8px', color: 'white', fontSize: '1.2rem' }}>Ultimate Sim</h2>

                {hasSave && saveSummary && (
                    <div style={{ marginBottom: '12px', paddingBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                        <div style={{ marginBottom: '8px', color: '#ccc' }}>
                            <div style={{ fontWeight: 'bold', fontSize: '1.1em', color: 'white' }}>{saveSummary.name}</div>
                            <div style={{ fontSize: '0.9em' }}>Age {saveSummary.age} • {saveSummary.job}</div>
                        </div>
                        <button
                            onClick={onContinue}
                            className="btn-primary"
                            style={{
                                width: '100%',
                                fontSize: '1.1em',
                                background: 'linear-gradient(90deg, #11998e, #38ef7d)',
                                border: 'none',
                                padding: '12px',
                                borderRadius: '12px',
                                color: 'white',
                                fontWeight: 'bold',
                                cursor: 'pointer'
                            }}
                        >
                            ▶ Continue Life
                        </button>
                    </div>
                )}

                {hasSave && (
                    <button
                        onClick={onLoad}
                        className="btn-secondary"
                        style={{
                            width: '100%',
                            fontSize: '1em',
                            background: 'rgba(255,255,255,0.1)',
                            border: '1px solid rgba(255,255,255,0.2)',
                            padding: '12px',
                            borderRadius: '12px',
                            color: '#ccc',
                            marginBottom: '24px',
                            cursor: 'pointer'
                        }}
                    >
                        📂 Load Other Game
                    </button>
                )}

                <h3 style={{ marginTop: 0, marginBottom: '8px', color: '#888', textTransform: 'uppercase', fontSize: '0.7rem', letterSpacing: '1px' }}>
                    Start New Life
                </h3>

                <div style={{ marginBottom: '8px', textAlign: 'left' }}>
                    <label className="bold" style={{ display: 'block', marginBottom: '4px', color: '#ddd', fontSize: '0.85rem' }}>First Name</label>
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Enter first name"
                        style={{
                            width: '100%', padding: '12px', borderRadius: '12px',
                            border: '1px solid rgba(255,255,255,0.2)', backgroundColor: 'rgba(0,0,0,0.2)', color: 'white', outline: 'none'
                        }}
                    />
                </div>

                <div style={{ marginBottom: '8px', textAlign: 'left' }}>
                    <label className="bold" style={{ display: 'block', marginBottom: '4px', color: '#ddd', fontSize: '0.85rem' }}>Last Name</label>
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Enter last name"
                        style={{
                            width: '100%', padding: '12px', borderRadius: '12px',
                            border: '1px solid rgba(255,255,255,0.2)', backgroundColor: 'rgba(0,0,0,0.2)', color: 'white', outline: 'none'
                        }}
                    />
                </div>

                <button
                    onClick={randomizeName}
                    style={{ marginBottom: '12px', fontSize: '0.8em', color: '#4facfe', background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontWeight: 'bold' }}
                >
                    🎲 Randomize Name
                </button>

                <div style={{ marginBottom: '12px', textAlign: 'left' }}>
                    <label className="bold" style={{ display: 'block', marginBottom: '4px', color: '#ddd', fontSize: '0.85rem' }}>Gender</label>
                    <div className="flex gap-2" style={{ display: 'flex', gap: '8px' }}>
                        <button
                            onClick={() => setGender('Male')}
                            style={{
                                flex: 1,
                                padding: '10px',
                                borderRadius: '10px',
                                border: 'none',
                                cursor: 'pointer',
                                backgroundColor: gender === 'Male' ? '#2196f3' : 'rgba(255,255,255,0.1)',
                                color: gender === 'Male' ? 'white' : '#888',
                                transition: 'all 0.2s',
                                fontSize: '0.9rem'
                            }}
                        >
                            Male
                        </button>
                        <button
                            onClick={() => setGender('Female')}
                            style={{
                                flex: 1,
                                padding: '10px',
                                borderRadius: '10px',
                                border: 'none',
                                cursor: 'pointer',
                                backgroundColor: gender === 'Female' ? '#e91e63' : 'rgba(255,255,255,0.1)',
                                color: gender === 'Female' ? 'white' : '#888',
                                transition: 'all 0.2s',
                                fontSize: '0.9rem'
                            }}
                        >
                            Female
                        </button>
                    </div>
                </div>

                <div style={{ marginBottom: '16px', textAlign: 'left' }}>
                    <label className="bold" style={{ display: 'block', marginBottom: '4px', color: '#ddd', fontSize: '0.85rem' }}>Country</label>
                    <select
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        style={{
                            width: '100%', padding: '10px', borderRadius: '10px',
                            border: '1px solid rgba(255,255,255,0.2)', backgroundColor: '#333', color: 'white', outline: 'none',
                            fontSize: '0.9rem'
                        }}
                    >
                        {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>

                <button
                    onClick={handleStart}
                    style={{
                        width: '100%',
                        padding: '12px',
                        backgroundColor: '#00c6ff', /* Fallback */
                        background: 'linear-gradient(to right, #00c6ff, #0072ff)',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '1.1rem',
                        boxShadow: '0 4px 15px rgba(0, 114, 255, 0.4)',
                        border: 'none',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        transition: 'transform 0.1s'
                    }}
                    onMouseDown={e => e.currentTarget.style.transform = 'scale(0.98)'}
                    onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                    Start Life
                </button>
            </div>
        </div>
    );
}
