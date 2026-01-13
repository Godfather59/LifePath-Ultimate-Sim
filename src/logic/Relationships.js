export const MALE_NAMES = ["James", "John", "Robert", "Michael", "William", "David", "Richard", "Joseph", "Thomas", "Charles", "Christopher", "Daniel", "Matthew", "Anthony", "Donald", "Mark", "Paul", "Steven", "Andrew", "Kenneth"];
export const FEMALE_NAMES = ["Mary", "Patricia", "Jennifer", "Linda", "Elizabeth", "Barbara", "Susan", "Jessica", "Sarah", "Karen", "Nancy", "Lisa", "Betty", "Margaret", "Sandra", "Ashley", "Kimberly", "Emily", "Donna", "Michelle"];
export const LAST_NAMES = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin"];

export class RelationshipManager {
    static generateCandidate(preferredGender = 'female') {
        const isMale = preferredGender === 'male';
        const firstName = isMale
            ? MALE_NAMES[Math.floor(Math.random() * MALE_NAMES.length)]
            : FEMALE_NAMES[Math.floor(Math.random() * FEMALE_NAMES.length)];
        const lastName = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];

        // Random Stats
        const age = 18 + Math.floor(Math.random() * 15); // 18-33 mostly
        const looks = Math.floor(Math.random() * 100);
        const smarts = Math.floor(Math.random() * 100);
        const money = Math.floor(Math.random() * 100000); // 0-100k net worth
        const craziness = Math.floor(Math.random() * 100);

        // Job Generation (Simple for now)
        const jobs = ["Student", "Nurse", "Teacher", "Engineer", "Retail Worker", "Chef", "Artist", "Doctor", "Lawyer", "Unemployed"];
        const job = jobs[Math.floor(Math.random() * jobs.length)];

        return {
            id: `date_${Date.now()}_${Math.random()}`,
            name: `${firstName} ${lastName}`,
            gender: isMale ? 'Male' : 'Female',
            age: age,
            looks: looks,
            smarts: smarts,
            money: money,
            craziness: craziness,
            job: job,
            type: 'Partner',
            stat: 50 // Relationship starts at 50
        };
    }

    static generateBatch(count = 3, preferredGender = 'female') {
        const batch = [];
        for (let i = 0; i < count; i++) {
            batch.push(this.generateCandidate(preferredGender));
        }
        return batch;
    }
}
