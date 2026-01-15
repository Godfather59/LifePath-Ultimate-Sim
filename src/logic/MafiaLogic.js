export const MAFIA_FAMILIES = [
    { id: 'sicilian', name: 'The Sicilian Mafia', difficulty: 'Hard', respect_req: 50 },
    { id: 'russian', name: 'The Russian Mob', difficulty: 'Hard', respect_req: 40 },
    { id: 'triad', name: 'The Triads', difficulty: 'Medium', respect_req: 30 },
    { id: 'cartel', name: 'The Cartel', difficulty: 'Extreme', respect_req: 60 },
    { id: 'yakuza', name: 'The Yakuza', difficulty: 'Medium', respect_req: 40 },
    { id: 'mob', name: 'The Irish Mob', difficulty: 'Easy', respect_req: 20 }
];

export const MAFIA_RANKS = [
    { id: 'associate', title: 'Associate', salary: 0, standing_req: 0 },
    { id: 'soldier', title: 'Soldier', salary: 30000, standing_req: 30 },
    { id: 'capo', title: 'Caporegime', salary: 80000, standing_req: 60 },
    { id: 'underboss', title: 'Underboss', salary: 200000, standing_req: 85 },
    { id: 'godfather', title: 'Godfather', salary: 1000000, standing_req: 100 } // Hard to get
];

export const MAFIA_ACTIONS = [
    {
        id: 'extort',
        label: 'Extort Business',
        risk: 0.2, // Chance of arrest/failure
        reward_min: 1000,
        reward_max: 5000,
        standing_gain: 2,
        notoriety_gain: 3
    },
    {
        id: 'steal_car',
        label: 'Steal Car',
        risk: 0.3,
        reward_min: 5000,
        reward_max: 20000,
        standing_gain: 3,
        notoriety_gain: 5
    },
    {
        id: 'burglary',
        label: 'Burglary',
        risk: 0.25,
        reward_min: 2000,
        reward_max: 10000,
        standing_gain: 2,
        notoriety_gain: 4
    },
    {
        id: 'whack',
        label: 'Whack Someone',
        risk: 0.6,
        reward_min: 0,
        reward_max: 0, // No money, just respect
        standing_gain: 15,
        notoriety_gain: 20,
        min_rank: 'soldier'
    },
    {
        id: 'snitch',
        label: 'Become an Informant',
        risk: 0.8, // Chance of being killed
        reward_min: 0,
        reward_max: 0,
        standing_gain: -100,
        notoriety_gain: 0
    }
];

export function performMafiaCrime(person, actionId) {
    const action = MAFIA_ACTIONS.find(a => a.id === actionId);
    if (!action) return null;

    // Check Rank Requirement
    if (action.min_rank) {
        const myRankIndex = MAFIA_RANKS.findIndex(r => r.id === person.mafia.rank);
        const reqRankIndex = MAFIA_RANKS.findIndex(r => r.id === action.min_rank);
        if (myRankIndex < reqRankIndex) {
            return {
                success: false,
                text: `You need to be a ${MAFIA_RANKS[reqRankIndex].title} to do this.`,
                money: 0
            };
        }
    }

    const roll = Math.random();
    // Risk modifiers could go here (e.g. smarts, notoriety)

    if (roll < action.risk) {
        // Failed / Caught
        return {
            success: false,
            caught: Math.random() < 0.5, // 50/50 caught vs just failed
            text: `You failed to ${action.label.toLowerCase()}.`,
            money: 0
        };
    } else {
        // Success
        const money = Math.floor(Math.random() * (action.reward_max - action.reward_min + 1)) + action.reward_min;
        return {
            success: true,
            text: `Success! You earned $${money.toLocaleString()} from ${action.label.toLowerCase()}.`,
            money: money,
            standing: action.standing_gain,
            notoriety: action.notoriety_gain
        };
    }
}
