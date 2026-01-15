import React from 'react';
import './Modal.css';

export function FamilyTreeMenu({ familyTree, onClose }) {
    const generationCount = familyTree.getGenerationCount();
    const patriarch = familyTree.getPatriarchMatriarch();
    const mostSuccessful = familyTree.getMostSuccessful();

    const formatMoney = (amount) => {
        if (amount >= 1000000000) return `$${(amount / 1000000000).toFixed(2)}B`;
        if (amount >= 1000000) return `$${(amount / 1000000).toFixed(2)}M`;
        return `$${amount.toLocaleString()}`;
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content" style={{ maxWidth: '700px', maxHeight: '90vh', overflow: 'auto' }}>
                <div className="modal-header">
                    <h2 className="modal-title">🌳 {familyTree.familyName} Family Dynasty</h2>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>

                <div className="modal-body">
                    {generationCount === 0 ? (
                        <div style={{ textAlign: 'center', padding: '40px', color: '#888' }}>
                            <div style={{ fontSize: '3em', marginBottom: '20px' }}>🌱</div>
                            <p>No dynasty yet. Start your legacy!</p>
                        </div>
                    ) : (
                        <>
                            {/* Dynasty Summary */}
                            <div style={{
                                background: 'linear-gradient(135deg, rgba(255,215,0,0.1), rgba(184,134,11,0.1))',
                                padding: '20px',
                                borderRadius: '12px',
                                marginBottom: '20px',
                                border: '1px solid rgba(255,215,0,0.3)'
                            }}>
                                <h3 style={{ margin: '0 0 16px 0', fontSize: '1.2em' }}>Dynasty Overview</h3>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                                    <div>
                                        <div style={{ fontSize: '0.85em', color: '#888' }}>Generations</div>
                                        <div style={{ fontSize: '1.8em', fontWeight: 'bold', color: '#ffd700' }}>
                                            {generationCount}
                                        </div>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '0.85em', color: '#888' }}>Total Wealth</div>
                                        <div style={{ fontSize: '1.8em', fontWeight: 'bold', color: '#4caf50' }}>
                                            {formatMoney(familyTree.getTotalFamilyWealth())}
                                        </div>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '0.85em', color: '#888' }}>Founded</div>
                                        <div style={{ fontSize: '1.8em', fontWeight: 'bold' }}>
                                            {familyTree.foundedYear}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Patriarch/Matriarch */}
                            {patriarch && (
                                <div style={{ marginBottom: '20px' }}>
                                    <h3 style={{ fontSize: '0.9rem', color: '#888', textTransform: 'uppercase', marginBottom: '12px' }}>
                                        👤 Founder
                                    </h3>
                                    <div className="list-item" style={{
                                        background: 'rgba(255,215,0,0.05)',
                                        border: '2px solid rgba(255,215,0,0.3)'
                                    }}>
                                        <div>
                                            <div className="list-item-title">{patriarch.name}</div>
                                            <div className="list-item-subtitle">
                                                {patriarch.birthYear} - {patriarch.deathYear} (Age {patriarch.age})
                                            </div>
                                            <div style={{ marginTop: '8px', display: 'flex', gap: '12px', fontSize: '0.9em' }}>
                                                <span>💼 {patriarch.occupation}</span>
                                                <span>💰 {formatMoney(patriarch.peakWealth)}</span>
                                                <span>👨‍👩‍👧 {patriarch.children} children</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Most Successful */}
                            {mostSuccessful && mostSuccessful.id !== patriarch?.id && (
                                <div style={{ marginBottom: '20px' }}>
                                    <h3 style={{ fontSize: '0.9rem', color: '#888', textTransform: 'uppercase', marginBottom: '12px' }}>
                                        🏆 Most Successful Heir
                                    </h3>
                                    <div className="list-item" style={{
                                        background: 'rgba(76,175,80,0.05)',
                                        border: '2px solid rgba(76,175,80,0.3)'
                                    }}>
                                        <div>
                                            <div className="list-item-title">{mostSuccessful.name}</div>
                                            <div className="list-item-subtitle">
                                                {mostSuccessful.birthYear} - {mostSuccessful.deathYear}
                                            </div>
                                            <div style={{ marginTop: '8px', display: 'flex', gap: '12px', fontSize: '0.9em' }}>
                                                <span>💰 {formatMoney(mostSuccessful.peakWealth)}</span>
                                                {mostSuccessful.royalty && <span>👑 {mostSuccessful.royalty}</span>}
                                                {mostSuccessful.companies > 0 && <span>🏢 {mostSuccessful.companies} companies</span>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Generation List */}
                            <h3 style={{ fontSize: '0.9rem', color: '#888', textTransform: 'uppercase', marginBottom: '12px' }}>
                                📜 All Generations ({generationCount})
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                {familyTree.generations.map((gen, index) => (
                                    <div key={gen.id} className="list-item" style={{ padding: '12px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ fontSize: '0.85em', color: '#888', marginBottom: '4px' }}>
                                                    Generation {index + 1}
                                                </div>
                                                <div style={{ fontWeight: 'bold' }}>{gen.name}</div>
                                                <div style={{ fontSize: '0.9em', color: '#bbb', marginTop: '4px' }}>
                                                    {gen.occupation} • Age {gen.age}
                                                </div>
                                            </div>
                                            <div style={{ textAlign: 'right' }}>
                                                <div style={{ color: '#4caf50', fontWeight: 'bold' }}>
                                                    {formatMoney(gen.peakWealth)}
                                                </div>
                                                <div style={{ fontSize: '0.85em', color: '#888', marginTop: '4px' }}>
                                                    {gen.fame > 0 && `⭐ ${gen.fame} fame`}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
