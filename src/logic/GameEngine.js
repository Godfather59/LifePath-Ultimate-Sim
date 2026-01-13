import { LIFE_EVENTS } from './Events';

export class GameEngine {
    static ageUp(person) {
        if (!person.isAlive) return person;

        person.age++;
        person.history = person.history.slice(0, 49); // Keep log manageable

        // Prison Logic
        if (person.isInPrison) {
            person.prisonSentence--;
            person.logEvent(`You spent the year in prison. ${person.prisonSentence} years remaining.`, "bad");
            person.updateStats({ happiness: -5, health: -2 });
            if (person.prisonSentence <= 0) {
                person.isInPrison = false;
                person.logEvent("You have been released from prison!", "good");
                person.updateStats({ happiness: 20 });
            }
            // Skip other events if in prison?
            // Ideally yes, but let's just let random events happen (prison fights etc could effectively utilize the same system)
        } else {
            // Career Processing (only if not in prison)
            this.processCareer(person);
        }

        // Natural stat decay/growth
        this.processNaturalChanges(person);

        // Asset Maintenance
        this.processAssets(person);

        // Education Progress
        this.processEducation(person);

        // Random Event Generation
        const event = this.generateEvent(person);
        if (event) {
            if (event.choices && event.choices.length > 0) {
                person.setPendingEvent(event);
            } else {
                person.logEvent(event.text, event.type);
                person.updateStats(event.effects);
            }
        } else if (person.age === 6) {
            person.currentSchool = { name: "Elementary School", type: "elementary", year: 1, years: 8, performance: 50, cost: 0, tuitionPaid: 0 };
            person.logEvent("You started Elementary School.", "neutral");
        } else if (person.age === 14) {
            person.currentSchool = { name: "High School", type: "high_school", year: 1, years: 4, performance: 50, cost: 0, tuitionPaid: 0 };
            person.logEvent("You started High School.", "neutral");
        } else {
            person.logEvent(`Age ${person.age}: Another year passes.`, "neutral");
        }

        // Health Checks
        if (person.health <= 0) {
            person.isAlive = false;
            person.logEvent("You have died.", "bad");
        }

        return person; // In React we'll probably clone this instance or use state
    }

    static processNaturalChanges(person) {
        // Looks fade with age
        if (person.age > 50) {
            person.updateStats({ looks: -2, health: -1 });
        }
        // Happiness reverts to baseline? or just random fluctuation
        const moodSwing = Math.floor(Math.random() * 5) - 2;
        person.updateStats({ happiness: moodSwing });
    }

    static processCareer(person) {
        if (person.job) {
            const taxRate = 0.15; // Flat tax for now
            const netIncome = Math.floor(person.job.salary * (1 - taxRate));
            person.updateStats({ money: netIncome });
            person.job.yearsEmployed++;

            // Random raise or promotion logic could go here
        }
    }

    static processAssets(person) {
        if (person.assets.length === 0) return;

        let totalMaintenance = 0;
        const messages = [];

        person.assets.forEach(asset => {
            totalMaintenance += asset.maintenance;

            // Age the asset
            asset.age = (asset.age || 0) + 1;

            if (asset.type === 'Real Estate') {
                // Real Estate Appreciation: -2% to +8%
                const marketChange = (Math.random() * 0.10) - 0.02;
                const oldValue = asset.value;
                asset.value = Math.floor(asset.value * (1 + marketChange));

                // Big swing event
                if (marketChange > 0.07) {
                    messages.push(`The value of your ${asset.name} soared by ${Math.floor(marketChange * 100)}%!`);
                } else if (marketChange < -0.01) {
                    // messages.push(`Real estate market is down. Your ${asset.name} lost value.`);
                }
            } else if (asset.type === 'Vehicle') {
                // Vehicle Depreciation
                // Standard cars lose ~15% per year early on, slowing down later
                let depreciation = 0.15;
                if (asset.age > 5) depreciation = 0.10;
                if (asset.age > 10) depreciation = 0.05;

                // Condition also drops
                asset.condition = Math.max(0, (asset.condition || 100) - 5);

                const oldValue = asset.value;
                asset.value = Math.floor(asset.value * (1 - depreciation));

                if (asset.condition < 20 && Math.random() < 0.3) {
                    messages.push(`Your ${asset.name} broke down! Repair cost $500.`);
                    person.money -= 500; // Auto-repair for now or just fee
                }
            }
        });

        if (totalMaintenance > 0) {
            person.money -= totalMaintenance;
            // person.logEvent(`You paid $${totalMaintenance.toLocaleString()} in asset maintenance.`); 
        }

        if (messages.length > 0) {
            // Pick one significant event to log to avoid spam
            person.logEvent(messages[0]);
        }
    }

    static processEducation(person) {
        if (!person.currentSchool) return;

        const school = person.currentSchool;

        // Performance Decay if you don't study
        if (school.performance) {
            school.performance -= Math.floor(Math.random() * 5);
            if (school.performance < 0) school.performance = 0;
        }

        if (school.year < school.years) {
            school.year++;
            if (school.tuitionPaid > 0) {
                person.money -= school.tuitionPaid;
                person.logEvent(`You paid tuition for ${school.name}.`);
            }

            // Random events based on performance?
            if (school.performance < 20) {
                person.logEvent(`Your grades in ${school.name} are failing!`, "bad");
                person.updateStats({ happiness: -5 });
            }

            person.updateStats({ smarts: 2, stress: 2 });
            // person.logEvent(`Finished year ${school.year - 1} of ${school.name}.`, "neutral"); // Reduce spam?
        } else {
            // Graduated!
            if (school.type === 'elementary') {
                person.logEvent("You finished Elementary School!", "good");
                person.updateStats({ smarts: 5, happiness: 5 });
                person.currentSchool = null; // Will likely get High School next year or same tick? Logic in ageUp handles it next tick usually
            } else if (school.type === 'high_school') {
                person.educationHistory.push("High School");
                person.logEvent("You graduated High School!", "good");
                person.updateStats({ smarts: 10, happiness: 10 });
                person.currentSchool = null;
            } else {
                person.educationHistory.push(school.grant_degree);
                person.education = school.grant_degree; // Set highest education
                person.logEvent(`You graduated from ${school.name}!`, "good");
                person.updateStats({ smarts: 15, happiness: 20 });
                person.currentSchool = null;
            }
        }
    }

    static generateEvent(person) {
        // Filter applicable events
        const possibleEvents = LIFE_EVENTS.filter(e => e.trigger(person));

        if (possibleEvents.length === 0) return null;

        // Select one
        const choice = possibleEvents[Math.floor(Math.random() * possibleEvents.length)];
        return choice;
    }

    static initializeFamily(person) {
        const lastName = person.name.last;

        person.addRelationship({
            id: 'father',
            name: `Dad`, // simplified for now
            type: 'Father',
            age: 20 + Math.floor(Math.random() * 20)
        });

        person.addRelationship({
            id: 'mother',
            name: `Mom`,
            type: 'Mother',
            age: 20 + Math.floor(Math.random() * 20)
        });
    }
}
