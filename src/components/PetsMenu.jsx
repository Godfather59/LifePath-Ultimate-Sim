import React, { useState } from 'react';
import { Pet } from '../logic/Pet';
import './Modal.css';

export function PetsMenu({ person, onInteract, onAdopt, onClose }) {
    const [view, setView] = useState('list'); // 'list' | 'shelter'
    const [shelterPets, setShelterPets] = useState([]);

    const openShelter = () => {
        // Generate random pets on open
        const pets = [];
        for (let i = 0; i < 5; i++) {
            pets.push(Pet.generateRandomPet());
        }
        setShelterPets(pets);
        setView('shelter');
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content" style={{ maxWidth: '600px' }}>
                <div className="modal-header">
                    <h2 className="modal-title">Pets</h2>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>

                <div className="modal-body">
                    {view === 'list' && (
                        <>
                            {person.pets.length === 0 ? (
                                <div className="text-center" style={{ padding: '20px', color: '#888' }}>
                                    You don't have any pets.
                                </div>
                            ) : (
                                <div className="list-container">
                                    {person.pets.map((pet, index) => (
                                        <div key={index} className="list-item" style={{ marginBottom: '16px' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <div>
                                                    <div style={{ fontWeight: 'bold', fontSize: '1.1em' }}>{pet.name} ({pet.type})</div>
                                                    <div style={{ fontSize: '0.9em', color: '#ccc' }}>Age: {pet.age}</div>
                                                </div>
                                                <div style={{ textAlign: 'right', fontSize: '0.8em', color: '#aaa' }}>
                                                    <div>Happiness: {pet.happiness}%</div>
                                                    <div>Health: {pet.health}%</div>
                                                    <div>Rel: {pet.relationship}%</div>
                                                </div>
                                            </div>
                                            <div style={{ marginTop: '10px', display: 'flex', gap: '8px' }}>
                                                <button className="btn-primary" style={{ padding: '6px 12px', fontSize: '0.9em' }} onClick={() => onInteract(index, 'walk')}>
                                                    Walk
                                                </button>
                                                <button className="btn-primary" style={{ padding: '6px 12px', fontSize: '0.9em' }} onClick={() => onInteract(index, 'treat')}>
                                                    Treat ($10)
                                                </button>
                                                <button className="btn-secondary" style={{ padding: '6px 12px', fontSize: '0.9em', background: '#d32f2f' }} onClick={() => onInteract(index, 'sell')}>
                                                    Release
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                                <button className="btn-primary" onClick={openShelter}>
                                    Visit Animal Shelter
                                </button>
                            </div>
                        </>
                    )}

                    {view === 'shelter' && (
                        <div>
                            <button onClick={() => setView('list')} style={{ marginBottom: '16px', background: 'transparent', border: 'none', color: '#03a9f4', cursor: 'pointer' }}>
                                &larr; Back to My Pets
                            </button>
                            <h3 className="text-center" style={{ marginBottom: '16px' }}>Animal Shelter</h3>
                            <div className="list-container">
                                {shelterPets.map((pet, idx) => (
                                    <div key={pet.id} className="list-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>
                                            <div style={{ fontWeight: 'bold' }}>{pet.name}</div>
                                            <div style={{ fontSize: '0.9em' }}>{pet.type}, Age {pet.age}</div>
                                            <div style={{ fontSize: '0.8em', color: '#aaa' }}>
                                                Health: {pet.health}% | Happy: {pet.happiness}% | Crazy: {pet.craziness}%
                                            </div>
                                        </div>
                                        <button
                                            className="btn-primary"
                                            onClick={() => {
                                                onAdopt(pet);
                                                setView('list');
                                            }}
                                        >
                                            Adopt
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
