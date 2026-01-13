import React, { useState } from 'react';
import './Modal.css'; // Ensure we have access to variables if needed, though mostly global

const COUNTRIES = [
    "United States", "United Kingdom", "Canada", "Australia",
    "Japan", "France", "Germany", "Italy", "Brazil", "China",
    "India", "Russia", "Mexico", "Spain", "South Korea"
];

export function MainMenu({ onStartGame, onContinue, hasSave, saveSummary }) {
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
        const maleNames = ["James", "John", "Robert", "Michael", "William", "David", "Liam", "Noah"];
        const femaleNames = ["Mary", "Patricia", "Jennifer", "Linda", "Elizabeth", "Barbara", "Emma", "Olivia"];
        const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis"];

        const first = gender === 'Male'
            ? maleNames[Math.floor(Math.random() * maleNames.length)]
            : femaleNames[Math.floor(Math.random() * femaleNames.length)];
        const last = lastNames[Math.floor(Math.random() * lastNames.length)];

        setFirstName(first);
        setLastName(last);
    };

    return (
        <div className="main-menu animate-fade-in" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            padding: '20px',
            backgroundColor: 'var(--bg-color)',
            textAlign: 'center'
        }}>
            <h1 style={{ marginBottom: '30px', color: 'var(--accent-color)', fontSize: '2.5rem' }}>LifePath</h1>

            <div style={{
                backgroundColor: 'white',
                padding: '24px',
                borderRadius: '16px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            }}>
                <h2 style={{ marginTop: 0 }}>Ultimate Sim</h2>

                {hasSave && saveSummary && (
                    <div style={{ marginBottom: '24px', paddingBottom: '20px', borderBottom: '1px solid #eee' }}>
                        <div style={{ marginBottom: '12px', color: '#555' }}>
                            <div style={{ fontWeight: 'bold', fontSize: '1.2em' }}>{saveSummary.name}</div>
                            <div>Age {saveSummary.age} • {saveSummary.job}</div>
                        </div>
                        <button
                            onClick={onContinue}
                            className="btn-primary"
                            style={{ width: '100%', fontSize: '1.1em' }}
                        >
                            ▶ Continue Life
                        </button>
                    </div>
                )}

                <h3 style={{ marginTop: 0, marginBottom: '16px', color: '#888', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px' }}>
                    Start New Life
                </h3>

                <div style={{ marginBottom: '16px', textAlign: 'left' }}>
                    <label className="bold" style={{ display: 'block', marginBottom: '8px' }}>First Name</label>
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Enter first name"
                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd', boxSizing: 'border-box' }}
                    />
                </div>

                <div style={{ marginBottom: '16px', textAlign: 'left' }}>
                    <label className="bold" style={{ display: 'block', marginBottom: '8px' }}>Last Name</label>
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Enter last name"
                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd', boxSizing: 'border-box' }}
                    />
                </div>

                <button
                    onClick={randomizeName}
                    style={{ marginBottom: '20px', fontSize: '0.9em', color: 'var(--highlight-color)', background: 'none', padding: 0 }}
                >
                    🎲 Randomize Name
                </button>

                <div style={{ marginBottom: '16px', textAlign: 'left' }}>
                    <label className="bold" style={{ display: 'block', marginBottom: '8px' }}>Gender</label>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setGender('Male')}
                            style={{
                                flex: 1,
                                padding: '10px',
                                backgroundColor: gender === 'Male' ? '#2196f3' : '#f0f0f0',
                                color: gender === 'Male' ? 'white' : '#333'
                            }}
                        >
                            Male
                        </button>
                        <button
                            onClick={() => setGender('Female')}
                            style={{
                                flex: 1,
                                padding: '10px',
                                backgroundColor: gender === 'Female' ? '#e91e63' : '#f0f0f0',
                                color: gender === 'Female' ? 'white' : '#333'
                            }}
                        >
                            Female
                        </button>
                    </div>
                </div>

                <div style={{ marginBottom: '24px', textAlign: 'left' }}>
                    <label className="bold" style={{ display: 'block', marginBottom: '8px' }}>Country</label>
                    <select
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
                    >
                        {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>

                <button
                    onClick={handleStart}
                    style={{
                        width: '100%',
                        padding: '16px',
                        backgroundColor: 'var(--success-color)',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '1.2rem',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                    }}
                >
                    Start Life
                </button>
            </div>
        </div>
    );
}
