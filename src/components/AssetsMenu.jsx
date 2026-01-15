import React, { useState } from 'react';
import { LUXURY_ASSETS } from '../logic/CuratedAssets';
import { STOCKS, CRYPTO } from '../logic/Investments';
import './Modal.css';

export function AssetsMenu({ person, onBuy, onSell, onRent, onEvict, onClose }) {
    const [activeTab, setActiveTab] = useState('owned'); // 'owned' | 'real_estate' | 'cars' | 'luxury' | 'investments'

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

    // Renting State
    const [rentingAssetIndex, setRentingAssetIndex] = useState(null);
    const [monthlyRentInput, setMonthlyRentInput] = useState(2000);

    // Investment State
    const [investModal, setInvestModal] = useState(null); // { type: 'buy'|'sell', asset: {...} }
    const [investAmount, setInvestAmount] = useState(1000);

    const handleRentClick = (index) => {
        const asset = person.assets[index];
        // Default rent Suggestion: 0.8% of value / 12 ~ 
        // Or simpler: Value * 0.005
        setMonthlyRentInput(Math.floor(asset.value * 0.005));
        setRentingAssetIndex(index);
    };

    const confirmRent = () => {
        onRent(rentingAssetIndex, parseInt(monthlyRentInput));
        setRentingAssetIndex(null);
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
                        {asset.isRented && <span style={{ color: '#4caf50', marginLeft: '6px' }}> (Rented)</span>}
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                    {asset.type === 'Real Estate' && !asset.isRented && (
                        <button className="btn-primary" style={{ padding: '6px 12px', fontSize: '0.9em' }} onClick={() => handleRentClick(index)}>Rent Out</button>
                    )}
                    {asset.type === 'Real Estate' && asset.isRented && (
                        <button className="btn-secondary" style={{ padding: '6px 12px', fontSize: '0.9em' }} onClick={() => onEvict(index)}>Evict</button>
                    )}
                    <button
                        className="btn-danger"
                        style={{ padding: '6px 12px', fontSize: '0.9em' }}
                        onClick={() => onSell(index)}
                    >
                        Sell
                    </button>
                </div>
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

    const renderRentModal = () => {
        if (rentingAssetIndex === null) return null;
        const asset = person.assets[rentingAssetIndex];
        return (
            <div className="modal-overlay" style={{ zIndex: 210 }}>
                <div className="modal-content" style={{ maxWidth: '300px' }}>
                    <h3>Rent out {asset.name}</h3>
                    <p>Suggested Rent: ${Math.floor(asset.value * 0.005).toLocaleString()}/mo</p>
                    <label>Monthly Rent ($):</label>
                    <input
                        type="number"
                        value={monthlyRentInput}
                        onChange={(e) => setMonthlyRentInput(e.target.value)}
                        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                    />
                    <button className="btn-primary" onClick={confirmRent}>Confirm</button>
                    <button className="btn-secondary" onClick={() => setRentingAssetIndex(null)} style={{ marginTop: '10px' }}>Cancel</button>
                </div>
            </div>
        );
    }

    const renderInvestModal = () => {
        if (!investModal) return null;
        const isBuy = investModal.type === 'buy';
        const asset = investModal.asset;

        return (
            <div className="modal-overlay" style={{ zIndex: 220 }}>
                <div className="modal-content" style={{ maxWidth: '300px' }}>
                    <h3>{isBuy ? 'Buy' : 'Sell'} {asset.name}</h3>
                    {isBuy && (
                        <>
                            <p>How much to invest?</p>
                            <input type="number" style={{ width: '100%', padding: '8px' }} value={investAmount} onChange={(e) => setInvestAmount(parseInt(e.target.value) || 0)} />
                            <div style={{ fontSize: '0.8em', marginTop: '5px' }}>Cash: ${person.money.toLocaleString()}</div>
                        </>
                    )}
                    {!isBuy && (
                        <p>Sell entire position? (Partial sell not implemented yet)</p>
                    )}

                    <button className="btn-primary" style={{ marginTop: '15px' }} onClick={() => {
                        if (isBuy) onInvest(asset, investAmount);
                        else onDivest(asset.id);
                        setInvestModal(null);
                    }}>Confirm</button>
                    <button className="btn-secondary" style={{ marginTop: '10px' }} onClick={() => setInvestModal(null)}>Cancel</button>
                </div>
            </div>
        );
    };

    const renderInvestments = () => {
        return (
            <div>
                <h3 style={{ marginBottom: '16px', fontSize: '1.1em' }}>Stock Market & Crypto</h3>

                {/* Index Fund */}
                <div className="list-item" style={{ marginBottom: '12px' }}>
                    <div>
                        <div className="list-item-title">📈 Index Fund</div>
                        <div className="list-item-subtitle">
                            Current Price: ${person.market?.indexFundPrice || 100}/share
                        </div>
                        <div style={{ fontSize: '0.85em', color: '#888', marginTop: '4px' }}>
                            Owned: {person.investments?.indexFund || 0} shares
                        </div>
                    </div>
                    <button className="btn-primary" style={{ padding: '8px 16px' }}>
                        Buy/Sell
                    </button>
                </div>

                {/* Dogecoin */}
                <div className="list-item">
                    <div>
                        <div className="list-item-title">🪙 Dogecoin</div>
                        <div className="list-item-subtitle">
                            Current Price: ${(person.market?.dogecoinPrice || 0.50).toFixed(2)}/coin
                        </div>
                        <div style={{ fontSize: '0.85em', color: '#888', marginTop: '4px' }}>
                            Owned: {person.investments?.dogecoin || 0} coins
                        </div>
                    </div>
                    <button className="btn-primary" style={{ padding: '8px 16px' }}>
                        Buy/Sell
                    </button>
                </div>

                <div style={{ marginTop: '20px', padding: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', fontSize: '0.9em', color: '#888' }}>
                    💡 Note: Market prices update every year. Index Fund is stable, Dogecoin is volatile!
                </div>
            </div>
        );
    };

    return (
        <div className="modal-overlay">
            {renderBuyModal()}
            {renderRentModal()}
            {renderInvestModal()}
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
                        { id: 'investments', label: 'Investments', icon: '📈' },
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
                    {activeTab === 'investments' && renderInvestments()}
                </div>
            </div>
        </div>
    );
}
