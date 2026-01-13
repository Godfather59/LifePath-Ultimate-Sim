import React, { useState } from 'react';
import { SOCIAL_PLATFORMS, POST_TYPES } from '../logic/SocialMedia';
import './Modal.css';

export function SocialMenu({ person, onPost, onBuyFollowers, onClose }) {
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
                                {person.social?.followers?.toLocaleString() || 0}
                            </div>
                            {person.social?.isInfluencer && (
                                <div style={{ color: '#ffd700', marginTop: '5px' }}>⭐ Verified Influencer</div>
                            )}
                        </div>

                        <h3>Platforms</h3>
                        {SOCIAL_PLATFORMS.map(platform => (
                            <div
                                key={platform.id}
                                className="list-item"
                                onClick={() => setSelectedPlatform(platform)}
                                style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                            >
                                <div>
                                    <div className="bold">{platform.name}</div>
                                    <div className="list-item-subtitle">{platform.type.toUpperCase()} • {platform.audience} audience</div>
                                </div>
                                <div>👉</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // Platform Actions
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2 className="modal-title">{selectedPlatform.name}</h2>
                    <button className="close-btn" onClick={() => setSelectedPlatform(null)}>←</button>
                </div>

                <div className="modal-body">
                    <div style={{ marginBottom: '20px' }}>
                        <button
                            className="btn-secondary"
                            style={{ marginBottom: '10px' }}
                            onClick={() => onBuyFollowers(selectedPlatform)}
                        >
                            🤑 Buy Followers ($100)
                        </button>
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
                                    // Optional: Close or stay? stay for now.
                                }}
                            >
                                <div className="bold">{post.title}</div>
                                <div className="list-item-subtitle">
                                    Risk: {post.risk}% | Viral Potential: {post.viral_chance}%
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
