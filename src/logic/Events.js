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
        trigger: (person) => person.age > 6 && Math.random() < 0.05,
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
    },

    // --- RELATIONSHIPS (New Section) ---
    {
        id: 'anniversary_forgot',
        trigger: (person) => {
            const partner = person.relationships.find(r => r.type === 'Spouse' || r.type === 'Partner');
            return partner && Math.random() < 0.05;
        },
        text: "It was your anniversary yesterday... and you forgot.",
        choices: [
            { text: "Apologize profusely", effects: { happiness: -10, money: -200 }, outcomeText: "You bought expensive flowers. They still mad.", type: "neutral" },
            { text: "Pretend you didn't", effects: { smarts: -5 }, outcomeText: "They saw right through you. Sleeping on couch.", type: "bad" }
        ]
    },
    {
        id: 'inLaw_visit',
        trigger: (person) => {
            const partner = person.relationships.find(r => r.type === 'Spouse');
            return partner && Math.random() < 0.05;
        },
        text: "Your in-laws are coming to visit for the weekend. They hate your cooking.",
        effects: { stress: 15, happiness: -5 },
        type: "neutral"
    },
    {
        id: 'child_drawing',
        trigger: (person) => {
            const child = person.relationships.find(r => r.type === 'Child' && r.age > 3 && r.age < 10);
            return child && Math.random() < 0.1;
        },
        text: "Your child drew a picture of you. It looks like a potato.",
        effects: { happiness: 10 },
        type: "good"
    },

    // --- NEW EVENTS ---

    // Childhood
    {
        id: 'ate_glue',
        trigger: (person) => person.age < 8 && Math.random() < 0.05,
        text: "You got curious in art class and ate a stick of glue.",
        effects: { health: -2, smarts: -1 },
        type: "neutral"
    },
    {
        id: 'stray_dog',
        trigger: (person) => person.age > 5 && person.age < 12 && Math.random() < 0.03,
        text: "You found a stray dog on the way home! Can you keep it?",
        choices: [
            { text: "Beg parents", effects: { happiness: 20 }, outcomeText: "They said YES! You named him Buster.", type: "good" },
            { text: "Leave it", effects: { happiness: -10 }, outcomeText: "You walked away feeling sad.", type: "bad" }
        ]
    },
    {
        id: 'imaginary_friend',
        trigger: (person) => person.age > 3 && person.age < 7 && Math.random() < 0.1,
        text: "You made a new friend named 'Mr. Sparkles'. No one else can see him.",
        effects: { happiness: 10, smarts: -1 },
        type: "neutral"
    },
    {
        id: 'lost_in_store',
        trigger: (person) => person.age > 2 && person.age < 7 && Math.random() < 0.05,
        text: "You got lost in the grocery store! The intercom called your name.",
        effects: { happiness: -10, stress: 5 },
        type: "bad"
    },
    {
        id: 'eat_vegetables',
        trigger: (person) => person.age > 3 && person.age < 10 && Math.random() < 0.1,
        text: "Your parents are forcing you to eat broccoli. It smells like feet.",
        choices: [
            { text: "Eat it", effects: { health: 2, happiness: -5 }, outcomeText: "You choked it down. Gross.", type: "neutral" },
            { text: "Throw it", effects: { happiness: 5, health: 0 }, outcomeText: "You threw it on the floor! Timeout!", type: "bad" }
        ]
    },
    {
        id: 'treehouse_build',
        trigger: (person) => person.age > 4 && person.age < 12 && Math.random() < 0.05,
        text: "Your dad built a treehouse in the backyard!",
        effects: { happiness: 15 },
        type: "good"
    },
    {
        id: 'scraped_knee',
        trigger: (person) => person.age > 2 && person.age < 10 && Math.random() < 0.1,
        text: "You fell off your bike and scraped your knee.",
        effects: { health: -2, happiness: -5 },
        type: "bad"
    },
    {
        id: 'school_play',
        trigger: (person) => person.age > 6 && person.age < 12 && Math.random() < 0.05,
        text: "You got the lead role in the school play!",
        effects: { happiness: 20, smarts: 2, fame: 5 },
        type: "good"
    },
    {
        id: 'chicken_pox',
        trigger: (person) => person.age > 1 && person.age < 10 && Math.random() < 0.03,
        text: "You caught the Chicken Pox. You are incredibly itchy.",
        effects: { health: -10, happiness: -10 },
        type: "bad"
    },
    {
        id: 'ice_cream_truck',
        trigger: (person) => person.age > 3 && person.age < 15 && Math.random() < 0.1,
        text: "The music of the Ice Cream Truck is heard in the distance.",
        choices: [
            { text: "Chase it", effects: { happiness: 10, money: -5 }, outcomeText: "You got a SpongeBob popsicle.", type: "good" },
            { text: "Ignore", effects: { happiness: 0 }, outcomeText: "You saved your money.", type: "neutral" }
        ]
    },

    // Teen
    {
        id: 'vape_offer',
        trigger: (person) => person.age > 13 && person.age < 18 && Math.random() < 0.1,
        text: "The cool kids are vaping in the bathroom. They offer you a hit.",
        choices: [
            { text: "Try it", effects: { health: -5, happiness: 5 }, outcomeText: "You coughed everywhere, but they think you're cool.", type: "neutral" },
            { text: "Refuse", effects: { health: 0 }, outcomeText: "They called you a nerd.", type: "neutral" }
        ]
    },
    {
        id: 'skip_school',
        trigger: (person) => person.age > 14 && person.age < 18 && Math.random() < 0.1,
        text: "Your friends want to skip school to go to the mall.",
        choices: [
            { text: "Skip school", effects: { smarts: -2, happiness: 10 }, outcomeText: "You had a blast, but missed a test.", type: "mixed" },
            { text: "Go to class", effects: { smarts: 2, happiness: -5 }, outcomeText: "You learned about photosynthesis. Yay.", type: "neutral" }
        ]
    },
    {
        id: 'crush_reject',
        trigger: (person) => person.age > 12 && person.age < 19 && Math.random() < 0.05,
        text: "You worked up the courage to ask your crush out... and they laughed at you.",
        effects: { happiness: -30, stress: 10 },
        type: "bad"
    },
    {
        id: 'driving_test',
        trigger: (person) => person.age >= 16 && person.age < 19 && Math.random() < 0.15,
        text: "It's time for your driving test!",
        choices: [
            { text: "Take test", effects: { happiness: 20, smarts: 2 }, outcomeText: "You passed! License acquired.", type: "good" },
            { text: "Skip it", effects: { happiness: -5 }, outcomeText: "You're stuck riding the bus.", type: "neutral" }
        ]
    },
    {
        id: 'house_party',
        trigger: (person) => person.age > 15 && person.age < 19 && Math.random() < 0.1,
        text: "A popular kid is throwing a huge house party.",
        choices: [
            { text: "Go", effects: { happiness: 15, fame: 5 }, outcomeText: "It was legendary!", type: "good" },
            { text: "Study instead", effects: { smarts: 5, happiness: -5 }, outcomeText: "You aced the test, but missed the fun.", type: "neutral" }
        ]
    },
    {
        id: 'first_zit',
        trigger: (person) => person.age > 12 && person.age < 19 && Math.random() < 0.2,
        text: "A massive zit appeared on your nose right before school.",
        effects: { looks: -5, happiness: -10 },
        type: "bad"
    },
    {
        id: 'sneak_out',
        trigger: (person) => person.age > 14 && person.age < 18 && Math.random() < 0.05,
        text: "There's a concert tonight. Do you sneak out?",
        choices: [
            { text: "Sneak out", effects: { happiness: 20, stress: 5, karma: -5 }, outcomeText: "It was awesome! Detailed evaded parents.", type: "good" },
            { text: "Stay home", effects: { happiness: -5 }, outcomeText: "You have FOMO.", type: "neutral" }
        ]
    },
    {
        id: 'math_tutor',
        trigger: (person) => person.age > 12 && person.age < 17 && person.smarts < 50 && Math.random() < 0.1,
        text: "Your parents hired a math tutor because you're failing.",
        effects: { smarts: 5, stress: 5, happiness: -5 },
        type: "neutral"
    },
    {
        id: 'shoplifting_dare',
        trigger: (person) => person.age > 13 && person.age < 18 && Math.random() < 0.03,
        text: "Your 'friends' dare you to steal a candy bar.",
        choices: [
            { text: "Do it", effects: { karma: -10, stress: 10 }, outcomeText: "You did it. The rush was intense.", type: "mixed" },
            { text: "Chicken out", effects: { happiness: -5 }, outcomeText: "They called you a wimp.", type: "neutral" }
        ]
    },


    // Young Adult
    {
        id: 'frat_party',
        trigger: (person) => person.age > 18 && person.age < 23 && Math.random() < 0.1,
        text: "You went to a wild frat party last night.",
        effects: { health: -5, happiness: 10, stress: -5 },
        type: "good"
    },
    {
        id: 'all_nighter',
        trigger: (person) => person.education === 'University' && Math.random() < 0.15,
        text: "You pulled an all-nighter to study for finals.",
        effects: { smarts: 5, stress: 10, health: -2 },
        type: "neutral"
    },
    {
        id: 'first_apartment',
        trigger: (person) => person.age > 18 && person.age < 25 && Math.random() < 0.05,
        text: "You moved into your first cheap apartment. It has roaches.",
        effects: { happiness: -10, stress: 5, money: -500 },
        type: "bad"
    },
    {
        id: 'backpacking',
        trigger: (person) => person.age > 18 && person.age < 30 && Math.random() < 0.02,
        text: "You have an urge to backpack across Europe.",
        choices: [
            { text: "Go ($2k)", effects: { money: -2000, happiness: 30, smarts: 5 }, outcomeText: "Life changing experience!", type: "good" },
            { text: "Too poor", effects: { happiness: -5 }, outcomeText: "Maybe next year.", type: "neutral" }
        ]
    },

    // Adult
    {
        id: 'found_wallet',
        trigger: (person) => person.age > 18 && Math.random() < 0.03,
        text: "You found a loaded wallet on the sidewalk. It has $200 and an ID.",
        choices: [
            { text: "Return it", effects: { happiness: 10, karma: 20 }, outcomeText: "The owner was so grateful!", type: "good" },
            { text: "Keep the cash", effects: { money: 200, karma: -20 }, outcomeText: "Finders keepers!", type: "neutral" }
        ]
    },
    {
        id: 'witness_crime',
        trigger: (person) => person.age > 18 && Math.random() < 0.02,
        text: "You just saw a guy smashing a car window!",
        choices: [
            { text: "Call Police", effects: { karma: 10, stress: 5 }, outcomeText: "The police arrived and thanked you.", type: "good" },
            { text: "Walk away", effects: { stress: -5, karma: -5 }, outcomeText: "Not your problem.", type: "neutral" }
        ]
    },
    {
        id: 'traffic_jam',
        trigger: (person) => person.job && Math.random() < 0.1,
        text: "Stuck in brutal traffic on the way to work.",
        effects: { stress: 5, happiness: -5 },
        type: "neutral"
    },
    {
        id: 'coffee_spill',
        trigger: (person) => person.age > 18 && Math.random() < 0.05,
        text: "You spilled hot coffee all over your white shirt.",
        effects: { happiness: -5, stress: 2 },
        type: "bad"
    },
    {
        id: 'found_twenty',
        trigger: (person) => person.age > 6 && Math.random() < 0.05,
        text: "You found a $20 bill in your old jeans.",
        effects: { money: 20, happiness: 5 },
        type: "good"
    },
    {
        id: 'double_rainbow',
        trigger: (person) => Math.random() < 0.01,
        text: "You saw a double rainbow! What does it mean?",
        effects: { happiness: 15 },
        type: "good"
    },
    {
        id: 'bird_poop',
        trigger: (person) => Math.random() < 0.03,
        text: "A bird pooped directly on your head.",
        effects: { happiness: -10, looks: -1 },
        type: "bad"
    },
    {
        id: 'friend_loan',
        trigger: (person) => person.age > 21 && Math.random() < 0.04,
        text: "Your friend Steve wants to borrow $500 for his 'revolutionary' app idea.",
        choices: [
            { text: "Lend money", effects: { money: -500, karma: 5 }, outcomeText: "He says he'll pay you back... eventually.", type: "neutral" },
            { text: "Refuse", effects: { happiness: -5 }, outcomeText: "Steve is annoyed with you.", type: "neutral" }
        ]
    },
    {
        id: 'lottery_find',
        trigger: (person) => person.age > 18 && Math.random() < 0.01,
        text: "A gust of wind blew a lottery ticket right into your face. It's a winner!",
        effects: { money: 50, happiness: 10 },
        type: "good"
    },
    {
        id: 'jury_duty',
        trigger: (person) => person.age > 20 && person.age < 65 && Math.random() < 0.04,
        text: "You have been summoned for Jury Duty.",
        choices: [
            { text: "Serve", effects: { karma: 10, stress: 5, money: 100 }, outcomeText: "You did your civic duty.", type: "neutral" },
            { text: "Skip it", effects: { karma: -10, happiness: 5 }, outcomeText: "You threw the letter in the trash.", type: "bad" }
        ]
    },
    {
        id: 'bad_haircut',
        trigger: (person) => person.age > 15 && Math.random() < 0.05,
        text: "The barber completely messed up your hair.",
        effects: { looks: -10, happiness: -10 },
        type: "bad"
    },
    {
        id: 'crypto_scam',
        trigger: (person) => person.age > 20 && Math.random() < 0.03,
        text: "A 'friend' tells you about a guaranteed crypto coin that will moon.",
        choices: [
            { text: "Invest $1k", effects: { money: -1000, stress: 10 }, outcomeText: "It was a rug pull! You lost it all.", type: "bad" },
            { text: "Ignore", effects: { smarts: 2 }, outcomeText: "Smart move. It crashed to zero.", type: "good" }
        ]
    },

    // Work
    {
        id: 'bribe_offer',
        trigger: (person) => person.job && Math.random() < 0.02,
        text: "A shady client offers you a bribe to ignore protocol.",
        choices: [
            { text: "Take Bribe ($5k)", effects: { money: 5000, karma: -30, stress: 10 }, outcomeText: "You took the cash. Hope you don't get caught.", type: "bad" },
            { text: "Report them", effects: { happiness: 5, karma: 20 }, outcomeText: "Your boss praised your integrity.", type: "good" }
        ]
    },
    {
        id: 'office_prank',
        trigger: (person) => person.job && Math.random() < 0.05,
        text: "Someone put your stapler in Jell-O. Classic.",
        choices: [
            { text: "Laugh", effects: { happiness: 5 }, outcomeText: "It was pretty funny.", type: "good" },
            { text: "Rage", effects: { stress: 5, happiness: -5 }, outcomeText: "You yelled at the whole office.", type: "bad" }
        ]
    },
    {
        id: 'layoff_rumors',
        trigger: (person) => person.job && Math.random() < 0.05,
        text: "There are rumors of layoffs in your department.",
        effects: { stress: 15, happiness: -5 },
        type: "bad"
    },
    {
        id: 'office_romance',
        trigger: (person) => person.job && Math.random() < 0.03,
        text: "A cute coworker is flirting with you.",
        choices: [
            { text: "Flirt back", effects: { happiness: 10 }, outcomeText: "You have a new work spouse!", type: "good" },
            { text: "Keep it professional", effects: { smarts: 2 }, outcomeText: "You focused on your work.", type: "neutral" }
        ]
    },
    {
        id: 'broken_copier',
        trigger: (person) => person.job && Math.random() < 0.05,
        text: "The office copier is broken again. 'PC LOAD LETTER'?",
        effects: { stress: 5 },
        type: "neutral"
    },
    {
        id: 'work_bestie',
        trigger: (person) => person.job && Math.random() < 0.05,
        text: "You found a work bestie! Lunch is now fun.",
        effects: { happiness: 10, stress: -5 },
        type: "good"
    },
    {
        id: 'team_building',
        trigger: (person) => person.job && Math.random() < 0.05,
        text: "Mandatory team building exercise: Trust Falls.",
        choices: [
            { text: "Participate", effects: { stress: 5, karma: 2 }, outcomeText: "Dave dropped you.", type: "bad" },
            { text: "Skip it", effects: { stress: -2 }, outcomeText: "You hid in the bathroom.", type: "neutral" }
        ]
    },

    // Elderly
    {
        id: 'grandkids_visit',
        trigger: (person) => person.age > 60 && Math.random() < 0.1,
        text: "Your grandkids came to visit. They are extremely loud.",
        effects: { happiness: 15, stress: 5 },
        type: "good"
    },
    {
        id: 'memory_slip',
        trigger: (person) => person.age > 70 && Math.random() < 0.1,
        text: "You walked into a room and completely forgot why you were there.",
        effects: { smarts: -1 },
        type: "neutral"
    },
    {
        id: 'scam_call',
        trigger: (person) => person.age > 65 && Math.random() < 0.1,
        text: "Someone called claiming to be the IRS demanding gift cards.",
        choices: [
            { text: "Pay them", effects: { money: -500, smarts: -5 }, outcomeText: "You got scammed!", type: "bad" },
            { text: "Hang up", effects: { smarts: 2 }, outcomeText: "Not today, scammers.", type: "good" }
        ]
    },
    {
        id: 'retirement_hobby',
        trigger: (person) => person.age > 60 && !person.job && Math.random() < 0.1,
        text: "You're bored in retirement. Pick a hobby?",
        choices: [
            { text: "Gardening", effects: { happiness: 5, health: 2 }, outcomeText: "Your tomatoes are thriving!", type: "good" },
            { text: "Birdwatching", effects: { happiness: 5, stress: -5 }, outcomeText: "You saw a rare Blue Jay.", type: "good" }
        ]
    },
    {
        id: 'bad_hip',
        trigger: (person) => person.age > 70 && Math.random() < 0.1,
        text: "Your hip is aching. Rain must be coming.",
        effects: { health: -2, happiness: -2 },
        type: "neutral"
    },
    {
        id: 'bingo_night',
        trigger: (person) => person.age > 65 && Math.random() < 0.05,
        text: "You went to Bingo night and won the jackpot!",
        effects: { money: 50, happiness: 10 },
        type: "good"
    },
    {
        id: 'technophobia',
        trigger: (person) => person.age > 70 && Math.random() < 0.05,
        text: "You can't figure out how to work the new TV remote.",
        effects: { smarts: -1, stress: 5 },
        type: "neutral"
    },
    {
        id: 'early_bird',
        trigger: (person) => person.age > 65 && Math.random() < 0.05,
        text: "You ate dinner at 4:30 PM to get the Early Bird Special.",
        effects: { money: 10, happiness: 5 },
        type: "good"
    },

    // Crazy / Rare
    {
        id: 'time_traveler',
        trigger: (person) => person.age > 6 && Math.random() < 0.005,
        text: "A person in a silver suit appears and asks: 'WHAT YEAR IS IT?!'",
        choices: [
            { text: "Tell them", effects: { smarts: 2 }, outcomeText: "They typed it into a watch and vanished.", type: "neutral" },
            { text: "Run away", effects: { stress: 5 }, outcomeText: "You ran deeply into the night.", type: "neutral" }
        ]
    },
    {
        id: 'find_contraband',
        trigger: (person) => person.age > 16 && Math.random() < 0.005,
        text: "You found a bag of white powder on the park bench.",
        choices: [
            { text: "Sell it", effects: { money: 2000, karma: -30 }, outcomeText: "You sold it to a shady guy.", type: "bad" },
            { text: "Leave it", effects: { karma: 5 }, outcomeText: "You walked away quickly.", type: "neutral" }
        ]
    },
    {
        id: 'bank_error',
        trigger: (person) => person.age > 18 && Math.random() < 0.005,
        text: "Bank Error in your favor!",
        effects: { money: 200, happiness: 10 },
        type: "good"
    },
    {
        id: 'found_phone',
        trigger: (person) => person.age > 10 && Math.random() < 0.02,
        text: "You found an iPhone on a park bench.",
        choices: [
            { text: "Return it", effects: { karma: 10, happiness: 5 }, outcomeText: "The owner gave you $20 reward!", type: "good" },
            { text: "Keep it", effects: { money: 500, karma: -20 }, outcomeText: "It's locked, but you sold it for parts.", type: "bad" }
        ]
    },
    {
        id: 'solicitor',
        trigger: (person) => person.age > 18 && Math.random() < 0.05,
        text: "A door-to-door salesman is trying to sell you magazines.",
        choices: [
            { text: "Buy ($20)", effects: { money: -20, karma: 5 }, outcomeText: "You are too nice.", type: "neutral" },
            { text: "Slam door", effects: { happiness: 2 }, outcomeText: "Take that!", type: "neutral" }
        ]
    }
];

export const INITIAL_EVENTS = [
    (person) => `You were born a ${person.gender} in a hospital.`,
    (person) => `Your name is ${person.getFullName()}.`
];


export const CAREER_EVENTS = [
    // --- POLITICS (President/Governor/Mayor) ---
    {
        id: 'pol_disaster',
        trigger: (person) => person.job && person.job.isPolitical,
        text: 'A massive hurricane has devastated the coast. The people are looking to you.',
        choices: [
            { text: 'Send Aid ()', effects: { happiness: 5, karma: 10 }, outcomeText: 'The relief effort was successful. Approval ratings up!', type: 'good' },
            { text: 'Ignore it', effects: { happiness: -5, karma: -20 }, outcomeText: 'The media is destroying you. Approval ratings plummeted.', type: 'bad' }
        ]
    },
    {
        id: 'pol_war',
        trigger: (person) => person.job && person.job.title === 'President',
        text: 'Intelligence suggests a hostile nation is preparing a missile test.',
        choices: [
            { text: 'Diplomacy', effects: { smarts: 2, karma: 5 }, outcomeText: 'Peace talks succeeded. Nobel Prize?', type: 'good' },
            { text: 'Drone Strike', effects: { stress: 20, karma: -10 }, outcomeText: 'Target destroyed. International tensions are high.', type: 'mixed' }
        ]
    },
    {
        id: 'pol_scandal',
        trigger: (person) => person.job && person.job.isPolitical && Math.random() < 0.1,
        text: 'A tape has leaked of you insulting your voters.',
        choices: [
            { text: 'Apologize', effects: { happiness: -10 }, outcomeText: 'Some forgave you. Others didn\'t.', type: 'neutral' },
            { text: 'Deny it', effects: { karma: -10, smarts: -2 }, outcomeText: 'The lie made it worse.', type: 'bad' }
        ]
    },

    // --- MUSICIAN ---
    {
        id: 'music_hit',
        trigger: (person) => person.job && person.job.customReq === 'musician',
        text: 'Your latest single is climbing the charts!',
        effects: { fame: 10, money: 50000, happiness: 20 },
        type: 'good'
    },
    {
        id: 'music_flop',
        trigger: (person) => person.job && person.job.customReq === 'musician' && Math.random() < 0.1,
        text: 'Your experimental jazz album was a total flop.',
        effects: { fame: -5, happiness: -10 },
        type: 'bad'
    },
    {
        id: 'music_tour',
        trigger: (person) => person.job && person.job.customReq === 'musician',
        text: 'Your label wants you to go on a World Tour.',
        choices: [
            { text: 'Go on Tour', effects: { money: 500000, stress: 20, fame: 15 }, outcomeText: 'Sold out stadiums! You\'re exhausted but rich.', type: 'good' },
            { text: 'Stay home', effects: { stress: -5 }, outcomeText: 'You worked on new music instead.', type: 'neutral' }
        ]
    },

    // --- ATHLETE ---
    {
        id: 'sports_championship',
        trigger: (person) => person.job && person.job.customReq === 'athlete',
        text: 'It\'s the Championship Game! The score is tied.',
        choices: [
            { text: 'Pass the ball', effects: { karma: 5 }, outcomeText: 'Teammate scored! WE WON!', type: 'good' },
            { text: 'Go for glory', effects: { fame: 10, stress: 10 }, outcomeText: 'You scored the winning point! MVP!', type: 'good' }
        ]
    },
    {
        id: 'sports_injury',
        trigger: (person) => person.job && person.job.customReq === 'athlete' && Math.random() < 0.05,
        text: 'You felt a pop in your knee during practice.',
        effects: { health: -20, happiness: -20, stress: 10 },
        type: 'bad'
    },

    // --- MILITARY ---
    {
        id: 'mil_deployment',
        trigger: (person) => person.job && person.job.isMilitary && Math.random() < 0.2,
        text: 'You have been ordered to deploy to a combat zone.',
        choices: [
            { text: 'Serve proudly', effects: { stress: 20, karma: 5, money: 5000 }, outcomeText: 'You returned home safe with a medal.', type: 'good' },
            { text: 'Desert', effects: { karma: -50, happiness: -20 }, outcomeText: 'You went AWOL and are now a fugitive.', type: 'bad' }
        ]
    }
];
