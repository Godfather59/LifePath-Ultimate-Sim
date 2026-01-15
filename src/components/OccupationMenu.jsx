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
        if (job.customReq === 'stuntman') {
            if ((person.skills?.martialArts || 0) < 100) issues.push("Martial Arts Mastery (100)");
        }
        if (job.customReq === 'coding_skill') {
            if ((person.skills?.coding || 0) < 80) issues.push("Coding Skill (80+)");
        }
        if (job.customReq === 'cooking_skill') {
            if ((person.skills?.cooking || 0) < 90) issues.push("Cooking Skill (90+)");
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
            <div className="modal-content" style={{ maxWidth: '500px' }}>
                <div className="modal-header">
                    <h2 className="modal-title">Occupation</h2>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>

                <div className="modal-body">
                    {/* Military Section */}
                    <div style={{ marginBottom: '24px' }}>
                        <h3 style={{ fontSize: '0.9rem', color: '#888', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>
                            🪖 Military Service
                        </h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                            {['Army', 'Navy', 'Air Force', 'Marines'].map(branch => {
                                const branchInfo = { name: branch, id: branch.toLowerCase().replace(' ', '_') };
                                return (
                                    <div key={branch} style={{ display: 'flex', gap: '5px', flexDirection: 'column' }}>
                                        <button
                                            className="list-item"
                                            style={{
                                                textAlign: 'center',
                                                padding: '12px',
                                                background: 'rgba(255,255,255,0.05)',
                                                border: '1px solid rgba(255,255,255,0.1)',
                                                cursor: 'pointer',
                                                color: '#ddd',
                                                marginBottom: 0
                                            }}
                                            onClick={() => onApply({ isMilitary: true, branch: branchInfo, isOfficer: false })}
                                        >
                                            Enlist as Private
                                        </button>
                                        <button
                                            className="list-item"
                                            style={{
                                                textAlign: 'center',
                                                padding: '8px',
                                                fontSize: '0.8rem',
                                                background: 'rgba(255,215,0,0.1)',
                                                border: '1px solid gold',
                                                cursor: 'pointer',
                                                color: 'gold',
                                                marginTop: 0
                                            }}
                                            onClick={() => onApply({ isMilitary: true, branch: branchInfo, isOfficer: true })}
                                        >
                                            Officer (Degree Req)
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
                        <h3 style={{ fontSize: '0.9rem', color: '#888', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>
                            💼 Career
                        </h3>

                        {person.job ? (
                            <div className="list-item" style={{
                                background: 'linear-gradient(135deg, rgba(30, 136, 229, 0.2), rgba(21, 101, 192, 0.2))',
                                borderColor: '#1e88e5',
                                padding: '20px'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                                    <div>
                                        <span className="list-item-title" style={{ fontSize: '1.2em', color: '#42a5f5' }}>{person.job.title}</span>
                                        <span className="list-item-subtitle" style={{ color: '#ccc' }}>
                                            Salary: <span style={{ color: '#fff' }}>${person.job.salary.toLocaleString()}</span>
                                        </span>
                                    </div>
                                    <span style={{ background: 'rgba(255,255,255,0.1)', padding: '4px 8px', borderRadius: '6px', fontSize: '0.8em' }}>
                                        {person.job.yearsEmployed} Years
                                    </span>
                                </div>
                                <div style={{ marginTop: '16px', display: 'flex', gap: '10px' }}>
                                    <button className="btn-danger" style={{ padding: '10px' }} onClick={() => onQuit()}>Resign</button>
                                    {person.job.isMilitary && (
                                        <button
                                            className="btn-primary"
                                            style={{ background: 'linear-gradient(90deg, #558b2f, #33691e)', padding: '10px' }}
                                            onClick={() => onClose('deploy')}
                                        >
                                            Deploy
                                        </button>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                {(person.market?.jobs || JOBS).map(job => {
                                    const issues = checkRequirements(job);
                                    const qualified = issues.length === 0;

                                    return (
                                        <div key={job.id} className="list-item" style={{
                                            opacity: qualified ? 1 : 0.6,
                                            background: qualified ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.2)'
                                        }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <div>
                                                    <span className="list-item-title">{job.title}</span>
                                                    <span className="list-item-subtitle" style={{ color: '#aaa' }}>
                                                        ${job.salary.toLocaleString()}
                                                    </span>
                                                </div>
                                                <button
                                                    disabled={!qualified}
                                                    onClick={() => onApply(job)}
                                                    className={qualified ? "btn-primary" : "btn-secondary"}
                                                    style={{
                                                        width: 'auto',
                                                        padding: '8px 16px',
                                                        fontSize: '0.9em',
                                                        opacity: qualified ? 1 : 0.5
                                                    }}
                                                >
                                                    {qualified ? 'Apply' : 'Locked'}
                                                </button>
                                            </div>
                                            {!qualified && (
                                                <div style={{
                                                    marginTop: '8px',
                                                    color: '#ef5350',
                                                    fontSize: '0.8em',
                                                    background: 'rgba(239, 83, 80, 0.1)',
                                                    padding: '4px 8px',
                                                    borderRadius: '4px',
                                                    display: 'inline-block'
                                                }}>
                                                    Requires: {issues.join(", ")}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

