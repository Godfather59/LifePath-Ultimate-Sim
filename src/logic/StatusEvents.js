// Status-specific events for Royal, Military, Celebrity, and Mafia characters

export const ROYAL_EVENTS = [
    {
        text: "The public adores you! Your approval rating has soared.",
        type: "good",
        effects: { happiness: 10 },
        customEffect: (person) => {
            if (person.royalty) person.royalty.respect = Math.min(100, person.royalty.respect + 15);
        }
    },
    {
        text: "A scandal has emerged about your private life. The tabloids are having a field day.",
        type: "bad",
        effects: { happiness: -15 },
        customEffect: (person) => {
            if (person.royalty) person.royalty.respect = Math.max(0, person.royalty.respect - 20);
            person.fame = Math.max(0, person.fame - 10);
        }
    },
    {
        text: "You attended a state dinner with foreign dignitaries. It went splendidly!",
        type: "good",
        effects: { happiness: 5 },
        customEffect: (person) => {
            if (person.royalty) person.royalty.respect = Math.min(100, person.royalty.respect + 5);
        }
    },
    {
        text: "Protesters gathered outside the palace demanding reform.",
        type: "neutral",
        effects: { happiness: -5 },
        customEffect: (person) => {
            if (person.royalty) person.royalty.respect = Math.max(0, person.royalty.respect - 10);
        }
    },
    {
        text: "You were crowned monarch! Long live the King/Queen!",
        type: "good",
        effects: { happiness: 30 },
        condition: (person) => person.royalty && person.age >= 25 && Math.random() < 0.05,
        customEffect: (person) => {
            if (person.royalty) {
                person.royalty.title = person.gender === 'Male' ? 'King' : 'Queen';
                person.royalty.isReigning = true;
                person.money += 5000000;
            }
        }
    },
    {
        text: "A distant royal cousin challenged your claim to the throne!",
        type: "bad",
        effects: { happiness: -10, stress: 20 },
        condition: (person) => person.royalty && person.royalty.isReigning
    }
];

export const MILITARY_EVENTS = [
    {
        text: "You received a medal for bravery in service!",
        type: "good",
        effects: { happiness: 15 },
        customEffect: (person) => {
            person.fame = Math.min(100, person.fame + 10);
        }
    },
    {
        text: "Your unit was commended for exceptional performance during exercises.",
        type: "good",
        effects: { happiness: 10 },
        customEffect: (person) => {
            if (person.job && person.job.isMilitary) {
                person.job.performance = Math.min(100, person.job.performance + 15);
            }
        }
    },
    {
        text: "You suffered a minor injury during training.",
        type: "bad",
        effects: { health: -10, happiness: -5 }
    },
    {
        text: "Your commanding officer singled you out for poor conduct.",
        type: "bad",
        effects: { happiness: -10 },
        customEffect: (person) => {
            if (person.job && person.job.isMilitary) {
                person.job.performance = Math.max(0, person.job.performance - 20);
            }
        }
    },
    {
        text: "You were selected for a special operations mission. It was classified and dangerous.",
        type: "neutral",
        effects: { stress: 15 }
    },
    {
        text: "A fellow soldier became your lifelong friend during deployment.",
        type: "good",
        effects: { happiness: 15 }
    }
];

export const CELEBRITY_EVENTS = [
    {
        text: "Paparazzi caught you at a restaurant. The photos went viral!",
        type: "neutral",
        effects: {},
        customEffect: (person) => {
            person.fame = Math.min(100, person.fame + 5);
        }
    },
    {
        text: "A major brand offered you a lucrative endorsement deal!",
        type: "good",
        effects: { happiness: 20 },
        condition: (person) => person.fame >= 70,
        customEffect: (person) => {
            const endorsement = Math.floor(Math.random() * 500000) + 100000;
            person.money += endorsement;
            person.logEvent(`You signed an endorsement deal worth $${endorsement.toLocaleString()}!`, "good");
        }
    },
    {
        text: "You were caught in a compromising situation. Your reputation took a hit.",
        type: "bad",
        effects: { happiness: -20 },
        customEffect: (person) => {
            person.fame = Math.max(0, person.fame - 15);
        }
    },
    {
        text: "Fans mobbed you at the airport. It was overwhelming!",
        type: "neutral",
        effects: { stress: 10, happiness: 5 }
    },
    {
        text: "You won a prestigious award for your work!",
        type: "good",
        effects: { happiness: 25 },
        condition: (person) => person.fame >= 80,
        customEffect: (person) => {
            person.fame = Math.min(100, person.fame + 10);
        }
    },
    {
        text: "You were invited to an exclusive celebrity gala.",
        type: "good",
        effects: { happiness: 10 }
    }
];

export const MAFIA_EVENTS = [
    {
        text: "You successfully completed a job for the family. The Don is pleased.",
        type: "good",
        effects: { happiness: 10 },
        customEffect: (person) => {
            if (person.mafia && person.mafia.family) {
                person.mafia.standing = Math.min(100, person.mafia.standing + 15);
                const payment = Math.floor(Math.random() * 20000) + 5000;
                person.money += payment;
            }
        }
    },
    {
        text: "A rival family sent you a threatening message.",
        type: "bad",
        effects: { stress: 20, happiness: -10 }
    },
    {
        text: "The FBI is investigating your organization. Keep a low profile.",
        type: "bad",
        effects: { stress: 25 },
        customEffect: (person) => {
            person.notoriety = Math.min(100, person.notoriety + 10);
        }
    },
    {
        text: "You attended a secret meeting with other made men.",
        type: "neutral",
        effects: {}
    },
    {
        text: "One of your associates betrayed the family. You were ordered to handle it.",
        type: "bad",
        effects: { happiness: -15, karma: -20 }
    },
    {
        text: "The Don personally thanked you for your loyalty and service.",
        type: "good",
        effects: { happiness: 20 },
        customEffect: (person) => {
            if (person.mafia && person.mafia.family) {
                person.mafia.standing = Math.min(100, person.mafia.standing + 20);
            }
        }
    }
];
