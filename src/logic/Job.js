export const JOBS = [
    {
        id: 'dishwasher',
        title: 'Dishwasher',
        salary: 15000,
        requirements: { smarts: 0, education: 'None' },
        stress: 10,
        careerPath: 'service_food'
    },
    {
        id: 'waiter',
        title: 'Waiter',
        salary: 22000,
        requirements: { smarts: 10, looks: 40, education: 'None' },
        stress: 20,
        careerPath: 'service_food'
    },
    {
        id: 'teacher',
        title: 'School Teacher',
        salary: 45000,
        requirements: { smarts: 60, education: 'University', degree_req: ['Education', 'English', 'Mathematics', 'History'] },
        stress: 40,
        careerPath: 'education'
    },
    {
        id: 'engineer',
        title: 'Jr. Software Engineer',
        salary: 60000,
        requirements: { smarts: 80, education: 'University', degree_req: ['Computer Science'] },
        stress: 50,
        careerPath: 'tech'
    },
    {
        id: 'doctor',
        title: 'Medical Resident',
        salary: 60000,
        requirements: { smarts: 95, education: 'Medical School' },
        stress: 90,
        careerPath: 'medical'
    },
    {
        id: 'police',
        title: 'Police Officer',
        salary: 55000,
        requirements: { smarts: 40, health: 60, education: 'High School' },
        stress: 70,
        careerPath: 'police'
    },
    {
        id: 'firefighter',
        title: 'Firefighter',
        salary: 50000,
        requirements: { smarts: 30, health: 80, education: 'High School' },
        stress: 75,
        careerPath: 'fire'
    },
    {
        id: 'lawyer',
        title: 'Jr. Associate Lawyer',
        salary: 90000,
        requirements: { smarts: 90, education: 'Law School' },
        stress: 85,
        careerPath: 'legal'
    },
    {
        id: 'chef',
        title: 'Line Cook',
        salary: 40000,
        requirements: { smarts: 50, education: 'None' },
        stress: 80,
        careerPath: 'culinary'
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
        requirements: { looks: 80, smarts: 40, education: 'None' },
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
        customReq: 'influencer',
        stress: 65
    },
    {
        id: 'stuntman',
        title: 'Stuntman',
        salary: 80000,
        requirements: { health: 90, education: 'None' },
        customReq: 'stuntman',
        stress: 85
    },
    {
        id: 'app_dev',
        title: 'App Developer',
        salary: 90000,
        requirements: { smarts: 70, education: 'None' },
        customReq: 'coding_skill',
        stress: 40
    },
    {
        id: 'head_chef',
        title: 'Head Chef',
        salary: 85000,
        requirements: { smarts: 50, education: 'None' },
        customReq: 'cooking_skill',
        stress: 80 // Kitchens are stressful
    },
    // --- NEW CAREERS ---
    {
        id: 'veterinarian',
        title: 'Veterinarian',
        salary: 95000,
        requirements: { smarts: 75, education: 'University', degree_req: ['Biology', 'Veterinary Medicine'] },
        stress: 50
    },
    {
        id: 'architect',
        title: 'Architect',
        salary: 85000,
        requirements: { smarts: 70, education: 'University', degree_req: ['Architecture', 'Engineering'] },
        stress: 60
    },
    {
        id: 'pharmacist',
        title: 'Pharmacist',
        salary: 120000,
        requirements: { smarts: 80, education: 'University', degree_req: ['Pharmacy', 'Chemistry'] },
        stress: 40
    },
    {
        id: 'physical_therapist',
        title: 'Physical Therapist',
        salary: 75000,
        requirements: { smarts: 65, education: 'University', degree_req: ['Physical Therapy', 'Biology'] },
        stress: 35
    },
    {
        id: 'electrical_engineer',
        title: 'Electrical Engineer',
        salary: 95000,
        requirements: { smarts: 75, education: 'University', degree_req: ['Engineering', 'Electrical Engineering'] },
        stress: 65
    },
    {
        id: 'data_scientist',
        title: 'Data Scientist',
        salary: 125000,
        requirements: { smarts: 85, education: 'University', degree_req: ['Computer Science', 'Mathematics', 'Statistics'] },
        stress: 60
    },
    {
        id: 'marketing_manager',
        title: 'Marketing Manager',
        salary: 90000,
        requirements: { smarts: 65, looks: 60, education: 'University', degree_req: ['Business', 'Marketing'] },
        stress: 70
    },
    {
        id: 'financial_analyst',
        title: 'Financial Analyst',
        salary: 80000,
        requirements: { smarts: 75, education: 'University', degree_req: ['Finance', 'Economics', 'Business'] },
        stress: 75
    },
    {
        id: 'psychologist',
        title: 'Psychologist',
        salary: 85000,
        requirements: { smarts: 70, education: 'Graduate School', degree_req: ['Psychology'] },
        stress: 55
    },
    {
        id: 'real_estate_agent',
        title: 'Real Estate Agent',
        salary: 65000,
        requirements: { looks: 65, smarts: 50, education: 'High School' },
        stress: 60
    },
    {
        id: 'firefighter',
        title: 'Firefighter',
        salary: 55000,
        requirements: { health: 85, smarts: 40, education: 'High School' },
        stress: 85
    },
    {
        id: 'paramedic',
        title: 'Paramedic',
        salary: 48000,
        requirements: { health: 75, smarts: 60, education: 'High School' },
        stress: 90
    },
    {
        id: 'dental_hygienist',
        title: 'Dental Hygienist',
        salary: 70000,
        requirements: { smarts: 60, education: 'High School' },
        stress: 35
    },
    {
        id: 'graphic_designer',
        title: 'Graphic Designer',
        salary: 55000,
        requirements: { smarts: 55, looks: 50, education: 'High School' },
        stress: 45
    },
    {
        id: 'web_developer',
        title: 'Web Developer',
        salary: 75000,
        requirements: { smarts: 70, education: 'High School', customReq: 'coding_skill' },
        stress: 50
    },
    {
        id: 'plumber',
        title: 'Plumber',
        salary: 60000,
        requirements: { health: 65, smarts: 40, education: 'High School' },
        stress: 55
    },
    {
        id: 'electrician',
        title: 'Electrician',
        salary: 65000,
        requirements: { health: 65, smarts: 55, education: 'High School' },
        stress: 60
    },
    {
        id: 'hair_stylist',
        title: 'Hair Stylist',
        salary: 45000,
        requirements: { looks: 55, smarts: 35, education: 'High School' },
        stress: 30
    },
    {
        id: 'truck_driver',
        title: 'Truck Driver',
        salary: 50000,
        requirements: { health: 60, education: 'High School' },
        stress: 40
    },
    {
        id: 'flight_attendant',
        title: 'Flight Attendant',
        salary: 55000,
        requirements: { looks: 70, health: 65, education: 'High School' },
        stress: 60
    },
    {
        id: 'journalist',
        title: 'Journalist',
        salary: 52000,
        requirements: { smarts: 70, education: 'University', degree_req: ['Journalism', 'English'] },
        stress: 70
    },
    {
        id: 'librarian',
        title: 'Librarian',
        salary: 48000,
        requirements: { smarts: 60, education: 'University' },
        stress: 20
    },
    {
        id: 'social_worker',
        title: 'Social Worker',
        salary: 50000,
        requirements: { smarts: 65, education: 'University', degree_req: ['Social Work', 'Psychology'] },
        stress: 75
    },
    {
        id: 'personal_trainer',
        title: 'Personal Trainer',
        salary: 45000,
        requirements: { health: 80, looks: 65, education: 'High School' },
        stress: 30
    },
    {
        id: 'photographer',
        title: 'Photographer',
        salary: 52000,
        requirements: { looks: 50, smarts: 55, education: 'High School' },
        stress: 35
    }
];

export const CAREER_PATHS = {
    tech: [
        { title: 'Jr. Software Engineer', salary: 60000 },
        { title: 'Software Engineer', salary: 90000 },
        { title: 'Sr. Software Engineer', salary: 130000 },
        { title: 'Lead Developer', salary: 160000 },
        { title: 'CTO', salary: 250000 }
    ],
    medical: [
        { title: 'Medical Resident', salary: 60000 },
        { title: 'Attending Physician', salary: 180000 },
        { title: 'Surgeon', salary: 250000 },
        { title: 'Chief of Surgery', salary: 400000 },
        { title: 'Hospital Administrator', salary: 600000 }
    ],
    legal: [
        { title: 'Jr. Associate Lawyer', salary: 90000 },
        { title: 'Associate Lawyer', salary: 140000 },
        { title: 'Partner', salary: 300000 },
        { title: 'Managing Partner', salary: 600000 },
        { title: 'Judge', salary: 150000 } // Prestige over money
    ],
    police: [
        { title: 'Police Officer', salary: 55000 },
        { title: 'Detective', salary: 85000 },
        { title: 'Police Captain', salary: 120000 },
        { title: 'Police Chief', salary: 160000 }
    ],
    culinary: [
        { title: 'Line Cook', salary: 40000 },
        { title: 'Sous Chef', salary: 65000 },
        { title: 'Executive Chef', salary: 90000 },
        { title: 'Celebrity Chef', salary: 500000 }
    ],
    education: [
        { title: 'Substitute Teacher', salary: 35000 },
        { title: 'School Teacher', salary: 50000 },
        { title: 'Principal', salary: 95000 },
        { title: 'School Superintendent', salary: 140000 }
    ],
    service_food: [
        { title: 'Dishwasher', salary: 18000 },
        { title: 'Busser', salary: 22000 },
        { title: 'Waiter', salary: 30000 },
        { title: 'Shift Manager', salary: 45000 },
        { title: 'Restaurant Manager', salary: 60000 }
    ]
};

export const EDUCATION_LEVELS = [
    "None",
    "High School",
    "University",
    "Medical School"
];

// Returns logic results to be logged by GameEngine
export function evaluateJobPerformance(person, economy = 'Normal') {
    if (!person.job || person.job.isMilitary || person.job.isPolitical) return null;

    const job = person.job;
    const events = [];

    // 1. Update Performance
    // Base fluctuation
    let performanceChange = Math.floor(Math.random() * 10) - 3; // -3 to +6 (slight upward bias)

    // Smarts Bonus
    if (person.smarts > 80) performanceChange += 2;
    if (person.smarts < 30) performanceChange -= 2;

    // Stress Penalty
    if ((person.stats?.stress || 0) > 80) performanceChange -= 5;

    job.performance = Math.max(0, Math.min(100, (job.performance || 50) + performanceChange));


    // 2. Raise Check
    // Chance of raise if performance is good
    if (job.performance > 70 && Math.random() < 0.2) {
        const raisePercent = (Math.random() * 0.05) + 0.02; // 2-7%
        const raiseAmount = Math.floor(job.salary * raisePercent);
        job.salary += raiseAmount;
        events.push({
            type: 'good',
            text: `You received a raise of $${raiseAmount.toLocaleString()} performance: ${job.performance}%`
        });
    }

    // 3. Promotion Check
    // If job has a career path
    if (job.careerPath && CAREER_PATHS[job.careerPath]) {
        const path = CAREER_PATHS[job.careerPath];
        const currentRankIndex = path.findIndex(p => p.title === job.title);

        if (currentRankIndex >= 0 && currentRankIndex < path.length - 1) {
            // Can be promoted
            const nextRank = path[currentRankIndex + 1];

            // Promotion Criteria:
            // - Performance > 85
            // - Years in current job > 3 (simplified, we use total years for now or track role years? keeping simple with total years)
            // - Or random lucky break (1%)

            const isQualified = job.performance > 85 && job.yearsEmployed > 2;
            const isLucky = Math.random() < 0.01;

            if ((isQualified && Math.random() < 0.3) || isLucky) {
                const oldTitle = job.title;
                job.title = nextRank.title;
                // Significant raise with promotion
                job.salary = Math.max(job.salary, nextRank.salary);
                job.performance = 60; // Reset performance slightly (new responsibilities)

                events.push({
                    type: 'good',
                    text: `PROMOTION! You have been promoted from ${oldTitle} to ${job.title}. Your new salary is $${job.salary.toLocaleString()}.`
                });
            }
        }
    }

    // 4. Layoff Check (Recession)
    if (economy === 'Recession' && Math.random() < 0.15) {
        events.push({
            type: 'bad',
            text: `You were laid off from your job as ${job.title} due to budget cuts during the Recession.`
        });
        person.quitJob(); // remove job
        person.updateStats({ happiness: -20, stress: 20 });
        return events; // Stop processing
    }

    // 5. Firing Check (Performance)
    if (job.performance < 15 && Math.random() < 0.2) {
        events.push({
            type: 'bad',
            text: `You were FIRED from your job as ${job.title} due to poor performance.`
        });
        person.quitJob(); // remove job
        person.updateStats({ happiness: -30, stress: 10 });
        return events; // Stop processing raises/promotions if fired
    }

    // 5. Retirement Check (Optional Force)
    if (person.age > 70 && Math.random() < 0.1) {
        events.push({
            type: 'neutral',
            text: `You have been forced to retire at age ${person.age}. Enjoy your golden years!`
        });
        person.quitJob();
        return events;
    }

    return events;
}
