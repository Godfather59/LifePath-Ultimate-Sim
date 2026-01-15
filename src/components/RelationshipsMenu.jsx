import React, { useState } from 'react';

export function RelationshipsMenu({ person, onInteract, onClose }) {
    // Store ID instead of object to ensuring we always render fresh data from props
    const [selectedRelId, setSelectedRelId] = useState(null);

    // Derive selected relationship from current person prop
    const selectedRel = selectedRelId
        ? person.relationships.find(r => r.id === selectedRelId)
        : null;

    // If selected relationship is gone (e.g. died/removed), reset selection
    if (selectedRelId && !selectedRel) {
        setSelectedRelId(null);
    }

    const itemDisabled = (minAge) => person.age < minAge;

    // Action Modal State
    const [actionModal, setActionModal] = useState(null); // { type: 'propose'|'wedding'|'cheat', relId: string }
    const [ringCost, setRingCost] = useState(2000);
    const [weddingBudget, setWeddingBudget] = useState(5000);
    const [prenup, setPrenup] = useState(false);

    const handleActionClick = (type, relId) => {
        setActionModal({ type, relId });
        setRingCost(2000); // Reset defaults
        setWeddingBudget(5000);
        setPrenup(false);
    };

    const confirmAction = () => {
        if (!actionModal) return;
        const { type, relId } = actionModal;

        let payload = {};
        if (type === 'propose') {
            payload = { ringCost };
        } else if (type === 'wedding') {
            payload = { budget: weddingBudget, prenup };
        }

        onInteract(relId, type === 'wedding' ? 'marry' : type, payload);
        setActionModal(null);
    };

    const StatBar = ({ value, color }) => (
        <div style={{ height: '6px', backgroundColor: '#333', borderRadius: '3px', marginTop: '4px', overflow: 'hidden' }}>
            <div style={{ width: `${value}%`, height: '100%', backgroundColor: color, transition: 'width 0.3s ease' }} />
        </div>
    );

    const renderActionModal = () => {
        if (!actionModal) return null;
        const { type } = actionModal;
        const rel = person.relationships.find(r => r.id === actionModal.relId);

        return (
            <div className="modal-overlay" style={{ zIndex: 200 }}>
                <div className="modal-content" style={{ maxWidth: '300px' }}>
                    <h3>{type === 'propose' ? 'Will you marry me?' : type === 'wedding' ? 'Plan Wedding' : 'Cheat'}</h3>

                    {type === 'propose' && (
                        <>
                            <p>Select Ring Cost:</p>
                            <select style={{ width: '100%', padding: '8px', marginBottom: '10px' }} value={ringCost} onChange={(e) => setRingCost(parseInt(e.target.value))}>
                                <option value={100}>Plastic Ring ($100)</option>
                                <option value={1000}>Silver Ring ($1,000)</option>
                                <option value={2000}>Gold Ring ($2,000)</option>
                                <option value={5000}>Diamond Ring ($5,000)</option>
                                <option value={10000}>Huge Rock ($10,000)</option>
                                <option value={50000}>Vintage Tiffany ($50,000)</option>
                            </select>
                        </>
                    )}

                    {type === 'wedding' && (
                        <>
                            <p>Wedding Budget:</p>
                            <select style={{ width: '100%', padding: '8px', marginBottom: '10px' }} value={weddingBudget} onChange={(e) => setWeddingBudget(parseInt(e.target.value))}>
                                <option value={100}>Courthouse ($100)</option>
                                <option value={1000}>Backyard ($1,000)</option>
                                <option value={5000}>Golf Course ($5,000)</option>
                                <option value={20000}>Fancy Hotel ($20,000)</option>
                                <option value={100000}>Castle ($100,000)</option>
                            </select>
                            <div style={{ marginBottom: '10px' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <input type="checkbox" checked={prenup} onChange={(e) => setPrenup(e.target.checked)} />
                                    Sign Prenup?
                                </label>
                                <div style={{ fontSize: '0.8em', color: '#aaa' }}>Protects assets, but may offend spouse.</div>
                            </div>
                        </>
                    )}

                    <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                        <button className="btn-primary" onClick={confirmAction}>Confirm</button>
                        <button className="btn-secondary" onClick={() => setActionModal(null)}>Cancel</button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="relationships-menu animate-fade-in" style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.85)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            zIndex: 100,
            color: '#fff'
        }}>
            {renderActionModal()}
            <div className="animate-slide-up" style={{
                backgroundColor: '#1f1f1f',
                borderRadius: '12px',
                width: '100%',
                maxHeight: '80%',
                overflowY: 'auto',
                padding: '20px',
                border: '1px solid #333',
                boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
            }}>
                <div className="flex justify-between items-center" style={{ marginBottom: '16px', borderBottom: '1px solid #333', paddingBottom: '10px' }}>
                    <h2 style={{ margin: 0, color: '#fff' }}>Relationships</h2>
                    <button onClick={onClose} style={{
                        padding: '8px 12px',
                        background: '#333',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}>X</button>
                </div>

                {selectedRel ? (
                    <div className="rel-detail">
                        <button
                            onClick={() => setSelectedRelId(null)}
                            style={{
                                marginBottom: '16px',
                                padding: '8px 16px',
                                background: 'transparent',
                                border: '1px solid #555',
                                color: '#ccc',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}
                        >
                            &larr; Back
                        </button>

                        <h3 className="text-center" style={{ color: '#fff' }}>{selectedRel.name} <span style={{ color: '#888', fontSize: '0.8em' }}>({selectedRel.type})</span></h3>
                        <div style={{ margin: '16px 0', textAlign: 'center', background: '#252525', padding: '15px', borderRadius: '8px' }}>
                            <div style={{ marginBottom: '5px' }}>Relationship: <span style={{ fontWeight: 'bold' }}>{selectedRel.stat}%</span></div>
                            <StatBar value={selectedRel.stat} color={selectedRel.stat > 50 ? '#4caf50' : '#ef5350'} />
                        </div>

                        <div style={{ display: 'grid', gap: '10px' }}>
                            <button
                                onClick={() => onInteract(selectedRel.id, 'spend_time')}
                                style={{ padding: '12px', backgroundColor: '#1565c0', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                            >
                                Spend Time
                            </button>
                            <button
                                onClick={() => onInteract(selectedRel.id, 'compliment')}
                                style={{ padding: '12px', backgroundColor: '#2e7d32', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                            >
                                Compliment
                            </button>
                            <button
                                onClick={() => onInteract(selectedRel.id, 'insult')}
                                style={{ padding: '12px', backgroundColor: '#c62828', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                            >
                                Insult
                            </button>

                            {(selectedRel.type === 'Partner' || selectedRel.type === 'Spouse') && (
                                <>
                                    <button
                                        onClick={() => {
                                            if (person.age < 16) {
                                                alert("You are too young for this!");
                                                return;
                                            }
                                            onInteract(selectedRel.id, 'make_love')
                                        }}
                                        style={{
                                            padding: '12px',
                                            backgroundColor: itemDisabled(16) ? '#333' : '#ad1457',
                                            color: itemDisabled(16) ? '#666' : 'white',
                                            cursor: itemDisabled(16) ? 'not-allowed' : 'pointer',
                                            border: 'none', borderRadius: '4px'
                                        }}
                                        disabled={itemDisabled(16)}
                                    >
                                        Make Love {itemDisabled(16) && "(16+)"}
                                    </button>
                                    {selectedRel.type !== 'Spouse' && (
                                        <button
                                            onClick={() => {
                                                if (person.age < 18) {
                                                    alert("You are too young to marry!");
                                                    return;
                                                }
                                                handleActionClick('propose', selectedRel.id);
                                            }}
                                            style={{
                                                padding: '12px',
                                                backgroundColor: itemDisabled(18) ? '#333' : '#f57f17',
                                                color: itemDisabled(18) ? '#666' : 'white',
                                                cursor: itemDisabled(18) ? 'not-allowed' : 'pointer',
                                                border: 'none', borderRadius: '4px'
                                            }}
                                            disabled={itemDisabled(18)}
                                        >
                                            Propose {itemDisabled(18) && "(18+)"}
                                        </button>
                                    )}
                                    {selectedRel.type === 'Fiancé' && (
                                        <button
                                            onClick={() => handleActionClick('wedding', selectedRel.id)}
                                            style={{
                                                padding: '12px',
                                                backgroundColor: '#ef6c00',
                                                color: 'white',
                                                cursor: 'pointer',
                                                border: 'none', borderRadius: '4px'
                                            }}
                                        >
                                            💍 Plan Wedding
                                        </button>
                                    )}
                                    {(selectedRel.type === 'Partner' || selectedRel.type === 'Spouse' || selectedRel.type === 'Fiancé') && (
                                        <button
                                            onClick={() => onInteract(selectedRel.id, 'cheat')}
                                            style={{
                                                padding: '12px',
                                                backgroundColor: '#4a148c',
                                                color: 'white',
                                                border: 'none', borderRadius: '4px',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            😈 Cheat
                                        </button>
                                    )}

                                    <button
                                        onClick={() => {
                                            if (selectedRel.type === 'Spouse') {
                                                if (confirm("Are you sure you want to divorce? You will lose half your money.")) {
                                                    onInteract(selectedRel.id, 'divorce');
                                                    setSelectedRelId(null);
                                                }
                                            } else {
                                                onInteract(selectedRel.id, 'break_up');
                                                setSelectedRelId(null);
                                            }
                                        }}
                                        style={{
                                            padding: '12px',
                                            backgroundColor: '#333',
                                            border: '1px solid #c62828',
                                            color: '#ef5350',
                                            marginTop: '10px',
                                            borderRadius: '4px',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        {selectedRel.type === 'Spouse' ? '💔 Divorce' : '💔 Break Up'}
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {person.relationships.length === 0 ? <p className="text-center" style={{ color: '#888' }}>You have no relationships.</p> :
                            person.relationships.map(rel => (
                                <button
                                    key={rel.id}
                                    onClick={() => setSelectedRelId(rel.id)}
                                    style={{
                                        textAlign: 'left',
                                        padding: '15px',
                                        border: '1px solid #333',
                                        borderRadius: '8px',
                                        backgroundColor: '#252525',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '5px',
                                        cursor: 'pointer',
                                        transition: 'background 0.2s'
                                    }}
                                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#303030'}
                                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#252525'}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div className="bold" style={{ color: '#fff', fontSize: '1.1em' }}>{rel.name}</div>
                                        <div style={{ fontSize: '0.9em', color: '#aaa' }}>{rel.type}</div>
                                    </div>
                                    <StatBar value={rel.stat} color={rel.stat > 50 ? '#4caf50' : '#ef5350'} />
                                </button>
                            ))}
                    </div>
                )}
            </div>
        </div>
    );
}
