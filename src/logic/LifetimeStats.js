// Lifetime Statistics Tracker
// Tracks cumulative stats across all lives

export class LifetimeStats {
    constructor() {
        this.stats = this.loadStats();
    }

    loadStats() {
        const saved = localStorage.getItem('bitlife_lifetime_stats');
        if (saved) {
            return JSON.parse(saved);
        }

        return {
            livesLived: 0,
            totalYearsLived: 0,
            totalMoneyEarned: 0,
            totalJobsHeld: 0,
            totalChildrenBorn: 0,
            totalMarriages: 0,
            totalDivorces: 0,
            totalAssetsOwned: 0,
            totalCrimesCommitted: 0,
            totalJailTime: 0,
            degreesEarned: 0,
            companiesStarted: 0,

            // Records
            highestNetWorth: { value: 0, name: '', age: 0 },
            longestLife: { age: 0, name: '' },
            mostChildren: { count: 0, name: '' },
            highestFame: { value: 0, name: '' },
            mostCriminal: { notoriety: 0, name: '' },

            // Career tracking
            jobsHeld: {}, // { jobId: count }
            countriesLived: {} // { country: years }
        };
    }

    saveStats() {
        localStorage.setItem('bitlife_lifetime_stats', JSON.stringify(this.stats));
    }

    recordLife(person) {
        // Update cumulative stats
        this.stats.livesLived++;
        this.stats.totalYearsLived += person.age;

        // Money tracking
        const netWorth = person.getTotalEstateValue();
        this.stats.totalMoneyEarned += netWorth;

        // Check if new record
        if (netWorth > this.stats.highestNetWorth.value) {
            this.stats.highestNetWorth = {
                value: netWorth,
                name: `${person.firstName} ${person.lastName}`,
                age: person.age
            };
        }

        // Age record
        if (person.age > this.stats.longestLife.age) {
            this.stats.longestLife = {
                age: person.age,
                name: `${person.firstName} ${person.lastName}`
            };
        }

        // Children
        const childrenCount = person.relationships.filter(r => r.type === 'Child').length;
        this.stats.totalChildrenBorn += childrenCount;
        if (childrenCount > this.stats.mostChildren.count) {
            this.stats.mostChildren = {
                count: childrenCount,
                name: `${person.firstName} ${person.lastName}`
            };
        }

        // Fame
        if (person.fame > this.stats.highestFame.value) {
            this.stats.highestFame = {
                value: person.fame,
                name: `${person.firstName} ${person.lastName}`
            };
        }

        // Notoriety
        if (person.notoriety > this.stats.mostCriminal.notoriety) {
            this.stats.mostCriminal = {
                notoriety: person.notoriety,
                name: `${person.firstName} ${person.lastName}`
            };
        }

        // Other stats
        this.stats.totalMarriages += person.relationships.filter(r => r.type === 'Spouse').length;
        this.stats.totalAssetsOwned += person.assets.length;
        this.stats.degreesEarned += person.degrees ? person.degrees.length : 0;

        // Job tracking
        if (person.job) {
            const jobId = person.job.title || 'Unknown';
            this.stats.jobsHeld[jobId] = (this.stats.jobsHeld[jobId] || 0) + 1;
            this.stats.totalJobsHeld++;
        }

        // Country tracking
        if (person.country) {
            this.stats.countriesLived[person.country] =
                (this.stats.countriesLived[person.country] || 0) + person.age;
        }

        this.saveStats();
    }

    getStats() {
        return this.stats;
    }

    reset() {
        this.stats = this.loadStats();
        localStorage.removeItem('bitlife_lifetime_stats');
        this.stats = {
            livesLived: 0,
            totalYearsLived: 0,
            totalMoneyEarned: 0,
            totalJobsHeld: 0,
            totalChildrenBorn: 0,
            totalMarriages: 0,
            totalDivorces: 0,
            totalAssetsOwned: 0,
            totalCrimesCommitted: 0,
            totalJailTime: 0,
            degreesEarned: 0,
            companiesStarted: 0,
            highestNetWorth: { value: 0, name: '', age: 0 },
            longestLife: { age: 0, name: '' },
            mostChildren: { count: 0, name: '' },
            highestFame: { value: 0, name: '' },
            mostCriminal: { notoriety: 0, name: '' },
            jobsHeld: {},
            countriesLived: {}
        };
        this.saveStats();
    }
}

export const lifetimeStats = new LifetimeStats();
