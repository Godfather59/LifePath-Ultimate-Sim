export const POLITICAL_OFFICES = [
    { id: 'school_board', title: 'School Board Director', salary: 20000, term: 4, minAge: 18, cost: 5000, difficulty: 1, prestige: 20 },
    { id: 'mayor', title: 'Mayor', salary: 120000, term: 4, minAge: 25, cost: 50000, difficulty: 3, prestige: 50 },
    { id: 'governor', title: 'Governor', salary: 180000, term: 4, minAge: 30, cost: 500000, difficulty: 6, prestige: 80 },
    { id: 'president', title: 'President', salary: 400000, term: 4, minAge: 35, cost: 10000000, difficulty: 10, prestige: 100 }
];

export const CAMPAIGN_ACTIONS = [
    { id: 'rally', title: 'Hold a Rally', cost: 1000, impact: 5, risk: 2 },
    { id: 'fundraise', title: 'Fundraising Event', cost: 500, impact: 2, risk: 0, gain: true }, // Special logic for gain
    { id: 'interview', title: 'TV Interview', cost: 0, impact: 8, risk: 20 },
    { id: 'attack', title: 'Attack Opponent', cost: 5000, impact: 15, risk: 40 },
    { id: 'bribe', title: 'Bribe Officials', cost: 50000, impact: 25, risk: 80 }
];
