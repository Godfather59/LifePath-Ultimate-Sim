export const ACTIVITIES = [
    {
        id: 'gym',
        title: 'Go to the Gym',
        cost: 50,
        effects: { health: 2, looks: 1, happiness: 1, stress: -5 },
        text: "You worked out at the gym.",
        type: "good"
    },
    {
        id: 'meditate',
        title: 'Meditate',
        cost: 0,
        effects: { happiness: 3, health: 1, stress: -10 },
        text: "You meditated and found inner peace.",
        type: "good"
    },
    {
        id: 'library',
        title: 'Go to Library',
        cost: 0,
        effects: { smarts: 2, happiness: 1 },
        text: "You read a book at the library.",
        type: "good"
    },
    {
        id: 'club',
        title: 'Go Clubbing',
        cost: 100,
        effects: { happiness: 5, health: -1, stress: -5 },
        text: "You danced all night at the club!",
        type: "good"
    },
    {
        id: 'plastic_surgery',
        title: 'Plastic Surgery',
        cost: 5000,
        effects: { looks: 20, happiness: 5 },
        text: "You got a nose job. You look fantastic!",
        type: "good"
    },
    {
        id: 'find_date',
        title: 'Find a Date',
        cost: 100, // Cost of a dating app subscription or night out
        effects: { happiness: 2 },
        text: "You went out looking for love...",
        type: "neutral",
        isDating: true // Special flag for logic
    },
    {
        id: 'commit_crime_burglary',
        title: 'Burgle a House',
        cost: 0,
        effects: { stress: 10 },
        text: "You are attempting to break into a house...",
        type: "neutral",
        isCrime: true,
        crimeType: 'burglary',
        effects: { stress: 10, karma: -10 }
    },
    {
        id: 'commit_crime_robbery',
        title: 'Rob a Bank',
        cost: 0,
        effects: { stress: 50 },
        text: "You are attempting to rob a bank! HIGH RISK.",
        type: "neutral",
        isCrime: true,
        crimeType: 'robbery',
        effects: { stress: 50, karma: -30 }
    },
    {
        id: 'gamble_lottery',
        title: 'Play Lottery',
        cost: 10,
        effects: { happiness: 1 },
        text: "You bought a lottery ticket...",
        type: "neutral",
        isGamble: true
    },
    {
        id: 'gamble_horse',
        title: 'Horse Races',
        cost: 100,
        effects: { happiness: 5, stress: 5 },
        text: "You bet on a horse named 'Lucky Star'...",
        type: "neutral",
        isGamble: true
    },
    {
        id: 'adopt_pet_dog',
        title: 'Adopt a Dog',
        cost: 500,
        effects: { happiness: 20, health: 2, karma: 5, stress: -5 },
        text: "You adopted a playful puppy!",
        type: "good"
    },
    {
        id: 'adopt_pet_cat',
        title: 'Adopt a Cat',
        cost: 200,
        effects: { happiness: 15, stress: -5, karma: 5 },
        text: "You adopted a cute kitten.",
        type: "good"
    },
    {
        id: 'travel_budget',
        title: 'Budget Travel',
        cost: 1000,
        effects: { happiness: 10, stress: -10 },
        text: "You went backpacking!",
        type: "good"
    },
    {
        id: 'travel_luxury',
        title: 'Luxury Cruise',
        cost: 10000,
        effects: { happiness: 30, stress: -20 },
        text: "You relaxed on a world cruise.",
        type: "good"
    }
];
