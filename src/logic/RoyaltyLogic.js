export const ROYAL_COUNTRIES = [
    "United Kingdom", "Japan", "Spain", "Saudi Arabia", "Thailand", "Sweden", "Netherlands", "Belgium"
];

export const ROYAL_TITLES = {
    male: [
        { id: 'king', title: 'King', respect: 100 },
        { id: 'prince', title: 'Prince', respect: 90 },
        { id: 'duke', title: 'Duke', respect: 80 },
        { id: 'marquess', title: 'Marquess', respect: 70 },
        { id: 'earl', title: 'Earl', respect: 60 },
        { id: 'viscount', title: 'Viscount', respect: 50 },
        { id: 'baron', title: 'Baron', respect: 40 }
    ],
    female: [
        { id: 'queen', title: 'Queen', respect: 100 },
        { id: 'princess', title: 'Princess', respect: 90 },
        { id: 'duchess', title: 'Duchess', respect: 80 },
        { id: 'marchioness', title: 'Marchioness', respect: 70 },
        { id: 'countess', title: 'Countess', respect: 60 },
        { id: 'viscountess', title: 'Viscountess', respect: 50 },
        { id: 'baroness', title: 'Baroness', respect: 40 }
    ]
};

export function getTitle(gender, rankIndex) {
    const list = gender === 'Female' ? ROYAL_TITLES.female : ROYAL_TITLES.male;
    return list[rankIndex] || list[list.length - 1];
}
