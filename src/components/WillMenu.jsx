import React, { useState } from 'react';
import './Modal.css';

export function WillMenu({ person, onCreateWill, onClose }) {
    const [selectedBeneficiary, setSelectedBeneficiary] = useState(person.will?.primaryBeneficiary || null);

    // Get eligible beneficiaries (children, spouse, siblings)
    const eligibleBeneficiaries = person.relationships.filter(r =>
        ['Child', 'Spouse', 'Sibling', 'Parent'].includes(r.type)
    );

    const totalEstate = person.getTotalEstateValue();
    const estateTax = person.calculateEstateTax(totalEstate);
    const netEstate = totalEstate - estateTax;

    const getTaxBracket = () => {
        if (totalEstate < 1000000) return '0%';
        if (totalEstate < 5000000) return '15%';
        if (totalEstate < 10000000) return '25%';
        return '40%';
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2 className="modal-title">📜 Last Will & Testament</h2>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>

                <div className="modal-body">
                    {/* Estate Summary */}
                    <div style={{
                        background: 'rgba(255,215,0,0.1)',
                        padding: '16px',
                        borderRadius: '12px',
                        marginBottom: '20px',
                        border: '1px solid rgba(255,215,0,0.3)'
                    }}>
                        <h3 style={{ margin: 0, marginBottom: '12px', fontSize: '1.1em' }}>Estate Summary</h3>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <span>Total Assets:</span>
                            <span style={{ fontWeight: 'bold' }}>${totalEstate.toLocaleString()}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', color: '#ff5252' }}>
                            <span>Estate Tax ({getTaxBracket()}):</span>
                            <span style={{ fontWeight: 'bold' }}>-${estateTax.toLocaleString()}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.2)' }}>
                            <span style={{ fontWeight: 'bold' }}>Net Inheritance:</span>
                            <span style={{ fontWeight: 'bold', color: '#66bb6a' }}>${netEstate.toLocaleString()}</span>
                        </div>
                    </div>

                    {/* Current Will */}
                    {person.will && (
                        <div style={{
                            background: 'rgba(255,255,255,0.05)',
                            padding: '12px',
                            borderRadius: '8px',
                            marginBottom: '20px'
                        }}>
                            <div style={{ fontSize: '0.9em', color: '#aaa', marginBottom: '4px' }}>Current Primary Beneficiary:</div>
                            <div style={{ fontWeight: 'bold', fontSize: '1.1em' }}>
                                {person.relationships.find(r => r.id === person.will.primaryBeneficiary)?.name || 'Unknown'}
                            </div>
                            <div style={{ fontSize: '0.8em', color: '#888', marginTop: '4px' }}>
                                Created at age {person.will.createdAt}
                            </div>
                        </div>
                    )}

                    {/* Beneficiary Selection */}
                    <h3 style={{ fontSize: '0.9rem', color: '#888', textTransform: 'uppercase', marginBottom: '12px' }}>
                        Choose Primary Beneficiary
                    </h3>

                    {eligibleBeneficiaries.length === 0 ? (
                        <div style={{
                            padding: '20px',
                            textAlign: 'center',
                            color: '#999',
                            background: 'rgba(255,255,255,0.05)',
                            borderRadius: '8px'
                        }}>
                            You have no eligible beneficiaries. Get married or have children first!
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                            {eligibleBeneficiaries.map(rel => (
                                <div
                                    key={rel.id}
                                    className="list-item"
                                    onClick={() => setSelectedBeneficiary(rel.id)}
                                    style={{
                                        cursor: 'pointer',
                                        background: selectedBeneficiary === rel.id
                                            ? 'rgba(102,187,106,0.2)'
                                            : 'rgba(255,255,255,0.05)',
                                        border: selectedBeneficiary === rel.id
                                            ? '2px solid #66bb6a'
                                            : '1px solid rgba(255,255,255,0.1)',
                                    }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>
                                            <div className="list-item-title">{rel.name}</div>
                                            <div className="list-item-subtitle">{rel.type}</div>
                                        </div>
                                        {selectedBeneficiary === rel.id && (
                                            <span style={{ color: '#66bb6a', fontSize: '1.2em' }}>✓</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Create Will Button */}
                    <button
                        className="btn-primary"
                        disabled={!selectedBeneficiary}
                        onClick={() => {
                            if (selectedBeneficiary) {
                                onCreateWill(selectedBeneficiary, {});
                                onClose();
                            }
                        }}
                        style={{ width: '100%', marginTop: '10px' }}
                    >
                        {person.will ? 'Update Will' : 'Create Will'}
                    </button>
                </div>
            </div>
        </div>
    );
}
