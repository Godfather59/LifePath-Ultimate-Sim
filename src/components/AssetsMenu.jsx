import React, { useState } from 'react';
import { LUXURY_ASSETS } from '../logic/CuratedAssets';
import './Modal.css';

export function AssetsMenu({ person, onBuy, onSell, onClose }) {
    const [activeTab, setActiveTab] = useState('owned'); // 'owned' | 'real_estate' | 'cars' | 'luxury'

    // Use persistent market from person object, or fallback to empty arrays
    const realEstateList = person.market?.realEstate || [];
    const carList = person.market?.cars || [];

    // Buy Modal State
    const [selectedAsset, setSelectedAsset] = useState(null); // Asset being considered for purchase

    const handleBuyClick = (asset) => {
        setSelectedAsset(asset);
    };

    const confirmBuy = (method) => {
        if (!selectedAsset) return;

        if (method === 'cash') {
            onBuy(selectedAsset, null);
        } else if (method === 'mortgage') {
            const downPayment = Math.floor(selectedAsset.price * 0.2);
            const loanAmount = selectedAsset.price - downPayment;
            const years = 30;
            const rate = 0.05; // 5% fixed
            // Monthly Payment Formula: M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1 ]
            const monthlyRate = rate / 12;
            const n = years * 12;
            const monthlyPayment = Math.floor(loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1));

            onBuy(selectedAsset, {
                isMortgaged: true,
                downPayment: downPayment,
                amount: loanAmount,
                monthlyPayment: monthlyPayment,
                term: years
            });
        }
        setSelectedAsset(null);
    };

    const renderOwned = () => {
        if (person.assets.length === 0) {
            return (
                <div style={{ textAlign: 'center', padding: '40px', color: 'rgba(255,255,255,0.5)' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🏚️</div>
                    <p>You don't own any assets yet.</p>
                </div>
            );
        }

        return person.assets.map((asset, index) => (
            <div key={index} className="list-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <div className="list-item-title">{asset.name}</div>
                    <div className="list-item-subtitle" style={{ color: 'var(--text-secondary)' }}>
                        Valued at ${asset.value.toLocaleString()}
                        {asset.isMortgaged && <span style={{ color: '#ff9800', marginLeft: '6px' }}> (Mortgaged)</span>}
                    </div>
                </div>
                <button
                    className="btn-danger"
                    style={{ padding: '6px 12px', fontSize: '0.9em' }}
                    onClick={() => onSell(index)}
                >
                    Sell
                </button>
            </div>
        ));
    };

    const renderMarketList = (list) => {
        return list.map((asset) => (
            <div key={asset.uniqueId} className="list-item">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span className="list-item-title">{asset.name}</span>
                    <span style={{ color: 'var(--accent-green)', fontWeight: 'bold' }}>
                        ${asset.price.toLocaleString()}
                    </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9em', color: 'rgba(255,255,255,0.6)' }}>
                    <span>Condition: {asset.condition}%</span>
                    <span>{asset.type}</span>
                </div>
                <button
                    className="btn-primary"
                    style={{ width: '100%', marginTop: '10px' }}
                    onClick={() => handleBuyClick(asset)}
                >
                    Buy
                </button>
            </div>
        ));
    };

    const renderLuxury = () => {
        return LUXURY_ASSETS.map((asset) => (
            <div key={asset.id} className="list-item">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span className="list-item-title">{asset.name}</span>
                    <span style={{ color: 'var(--accent-green)', fontWeight: 'bold' }}>
                        ${asset.price.toLocaleString()}
                    </span>
                </div>
                <button
                    className="btn-primary"
                    style={{ width: '100%', marginTop: '10px' }}
                    onClick={() => handleBuyClick(asset)}
                >
                    Buy
                </button>
            </div>
        ));
    };

    // Mortgage Confirmation Modal Overlay
    const renderBuyModal = () => {
        if (!selectedAsset) return null;

        const canAffordCash = person.money >= selectedAsset.price;
        const downPayment = Math.floor(selectedAsset.price * 0.2);
        const canAffordDown = person.money >= downPayment;
        const isRealEstate = selectedAsset.type === 'Real Estate';

        return (
            <div className="modal-overlay" style={{ zIndex: 200 }}>
                <div className="modal-content" style={{ maxWidth: '400px' }}>
                    <h3>Buy {selectedAsset.name}?</h3>
                    <p>Price: <strong>${selectedAsset.price.toLocaleString()}</strong></p>
                    {isRealEstate && (
                        <p style={{ fontSize: '0.9em', color: 'var(--text-secondary)' }}>
                            Mortgages require 20% down (${downPayment.toLocaleString()}).
                        </p>
                    )}

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
                        <button
                            className="btn-primary"
                            disabled={!canAffordCash}
                            onClick={() => confirmBuy('cash')}
                            style={{ opacity: canAffordCash ? 1 : 0.5 }}
                        >
                            Pay Cash
                        </button>

                        {isRealEstate && (
                            <button
                                className="btn-secondary"
                                disabled={!canAffordDown}
                                onClick={() => confirmBuy('mortgage')}
                                style={{ opacity: canAffordDown ? 1 : 0.5 }}
                            >
                                Apply for Mortgage
                            </button>
                        )}

                        <button
                            className="btn-danger"
                            onClick={() => setSelectedAsset(null)}
                            style={{ marginTop: '10px' }}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="modal-overlay">
            {renderBuyModal()}
            <div className="modal-content" style={{ maxWidth: '600px', height: '80vh', display: 'flex', flexDirection: 'column' }}>
                <div className="modal-header">
                    <h2 className="modal-title">Assets & Shopping</h2>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>

                <div style={{
                    display: 'flex', marginBottom: '20px', gap: '8px',
                    overflowX: 'auto', paddingBottom: '4px',
                    borderBottom: '1px solid rgba(255,255,255,0.1)'
                }}>
                    {[
                        { id: 'owned', label: 'My Assets', icon: '💼' },
                        { id: 'real_estate', label: 'Real Estate', icon: '🏠' },
                        { id: 'cars', label: 'Car Dealer', icon: '🚗' },
                        { id: 'luxury', label: 'Luxury', icon: '💎' },
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            style={{
                                padding: '10px 16px',
                                background: activeTab === tab.id ? 'var(--accent-primary)' : 'transparent',
                                color: activeTab === tab.id ? 'white' : 'var(--text-secondary)',
                                borderRadius: '12px 12px 0 0',
                                border: 'none',
                                cursor: 'pointer',
                                whiteSpace: 'nowrap',
                                transition: 'all 0.2s',
                                fontSize: '0.95rem'
                            }}
                        >
                            <span style={{ marginRight: '6px' }}>{tab.icon}</span> {tab.label}
                        </button>
                    ))}
                </div>

                <div className="modal-body" style={{ flex: 1, overflowY: 'auto' }}>
                    {activeTab === 'owned' && renderOwned()}
                    {activeTab === 'real_estate' && renderMarketList(realEstateList)}
                    {activeTab === 'cars' && renderMarketList(carList)}
                    {activeTab === 'luxury' && renderLuxury()}
                </div>
            </div>
        </div>
    );
}
