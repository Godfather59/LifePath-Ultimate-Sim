import { LIFE_EVENTS, CAREER_EVENTS } from './Events';
import { evaluateJobPerformance } from './Job';
import { AssetMarket } from './Assets';

export class GameEngine {
    static ageUp(person) {
        if (!person.isAlive) return person;

        person.age++;
        person.history = person.history.slice(0, 49); // Keep log manageable

        // Generate Market for the new year
        this.generateYearlyMarket(person);

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
        this.processStatConsequences(person);

        // Asset Maintenance (and Mortgages)
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
        person.updateStats({ happiness: moodSwing });
    }

    static processStatConsequences(person) {
        // --- STRESS ---
        if (person.stress > 80) {
            person.updateStats({ health: -5, happiness: -5 });
            if (Math.random() < 0.2) { // 20% chance of warning sig
                person.logEvent("You are suffering from high blood pressure due to stress.", "bad");
            }
            if (Math.random() < 0.02) { // 2% chance of Heart Attack
                person.logEvent("You had a massive HEART ATTACK due to extreme stress!", "bad");
                person.updateStats({ health: -50 });
            }
        }

        // --- KARMA ---
        if (person.karma > 90 && Math.random() < 0.1) {
            person.logEvent("Good Karma! You found a diamond ring on the floor.", "good");
            person.updateStats({ money: 2000, happiness: 10 });
        } else if (person.karma < 10 && Math.random() < 0.1) {
            person.logEvent("Bad Karma! A bird pooped on your head.", "bad");
            person.updateStats({ happiness: -10 });
        }

        // --- FAME ---
        if (person.fame > 50 && Math.random() < 0.1) {
            const fanInteractions = [
                { text: "A fan asked for your autograph!", type: "good", effect: { happiness: 5 } },
                { text: "A fan was stalking you...", type: "bad", effect: { stress: 10 } }
            ];
            const interaction = fanInteractions[Math.floor(Math.random() * fanInteractions.length)];
            person.logEvent(interaction.text, interaction.type);
            person.updateStats(interaction.effect);
        }
    }

    static processCareer(person) {
        if (person.job) {
            const taxRate = 0.15; // Flat tax for now
            const netIncome = Math.floor(person.job.salary * (1 - taxRate));
            person.updateStats({ money: netIncome });
            person.job.yearsEmployed++;

            // Performance Evaluation (Raises, Promotions, Firing)
            const careerEvents = evaluateJobPerformance(person);
            if (careerEvents && careerEvents.length > 0) {
                careerEvents.forEach(evt => {
                    person.logEvent(evt.text, evt.type);
                });
            }
        }
    }

    static processAssets(person) {
        if (person.assets.length === 0) return;

        let totalMaintenance = 0;
        let totalMortgage = 0;
        const messages = [];

        person.assets.forEach(asset => {
            totalMaintenance += asset.maintenance;

            // Mortgage Logic
            if (asset.isMortgaged && asset.mortgage) {
                const annualPayment = asset.mortgage.monthlyPayment * 12;
                totalMortgage += annualPayment;

                // Reduce balance
                // Simplified interest: Interest is already baked into the fixed payment or ignored for MVP simplicity
                // Let's just reduce balance by principal roughly
                asset.mortgage.balance -= annualPayment;

                if (asset.mortgage.balance <= 0) {
                    asset.isMortgaged = false;
                    asset.mortgage = null;
                    messages.push(`You paid off your mortgage on the ${asset.name}!`);
                }
            }

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

        if (totalMortgage > 0) {
            person.money -= totalMortgage;
            // messages.push(`You paid $${totalMortgage.toLocaleString()} in mortgage payments.`);
        }

        if (messages.length > 0) {
            // Pick one significant event to log to avoid spam
            person.logEvent(messages[0]);
        }
    }

    static generateYearlyMarket(person) {
        // Generate new market listings for the year
        // We import AssetMarket here or assume it's available contextually
        // Since we need to import it, let's add the import to the top of file later
        // For now, let's assume `AssetMarket` is imported

        person.market = {
            realEstate: AssetMarket.generateRealEstateListings(5),
            cars: AssetMarket.generateCarListings(6)
        };
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
        // Collect all possible events
        let possibleEvents = LIFE_EVENTS.filter(e => e.trigger(person));

        // Add Career Events (Higher weight? Or just mix them in)
        const careerEvents = CAREER_EVENTS.filter(e => e.trigger(person));

        // If there are career events, let's make them highly likely to occur to ensure flavor
        if (careerEvents.length > 0) {
            // 50% chance to pick a career event if available
            if (Math.random() < 0.5) {
                return careerEvents[Math.floor(Math.random() * careerEvents.length)];
            }
            // Otherwise mix them into the general pool
            possibleEvents = [...possibleEvents, ...careerEvents];
        }

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

        // Initial Market
        this.generateYearlyMarket(person);
    }
}
