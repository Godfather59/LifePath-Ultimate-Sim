export const UNIVERSITIES = [
    {
        id: 'university_arts',
        name: 'University (Arts)',
        type: 'University',
        cost: 5000,
        years: 4,
        smarts_req: 30,
        grant_degree: 'University (Arts)'
    },
    {
        id: 'university_science',
        name: 'University (Science)',
        type: 'University',
        cost: 8000,
        years: 4,
        smarts_req: 60,
        grant_degree: 'University (Science)'
    },
    {
        id: 'university_business',
        name: 'University (Business)',
        type: 'University',
        cost: 10000,
        years: 4,
        smarts_req: 50,
        grant_degree: 'University (Business)'
    }
];

export const GRAD_SCHOOLS = [
    {
        id: 'medical_school',
        name: 'Medical School',
        type: 'Medical School',
        cost: 25000,
        years: 4,
        smarts_req: 85,
        req_degree: 'University (Science)',
        grant_degree: 'Medical School'
    },
    {
        id: 'law_school',
        name: 'Law School',
        type: 'Law School',
        cost: 20000,
        years: 3,
        smarts_req: 80,
        req_degree: 'University (Arts)', // Or Political Science etc, simplification
        grant_degree: 'Law School'
    },
    {
        id: 'business_school',
        name: 'Business School',
        type: 'Business School',
        cost: 30000,
        years: 2,
        smarts_req: 70,
        req_degree: 'University (Business)',
        grant_degree: 'Business School'
    }
];

export const PUBLIC_SCHOOLS = [
    {
        id: 'elementary_school',
        name: 'Elementary School',
        type: 'elementary',
        cost: 0,
        years: 6,
        smarts_req: 0,
        grant_degree: 'Elementary School'
    },
    {
        id: 'high_school',
        name: 'High School',
        type: 'high_school',
        cost: 0,
        years: 4,
        smarts_req: 0,
        grant_degree: 'High School'
    }
];
