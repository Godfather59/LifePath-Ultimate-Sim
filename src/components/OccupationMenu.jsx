import React from 'react';
import { JOBS } from '../logic/Job';
import './Modal.css';

export function OccupationMenu({ person, onApply, onQuit, onClose }) {
    const checkRequirements = (job) => {
        const issues = [];

        // Custom Requirements
        if (job.customReq === 'influencer') {
            if (!person.social?.isInfluencer) issues.push("Must be a Social Media Influencer");
        }

        // Standard Requirements
        const req = job.requirements || {};
        if (req.smarts && person.smarts < req.smarts) issues.push(`Smarts: ${req.smarts}+`);
        if (req.looks && person.looks < req.looks) issues.push(`Looks: ${req.looks}+`);
        if (req.health && person.health < req.health) issues.push(`Health: ${req.health}+`);

        // Education
        if (req.education && req.education !== 'None') {
            // Check highest degree in history (simplified)
            // Ideally we check if `educationHistory` includes it
            if (!person.educationHistory.includes(req.education)) {
                issues.push(`Degree: ${req.education}`);
            }
        }

        return issues;
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2 className="modal-title">Occupation</h2>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>

                <div style={{ marginTop: '20px', borderTop: '1px solid #444', paddingTop: '10px' }}>
                    <h3>🪖 Service</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                        {['Army', 'Navy', 'Air Force', 'Marines'].map(branch => (
                            <button
                                key={branch}
                                className="list-item"
                                style={{ textAlign: 'center', justifyContent: 'center' }}
                                onClick={() => {
                                    onApply({ isMilitary: true, branch });
                                }}
                            >
                                {branch}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="modal-body">
                    {person.job ? (
                        <div className="list-item" style={{ background: 'rgba(142,45,226,0.1)', borderColor: 'var(--accent-primary)' }}>
                            <span className="list-item-title">{person.job.title}</span>
                            <span className="list-item-subtitle">
                                Salary: ${person.job.salary.toLocaleString()} • Years: {person.job.yearsEmployed}
                            </span>
                            <div style={{ marginTop: '12px', display: 'flex', gap: '10px' }}>
                                <button className="btn-danger" onClick={() => onQuit()}>Resign</button>
                                {person.job.isMilitary && (
                                    <button
                                        className="btn-primary"
                                        style={{ background: '#558b2f' }}
                                        onClick={() => onClose('deploy')} // Pass 'deploy' to indicate action
                                    >
                                        Deploy to Field
                                    </button>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            {JOBS.map(job => {
                                const issues = checkRequirements(job);
                                const qualified = issues.length === 0;

                                return (
                                    <div key={job.id} className="list-item">
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                            <div>
                                                <span className="list-item-title">{job.title}</span>
                                                <span className="list-item-subtitle" style={{ color: qualified ? '#aaa' : '#666' }}>
                                                    ${job.salary.toLocaleString()}
                                                </span>
                                            </div>
                                            {!qualified && (
                                                <span style={{ color: 'var(--danger-color)', fontSize: '0.75em', textAlign: 'right', maxWidth: '100px' }}>
                                                    {issues[0]}
                                                </span>
                                            )}
                                        </div>

                                        <button
                                            disabled={!qualified}
                                            onClick={() => onApply(job)}
                                            className={qualified ? "btn-primary" : "btn-secondary"}
                                            style={{ marginTop: '10px', opacity: qualified ? 1 : 0.5, width: '100%' }}
                                        >
                                            {qualified ? 'Apply' : 'Locked'}
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

