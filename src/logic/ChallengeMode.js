// Challenge Mode System - Preset scenarios with specific goals

export const CHALLENGES = [
    {
        id: 'rags_to_riches',
        name: 'Rags to Riches',
        description: 'Start with nothing, become a millionaire by age 50',
        difficulty: 'Medium',
        icon: '💰',
        startConditions: {
            money: 0,
            smarts: 30,
            looks: 30,
            health: 50
        },
        winConditions: {
            type: 'money',
            target: 1000000,
            beforeAge: 50
        },
        restrictions: {
            noInheritance: true,
            noLottery: true
        }
    },
    {
        id: 'royal_redemption',
        name: 'Royal Redemption',
        description: 'Born royal, abdicate, then become famous through merit',
        difficulty: 'Hard',
        icon: '👑',
        startConditions: {
            forceRoyal: true,
            money: 1000000
        },
        winConditions: {
            type: 'fame',
            target: 90,
            afterAbdication: true,
            beforeAge: 60
        }
    },
    {
        id: 'military_legend',
        name: 'Military Legend',
        description: 'Rise to General and survive deployment',
        difficulty: 'Hard',
        icon: '🎖️',
        startConditions: {
            smarts: 70,
            health: 90
        },
        winConditions: {
            type: 'military_rank',
            targetRank: 'General',
            surviveDeployment: true,
            beforeAge: 65
        }
    },
    {
        id: 'family_dynasty',
        name: 'Family Dynasty',
        description: 'Have 10+ children and $5M by age 70',
        difficulty: 'Medium',
        icon: '👨‍👩‍👧‍👦',
        startConditions: {},
        winConditions: {
            type: 'combined',
            requirements: [
                { type: 'children', target: 10 },
                { type: 'money', target: 5000000 }
            ],
            beforeAge: 70
        }
    },
    {
        id: 'criminal_mastermind',
        name: 'Criminal Mastermind',
        description: 'Become Godfather without getting caught',
        difficulty: 'Very Hard',
        icon: '🤵',
        startConditions: {
            smarts: 60
        },
        winConditions: {
            type: 'mafia',
            targetRank: 'Godfather',
            noJailTime: true,
            beforeAge: 60
        }
    },
    {
        id: 'century_club',
        name: 'Century Club',
        description: 'Live to 100 with all stats above 50',
        difficulty: 'Very Hard',
        icon: '🎂',
        startConditions: {},
        winConditions: {
            type: 'longevity',
            targetAge: 100,
            minStats: {
                health: 50,
                happiness: 50,
                smarts: 50,
                looks: 50
            }
        }
    },
    {
        id: 'business_tycoon',
        name: 'Business Tycoon',
        description: 'Own 3 companies and go public with one',
        difficulty: 'Hard',
        icon: '🏢',
        startConditions: {
            money: 100000,
            smarts: 70
        },
        winConditions: {
            type: 'business',
            ownCompanies: 3,
            hasPublicCompany: true,
            beforeAge: 65
        }
    },
    {
        id: 'perfect_life',
        name: 'Perfect Life',
        description: 'All stats 90+, married, 3 children, $10M, PhD',
        difficulty: 'Extreme',
        icon: '⭐',
        startConditions: {},
        winConditions: {
            type: 'combined',
            requirements: [
                { type: 'stats', minStats: { health: 90, happiness: 90, smarts: 90, looks: 90 } },
                { type: 'married', value: true },
                { type: 'children', target: 3 },
                { type: 'money', target: 10000000 },
                { type: 'degree', level: 'PhD' }
            ],
            beforeAge: 80
        }
    }
];

export class ChallengeTracker {
    constructor(challenge) {
        this.challenge = challenge;
        this.startAge = 0;
        this.progress = {};
        this.completed = false;
        this.failed = false;
        this.failureReason = null;
    }

    checkWinCondition(person) {
        const { winConditions } = this.challenge;

        // Age limit check
        if (winConditions.beforeAge && person.age > winConditions.beforeAge) {
            this.failed = true;
            this.failureReason = `Failed to complete before age ${winConditions.beforeAge}`;
            return false;
        }

        let conditionMet = false;

        switch (winConditions.type) {
            case 'money':
                conditionMet = person.getTotalEstateValue() >= winConditions.target;
                break;

            case 'fame':
                if (winConditions.afterAbdication && person.royalty) {
                    return false; // Must abdicate first
                }
                conditionMet = person.fame >= winConditions.target;
                break;

            case 'military_rank':
                if (person.job && person.job.isMilitary) {
                    conditionMet = person.job.title === winConditions.targetRank;
                }
                break;

            case 'mafia':
                if (person.mafia && person.mafia.rank) {
                    const isBoss = person.mafia.rank === 'boss';
                    const noJail = winConditions.noJailTime ? person.prisonSentence === 0 && !person.isInPrison : true;
                    conditionMet = isBoss && noJail;
                }
                break;

            case 'longevity':
                const statsOk = Object.keys(winConditions.minStats).every(stat =>
                    person[stat] >= winConditions.minStats[stat]
                );
                conditionMet = person.age >= winConditions.targetAge && statsOk;
                break;

            case 'business':
                const hasEnough = person.companies.length >= winConditions.ownCompanies;
                const hasPublic = person.companies.some(c => c.isPublic);
                conditionMet = hasEnough && (winConditions.hasPublicCompany ? hasPublic : true);
                break;

            case 'combined':
                conditionMet = winConditions.requirements.every(req => {
                    switch (req.type) {
                        case 'money':
                            return person.getTotalEstateValue() >= req.target;
                        case 'children':
                            return person.relationships.filter(r => r.type === 'Child').length >= req.target;
                        case 'married':
                            return person.relationships.some(r => r.type === 'Spouse');
                        case 'stats':
                            return Object.keys(req.minStats).every(stat =>
                                person[stat] >= req.minStats[stat]
                            );
                        case 'degree':
                            return person.degrees && person.degrees.some(d => d.level === req.level);
                        default:
                            return false;
                    }
                });
                break;
        }

        if (conditionMet) {
            this.completed = true;
            this.completionAge = person.age;
        }

        return conditionMet;
    }

    getProgressString(person) {
        const { winConditions } = this.challenge;

        switch (winConditions.type) {
            case 'money':
                const netWorth = person.getTotalEstateValue();
                return `$${netWorth.toLocaleString()} / $${winConditions.target.toLocaleString()}`;

            case 'fame':
                return `${person.fame} / ${winConditions.target} fame`;

            case 'combined':
                const met = winConditions.requirements.filter(req => {
                    // Check each requirement
                    switch (req.type) {
                        case 'money':
                            return person.getTotalEstateValue() >= req.target;
                        case 'children':
                            return person.relationships.filter(r => r.type === 'Child').length >= req.target;
                        default:
                            return false;
                    }
                }).length;
                return `${met} / ${winConditions.requirements.length} requirements`;

            default:
                return 'In Progress';
        }
    }
}

export function getChallengeById(id) {
    return CHALLENGES.find(c => c.id === id);
}
