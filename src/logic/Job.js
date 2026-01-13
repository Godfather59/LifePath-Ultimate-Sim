export const JOBS = [
    {
        id: 'dishwasher',
        title: 'Dishwasher',
        salary: 15000,
        requirements: { smarts: 0, education: 'None' },
        stress: 10
    },
    {
        id: 'waiter',
        title: 'Waiter',
        salary: 22000,
        requirements: { smarts: 10, looks: 40, education: 'None' },
        stress: 20
    },
    {
        id: 'teacher',
        title: 'School Teacher',
        salary: 45000,
        requirements: { smarts: 60, education: 'University' },
        stress: 40
    },
    {
        id: 'engineer',
        title: 'Software Engineer',
        salary: 80000,
        requirements: { smarts: 80, education: 'University' },
        stress: 50
    },
    {
        id: 'doctor',
        title: 'Brain Surgeon',
        salary: 250000,
        requirements: { smarts: 95, education: 'Medical School' },
        stress: 90
    },
    {
        id: 'police',
        title: 'Police Officer',
        salary: 55000,
        requirements: { smarts: 40, health: 60, education: 'High School' },
        stress: 70
    },
    {
        id: 'firefighter',
        title: 'Firefiighter',
        salary: 50000,
        requirements: { smarts: 30, health: 80, education: 'High School' },
        stress: 75
    },
    {
        id: 'lawyer',
        title: 'Corporate Lawyer',
        salary: 120000,
        requirements: { smarts: 90, education: 'University' }, // In reality Law School, but simplification
        stress: 85
    },
    {
        id: 'chef',
        title: 'Executive Chef',
        salary: 75000,
        requirements: { smarts: 50, education: 'None' },
        stress: 80
    },
    {
        id: 'pilot',
        title: 'Airline Pilot',
        salary: 140000,
        requirements: { smarts: 70, health: 90, education: 'University' },
        stress: 60
    },
    {
        id: 'soldier',
        title: 'Soldier',
        salary: 35000,
        requirements: { smarts: 30, health: 80, education: 'High School' },
        stress: 90
    },
    {
        id: 'actor',
        title: 'Movie Star',
        salary: 3000000,
        requirements: { looks: 95, education: 'None' },
        stress: 50
    },
    {
        id: 'musician',
        title: 'Pop Star',
        salary: 2500000,
        requirements: { looks: 80, smarts: 40, education: 'None' }, // Needs singing skill ideally, but using looks/smarts
        stress: 40
    },
    {
        id: 'ceo',
        title: 'CEO',
        salary: 850000,
        requirements: { smarts: 95, education: 'University' },
        stress: 100
    },
    {
        id: 'influencer',
        title: 'Social Media Star',
        salary: 150000,
        requirements: { looks: 80, education: 'None' },
        customReq: 'influencer', // Special flag for OccupationMenu
        stress: 65
    }
];

export const EDUCATION_LEVELS = [
    "None",
    "High School",
    "University",
    "Medical School"
];
