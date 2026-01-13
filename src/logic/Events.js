export const LIFE_EVENTS = [
    // --- HEALTH & SICKNESS ---
    {
        id: 'chest_pain',
        trigger: (person) => person.health < 40 && Math.random() < 0.2,
        text: "You are experiencing severe chest pains.",
        effects: { health: -15, happiness: -20 },
        type: "bad"
    },
    {
        id: 'cold',
        trigger: (person) => Math.random() < 0.1,
        text: "You have caught a nasty cold.",
        effects: { health: -5, happiness: -5 },
        type: "bad"
    },
    {
        id: 'migraine',
        trigger: (person) => Math.random() < 0.05,
        text: "You have a splitting migraine.",
        effects: { health: -2, happiness: -10 },
        type: "bad"
    },

    // --- WINDFALLS & LUCK ---
    {
        id: 'found_money',
        trigger: (person) => Math.random() < 0.05,
        text: "You found $100 on the street!",
        effects: { money: 100, happiness: 10 },
        type: "good"
    },
    {
        id: 'lottery_win_small',
        trigger: (person) => person.age > 18 && Math.random() < 0.001,
        text: "You won $5,000 in a scratch-off lottery!",
        effects: { money: 5000, happiness: 40 },
        type: "good"
    },

    // --- SCHOOL & CHILDHOOD ---
    {
        id: 'studied_hard',
        trigger: (person) => person.age > 5 && person.age < 22 && Math.random() < 0.3,
        text: "You studied hard at school.",
        effects: { smarts: 5, happiness: -2, stress: 5 },
        type: "good"
    },
    {
        id: 'bullied',
        trigger: (person) => person.age > 6 && person.age < 18 && Math.random() < 0.1,
        text: "A bully made fun of your shoes at school.",
        effects: { happiness: -15, stress: 10 },
        type: "bad"
    },
    {
        id: 'parents_fighting',
        trigger: (person) => person.age < 12 && Math.random() < 0.1,
        text: "Your parents are fighting loudly.",
        effects: { happiness: -10, stress: 10 },
        type: "bad"
    },
    {
        id: 'family_vacation',
        trigger: (person) => person.age < 18 && Math.random() < 0.1,
        text: "Your family went on a trip to Disney World!",
        effects: { happiness: 30 },
        type: "good"
    },
    {
        id: 'lost_tooth',
        trigger: (person) => person.age > 4 && person.age < 10 && Math.random() < 0.3,
        text: "You lost a baby tooth! The Tooth Fairy left $5.",
        effects: { money: 5, happiness: 5 },
        type: "good"
    },
    {
        id: 'class_clown',
        trigger: (person) => person.age > 6 && person.age < 15 && Math.random() < 0.1,
        text: "You made the whole class laugh.",
        effects: { happiness: 10, smarts: -1, looks: 1 },
        type: "good"
    },
    {
        id: 'teacher_scolded',
        trigger: (person) => person.age > 6 && person.age < 18 && Math.random() < 0.1,
        text: "Your teacher scolded you in front of everyone.",
        effects: { happiness: -20, smarts: 2 },
        type: "bad"
    },
    {
        id: 'first_kiss',
        trigger: (person) => person.age > 12 && person.age < 18 && Math.random() < 0.15,
        text: "You had your first kiss behind the bleachers.",
        effects: { happiness: 25 },
        type: "good"
    },
    {
        id: 'acne',
        trigger: (person) => person.age > 13 && person.age < 19 && Math.random() < 0.3,
        text: "You have a terrible breakout of acne.",
        effects: { looks: -10, happiness: -10 },
        type: "bad"
    },

    // --- SCHOOL & YOUTH ---
    {
        id: 'cheating_test',
        trigger: (person) => person.age > 10 && person.age < 18 && Math.random() < 0.1,
        text: "You didn't study for your math test. Do you want to cheat?",
        choices: [
            { text: "Cheat off neighbor", effects: { smarts: -2, stress: 5 }, outcomeText: "You got caught! Detention.", type: "bad" },
            { text: "Guess honestly", effects: { smarts: 2, happiness: -5 }, outcomeText: "You managed to scrape a C-.", type: "neutral" }
        ]
    },
    {
        id: 'prom_invite',
        trigger: (person) => person.age > 15 && person.age < 18 && Math.random() < 0.15,
        text: "It's Prom season! Do you want to ask your crush?",
        choices: [
            { text: "Ask them!", effects: { happiness: 20 }, outcomeText: "They said YES! Best night ever.", type: "good" },
            { text: "Stay home", effects: { happiness: -5 }, outcomeText: "You played video games all night.", type: "neutral" }
        ]
    },
    {
        id: 'principal_office',
        trigger: (person) => person.age > 6 && person.age < 18 && Math.random() < 0.05,
        text: "You got sent to the Principal's office for talking back.",
        type: "bad",
        effects: { happiness: -10, smarts: -1 }
    },
    {
        id: 'viral_video',
        trigger: (person) => person.age > 12 && Math.random() < 0.05,
        text: "You filmed a funny video of your cat. Post it?",
        choices: [
            { text: "Post it!", effects: { fame: 5, happiness: 10 }, outcomeText: "It went viral! 500k views!", type: "good" },
            { text: "Delete it", effects: { happiness: 0 }, outcomeText: "Probably for the best.", type: "neutral" }
        ]
    },

    // --- WORK & CAREER ---
    {
        id: 'annoying_coworker',
        trigger: (person) => person.job && Math.random() < 0.1,
        text: "A coworker, Karen, keeps stealing your lunch.",
        choices: [
            { text: "Report her", effects: { happiness: 5, stress: -5 }, outcomeText: "HR gave her a warning.", type: "good" },
            { text: "Put laxatives in it", effects: { happiness: 20, karma: -20 }, outcomeText: "She ran to the bathroom screaming.", type: "good" }
        ]
    },
    {
        id: 'business_trip',
        trigger: (person) => person.job && Math.random() < 0.05,
        text: "Boss wants you to go on a boring conference trip to Ohio.",
        choices: [
            { text: "Go", effects: { money: 1000, stress: 10 }, outcomeText: "You earned a per diem bonus.", type: "good" },
            { text: "Fake sick", effects: { happiness: 10, stress: -5 }, outcomeText: "You stayed home and watched Netflix.", type: "good" }
        ]
    },
    // --- ADULT DRAMA ---
    {
        id: 'identity_theft',
        trigger: (person) => person.age > 25 && Math.random() < 0.02,
        text: "Someone opened 5 credit cards in your name!",
        effects: { money: -2000, happiness: -20, stress: 30 },
        type: "bad"
    },
    {
        id: 'junkie_neighbor',
        trigger: (person) => person.age > 20 && Math.random() < 0.05,
        text: "Your neighbor is asking for 'sugar' at 3 AM. They look rough.",
        effects: { happiness: -5, stress: 10 },
        type: "bad"
    },
    {
        id: 'alien_abduction',
        trigger: (person) => Math.random() < 0.001,
        text: "A bright light wakes you up... ALIENS?!",
        choices: [
            { text: "Scream", effects: { health: -10, stress: 50 }, outcomeText: "They probed you and dumped you in a cornfield.", type: "bad" },
            { text: "communicate", effects: { smarts: 50, happiness: 20 }, outcomeText: "They gave you knowledge of the universe.", type: "good" }
        ]
    },

    // --- HEALTH ---
    {
        id: 'broken_arm',
        trigger: (person) => Math.random() < 0.03,
        text: "You tripped over your own feet and broke your arm.",
        effects: { health: -20, happiness: -20 },
        type: "bad"
    },
    {
        id: 'food_poisoning',
        trigger: (person) => Math.random() < 0.05,
        text: "That sushi smelled funny. Now you are puking.",
        effects: { health: -10, happiness: -15 },
        type: "bad"
    }
];

export const INITIAL_EVENTS = [
    (person) => `You were born a ${person.gender} in a hospital.`,
    (person) => `Your name is ${person.getFullName()}.`
];
