import React, { useState } from 'react';
import { UNIVERSITIES, GRAD_SCHOOLS, PUBLIC_SCHOOLS } from '../logic/Education';
import './Modal.css';

export function EducationMenu({ person, onEnroll, onStudy, onDropOut, onClose }) {
    const [activeTab, setActiveTab] = useState('uni'); // 'uni' | 'grad' | 'public'

    // Determine default tab based on age/status
    React.useEffect(() => {
        if (person.age < 18) setActiveTab('public');
    }, [person.age]);

    const getList = () => {
        switch (activeTab) {
            case 'public': return PUBLIC_SCHOOLS.filter(s => {
                // Only show relevant public school based on age
                if (s.type === 'elementary' && person.age >= 6 && person.age < 14) return true;
                if (s.type === 'high_school' && person.age >= 14 && person.age < 18) return true;
                return false;
            });
            case 'uni': return UNIVERSITIES;
            case 'grad': return GRAD_SCHOOLS;
            default: return [];
        }
    };

    const currentList = getList();

    // Render School Dashboard if enrolled
    const renderDashboard = () => {
        const school = person.currentSchool;
        const performance = school.performance || 50;

        // Simple color calc for performance bar
        let barColor = 'var(--danger-color)';
        if (performance > 40) barColor = 'orange';
        if (performance > 70) barColor = 'var(--success-color)';

        return (
            <div className="school-dashboard" style={{ textAlign: 'center' }}>
                <div style={{
                    background: 'rgba(255,255,255,0.05)',
                    padding: '24px',
                    borderRadius: '16px',
                    marginBottom: '24px',
                    border: '1px solid var(--glass-border)'
                }}>
                    <div style={{ fontSize: '3rem', marginBottom: '8px' }}>🏫</div>
                    <h3 className="modal-subtitle" style={{ color: 'white' }}>{school.name}</h3>
                    <p style={{ color: '#aaa', marginBottom: '20px' }}>Year {school.year} of {school.years}</p>

                    {/* Grades Bar */}
                    <div style={{ marginBottom: '8px', display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#ccc' }}>
                        <span>Grades</span>
                        <span>{performance}%</span>
                    </div>
                    <div style={{
                        height: '12px',
                        background: 'rgba(0,0,0,0.3)',
                        borderRadius: '6px',
                        overflow: 'hidden',
                        marginBottom: '24px'
                    }}>
                        <div style={{
                            width: `${performance}%`,
                            height: '100%',
                            background: barColor,
                            transition: 'width 0.5s ease'
                        }} />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px' }}>
                        <button
                            className="btn-primary"
                            onClick={onStudy}
                            style={{ padding: '16px' }}
                        >
                            📚 Study Harder
                        </button>

                        <button
                            className="btn-danger"
                            onClick={onDropOut}
                            style={{ padding: '16px', background: 'rgba(255, 65, 108, 0.2)', border: '1px solid var(--danger-color)' }}
                        >
                            🚫 Drop Out
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2 className="modal-title">Education</h2>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>

                <div className="modal-body">
                    {person.currentSchool ? (
                        renderDashboard()
                    ) : (
                        <>
                            {/* Tab Navigation */}
                            <div style={{ display: 'flex', marginBottom: '20px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', padding: '4px' }}>
                                {person.age < 18 && (
                                    <button
                                        onClick={() => setActiveTab('public')}
                                        style={{
                                            flex: 1, padding: '10px', borderRadius: '6px', border: 'none', cursor: 'pointer',
                                            background: activeTab === 'public' ? 'rgba(255,255,255,0.1)' : 'transparent',
                                            color: activeTab === 'public' ? 'white' : '#aaa',
                                            fontWeight: activeTab === 'public' ? 'bold' : 'normal'
                                        }}
                                    >
                                        School
                                    </button>
                                )}
                                <button
                                    onClick={() => setActiveTab('uni')}
                                    style={{
                                        flex: 1, padding: '10px', borderRadius: '6px', border: 'none', cursor: 'pointer',
                                        background: activeTab === 'uni' ? 'rgba(255,255,255,0.1)' : 'transparent',
                                        color: activeTab === 'uni' ? 'white' : '#aaa',
                                        fontWeight: activeTab === 'uni' ? 'bold' : 'normal'
                                    }}
                                >
                                    University
                                </button>
                                <button
                                    onClick={() => setActiveTab('grad')}
                                    style={{
                                        flex: 1, padding: '10px', borderRadius: '6px', border: 'none', cursor: 'pointer',
                                        background: activeTab === 'grad' ? 'rgba(255,255,255,0.1)' : 'transparent',
                                        color: activeTab === 'grad' ? 'white' : '#aaa',
                                        fontWeight: activeTab === 'grad' ? 'bold' : 'normal'
                                    }}
                                >
                                    Grad School
                                </button>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {currentList.map(school => {
                                    const hasReq = !school.req_degree || person.educationHistory.includes(school.req_degree);
                                    const alreadyHave = person.educationHistory.includes(school.grant_degree);

                                    return (
                                        <div key={school.id} className="list-item">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <span className="list-item-title">{school.name}</span>
                                                    <span className="list-item-subtitle">
                                                        {school.years} Years • ${school.cost.toLocaleString()}/yr
                                                    </span>
                                                    {!hasReq && (
                                                        <span style={{ fontSize: '0.8em', color: 'var(--danger-color)', display: 'block', marginTop: '4px' }}>
                                                            Requires {school.req_degree}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            <button
                                                disabled={!hasReq || alreadyHave}
                                                onClick={() => onEnroll(school)}
                                                className={(!hasReq || alreadyHave) ? "btn-secondary" : "btn-primary"}
                                                style={{
                                                    marginTop: '12px',
                                                    width: '100%',
                                                    opacity: (!hasReq || alreadyHave) ? 0.5 : 1
                                                }}
                                            >
                                                {alreadyHave ? 'Completed' : 'Apply'}
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
