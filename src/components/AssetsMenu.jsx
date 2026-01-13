import React, { useState, useEffect } from 'react';
import { AssetMarket } from '../logic/Assets';
import { LUXURY_ASSETS } from '../logic/CuratedAssets';
import './Modal.css';

export function AssetsMenu({ person, onBuy, onSell, onClose }) {
    const [activeTab, setActiveTab] = useState('owned'); // 'owned' | 'real_estate' | 'cars' | 'luxury'
    const [realEstateList, setRealEstateList] = useState([]);
    const [carList, setCarList] = useState([]);

    // Initial Market Generation
    useEffect(() => {
        setRealEstateList(AssetMarket.generateRealEstateListings(5));
        setCarList(AssetMarket.generateCarListings(6));
    }, []);

    const handleBuy = (asset) => {
        if (person.money < asset.price) {
            return;
        }

        // For static luxury assets, we might want to clone them to give a unique ID
        const assetToBuy = {
            ...asset,
            uniqueId: asset.uniqueId || (Date.now() + Math.random()),
            purchasePrice: asset.price,
            value: asset.price,
            condition: 100 // New luxury is perfect condition
        };

        onBuy(assetToBuy);

        // Remove from list if it was a generated listing
        if (asset.type === 'Real Estate') {
            setRealEstateList(prev => prev.filter(i => i.uniqueId !== asset.uniqueId));
        } else if (asset.type === 'Vehicle' && !LUXURY_ASSETS.find(la => la.id === asset.id)) {
            // Only remove standard vehicles, luxury cars/planes usually stock from a catalog
            setCarList(prev => prev.filter(i => i.uniqueId !== asset.uniqueId));
        }

        setActiveTab('owned');
    };

    const renderOwned = () => {
        if (!person.assets || person.assets.length === 0) return <div className="text-center p-4">You own nothing. Go shopping!</div>;

        return person.assets.map((asset, idx) => (
            <div key={idx} className="list-item">
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span className="list-item-title">{asset.name}</span>
                    <button className="btn-danger" style={{ padding: '4px 8px', fontSize: '0.8rem' }} onClick={() => onSell(idx)}>
                        Sell
                    </button>
                </div>
                <div className="list-item-subtitle" style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '8px' }}>
                    <span>Current Value: ${asset.value?.toLocaleString() || asset.price.toLocaleString()}</span>
                    <span style={{ fontSize: '0.8em', opacity: 0.7 }}>Bought: ${asset.purchasePrice?.toLocaleString() || 'Unknown'}</span>
                    {asset.type === 'Vehicle' && (
                        <div style={{ color: asset.condition < 40 ? 'var(--danger-color)' : '#aaa' }}>
                            Condition: {asset.condition}%
                        </div>
                    )}
                </div>
            </div>
        ));
    };

    const renderMarket = (items, isLuxury = false) => {
        return items.map((item, idx) => (
            <div key={item.uniqueId || idx} className="list-item">
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span className="list-item-title">{item.name}</span>
                    <span style={{ color: 'var(--success-color)' }}>${item.price.toLocaleString()}</span>
                </div>
                <div className="list-item-subtitle" style={{ marginTop: '4px' }}>
                    {item.type === 'Vehicle' && !isLuxury && (
                        <span>{item.isBrandNew ? "Brand New" : "Used"} • Condition: {item.condition}%</span>
                    )}
                    {item.type === 'Real Estate' && (
                        <span>Maintenance: ${item.maintenance.toLocaleString()}/yr</span>
                    )}
                    {isLuxury && (
                        <span>Premium Asset • +{item.happiness_bonus} Happiness</span>
                    )}
                </div>
                <button
                    className="btn-primary"
                    onClick={() => handleBuy(item)}
                    disabled={person.money < item.price}
                    style={{ width: '100%', marginTop: '8px', opacity: person.money < item.price ? 0.5 : 1 }}
                >
                    Buy
                </button>
            </div>
        ));
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2 className="modal-title">Assets & Shopping</h2>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>

                <div className="modal-body">
                    {/* Tabs */}
                    <div style={{ display: 'flex', marginBottom: '16px', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
                        {[
                            { id: 'owned', label: 'My Assets', icon: '💼' },
                            { id: 'real_estate', label: 'Real Estate', icon: '🏠' },
                            { id: 'cars', label: 'Car Dealer', icon: '🚗' },
                            { id: 'luxury', label: 'Luxury', icon: '💎' }
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                style={{
                                    flex: '1 0 auto',
                                    padding: '10px 16px',
                                    borderRadius: '20px',
                                    border: '1px solid var(--glass-border)',
                                    background: activeTab === tab.id ? 'var(--accent-primary)' : 'rgba(255,255,255,0.05)',
                                    color: 'white',
                                    cursor: 'pointer',
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                {tab.icon} {tab.label}
                            </button>
                        ))}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {activeTab === 'owned' && renderOwned()}
                        {activeTab === 'real_estate' && renderMarket(realEstateList)}
                        {activeTab === 'cars' && renderMarket(carList)}
                        {activeTab === 'luxury' && renderMarket(LUXURY_ASSETS, true)}
                    </div>
                </div>
            </div>
        </div>
    );
}
