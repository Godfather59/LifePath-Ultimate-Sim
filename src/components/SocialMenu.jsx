import React, { useState } from 'react';
import { SOCIAL_PLATFORMS, POST_TYPES } from '../logic/SocialMedia';
import './Modal.css';

export function SocialMenu({ person, onPost, onMonetize, onBuyFollowers, onClose }) {
    const [selectedPlatform, setSelectedPlatform] = useState(null);

    // If no platform selected, show list
    if (!selectedPlatform) {
        return (
            <div className="modal-overlay">
                <div className="modal-content">
                    <div className="modal-header">
                        <h2 className="modal-title">Social Media</h2>
                        <button className="close-btn" onClick={onClose}>&times;</button>
                    </div>
                    <div className="modal-body">
                        <div style={{ padding: '15px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', marginBottom: '20px', textAlign: 'center' }}>
                            <div style={{ fontSize: '2rem', marginBottom: '8px' }}>📱</div>
                            <h3>Total Followers</h3>
                            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--accent-primary)' }}>
                                {person.social.totalFollowers.toLocaleString()}
                            </div>
                            {person.social.isInfluencer && (
                                <div style={{ color: '#ffd700', marginTop: '5px' }}>⭐ Verified Influencer</div>
                            )}
                        </div>

                        <h3>Platforms</h3>
                        {SOCIAL_PLATFORMS.map(platform => {
                            const account = person.social.platforms[platform.id];
                            const followers = account ? account.followers : 0;

                            return (
                                <div
                                    key={platform.id}
                                    className="list-item"
                                    onClick={() => setSelectedPlatform(platform)}
                                    style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                                >
                                    <div>
                                        <div className="bold">{platform.name}</div>
                                        <div className="list-item-subtitle">
                                            {followers.toLocaleString()} • {platform.audience}
                                        </div>
                                    </div>
                                    <div>👉</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }

    // Platform Actions
    const account = person.social.platforms[selectedPlatform.id] || { followers: 0 };
    const canMonetize = account.followers >= 5000;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2 className="modal-title">{selectedPlatform.name}</h2>
                    <button className="close-btn" onClick={() => setSelectedPlatform(null)}>←</button>
                </div>

                <div className="modal-body">
                    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                        <div style={{ fontSize: '2em', fontWeight: 'bold' }}>{account.followers.toLocaleString()}</div>
                        <div style={{ color: '#aaa' }}>Followers</div>
                    </div>

                    <div style={{ marginBottom: '20px', display: 'flex', gap: '8px' }}>
                        <button
                            className="btn-primary"
                            style={{ flex: 1, background: '#4caf50' }}
                            onClick={() => onBuyFollowers(selectedPlatform)}
                        >
                            🤑 Buy Followers ($100)
                        </button>

                        {canMonetize && (
                            <button
                                className="btn-primary"
                                style={{ flex: 1, background: '#ff9800' }}
                                onClick={() => onMonetize(selectedPlatform)}
                            >
                                🤝 Brand Deal
                            </button>
                        )}
                    </div>

                    <h3>Create a Post</h3>
                    <div style={{ display: 'grid', gap: '10px' }}>
                        {POST_TYPES.map(post => (
                            <button
                                key={post.id}
                                className="list-item"
                                style={{ textAlign: 'left', width: '100%', cursor: 'pointer' }}
                                onClick={() => {
                                    onPost(selectedPlatform, post);
                                    // Don't close, allow spamming
                                }}
                            >
                                <div className="bold">{post.title}</div>
                                <div className="list-item-subtitle">
                                    Risk: {post.risk}% | Viral: {post.viral_chance}%
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
