import React from 'react';
import { POLITICAL_OFFICES, CAMPAIGN_ACTIONS } from '../logic/Politics';
import './Modal.css';

export function PoliticsMenu({ person, onRun, onCampaignAction, onClose }) {

    // 1. Selection Screen (if not campaigning)
    if (!person.politics) {
        return (
            <div className="modal-overlay">
                <div className="modal-content">
                    <div className="modal-header">
                        <h2 className="modal-title">🏛️ Political Offices</h2>
                        <button className="close-btn" onClick={onClose}>&times;</button>
                    </div>
                    <div className="modal-body">
                        {POLITICAL_OFFICES.map(office => (
                            <div key={office.id} className="list-item">
                                <div>
                                    <div className="bold">{office.title}</div>
                                    <div className="list-item-subtitle">
                                        Term: {office.term} yrs | Salary: ${office.salary.toLocaleString()}
                                    </div>
                                    <div style={{ fontSize: '0.8rem', color: '#aaa' }}>
                                        Campaign Cost: ${office.cost.toLocaleString()}
                                    </div>
                                </div>
                                <button className="btn-primary" onClick={() => onRun(office)}>
                                    Run for Office
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // 2. Campaign Dashboard
    const { office, approval, funds, weeksLeft } = person.politics;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2 className="modal-title">🇺🇸 {office.title} Campaign</h2>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>

                <div className="modal-body">
                    <div style={{ background: '#222', padding: '15px', borderRadius: '8px', marginBottom: '20px', textAlign: 'center' }}>
                        <div style={{ fontSize: '2rem', marginBottom: '5px' }}>📊 {approval}%</div>
                        <div style={{ color: '#aaa' }}>Approval Rating</div>
                        <div style={{ marginTop: '10px', fontWeight: 'bold', color: '#81c784' }}>
                            Funds: ${funds.toLocaleString()}
                        </div>
                        <div style={{ marginTop: '5px', color: '#ffcc80' }}>
                            {weeksLeft} weeks until Election
                        </div>
                    </div>

                    <h3>Campaign Actions</h3>
                    <div style={{ display: 'grid', gap: '10px' }}>
                        {CAMPAIGN_ACTIONS.map(action => (
                            <button
                                key={action.id}
                                className="list-item"
                                style={{ width: '100%', textAlign: 'left', cursor: 'pointer' }}
                                onClick={() => onCampaignAction(action)}
                            >
                                <div className="bold">{action.title}</div>
                                <div className="list-item-subtitle">
                                    Cost: ${action.cost} | Impact: ~{action.impact}%
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
