export const MAFIA_FAMILIES = [
    { id: 'gambino', name: 'Gambino Family', reputation: 100 },
    { id: 'genovese', name: 'Genovese Family', reputation: 90 },
    { id: 'lucchese', name: 'Lucchese Family', reputation: 80 },
    { id: 'colombo', name: 'Colombo Family', reputation: 70 },
    { id: 'bonanno', name: 'Bonanno Family', reputation: 75 }
];

export const MAFIA_RANKS = [
    { id: 'associate', title: 'Associate', pay: 0, standingReq: 0 },
    { id: 'soldier', title: 'Soldier', pay: 20000, standingReq: 20 },
    { id: 'capo', title: 'Capo', pay: 50000, standingReq: 50 },
    { id: 'underboss', title: 'Underboss', pay: 100000, standingReq: 80 },
    { id: 'godfather', title: 'Godfather', pay: 500000, standingReq: 100 }
];

export const MAFIA_ACTIONS = [
    { id: 'extort', title: 'Extort Business', risk: 30, payout: [1000, 5000], notoriety: 5 },
    { id: 'collect', title: 'Collect Protection Money', risk: 10, payout: [500, 2000], notoriety: 2 },
    { id: 'whack', title: 'Whack a Snitch', risk: 80, payout: [0, 0], notoriety: 20 }, // High risk, high notoriety
    { id: 'steal_cars', title: 'Grand Theft Auto', risk: 40, payout: [2000, 15000], notoriety: 10 }
];
