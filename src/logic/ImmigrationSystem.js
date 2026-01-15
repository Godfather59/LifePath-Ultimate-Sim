// Immigration System - Country migration and citizenship

export const COUNTRIES = [
    { id: 'usa', name: 'United States', visaCost: 0, difficulty: 'medium' },
    { id: 'uk', name: 'United Kingdom', visaCost: 5000, difficulty: 'medium' },
    { id: 'canada', name: 'Canada', visaCost: 3000, difficulty: 'easy' },
    { id: 'australia', name: 'Australia', visaCost: 4000, difficulty: 'medium' },
    { id: 'japan', name: 'Japan', visaCost: 6000, difficulty: 'hard' },
    { id: 'france', name: 'France', visaCost: 5000, difficulty: 'medium' },
    { id: 'germany', name: 'Germany', visaCost: 4500, difficulty: 'medium' },
    { id: 'italy', name: 'Italy', visaCost: 4000, difficulty: 'easy' },
    { id: 'spain', name: 'Spain', visaCost: 3500, difficulty: 'easy' },
    { id: 'brazil', name: 'Brazil', visaCost: 2000, difficulty: 'easy' },
    { id: 'mexico', name: 'Mexico', visaCost: 1500, difficulty: 'easy' },
    { id: 'china', name: 'China', visaCost: 7000, difficulty: 'very hard' },
    { id: 'india', name: 'India', visaCost: 2500, difficulty: 'medium' },
    { id: 'russia', name: 'Russia', visaCost: 5500, difficulty: 'hard' },
    { id: 'south_korea', name: 'South Korea', visaCost: 5000, difficulty: 'hard' }
];

export class ImmigrationManager {
    constructor(person) {
        this.person = person;
        this.citizenships = [person.country]; // Start with birth country
        this.visaApplications = 0;
        this.visaRejections = 0;
    }

    canEmigrate(targetCountry) {
        // Can't emigrate to current country
        if (this.person.country === targetCountry) {
            return { canEmigrate: false, reason: "You already live here!" };
        }

        const country = COUNTRIES.find(c => c.name === targetCountry);
        if (!country) {
            return { canEmigrate: false, reason: "Invalid country" };
        }

        // Money requirement
        if (this.person.money < country.visaCost) {
            return {
                canEmigrate: false,
                reason: `Need $${country.visaCost.toLocaleString()} for visa`
            };
        }

        // Age requirement
        if (this.person.age < 18) {
            return { canEmigrate: false, reason: "Must be 18+ to emigrate" };
        }

        return { canEmigrate: true, country };
    }

    calculateAcceptanceChance(country) {
        let chance = 0.5; // Base 50%

        // Education bonus
        if (this.person.degrees && this.person.degrees.length > 0) {
            chance += 0.2;
        }

        // Money bonus
        const netWorth = this.person.getTotalEstateValue();
        if (netWorth > 1000000) chance += 0.2;
        else if (netWorth > 100000) chance += 0.1;

        // Smarts bonus
        if (this.person.smarts > 80) chance += 0.1;

        // Job bonus (employed)
        if (this.person.job) chance += 0.1;

        // Fame bonus
        if (this.person.fame > 70) chance += 0.15;

        // Criminal penalty
        if (this.person.notoriety > 50 || this.person.isInPrison) {
            chance -= 0.4;
        }

        // Difficulty modifier
        switch (country.difficulty) {
            case 'easy': chance += 0.2; break;
            case 'hard': chance -= 0.2; break;
            case 'very hard': chance -= 0.3; break;
        }

        return Math.max(0.05, Math.min(0.95, chance));
    }

    attemptEmigration(targetCountryName) {
        const check = this.canEmigrate(targetCountryName);
        if (!check.canEmigrate) {
            return { success: false, message: check.reason };
        }

        const country = check.country;
        this.visaApplications++;

        // Calculate acceptance
        const acceptanceChance = this.calculateAcceptanceChance(country);
        const accepted = Math.random() < acceptanceChance;

        if (accepted) {
            // Successful emigration
            const oldCountry = this.person.country;
            this.person.country = country.name;
            this.person.money -= country.visaCost;

            // Track citizenship after living there
            if (!this.citizenships.includes(country.name)) {
                // Will gain citizenship after some years
            }

            return {
                success: true,
                message: `Visa approved! You moved from ${oldCountry} to ${country.name}.`,
                country: country.name
            };
        } else {
            // Rejected
            this.visaRejections++;
            this.person.money -= Math.floor(country.visaCost * 0.2); // Application fee

            return {
                success: false,
                message: `Visa rejected for ${country.name}. Better luck next time.`,
                refund: false
            };
        }
    }

    applyForCitizenship(countryName) {
        // Need to live in country for at least 5 years
        // Simplified: can apply if it's your current country and not already a citizen

        if (this.person.country !== countryName) {
            return { success: false, message: "You must be living in this country" };
        }

        if (this.citizenships.includes(countryName)) {
            return { success: false, message: "You're already a citizen!" };
        }

        // Simplified acceptance based on stats
        const chance = this.calculateAcceptanceChance(
            COUNTRIES.find(c => c.name === countryName)
        );

        if (Math.random() < chance) {
            this.citizenships.push(countryName);
            this.person.logEvent(`You gained citizenship in ${countryName}!`, "good");
            this.person.updateStats({ happiness: 20 });
            return { success: true, message: `Citizenship granted in ${countryName}!` };
        } else {
            this.person.logEvent(`Citizenship application rejected for ${countryName}.`, "bad");
            this.person.updateStats({ happiness: -10 });
            return { success: false, message: "Citizenship application rejected" };
        }
    }

    hasDualCitizenship() {
        return this.citizenships.length > 1;
    }

    getCitizenships() {
        return this.citizenships;
    }
}

export function initializeImmigration(person) {
    if (!person.immigration) {
        person.immigration = new ImmigrationManager(person);
    }
    return person.immigration;
}
