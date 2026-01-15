// Celebrity and Fame mechanics

export const ENDORSEMENT_DEALS = [
    {
        id: 'clothing_brand',
        name: 'Clothing Brand Partnership',
        baseValue: 250000,
        fameRequired: 70,
        duration: 1 // years
    },
    {
        id: 'perfume_line',
        name: 'Signature Perfume Line',
        baseValue: 500000,
        fameRequired: 80,
        duration: 2
    },
    {
        id: 'tech_sponsor',
        name: 'Tech Company Sponsorship',
        baseValue: 750000,
        fameRequired: 85,
        duration: 2
    },
    {
        id: 'luxury_car',
        name: 'Luxury Car Ambassador',
        baseValue: 1000000,
        fameRequired: 90,
        duration: 3
    },
    {
        id: 'global_brand',
        name: 'Global Brand Ambassador',
        baseValue: 2000000,
        fameRequired: 95,
        duration: 3
    }
];

export const SCANDAL_TYPES = [
    {
        id: 'cheating',
        text: "You were caught cheating on your partner! The scandal is all over social media.",
        fameImpact: -20,
        happinessImpact: -30,
        relationshipDamage: true
    },
    {
        id: 'substance',
        text: "Paparazzi caught you leaving a nightclub in a compromising state.",
        fameImpact: -15,
        happinessImpact: -20,
        healthImpact: -10
    },
    {
        id: 'feud',
        text: "You got into a public feud with another celebrity. The drama is trending.",
        fameImpact: 5, // Controversy = attention
        happinessImpact: -10
    },
    {
        id: 'lawsuit',
        text: "You're being sued! The legal battle is making headlines.",
        fameImpact: -10,
        happinessImpact: -25,
        moneyCost: 50000
    },
    {
        id: 'comeback',
        text: "After laying low, you made a triumphant public appearance! People love a redemption story.",
        fameImpact: 15,
        happinessImpact: 20,
        type: 'positive'
    }
];

export function calculateEndorsementValue(basePay, fame, looks) {
    // Higher fame and looks = better deals
    const fameMultiplier = fame / 100;
    const looksMultiplier = looks / 100;
    return Math.floor(basePay * fameMultiplier * looksMultiplier);
}

export function getPaparazziEvent(fame) {
    if (fame < 60) return null;

    const events = [
        {
            text: "Paparazzi ambushed you at a coffee shop. You handled it gracefully.",
            type: "neutral",
            fameChange: 2
        },
        {
            text: "A photographer followed you all day. You lost them in traffic.",
            type: "bad",
            stressIncrease: 10
        },
        {
            text: "You posed for some paparazzi photos. They'll be in magazines tomorrow!",
            type: "good",
            fameChange: 5,
            happinessChange: 5
        },
        {
            text: "Paparazzi caught you having a bad day. The unflattering photos went viral.",
            type: "bad",
            fameChange: -5,
            happinessChange: -10
        }
    ];

    return events[Math.floor(Math.random() * events.length)];
}
