import { LIFE_EVENTS, CAREER_EVENTS, PANDEMIC_EVENTS } from './Events';
import { ROYAL_EVENTS, MILITARY_EVENTS, CELEBRITY_EVENTS, MAFIA_EVENTS } from './StatusEvents';
import { evaluateJobPerformance, JOBS } from './Job';
import { AssetMarket } from './Assets';
import { STOCKS, CRYPTO, getInvestmentReturn } from './Investments';
import { ROYAL_COUNTRIES, getTitle } from './RoyaltyLogic';

export class GameEngine {
    static worldState = {
        economy: 'Normal', // 'Recession', 'Normal', 'Boom'
        conflict: 'Peace', // 'Peace', 'War'
        pandemic: false
    };

    static marketTrends = {
        indexFund: 100, // Starts at $100
        dogecoin: 0.50   // Starts at $0.50
    };
    static ageUp(person) {
        if (!person.isAlive) return person;

        person.age++;
        person.history = person.history.slice(0, 49); // Keep log manageable

        // Update World State (Random Chance)
        this.updateWorldState(person);

        // Update Market Prices
        this.updateMarketPrices(person);

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

        // Pet Aging & Events
        this.processPets(person);

        // Education Progress
        this.processEducation(person);

        // Status-Specific Events
        this.processStatusEvents(person);

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

        // Pandemic Health Hit
        if (this.worldState.pandemic) {
            person.updateStats({ health: -5, happiness: -5 });
            if (Math.random() < 0.2) {
                person.logEvent("The pandemic isolation is getting to you.", "bad");
            }
        }
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

            // Performance Evaluation (Raises, Promotions, Firing, Layoffs)
            const careerEvents = evaluateJobPerformance(person, this.worldState.economy);
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
                asset.value = Math.floor(asset.value * (1 + marketChange));

                // Big swing event
                if (marketChange > 0.07) {
                    messages.push(`The value of your ${asset.name} soared by ${Math.floor(marketChange * 100)}%!`);
                }

                // Rental Logic
                if (asset.isRented && asset.tenant) {
                    const annualRent = asset.rentPrice * 12;
                    person.money += annualRent;

                    // Tenant Events
                    if (Math.random() < 0.1) { // 10% chance of issue
                        if (Math.random() > 0.5) {
                            const damage = Math.floor(annualRent * 0.5);
                            person.money -= damage;
                            messages.push(`BAD TENANT! ${asset.tenant.name} trashed your ${asset.name}. Repairs cost $${damage.toLocaleString()}.`);
                            asset.tenant.satisfaction -= 20;
                        } else {
                            // Non-payment
                            person.money -= Math.floor(annualRent / 4); // Lose 3 months rent
                            messages.push(`Tenant ${asset.tenant.name} missed rent payments on ${asset.name}.`);
                        }
                    } else {
                        // Good year
                        asset.tenant.satisfaction = Math.min(100, asset.tenant.satisfaction + 5);
                    }
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

        // --- INVESTMENT PROCESSING ---
        if (person.portfolio && person.portfolio.length > 0) {
            let totalGain = 0;
            person.portfolio.forEach(pos => {
                // Find definition just in case properties change
                let assetDef = STOCKS.find(s => s.id === pos.id) || CRYPTO.find(c => c.id === pos.id);
                if (!assetDef) return;

                const percentChange = getInvestmentReturn(assetDef, this.worldState.economy);
                const valueChange = Math.floor(pos.currentValue * percentChange);
                pos.currentValue += valueChange;
                totalGain += valueChange;

                // Major events
                if (percentChange > 0.5) person.logEvent(`🚀 ${pos.name} IS MOONING! (+${Math.floor(percentChange * 100)}%)`, "good");
                if (percentChange < -0.4) person.logEvent(`📉 ${pos.name} CRASHED! (${Math.floor(percentChange * 100)}%)`, "bad");
            });

            // Summary Log
            // if (Math.abs(totalGain) > 1000) {
            //    person.logEvent(`Your investments ${totalGain > 0 ? 'grew' : 'shrank'} by $${Math.abs(totalGain).toLocaleString()} this year.`);
            // }
        }
    }

    static processPets(person) {
        if (!person.pets || person.pets.length === 0) return;

        person.pets.forEach((pet, index) => {
            pet.age++;
            // Stats decay
            pet.happiness = Math.max(0, pet.happiness - 5);
            pet.health = Math.max(0, pet.health - 2);
            pet.relationship = Math.max(0, pet.relationship - 2);

            // Death Check
            // Simplified lifespan check
            const maxAge = pet.type === 'Dog' ? 15 : pet.type === 'Cat' ? 18 : pet.type === 'Rabbit' ? 8 : 3;
            const deathChance = pet.age > maxAge ? 0.3 : 0.01;

            if (pet.health === 0 || Math.random() < deathChance) {
                person.logEvent(`Your ${pet.type}, ${pet.name}, died at age ${pet.age}. RIP.`, "bad");
                person.updateStats({ happiness: -20 });
                // Mark for removal (filter after loop or use splice carefully if iterating backwards, but we'll just set a flag and filter)
                pet.isDead = true;
            }
        });

        // Cleanup dead pets
        person.pets = person.pets.filter(p => !p.isDead);
    }

    static updateWorldState(person) {
        // Economy Change (10% chance)
        if (Math.random() < 0.1) {
            const states = ['Recession', 'Normal', 'Boom'];
            const newState = states[Math.floor(Math.random() * states.length)];
            if (newState !== this.worldState.economy) {
                this.worldState.economy = newState;
                person.logEvent(`The economy has entered a ${newState}.`, "neutral");
            }
        }

        // Conflict Change (5% chance)
        if (Math.random() < 0.05) {
            const newState = this.worldState.conflict === 'Peace' ? 'War' : 'Peace';
            this.worldState.conflict = newState;
            if (newState === 'War') {
                person.logEvent("War has been declared! The country is in conflict.", "bad");
            } else {
                person.logEvent("The war has ended. Peace has been restored.", "good");
            }
        }

        // Pandemic Change
        if (this.worldState.pandemic) {
            // End chance 50%
            if (Math.random() < 0.5) {
                this.worldState.pandemic = false;
                person.logEvent("The global pandemic has officially ended.", "good");
            }
        } else {
            // Start chance 2%
            if (Math.random() < 0.02) {
                this.worldState.pandemic = true;
                person.logEvent("A GLOBAL PANDEMIC has been declared! Stay safe.", "bad");
            }
        }
    }

    static generateYearlyMarket(person) {
        // Economy Multipliers
        let reMultiplier = 1.0;
        let salaryMultiplier = 1.0;

        if (this.worldState.economy === 'Recession') {
            reMultiplier = 0.7;
            salaryMultiplier = 0.8;
        } else if (this.worldState.economy === 'Boom') {
            reMultiplier = 1.3;
            salaryMultiplier = 1.2;
        }

        // Real Estate
        const realEstate = AssetMarket.generateRealEstateListings(5).map(house => ({
            ...house,
            price: Math.floor(house.price * reMultiplier),
            value: Math.floor(house.value * reMultiplier)
        }));

        // Cars (Optional: could also be affected, but keeping simple for now)
        const cars = AssetMarket.generateCarListings(6);

        // Job Market (New: Persistent yearly listings)
        // We pick a subset or generated variations of JOBS
        const jobs = JOBS.map(job => {
            // Randomly fluctuate base salary slightly + economy
            const variance = (Math.random() * 0.1) - 0.05; // +/- 5%
            const offeredSalary = Math.floor(job.salary * salaryMultiplier * (1 + variance));

            return {
                ...job,
                salary: offeredSalary, // Override salary for this specific offer
                uniqueId: Date.now() + Math.random() // Unique ID for this year's listing
            };
        });

        person.market = {
            realEstate,
            cars,
            jobs
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
                if (school.paymentMethod === 'Loan') {
                    // Defer payment, maybe add interest?
                    // person.loans += Math.floor(school.tuitionPaid * 0.05);
                    person.logEvent(`Another year of loans added to your debt.`);
                } else if (school.paymentMethod === 'Scholarship') {
                    person.logEvent(`Your scholarship covered this year's tuition.`);
                } else {
                    person.money -= school.tuitionPaid;
                    person.logEvent(`You paid tuition for ${school.name}.`);
                }
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
            } else if (school.type === 'university' || school.type === 'grad_school') {
                const degreeName = school.type === 'university' ? 'Bachelor\'s Degree' : school.name;
                const major = school.major || school.name;

                person.educationHistory.push(`${degreeName} in ${major}`);
                // Store actual degree object for logic
                person.degrees.push({ type: major, name: degreeName });

                person.logEvent(`You graduated with a ${degreeName} in ${major}!`, "good");
                person.updateStats({ smarts: 15, happiness: 20 });
                person.currentSchool = null;

                // Repay loan if they have money? Not automatically.
                // Loans accumulate interest?
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
        let pool = LIFE_EVENTS.filter(e => e.trigger(person));

        // Add Pandemic Events if active
        if (this.worldState.pandemic) {
            const panEvents = PANDEMIC_EVENTS.filter(e => e.trigger(person));
            pool = [...pool, ...panEvents];

            // High chance to force a pandemic event for flavor
            if (panEvents.length > 0 && Math.random() < 0.4) {
                return panEvents[Math.floor(Math.random() * panEvents.length)];
            }
        }

        // Add Career Events
        const careerEvents = CAREER_EVENTS.filter(e => e.trigger(person));

        if (careerEvents.length > 0) {
            // WAR OVERRIDE: If War and Military, very high chance of deployment
            if (this.worldState.conflict === 'War' && person.job?.isMilitary) {
                const deployment = CAREER_EVENTS.find(e => e.id === 'mil_deployment');
                if (deployment && Math.random() < 0.6) { // 60% chance of deployment/war event
                    return deployment;
                }
            }

            // 50% chance to pick a career event if available
            if (Math.random() < 0.5) {
                return careerEvents[Math.floor(Math.random() * careerEvents.length)];
            }

            // Otherwise mix them into the general pool
            pool = [...pool, ...careerEvents];
        }

        if (pool.length === 0) return null;

        // Select one
        const choice = pool[Math.floor(Math.random() * pool.length)];
        return choice;
    }

    static initializeFamily(person) {
        const lastName = person.name.last;

        const isRoyalCountry = ROYAL_COUNTRIES.includes(person.country);
        const isRoyalBirth = isRoyalCountry && Math.random() < 0.05; // 5% chance in royal countries

        let fatherTitle = "Father", motherTitle = "Mother";
        let fatherName = "Dad", motherName = "Mom";

        if (isRoyalBirth) {
            // Born as Prince/Princess
            // Parents are King/Queen or Prince/Princess
            const title = getTitle(person.gender, 1); // Rank 1 = Prince/Princess. 0 = King/Queen
            person.royalty = {
                title: title.title,
                respect: 100,
                isReigning: false,
                rank: 'prince' // simplified
            };
            person.logEvent(`👑 You were born a ${title.title} of ${person.country}!`, "good");
            person.fame = 50; // Royals are famous
            person.money += 1000000; // Rich start

            fatherTitle = "King";
            motherTitle = "Queen";
            fatherName = "King Henry";
            motherName = "Queen Elizabeth";
        }

        person.addRelationship({
            id: 'father',
            name: fatherName,
            type: fatherTitle,
            age: 20 + Math.floor(Math.random() * 20)
        });

        person.addRelationship({
            id: 'mother',
            name: motherName,
            type: motherTitle,
            age: 20 + Math.floor(Math.random() * 20)
        });

        // Initial Market
        this.generateYearlyMarket(person);
    }

    static updateMarketPrices(person) {
        // Index Fund: Stable growth -5% to +10%
        const indexChange = (Math.random() * 0.15) - 0.05; // -5% to +10%
        this.marketTrends.indexFund *= (1 + indexChange);
        this.marketTrends.indexFund = Math.max(10, this.marketTrends.indexFund); // Floor at $10

        // Dogecoin: Volatile -50% to +200%
        const cryptoChange = (Math.random() * 2.5) - 0.5; // -50% to +200%
        this.marketTrends.dogecoin *= (1 + cryptoChange);
        this.marketTrends.dogecoin = Math.max(0.01, this.marketTrends.dogecoin); // Floor at $0.01

        // Log significant changes
        if (Math.abs(indexChange) > 0.05) {
            const direction = indexChange > 0 ? 'up' : 'down';
            person.logEvent(`The stock market went ${direction} this year.`, indexChange > 0 ? "good" : "neutral");
        }
        if (Math.abs(cryptoChange) > 0.5) {
            const direction = cryptoChange > 0 ? 'surged' : 'crashed';
            person.logEvent(`Dogecoin ${direction}!`, cryptoChange > 0 ? "good" : "bad");
        }
    }

    static processStatusEvents(person) {
        // Only trigger status events with a certain probability to avoid spam
        const triggerChance = 0.25; // 25% chance per year
        if (Math.random() > triggerChance) return;

        let eventPool = [];

        // Royal Events
        if (person.royalty) {
            eventPool = ROYAL_EVENTS.filter(e => {
                if (e.condition) return e.condition(person);
                return true;
            });
        }

        // Military Events
        if (person.job && person.job.isMilitary && eventPool.length === 0) {
            eventPool = MILITARY_EVENTS.filter(e => {
                if (e.condition) return e.condition(person);
                return true;
            });
        }

        // Celebrity Events
        if (person.fame >= 60 && eventPool.length === 0) {
            eventPool = CELEBRITY_EVENTS.filter(e => {
                if (e.condition) return e.condition(person);
                return true;
            });
        }

        // Mafia Events
        if (person.mafia && person.mafia.family && eventPool.length === 0) {
            eventPool = MAFIA_EVENTS.filter(e => {
                if (e.condition) return e.condition(person);
                return true;
            });
        }

        // Trigger an event if available
        if (eventPool.length > 0) {
            const event = eventPool[Math.floor(Math.random() * eventPool.length)];
            person.logEvent(event.text, event.type);

            if (event.effects) {
                person.updateStats(event.effects);
            }

            if (event.customEffect) {
                event.customEffect(person);
            }
        }
    }
}
