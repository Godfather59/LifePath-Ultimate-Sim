// Deck of cards
const SUITS = ['♠', '♥', '♦', '♣'];
const RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

export const createDeck = () => {
    let deck = [];
    for (let s of SUITS) {
        for (let r of RANKS) {
            deck.push({ suit: s, rank: r, value: getValue(r) });
        }
    }
    return shuffle(deck);
};

const getValue = (rank) => {
    if (['J', 'Q', 'K'].includes(rank)) return 10;
    if (rank === 'A') return 11;
    return parseInt(rank);
};

const shuffle = (array) => {
    return array.sort(() => Math.random() - 0.5);
};

export const calculateScore = (hand) => {
    let score = 0;
    let aces = 0;
    for (let card of hand) {
        score += card.value;
        if (card.rank === 'A') aces++;
    }
    while (score > 21 && aces > 0) {
        score -= 10;
        aces--;
    }
    return score;
};

// Horse Racing
export const HORSES = [
    { id: 1, name: 'Lucky Strike', odds: 2 }, // 2:1 payout (approx 33-40% win chance)
    { id: 2, name: 'Thunderbolt', odds: 5 }, // 5:1 (approx 15-20%)
    { id: 3, name: 'Slowpoke', odds: 10 },   // 10:1 (Longshot)
    { id: 4, name: 'Majestic', odds: 3 },
    { id: 5, name: 'Glue Factory', odds: 50 }, // The 50:1 dream
];

export const runRace = () => {
    // Weighted random winner based on odds
    // Simple version: strictly random or biased? 
    // Let's do a simple biased roll. Lower odds = higher weight.
    // Weight = 1 / odds

    let candidates = [];
    HORSES.forEach(h => {
        let count = Math.ceil(100 / h.odds); // 2:1 -> 50 tickets, 50:1 -> 2 tickets
        for (let i = 0; i < count; i++) candidates.push(h.id);
    });

    const winnerId = candidates[Math.floor(Math.random() * candidates.length)];
    return winnerId;
};

// Lottery
export const playLottery = () => {
    // 1 in 10,000 chance for this mini clone scale
    const roll = Math.floor(Math.random() * 10000);
    return roll === 777;
};
