import React from 'react';
import './Modal.css';

export function StatsMenu({ stats, onClose }) {
    const formatMoney = (amount) => {
        if (amount >= 1000000000) return `$${(amount / 1000000000).toFixed(2)}B`;
        if (amount >= 1000000) return `$${(amount / 1000000).toFixed(2)}M`;
        if (amount >= 1000) return `$${(amount / 1000).toFixed(2)}K`;
        return `$${amount}`;
    };

    const topJobs = Object.entries(stats.jobsHeld || {})
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);

    return (
        <div className="modal-overlay">
            <div className="modal-content" style={{ maxWidth: '600px', maxHeight: '90vh', overflow: 'auto' }}>
                <div className="modal-header">
                    <h2 className="modal-title">📊 Lifetime Statistics</h2>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>

                <div className="modal-body">
                    {/* Summary Stats */}
                    <div style={{
                        background: 'rgba(102,187,106,0.1)',
                        padding: '16px',
                        borderRadius: '12px',
                        marginBottom: '20px',
                        border: '1px solid rgba(102,187,106,0.3)'
                    }}>
                        <h3 style={{ margin: '0 0 12px 0', fontSize: '1.1em' }}>Career Summary</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                            <div>
                                <div style={{ fontSize: '0.9em', color: '#888' }}>Lives Lived</div>
                                <div style={{ fontSize: '1.5em', fontWeight: 'bold' }}>{stats.livesLived}</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '0.9em', color: '#888' }}>Total Years</div>
                                <div style={{ fontSize: '1.5em', fontWeight: 'bold' }}>{stats.totalYearsLived}</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '0.9em', color: '#888' }}>Money Earned</div>
                                <div style={{ fontSize: '1.5em', fontWeight: 'bold', color: '#4caf50' }}>
                                    {formatMoney(stats.totalMoneyEarned)}
                                </div>
                            </div>
                            <div>
                                <div style={{ fontSize: '0.9em', color: '#888' }}>Jobs Held</div>
                                <div style={{ fontSize: '1.5em', fontWeight: 'bold' }}>{stats.totalJobsHeld}</div>
                            </div>
                        </div>
                    </div>

                    {/* Hall of Fame */}
                    <h3 style={{ fontSize: '0.9rem', color: '#888', textTransform: 'uppercase', marginBottom: '12px' }}>
                        🏆 Hall of Fame
                    </h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
                        <div className="list-item" style={{ background: 'rgba(255,215,0,0.1)', border: '1px solid rgba(255,215,0,0.3)' }}>
                            <div>
                                <div className="list-item-subtitle">Richest Life</div>
                                <div className="list-item-title">{stats.highestNetWorth.name || 'None yet'}</div>
                                <div style={{ color: '#4caf50', fontWeight: 'bold' }}>
                                    {formatMoney(stats.highestNetWorth.value)}
                                </div>
                            </div>
                        </div>

                        <div className="list-item">
                            <div>
                                <div className="list-item-subtitle">Longest Life</div>
                                <div className="list-item-title">{stats.longestLife.name || 'None yet'}</div>
                                <div style={{ color: '#2196f3' }}>{stats.longestLife.age} years old</div>
                            </div>
                        </div>

                        <div className="list-item">
                            <div>
                                <div className="list-item-subtitle">Most Children</div>
                                <div className="list-item-title">{stats.mostChildren.name || 'None yet'}</div>
                                <div style={{ color: '#e91e63' }}>{stats.mostChildren.count} children</div>
                            </div>
                        </div>

                        <div className="list-item">
                            <div>
                                <div className="list-item-subtitle">Most Famous</div>
                                <div className="list-item-title">{stats.highestFame.name || 'None yet'}</div>
                                <div style={{ color: '#ff9800' }}>{stats.highestFame.value} fame</div>
                            </div>
                        </div>
                    </div>

                    {/* Top Jobs */}
                    {topJobs.length > 0 && (
                        <>
                            <h3 style={{ fontSize: '0.9rem', color: '#888', textTransform: 'uppercase', marginBottom: '12px' }}>
                                💼 Most Common Jobs
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                                {topJobs.map(([job, count], index) => (
                                    <div key={job} className="list-item" style={{ padding: '10px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span>{index + 1}. {job}</span>
                                            <span style={{
                                                background: 'rgba(33,150,243,0.2)',
                                                padding: '4px 12px',
                                                borderRadius: '12px',
                                                fontSize: '0.9em'
                                            }}>
                                                {count} {count === 1 ? 'time' : 'times'}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                    {/* Life Stats */}
                    <h3 style={{ fontSize: '0.9rem', color: '#888', textTransform: 'uppercase', marginBottom: '12px' }}>
                        📈 Life Statistics
                    </h3>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '12px',
                        marginBottom: '20px'
                    }}>
                        <div className="list-item" style={{ padding: '12px' }}>
                            <div style={{ fontSize: '0.85em', color: '#888' }}>Total Children</div>
                            <div style={{ fontSize: '1.3em', fontWeight: 'bold' }}>{stats.totalChildrenBorn}</div>
                        </div>
                        <div className="list-item" style={{ padding: '12px' }}>
                            <div style={{ fontSize: '0.85em', color: '#888' }}>Marriages</div>
                            <div style={{ fontSize: '1.3em', fontWeight: 'bold' }}>{stats.totalMarriages}</div>
                        </div>
                        <div className="list-item" style={{ padding: '12px' }}>
                            <div style={{ fontSize: '0.85em', color: '#888' }}>Assets Owned</div>
                            <div style={{ fontSize: '1.3em', fontWeight: 'bold' }}>{stats.totalAssetsOwned}</div>
                        </div>
                        <div className="list-item" style={{ padding: '12px' }}>
                            <div style={{ fontSize: '0.85em', color: '#888' }}>Degrees Earned</div>
                            <div style={{ fontSize: '1.3em', fontWeight: 'bold' }}>{stats.degreesEarned}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
