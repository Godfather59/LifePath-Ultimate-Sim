import React, { useState } from 'react';

export function RelationshipsMenu({ person, onInteract, onClose }) {
    const [selectedRel, setSelectedRel] = useState(null);

    const itemDisabled = (minAge) => person.age < minAge;

    const StatBar = ({ value, color }) => (
        <div style={{ height: '6px', backgroundColor: '#e0e0e0', borderRadius: '3px', marginTop: '4px', overflow: 'hidden' }}>
            <div style={{ width: `${value}%`, height: '100%', backgroundColor: color }} />
        </div>
    );

    return (
        <div className="relationships-menu animate-fade-in" style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            zIndex: 100
        }}>
            <div className="animate-slide-up" style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                width: '100%',
                maxHeight: '80%',
                overflowY: 'auto',
                padding: '20px'
            }}>
                <div className="flex justify-between items-center" style={{ marginBottom: '16px' }}>
                    <h2 style={{ margin: 0 }}>Relationships</h2>
                    <button onClick={onClose} style={{ padding: '8px', background: '#eee' }}>X</button>
                </div>

                {selectedRel ? (
                    <div className="rel-detail">
                        <button
                            onClick={() => setSelectedRel(null)}
                            style={{ marginBottom: '16px', padding: '8px 16px' }}
                        >
                            &larr; Back
                        </button>

                        <h3 className="text-center">{selectedRel.name} ({selectedRel.type})</h3>
                        <div style={{ margin: '16px 0', textAlign: 'center' }}>
                            Relationship: {selectedRel.stat}%
                            <StatBar value={selectedRel.stat} color={selectedRel.stat > 50 ? '#4caf50' : '#f44336'} />
                        </div>

                        <div style={{ display: 'grid', gap: '10px' }}>
                            <button
                                onClick={() => onInteract(selectedRel.id, 'spend_time')}
                                style={{ padding: '12px', backgroundColor: '#e3f2fd' }}
                            >
                                Spend Time
                            </button>
                            <button
                                onClick={() => onInteract(selectedRel.id, 'compliment')}
                                style={{ padding: '12px', backgroundColor: '#e8f5e9' }}
                            >
                                Compliment
                            </button>
                            <button
                                onClick={() => onInteract(selectedRel.id, 'insult')}
                                style={{ padding: '12px', backgroundColor: '#ffebee', color: '#c62828' }}
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
                                            backgroundColor: itemDisabled(16) ? '#f5f5f5' : '#fce4ec',
                                            color: itemDisabled(16) ? '#888' : '#880e4f',
                                            cursor: itemDisabled(16) ? 'not-allowed' : 'pointer'
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
                                                onInteract(selectedRel.id, 'propose')
                                            }}
                                            style={{
                                                padding: '12px',
                                                backgroundColor: itemDisabled(18) ? '#f5f5f5' : '#fff8e1',
                                                color: itemDisabled(18) ? '#888' : '#ff6f00',
                                                cursor: itemDisabled(18) ? 'not-allowed' : 'pointer'
                                            }}
                                            disabled={itemDisabled(18)}
                                        >
                                            Propose {itemDisabled(18) && "(18+)"}
                                        </button>
                                    )}
                                    {selectedRel.type === 'Fiancé' && (
                                        <button
                                            onClick={() => onInteract(selectedRel.id, 'marry')}
                                            style={{
                                                padding: '12px',
                                                backgroundColor: '#fff3e0',
                                                color: '#e65100',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            💍 Plan Wedding ($5,000)
                                        </button>
                                    )}

                                    <button
                                        onClick={() => {
                                            if (selectedRel.type === 'Spouse') {
                                                if (confirm("Are you sure you want to divorce? You will lose half your money.")) {
                                                    onInteract(selectedRel.id, 'divorce');
                                                    setSelectedRel(null);
                                                }
                                            } else {
                                                onInteract(selectedRel.id, 'break_up');
                                                setSelectedRel(null);
                                            }
                                        }}
                                        style={{
                                            padding: '12px',
                                            backgroundColor: '#ffebee',
                                            color: '#c62828',
                                            marginTop: '10px'
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
                        {person.relationships.length === 0 ? <p className="text-center">You have no relationships.</p> :
                            person.relationships.map(rel => (
                                <button
                                    key={rel.id}
                                    onClick={() => setSelectedRel(rel)}
                                    style={{
                                        textAlign: 'left',
                                        padding: '12px',
                                        border: '1px solid #ddd',
                                        borderRadius: '8px',
                                        backgroundColor: 'white'
                                    }}
                                >
                                    <div className="bold">{rel.name}</div>
                                    <div style={{ fontSize: '0.9em', color: '#666' }}>{rel.type}</div>
                                    <StatBar value={rel.stat} color={rel.stat > 50 ? '#4caf50' : '#f44336'} />
                                </button>
                            ))}
                    </div>
                )}
            </div>
        </div>
    );
}
