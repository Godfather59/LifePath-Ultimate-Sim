import { GameEngine } from './GameEngine';
import { handlePost, handleMonetization } from './SocialMedia';
import { STOCKS, CRYPTO } from './Investments';
import { performMafiaCrime, MAFIA_RANKS } from './MafiaLogic';
import { checkPrereq } from './EducationLogic';
import { getRank, MILITARY_RANKS } from './MilitaryLogic';

export class Person {
  constructor(firstName = "John", lastName = "Doe", gender = "Male", country = "United States") {
    this.name = { first: firstName, last: lastName };
    this.gender = gender;
    this.country = country;
    this.age = 0;
    this.money = 0;

    // Core Stats (0-100)
    this.happiness = this.randomStat(80, 100); // Babies are usually happy
    this.health = this.randomStat(90, 100);
    this.smarts = this.randomStat(20, 80);
    this.looks = this.randomStat(20, 80);
    this.stress = 0; // 0-100
    this.karma = 50; // 0-100
    this.fame = 0; // 0-100

    this.skills = {
      // Music
      voice: 0,
      instruments: {},

      // Hobbies/Skills
      martialArts: 0,
      cooking: 0,
      coding: 0,
      coding: 0,
      instrument: 0 // General instrument skill if used by Hobbies menu
    };

    this.pets = [];

    this.isAlive = true;
    this.job = null; // { title, salary, performance }
    this.education = "None";

    this.pendingEvent = null; // For interactive events

    // Assets
    this.assets = []; // Array of owned asset objects
    this.portfolio = []; // Array of investments { id, name, type, shares, purchasePrice, currentValue }

    // Simple Market Investments (for new system)
    this.investments = {
      indexFund: 0,    // Number of shares owned
      dogecoin: 0      // Number of coins owned
    };

    // Relationships
    this.relationships = []; // [{ id, name, type, stat }]

    // Royalty
    this.royalty = null; // { title: 'Prince', respect: 100, isReigning: false }

    // Education
    this.educationHistory = []; // [ "High School", "University (Science)" ]
    this.currentSchool = null; // { ...school, year: 1 }

    // Social Media
    this.social = {
      platforms: {}, // { 'insta': { followers: 0, posts: 0 } }
      totalFollowers: 0,
      isInfluencer: false
    };

    // Detailed Education
    this.loans = 0; // Student debt
    this.degrees = []; // [{ type: 'CS', name: 'Computer Science' }]

    // Crime
    this.isInPrison = false;
    this.prisonSentence = 0;
    this.notoriety = 0; // 0-100
    this.mafia = {
      family: null, // family object
      rank: null, // rank id
      standing: 0 // 0-100 reputation within family
    };

    // Prison Stats
    this.prisonStats = {
      respect: 0,
      gang: null
    };

    // Will & Estate
    this.will = null; // { primaryBeneficiary: relationshipId, allocations: { relationshipId: percentage }, createdAt: age }

    // Business & Companies
    this.companies = []; // Array of Company objects owned

    // Life History
    this.history = [];
  }

  randomStat(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  clamp(value, min = 0, max = 100) {
    return Math.max(min, Math.min(value, max));
  }

  getFullName() {
    return `${this.name.first} ${this.name.last}`;
  }

  updateStats(changes) {
    if (!this.isAlive) return;

    if (changes.happiness) this.happiness = this.clamp(this.happiness + changes.happiness);
    if (changes.health) this.health = this.clamp(this.health + changes.health);
    if (changes.smarts) this.smarts = this.clamp(this.smarts + changes.smarts);
    if (changes.looks) this.looks = this.clamp(this.looks + changes.looks);
    if (changes.money) this.money += changes.money; // Money isn't clamped to 100
    if (changes.stress) this.stress = this.clamp(this.stress + changes.stress);
    if (changes.karma) this.karma = this.clamp(this.karma + changes.karma);
    if (changes.fame) this.fame = this.clamp(this.fame + changes.fame);
  }


  setJob(jobData) {
    // Check Requirements
    if (jobData.requirements) {
      if (jobData.requirements.smarts && this.smarts < jobData.requirements.smarts) {
        this.logEvent(`You were rejected from being a ${jobData.title} because you aren't smart enough.`, "bad");
        return false;
      }
      if (jobData.requirements.looks && this.looks < jobData.requirements.looks) {
        this.logEvent(`They said you don't have the 'look' for a ${jobData.title}.`, "bad");
        return false;
      }
      if (jobData.requirements.health && this.health < jobData.requirements.health) {
        this.logEvent(`You failed the physical for ${jobData.title}.`, "bad");
        return false;
      }

      // Degree Check
      if (jobData.requirements.degree_req) {
        const reqs = jobData.requirements.degree_req; // Array of acceptable majors
        // Check if player has ANY of these degrees
        // Player degrees are in this.degrees = [{ type: 'CS', name: 'Bachelor...' }]
        const hasDegree = this.degrees && this.degrees.some(d => reqs.includes(d.type));

        // Special Case: specific Grad Schools (Medical School etc are stored as degree types? or names?)
        // In GameEngine: person.educationHistory.push(school.grant_degree) for HS
        // For Uni: person.degrees.push({ type: major, name: degreeName })

        // For Grad School: type is major? 
        // In EducationLogic: grad schools act as modifiers? 
        // Wait, GameEngine logic:
        // const major = school.major || school.name;
        // person.degrees.push({ type: major, name: degreeName });
        // So if I go to Med School, type="Medical School".

        // So checking reqs.includes(d.type) should work if req is 'Medical School'

        if (!hasDegree) {
          this.logEvent(`You were rejected! You need a degree in ${reqs.join(' or ')} to be a ${jobData.title}.`, "bad");
          return false;
        }
      }
    }

    this.job = {
      ...jobData,
      yearsEmployed: 0,
      performance: 50 // 0-100
    };
    this.logEvent(`You started working as a ${jobData.title}.`, "good");
    return true;
  }

  quitJob() {
    if (this.job) {
      this.logEvent(`You quit your job as a ${this.job.title}.`, "neutral");
      this.job = null;
    }
  }



  performActivity(activity) {
    if (this.money < activity.cost) {
      this.logEvent(`You can't afford to ${activity.title.toLowerCase()}!`, "bad");
      return false;
    }


    if (activity.isDating) {
      this.findPartner();
      return true;
    }

    if (activity.isBusking) {
      // Busking Logic
      const skills = ['voice', 'guitar', 'piano', 'violin'];
      // Find max music skill (either voice or any instrument)
      let maxSkill = this.skills.voice || 0;
      if (this.skills.instruments) {
        Object.values(this.skills.instruments).forEach(val => {
          if (val > maxSkill) maxSkill = val;
        });
      }
      // Also check generic 'instrument' skill if used
      if (this.skills.instrument > maxSkill) maxSkill = this.skills.instrument;

      if (maxSkill < 10) {
        this.logEvent("You tried to busk but you have no talent. People threw garbage at you.", "bad");
        this.updateStats({ happiness: -5, health: -1 });
        return true;
      }

      const earnings = Math.floor((maxSkill / 2) * (Math.random() * 5)); // e.g., 50 skill -> $0-$125
      this.money += earnings;
      this.logEvent(`You busked on the street. You earned $${earnings}.`, "good");
      this.updateStats({ happiness: 5 });
      return true;
    }

    if (activity.isCrime) {
      this.commitCrime(activity.crimeType);
      return true;
    }

    this.money -= activity.cost;
    // Trait Bonus: Athletic
    if (activity.id === 'gym' && this.traits.includes('Athletic')) {
      if (activity.effects.health) activity.effects.health *= 2;
      this.logEvent("Your Athletic trait helped you get a great workout!", "good");
    }

    this.updateStats(activity.effects);
    this.logEvent(activity.text, activity.type);
    return true;
  }

  // Removed old findPartner in favor of UI-driven dating
  // New method to start dating a specific generated candidate
  startDating(candidate) {
    // Check if already has a partner
    const existingPartner = this.relationships.find(r => r.type === 'Partner' || r.type === 'Spouse');
    if (existingPartner) {
      this.logEvent(`You cheated on ${existingPartner.name} with ${candidate.name}!`, "bad");
      existingPartner.stat -= 50;
      if (existingPartner.stat < 0) {
        this.logEvent(`${existingPartner.name} broke up with you for cheating!`, "bad");
        this.relationships = this.relationships.filter(r => r.id !== existingPartner.id);
      }
    }

    this.addRelationship({
      ...candidate,
      type: 'Partner',
      stat: 80 // High start for dating app
    });
    this.logEvent(`You started dating ${candidate.name} (Age ${candidate.age}, ${candidate.job})!`, "good");
    this.updateStats({ happiness: 20 });
  }

  setPendingEvent(event) {
    this.pendingEvent = event;
    // We don't log it yet, the modal will handle the description
  }

  // --- PETS ---
  adoptPet(pet) {
    if (!pet) return;
    this.pets.push(pet);
    this.logEvent(`You adopted a ${pet.type} named ${pet.name}.`, "good");
    this.updateStats({ happiness: 10, karma: 5 });
  }

  interactWithPet(index, action) {
    const pet = this.pets[index];
    if (!pet) return;

    if (action === 'walk') {
      pet.happiness = Math.min(100, pet.happiness + 10);
      pet.health = Math.min(100, pet.health + 5);
      pet.relationship = Math.min(100, pet.relationship + 5);

      this.updateStats({ health: 2, happiness: 5 });
      this.logEvent(`You took ${pet.name} for a walk.`, "good");
    }
    else if (action === 'treat') {
      pet.happiness = Math.min(100, pet.happiness + 20);
      pet.relationship = Math.min(100, pet.relationship + 5);
      this.money -= 10;
      this.logEvent(`You gave ${pet.name} a treat.`, "good");
    }
    else if (action === 'sell') { // or release
      this.pets.splice(index, 1);
      this.logEvent(`You released ${pet.name}.`, "neutral");
      this.updateStats({ karma: -5 });
    }
  }

  resolveEvent(choice) {
    if (!this.pendingEvent) return;

    // Apply specific choice effects
    if (choice.effects) {
      this.updateStats(choice.effects);
    }

    // Log the outcome
    // We log the event prompt + the choice taken
    this.logEvent(`Event: ${this.pendingEvent.text}`);
    this.logEvent(`You chose to: ${choice.text}`, "neutral");

    if (choice.outcomeText) {
      this.logEvent(choice.outcomeText, choice.type || "neutral");
    }

    this.pendingEvent = null;
  }



  rentAsset(assetIndex, monthlyRent) {
    const asset = this.assets[assetIndex];
    if (!asset) return;

    asset.isRented = true;
    asset.rentPrice = monthlyRent;
    asset.tenant = {
      name: this.generateRandomName(),
      satisfaction: 50 + Math.floor(Math.random() * 50)
    };

    this.logEvent(`You rented out your ${asset.name} to ${asset.tenant.name} for $${monthlyRent.toLocaleString()}/month.`, "good");
    this.updateStats({ happiness: 2 });
  }

  evictTenant(assetIndex) {
    const asset = this.assets[assetIndex];
    if (!asset || !asset.isRented) return;

    const tenantName = asset.tenant.name;
    asset.isRented = false;
    asset.rentPrice = 0;
    asset.tenant = null;

    this.logEvent(`You evicted ${tenantName} from your ${asset.name}.`, "neutral");
  }

  generateRandomName() {
    const firsts = ['John', 'Jane', 'Mike', 'Emily', 'Chris', 'Sarah', 'Alex', 'Sam'];
    const lasts = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller'];
    return `${firsts[Math.floor(Math.random() * firsts.length)]} ${lasts[Math.floor(Math.random() * lasts.length)]}`;
  }

  buyAsset(asset, mortgage = null) {
    const cost = mortgage ? mortgage.downPayment : asset.price;

    if (this.money < cost) {
      this.logEvent(`You cannot afford the ${mortgage ? 'down payment' : 'price'} for the ${asset.name}.`, "bad");
      return false;
    }

    this.money -= cost;

    const newAsset = {
      ...asset,
      purchasePrice: asset.price,
      value: asset.value || asset.price // Set initial value for appreciation tracking
    };

    if (mortgage) {
      newAsset.isMortgaged = true;
      newAsset.mortgage = {
        amount: mortgage.amount, // Total loan amount
        balance: mortgage.amount, // Remaining balance
        monthlyPayment: mortgage.monthlyPayment,
        term: mortgage.term // Years
      };
      this.logEvent(`You bought a ${asset.name} with a mortgage! Down payment: $${cost.toLocaleString()}.`, "good");
    } else {
      this.logEvent(`You bought a ${asset.name} for $${asset.price.toLocaleString()} cash!`, "good");
    }

    this.assets.push(newAsset);
    this.updateStats({ happiness: asset.happiness_bonus || 10 }); // Default bonus
    return true;
  }

  sellAsset(assetIndex) {
    const asset = this.assets[assetIndex];
    if (!asset) return;

    // Use current market value (calculated in GameEngine)
    const salePrice = asset.value || Math.floor(asset.price * 0.7);

    // Calculate profit/loss
    const profit = salePrice - (asset.purchasePrice || asset.price);
    const profitMsg = profit >= 0 ? `profit of $${profit.toLocaleString()}` : `loss of $${Math.abs(profit).toLocaleString()}`;

    this.money += salePrice;
    this.assets.splice(assetIndex, 1);
    this.logEvent(`You sold your ${asset.name} for $${salePrice.toLocaleString()} (${profitMsg}).`, "neutral");
  }

  addRelationship(rel) {
    this.relationships.push({
      ...rel,
      stat: this.randomStat(40, 90) // Initial relationship level
    });
  }

  interactWithRel(relId, action, payload = {}) {
    const rel = this.relationships.find(r => r.id === relId);
    if (!rel) return;

    let text = "";
    let type = "neutral";
    let change = 0;

    switch (action) {
      case 'spend_time':
        text = `You spent time with your ${rel.type}, ${rel.name}.`;
        change = 5;
        type = "good";
        break;
      case 'compliment':
        // Realism: 25% chance of being ignored or annoyed
        if (Math.random() < 0.25) {
          const replies = [
            `${rel.name} ignored you.`,
            `${rel.name} asked, "What do you want?"`,
            `${rel.name} told you to stop sucking up.`
          ];
          text = replies[Math.floor(Math.random() * replies.length)];
          change = -2;
          type = "neutral";
        } else {
          text = `You complimented your ${rel.type}, ${rel.name}.`;
          change = 8;
          type = "good";
        }
        break;
      case 'insult':
        text = `You insulted your ${rel.type}, ${rel.name}!`;
        change = -15;
        type = "bad";
        break;
      case 'make_love':
        if (this.randomStat(0, 100) > 30) {
          text = `You made love to ${rel.name}.`;
          change = 15;
          type = "good";

          // Chance of pregnancy (simplified)
          if (this.randomStat(0, 100) < 15) { // 15% chance
            const childGender = Math.random() > 0.5 ? 'male' : 'female';
            const childName = childGender === 'male' ? 'James' : 'Olivia';
            const child = {
              id: `child_${Date.now()}`,
              name: childName,
              type: 'Child',
              age: 0,
              gender: childGender,
              traits: this.generateChildTraits()
            };
            this.addRelationship(child);
            this.logEvent(`You had a baby ${childGender} named ${childName}!`, "good");
            this.updateStats({ happiness: 30 });
          }
        } else {
          text = `${rel.name} turned you down.`;
          change = -5;
          type = 'neutral';
        }
        break;
      case 'propose':
        // Proposal Logic
        const ringCost = payload?.ringCost || 1000; // Default or passed
        if (this.money < ringCost) {
          this.logEvent("You can't afford that ring!", "bad");
          return;
        }
        this.money -= ringCost;

        // Acceptance chance
        let chance = rel.stat;
        if (ringCost > 10000) chance += 20; // Nice ring bonus
        if (ringCost < 500) chance -= 20; // Cheap ring penalty

        if (chance > 60) {
          rel.type = 'Fiancé';
          text = `You proposed to ${rel.name} with a $${ringCost.toLocaleString()} ring and they said YES!`;
          change = 30;
          type = "good";
        } else {
          text = `You proposed to ${rel.name} with a $${ringCost.toLocaleString()} ring but they REJECTED you.`;
          change = -30;
          type = "bad";
        }
        break;

      case 'marry':
        const weddingCost = payload?.budget || 5000;
        const signPrenup = payload?.prenup || false;

        if (this.money < weddingCost) {
          this.logEvent(`You can't afford the wedding ($${weddingCost})!`, "bad");
          return;
        }

        if (signPrenup && rel.stat < 80) {
          this.logEvent(`${rel.name} refused to sign the prenup! The wedding is off.`, "bad");
          change = -20;
          break;
        }

        this.money -= weddingCost;
        rel.type = 'Spouse';
        rel.hasPrenup = signPrenup;
        text = `You married ${rel.name}! It was a beautiful ceremony ($${weddingCost}).${signPrenup ? " You signed a prenup." : ""}`;
        change = 40;
        type = "good";
        break;

      case 'cheat':
        // Cheating Logic
        // 30% chance of getting caught immediately
        if (Math.random() < 0.3) {
          text = `You were CAUGHT cheating on ${rel.name}!`;
          change = -100; // Massive hit
          type = "bad";
          if (rel.stat < 50) {
            // Instant breakup/divorce
            if (rel.type === 'Spouse') {
              // Force divorce next tick or handle here?
              // Let's degrade stat now, maybe user has to manually divorce or get divorced event later
            } else {
              this.relationships = this.relationships.filter(r => r.id !== relId);
              text += " They dumped you immediately.";
            }
          }
        } else {
          text = "You cheated and got away with it... for now.";
          change = -5; // Guilt?
          type = "neutral";
        }
        break;

      case 'break_up':
        text = `You broke up with ${rel.name}.`;
        change = -10;
        this.relationships = this.relationships.filter(r => r.id !== relId);
        type = "neutral";
        break;

      case 'divorce':
        // Divorce Logic
        let settlement = 0;
        if (rel.hasPrenup) {
          text = `You divorced ${rel.name}. Thanks to the prenup, your assets are safe.`;
        } else {
          settlement = Math.floor(this.money * 0.5);
          this.money -= settlement;
          text = `You divorced ${rel.name}. Without a prenup, you lost $${settlement.toLocaleString()} in the settlement.`;
        }
        change = -30;
        this.relationships = this.relationships.filter(r => r.id !== relId);
        type = "bad";
        break;
    }

    if (text) this.logEvent(text, type);
    if (change !== 0) {
      rel.stat = Math.max(0, Math.min(100, rel.stat + change));
      this.updateStats({ happiness: change > 0 ? 5 : -5 });
    }
  }

  enrollInSchool(school) {
    if (this.currentSchool) {
      this.logEvent("You are already enrolled in school!", "bad");
      return false;
    }

    // Check prerequisites for Grad School
    if (school.type === 'grad_school') {
      if (!checkPrereq(school.id, this.degrees.map(d => d.type))) { // Assuming degrees store 'type' as name of major for now
        // Wait, degrees logic is new. We need to store degree objects properly.
        // Let's assume degrees list contains Strings of major names or Objects.
        // Simplified check:
        this.logEvent(`You don't have the required degree for ${school.name}! (${school.req_degree})`, "bad");
        return false;
      }
    }

    // Smarts Check
    if (this.smarts < school.smarts_req) {
      this.logEvent(`You were rejected from ${school.name} (Smarts too low).`, "bad");
      return false;
    }

    // Scholarship / Loan Logic
    let tuition = school.cost;
    let paymentMethod = "Cash";

    if (this.smarts > 90 && Math.random() < 0.3) {
      this.logEvent(`You WON a full scholarship to ${school.name}!`, "good");
      tuition = 0;
      paymentMethod = "Scholarship";
    } else if (this.money < school.cost) {
      // Must take loan
      this.logEvent(`You took out a student loan for ${school.name}.`, "neutral");
      this.loans += school.cost;
      tuition = 0; // You don't pay cash now
      paymentMethod = "Loan"; // Flag for logic
    } else {
      this.logEvent(`You paid tuition for ${school.name} ($${school.cost.toLocaleString()}).`, "neutral");
    }

    this.currentSchool = { ...school, year: 1, tuitionPaid: tuition, paymentMethod };
    if (paymentMethod === "Cash") {
      this.money -= tuition;
    }

    this.logEvent(`You started studying ${school.major || school.name} at ${school.type === 'grad_school' ? 'Graduate School' : 'University'}.`, "good");
    return true;
  }

  studyHard() {
    if (!this.currentSchool) return;

    // Burnout Check
    // If stress is already high (e.g., > 70), there's a risk
    const currentStress = this.stats?.stress || 0; // accessing generic stats if stored differently? 
    // Wait, Person.js stores stress implicitly in updateStats? No, I don't see `this.stress` in constructor. 
    // Let's check constructor.
    // It seems `this.stress` wasn't explicitly initialized in constructor in the visible snippet, 
    // but `Job.js` logic uses it. Let's assume it exists or init it.
    // Actually, `updateStats` doesn't seem to clamp stress or even have a this.stress field in the visible snippet lines 1-160.
    // I should probably ensure `this.stress` exists.

    // Quick fix: Add this.stress if missing
    if (this.stress === undefined) this.stress = 0;

    if (this.stress > 70 && Math.random() < 0.3) {
      this.logEvent("You suffered from burnout while trying to study!", "bad");
      this.updateStats({ health: -5, happiness: -5 });
      this.stress = Math.min(100, this.stress + 10);
      return;
    }

    // Performance gain
    this.currentSchool.performance = (this.currentSchool.performance || 50) + 10;
    if (this.currentSchool.performance > 100) this.currentSchool.performance = 100;

    // Smarts gain
    this.updateStats({ smarts: 2 });

    // Stress gain
    this.stress = Math.min(100, this.stress + 10);

    this.logEvent("You studied hard for your classes.", "good");
  }

  dropOut() {
    if (!this.currentSchool) return;

    this.logEvent(`You dropped out of ${this.currentSchool.name}.`, "bad");
    this.currentSchool = null;
    this.updateStats({ smarts: -5, happiness: -10 });
  }

  logEvent(text, type = "neutral") {
    this.history.unshift({
      age: this.age,
      text: text,
      type: type
    });
  }

  // Deserialization helper
  static load(data) {
    const p = new Person();
    Object.assign(p, data);
    return p;
  }

  clone() {
    // Manual clone to ensure array independence while preserving functions/references
    const p = new Person();
    Object.assign(p, this);

    // Clone arrays/objects that stand to be mutated
    p.assets = [...this.assets];
    p.relationships = this.relationships.map(r => ({ ...r }));
    p.history = [...this.history];
    p.educationHistory = [...this.educationHistory];
    if (this.currentSchool) p.currentSchool = { ...this.currentSchool };
    if (this.job) p.job = { ...this.job };

    // Clone social state
    p.social = {
      platforms: { ...this.social.platforms }, // Shallow copy of platforms map
      totalFollowers: this.social.totalFollowers,
      isInfluencer: this.social.isInfluencer
    };
    // Deep copy platform objects
    Object.keys(p.social.platforms).forEach(key => {
      p.social.platforms[key] = { ...this.social.platforms[key] };
    });

    // pendingEvent is untouched (reference copy) so we keep functions

    return p;
  }

  practiceSkill(skillId) {
    if (skillId === 'voice') {
      const current = this.skills.voice;

      // Trait Bonus
      let bonusMult = 1;
      if (this.traits.includes('Musical')) bonusMult = 2;

      const improvement = (Math.floor(Math.random() * 6) + 1 + (this.musicalTalent > 80 ? 2 : 0)) * bonusMult;
      const newVal = Math.min(100, current + improvement);
      this.skills.voice = newVal;
      this.logEvent(`You took voice lessons. Skill: ${newVal}%`, "good");
      this.updateStats({ happiness: 2 });
      return;
    }

    // Check if it's a general hobby skill
    if (['martialArts', 'cooking', 'coding', 'instrument'].includes(skillId)) {
      const current = this.skills[skillId] || 0;
      // Logic: 10 + (smarts / 10) capped at 100
      const smartsBonus = Math.floor(this.smarts / 10);
      const improvement = 10 + smartsBonus;
      const newVal = Math.min(100, current + improvement);

      this.skills[skillId] = newVal;
      this.logEvent(`You practiced ${skillId}. Your skill is now ${newVal}.`, "good");
      this.updateStats({ happiness: 5, smarts: 1 }); // Bonus stats
      return;
    }

    // Instrument specific (Old logic fallback if skillId is 'guitar', 'piano' etc)
    if (!this.skills.instruments) this.skills.instruments = {};
    const current = this.skills.instruments[skillId] || 0;


    // Trait Bonus
    let bonusMult = 1;
    if (this.traits.includes('Musical')) bonusMult = 2;

    const improvement = (Math.floor(Math.random() * 6) + 1) * bonusMult;
    const newVal = Math.min(100, current + improvement);
    this.skills.instruments[skillId] = newVal;
    this.logEvent(`You practiced the ${skillId}. Skill: ${newVal}%`, "good");
    this.updateStats({ happiness: 2 });
  }

  inherit(childRel) {
    const newPerson = new Person();

    // Set identity
    newPerson.name = {
      first: childRel.name.split(' ')[0],
      last: this.name.last
    };
    newPerson.gender = Math.random() > 0.5 ? 'male' : 'female'; // Simplified, strictly we should track this
    newPerson.age = childRel.age || 18; // Default if age missing, but we track ages now usually? 
    // Wait, relationships array in Person.js: { id, name, type, stat, age? }
    // We didn't explicitly add age to relationships in all cases, mostly just parents.
    // We should ensure children have age. Even if they don't, 18 is a safe start.

    // Inheritance (Estate Tax 15%)
    const taxRate = 0.15;
    newPerson.money = Math.floor(this.money * (1 - taxRate));
    newPerson.assets = [...this.assets]; // Copy assets
    newPerson.traits = childRel.traits || []; // Inherit traits from the child object logic

    // Log
    newPerson.logEvent(`You are ${newPerson.name.first} ${newPerson.name.last}.`, "neutral");
    newPerson.logEvent(`Your parent, ${this.name.first}, passed away and left you $${newPerson.money.toLocaleString()} and ${newPerson.assets.length} assets.`, "good");

    // Add deceased parent to relationships?
    // Maybe later. For now start fresh-ish.

    // Generate new random parents/stats
    // Actually GameEngine.initializeFamily will do this, but we might want to override one parent to be the deceased one? 
    // Keeping it simple: Just start as the child with the money/assets.
    GameEngine.initializeFamily(newPerson);

    return newPerson;
  }

  postToSocial(platformId, postId) {
    handlePost(this, platformId, postId);
  }

  monetizeSocial(platformId) {
    handleMonetization(this, platformId);
  }

  generateChildTraits() {
    const traits = [];
    const possibleTraits = ['Musical', 'Athletic', 'Genius', 'Fertile'];

    // Inheritance (50% chance for each parent trait)
    this.traits.forEach(trait => {
      if (Math.random() < 0.5) traits.push(trait);
    });

    // Mutation (10% chance for a new random trait)
    if (Math.random() < 0.1) {
      const newTrait = possibleTraits[Math.floor(Math.random() * possibleTraits.length)];
      if (!traits.includes(newTrait)) traits.push(newTrait);
    }
    return traits;
  }

  commitCrime(type, forceSuccess = null) {
    if (this.isInPrison) {
      this.logEvent("You are already in prison!", "bad");
      return;
    }

    let successChance = 0;
    let payout = 0;
    let sentence = 0;
    let crimeName = "";

    if (type === 'burglary') {
      crimeName = "Burglary";
      successChance = 0.6; // 60% success
      payout = this.randomStat(500, 5000);
      sentence = this.randomStat(1, 5);
    } else if (type === 'robbery') {
      crimeName = "Bank Robbery";
      successChance = 0.15; // 15% success
      payout = this.randomStat(50000, 500000);
      sentence = this.randomStat(10, 25);
    }

    // Minigame logic or RNG
    let isSuccess = false;
    if (forceSuccess !== null) {
      isSuccess = forceSuccess;
    } else {
      isSuccess = Math.random() < successChance;
    }

    if (isSuccess) {
      // Success
      this.money += payout;
      this.notoriety = Math.min(100, this.notoriety + (type === 'robbery' ? 15 : 5));
      this.logEvent(`You successfully committed ${crimeName} and stole $${payout.toLocaleString()}!`, "good");
      this.updateStats({ happiness: 20 });
      return true;
    } else {
      // Caught
      this.logEvent(`You were caught attempting ${crimeName}!`, "bad");
      this.goToPrison(sentence);
      return false;
    }
  }

  // Prison Methods
  prisonAction(action) {
    if (!this.isInPrison) return;

    if (action === 'workout') {
      this.logEvent("You worked out in the yard.", "good");
      this.updateStats({ health: 3, happiness: 2 });
      this.prisonStats.respect = Math.min(100, (this.prisonStats.respect || 0) + 5);
    }
    else if (action === 'library') {
      this.logEvent("You read a book in the prison library.", "good");
      this.updateStats({ smarts: 3 });
    }
    else if (action === 'gang') {
      if (this.prisonStats.gang) {
        this.logEvent("You hung out with your gang.", "good");
        this.prisonStats.respect += 2;
      } else {
        // Try join
        if (this.notoriety > 40) {
          this.prisonStats.gang = "The Skulls";
          this.logEvent("You were initiated into 'The Skulls' prison gang.", "good");
          this.prisonStats.respect += 20;
        } else {
          this.logEvent("The gangs ignored you. You need more street cred.", "neutral");
        }
      }
    }
    else if (action === 'riot') {
      if (Math.random() < 0.3) {
        this.logEvent("You started a RIOT! 10 people were injured.", "bad");
        this.prisonSentence += 2;
        this.logEvent("Your sentence was extended by 2 years.", "bad");
        this.prisonStats.respect += 15;
      } else {
        this.logEvent("You failed to incite a riot. The guards beat you.", "bad");
        this.updateStats({ health: -20 });
      }
    }
    else if (action === 'escape') {
      // Escape logic -> Handled by Minigame usually, but here is the result handler or trigger
      // For now, let's do RNG Escape
      const chance = (this.smarts + this.health) / 400; // Max 50%
      if (Math.random() < chance) {
        this.isInPrison = false;
        this.prisonSentence = 0;
        this.logEvent("YOU ESCAPED PRISON!", "good");
        this.notoriety += 50;
        this.updateStats({ happiness: 100 });
      } else {
        this.logEvent("Escape attempt FAILED! You were beaten and sentence extended.", "bad");
        this.updateStats({ health: -30 });
        this.prisonSentence += 3;
      }
    }
    else if (action === 'appeal') {
      if (this.money < 5000) {
        this.logEvent("You can't afford a lawyer ($5,000).", "bad");
        return;
      }
      this.money -= 5000;
      if (Math.random() < 0.2) {
        this.prisonSentence = 0;
        this.isInPrison = false;
        this.logEvent("Appeal SUCCESSFUL! You are a free person.", "good");
      } else {
        this.logEvent("Appeal DENIED. You remain in prison.", "bad");
      }
    }
  }

  joinMafia(family) {
    if (this.notoriety < 30) {
      this.logEvent(`The ${family.name} laughed at you. "Come back when you've done some real dirt."`, "bad");
      return false;
    }
    this.mafia = {
      family: family,
      rank: 'associate',
      standing: 10
    };
    this.job = { title: 'Mafia Associate', salary: 0, performance: 50 }; // Special job
    this.logEvent(`You have been inducted into the ${family.name} as an Associate.`, "good");
    return true;
  }

  performMafiaAction(actionId) {
    if (!this.mafia.family) return;

    const result = performMafiaCrime(this, actionId);
    if (!result) return;

    this.logEvent(result.text, result.success ? "good" : "bad");

    if (result.success) {
      if (result.money) this.money += result.money;
      if (result.standing) this.mafia.standing = Math.min(100, (this.mafia.standing || 0) + result.standing);
      if (result.notoriety) this.notoriety = Math.min(100, this.notoriety + result.notoriety);

      // Promotion Check
      this.promoteMafia();
    } else {
      if (result.standing) this.mafia.standing = Math.max(0, (this.mafia.standing || 0) + result.standing); // Can lose standing

      if (result.caught) {
        this.logEvent("You were caught by the police!", "bad");
        this.goToPrison(5); // Automatic 5 years for now
        // Mafia kicks you out logic? Or loss of standing?
        this.mafia.standing = 0;
      } else {
        this.mafia.standing = Math.max(0, (this.mafia.standing || 0) - 5);
      }
    }
  }

  promoteMafia() {
    if (!this.mafia.family) return;

    const currentRankIndex = MAFIA_RANKS.findIndex(r => r.id === this.mafia.rank);
    if (currentRankIndex === -1 || currentRankIndex >= MAFIA_RANKS.length - 1) return; // Top rank or invalid

    const nextRank = MAFIA_RANKS[currentRankIndex + 1];
    if (this.mafia.standing >= nextRank.standing_req) {
      // Extra RNG check for higher ranks?
      this.mafia.rank = nextRank.id;
      this.job.title = `${nextRank.title} (${this.mafia.family.name})`;
      this.job.salary = nextRank.salary;

      this.logEvent(`You have been PROMOTED to ${nextRank.title} in the ${this.mafia.family.name}!`, "good");
      this.updateStats({ happiness: 20, notoriety: 10 });
    }
  }

  goToPrison(years) {
    this.isInPrison = true;
    this.prisonSentence = years;
    this.quitJob(); // Lose job
    this.logEvent(`You have been sentenced to ${years} years in prison.`, "bad");
    this.updateStats({ happiness: -50, looks: -10 });
  }

  postSocialMedia(platform, postType) {
    let viralChance = postType.viral_chance;
    if (postType.looks_bonus && this.looks > 80) viralChance += 20;

    const roll = Math.random() * 100;
    const isViral = roll < viralChance;

    let newFollowers = 0;
    let happinessChange = 0;

    if (isViral) {
      newFollowers = Math.floor(Math.random() * 1000) + 100;
      if (this.social.followers > 10000) newFollowers *= 10; // Scaling
      this.logEvent(`Your ${postType.title} on ${platform.name} went VIRAL! Gained ${newFollowers.toLocaleString()} followers.`, "good");
      happinessChange = 10;
      this.fame = (this.fame || 0) + 2;
    } else {
      newFollowers = Math.floor(Math.random() * 20) + 1;
      this.logEvent(`You posted a ${postType.title} on ${platform.name}. Gained ${newFollowers} followers.`, "neutral");
      happinessChange = 2;
    }

    // Risk Check (Trolls, Cancellation)
    if (Math.random() * 100 < postType.risk) {
      this.logEvent(`People hated your post. You lost followers!`, "bad");
      newFollowers = -Math.floor(this.social.followers * 0.05); // Lose 5%
      happinessChange = -10;
    }

    this.social.followers = Math.max(0, (this.social.followers || 0) + newFollowers);
    this.updateStats({ happiness: happinessChange });

    // Influencer Status
    if (this.social.followers > 100000 && !this.social.isInfluencer) {
      this.social.isInfluencer = true;
      this.logEvent("You are now a verified Social Media Influencer!", "good");
      this.fame = 20;
    }
  }

  buyFollowers(platform) {
    const cost = 100;
    if (this.money < cost) {
      this.logEvent("You assume you can buy followers with good looks? You need cash.", "bad");
      return;
    }
    this.money -= cost;
    const bought = 500;
    this.social.followers = (this.social.followers || 0) + bought;
    this.logEvent(`You bought ${bought} followers on ${platform.name}. Shameful.`, "neutral");
  }

  startCampaign(office) {
    if (this.money < office.cost) {
      this.logEvent(`You need $${office.cost.toLocaleString()} to run for ${office.title}.`, "bad");
      return false;
    }
    if (this.age < office.minAge) {
      this.logEvent(`You must be at least ${office.minAge} to run for ${office.title}.`, "bad");
      return false;
    }

    this.money -= office.cost;
    this.politics = {
      office: office,
      approval: 40, // Start with 40% polling
      funds: office.cost, // Initial funds committed
      weeksLeft: 10 // Campaign duration
    };
    this.logEvent(`You announced your candidacy for ${office.title}! Campaign started.`, "good");
    return true;
  }

  campaignAction(action) {
    if (!this.politics) return;

    if (action.id === 'fundraise') {
      const raised = this.randomStat(1000, 10000) * (this.fame ? 2 : 1);
      this.politics.funds += raised;
      this.logEvent(`You held a fundraiser and raised $${raised.toLocaleString()}!`, "good");
      this.politics.approval += 1;
    } else {
      // Cost check (campaign funds)
      if (this.politics.funds < action.cost) {
        this.logEvent("Your campaign is broke! Fundraise more.", "bad");
        return;
      }
      this.politics.funds -= action.cost;

      // Success Logic
      let successChance = 70 + (this.smarts / 5) + (this.looks / 5);
      if (action.risk > 0) successChance -= action.risk;

      if (Math.random() * 100 < successChance) {
        this.politics.approval = Math.min(100, this.politics.approval + action.impact);
        this.logEvent(`Campaign: ${action.title} was a success! Polls +${action.impact}%`, "good");
      } else {
        const drop = Math.floor(action.impact / 2);
        this.politics.approval = Math.max(0, this.politics.approval - drop);
        this.logEvent(`Campaign: ${action.title} backfired! Polls -${drop}%`, "bad");
      }
    }

    this.politics.weeksLeft--;

    // Election Day
    if (this.politics.weeksLeft <= 0) {
      this.holdElection();
    }
  }

  holdElection() {
    const office = this.politics.office;
    const winChance = this.politics.approval; // Direct % chance based on polling

    if (Math.random() * 100 < winChance) {
      // Victory
      this.logEvent(`ELECTION RESULTS: YOU WON! You are now the ${office.title}!`, "good");
      this.job = {
        title: office.title,
        salary: office.salary,
        performance: 50,
        isPolitical: true,
        yearsLeft: office.term
      };
      this.fame = Math.min(100, (this.fame || 0) + office.prestige);
      this.politics = null; // End campaign
    } else {
      // Defeat
      this.logEvent(`ELECTION RESULTS: You lost the election for ${office.title}.`, "bad");
      this.politics = null;
    }
  }

  joinMilitary(branch, isOfficer = false) {
    if (this.job) {
      this.logEvent("You must quit your current job first.", "bad");
      return false;
    }

    if (isOfficer) {
      // Requirement: University Degree
      const hasDegree = this.degrees.length > 0; // Simplified check
      if (!hasDegree) {
        this.logEvent("You need a university degree to join as an Officer!", "bad");
        return false;
      }
    }

    const type = isOfficer ? 'officer' : 'enlisted';
    const rank = getRank(type, 0);

    this.job = {
      title: `${rank.title} (${branch.name})`,
      salary: rank.salary,
      performance: 50,
      isMilitary: true,
      branch: branch.id,
      rankType: type,
      rankIndex: 0
    };
    this.logEvent(`You enlisted in the ${branch.name} as a ${rank.title}. Sir, yes sir!`, "good");
    return true;
  }

  promoteMilitary() {
    if (!this.job || !this.job.isMilitary) return;

    // Check if next rank exists
    const nextIndex = this.job.rankIndex + 1;
    const nextRank = getRank(this.job.rankType, nextIndex);
    const currentRank = getRank(this.job.rankType, this.job.rankIndex);

    if (nextRank.id === currentRank.id) return; // Already max rank

    this.job.rankIndex = nextIndex;
    this.job.salary = nextRank.salary;
    this.job.title = `${nextRank.title} (${this.job.branch})`; // Simplified Branch Name check

    this.logEvent(`You were promoted to ${nextRank.title}!`, "good");
    this.updateStats({ happiness: 10, fame: 5 });
  }

  buyInvestment(investment, amount) {
    if (this.money < amount) {
      this.logEvent("You don't have enough money to invest that.", "bad");
      return;
    }

    this.money -= amount;

    // Check if already owns logic? Or just push new lot?
    // Aggregating is cleaner
    let position = this.portfolio.find(p => p.id === investment.id);
    if (!position) {
      position = {
        id: investment.id,
        name: investment.name,
        type: investment.type,
        invested: 0,
        currentValue: 0
      };
      this.portfolio.push(position);
    }

    position.invested += amount;
    position.currentValue += amount; // Initial value = cost

    this.logEvent(`You invested $${amount.toLocaleString()} in ${investment.name}.`, "neutral");
  }

  sellInvestment(investmentId) {
    const positionIndex = this.portfolio.findIndex(p => p.id === investmentId);
    if (positionIndex === -1) return;

    const position = this.portfolio[positionIndex];
    const profit = position.currentValue - position.invested;

    this.money += position.currentValue;

    if (profit >= 0) {
      this.logEvent(`You sold your position in ${position.name} for a profit of $${profit.toLocaleString()}.`, "good");
    } else {
      this.logEvent(`You sold your position in ${position.name} at a loss of $${Math.abs(profit).toLocaleString()}.`, "bad");
    }

    this.portfolio.splice(positionIndex, 1);
  }


  visitDoctor(treatment) {
    if (this.money < treatment.cost) {
      this.logEvent("You can't afford the medical bill!", "bad");
      return;
    }
    this.money -= treatment.cost;

    if (treatment.id === 'witch_doctor') {
      this.logEvent("You drank the Witch Doctor's concoction...", "neutral");
      if (Math.random() < 0.3) {
        // Cured (Full Health)
        this.health = 100;
        this.happiness = 100;
        this.logEvent("Miracle! You feel invincible!", "good");
      } else {
        // Poisoned
        this.health = Math.max(0, this.health - 50);
        this.logEvent("It was poison! You feel terrible.", "bad");
        if (this.health <= 0) {
          this.isAlive = false;
          this.logEvent("The Witch Doctor killed you.", "bad");
        }
      }
      return;
    }

    if (treatment.heal) {
      this.health = Math.min(100, this.health + treatment.heal);
      this.logEvent(`You went for a ${treatment.name}. You feel better.`, "good");
    }
    if (treatment.happiness) {
      this.happiness = Math.min(100, this.happiness + treatment.happiness);
      this.logEvent(`You went to therapy. Mental health improved.`, "good");
    }
  }

  plasticSurgery(surgery) {
    if (this.money < surgery.cost) {
      this.logEvent("Insurance doesn't cover vanity. You need cash.", "bad");
      return;
    }
    this.money -= surgery.cost;

    // Risk Check
    if (Math.random() * 100 < surgery.risk) {
      // Botched
      this.looks = Math.max(0, this.looks - 30);
      this.happiness -= 40;
      this.health -= 10;
      this.logEvent(`The ${surgery.name} was BOTCHED! You look like a monster.`, "bad");
    } else {
      // Success
      this.looks = Math.min(100, this.looks + surgery.looks_gain);
      this.happiness += 20;
      this.logEvent(`The ${surgery.name} was a success! You look stunning.`, "good");
    }
  }

  // --- ROYALTY ---
  performRoyalDuty() {
    if (!this.royalty) return;

    // Different actions based on respect?
    const gain = Math.floor(Math.random() * 5) + 2;
    this.royalty.respect = Math.min(100, (this.royalty.respect || 50) + gain);
    this.fame = Math.min(100, (this.fame || 0) + 5);
    this.updateStats({ happiness: 5 });

    this.logEvent(`You performed a public royal duty. The people love you more now.`, "good");
  }

  abdicate() {
    if (!this.royalty) return;

    this.logEvent(`You have abdicated your title of ${this.royalty.title}.`, "neutral");
    this.royalty = null;
    this.money = Math.floor(this.money * 0.1); // Lose most wealth? Or keep it? keeping 10% seems fair penalty
    this.fame = Math.max(0, this.fame - 20); // Lose fame
    this.updateStats({ happiness: 20 }); // Relief?
  }

  executeSubject() {
    if (!this.royalty) return;

    if (Math.random() < 0.2) {
      // Revolts!
      this.logEvent("The people revolted against your tyranny! You have been overthrown and exiled.", "bad");
      this.royalty = null;
      this.money = 0;
      this.country = "Exile";
    } else {
      this.logEvent("You had a subject executed for fun. You monster.", "bad");
      this.royalty.respect = Math.max(0, (this.royalty.respect || 50) - 20);
      this.updateStats({ happiness: 5, karma: -50 });
    }
  }

  // --- ESTATE PLANNING ---
  createWill(primaryBeneficiary, allocations = {}) {
    if (!primaryBeneficiary) {
      this.logEvent("You must choose a primary beneficiary.", "bad");
      return false;
    }

    this.will = {
      primaryBeneficiary: primaryBeneficiary,
      allocations: allocations, // { relationshipId: percentage }
      createdAt: this.age
    };

    const beneficiaryName = this.relationships.find(r => r.id === primaryBeneficiary)?.name || 'someone';
    this.logEvent(`You created a will naming ${beneficiaryName} as your primary beneficiary.`, "neutral");
    return true;
  }

  calculateEstateTax(totalValue) {
    // Progressive tax brackets
    if (totalValue < 1000000) return 0;
    if (totalValue < 5000000) return totalValue * 0.15;
    if (totalValue < 10000000) return totalValue * 0.25;
    return totalValue * 0.40;
  }

  getTotalEstateValue() {
    let total = this.money;

    // Add asset values
    this.assets.forEach(asset => {
      total += asset.price || 0;
    });

    // Add investment values
    this.portfolio.forEach(investment => {
      total += investment.currentValue || 0;
    });

    // Subtract debts
    total -= this.loans || 0;

    return Math.max(0, total);
  }

  // --- CELEBRITY METHODS ---
  signEndorsementDeal(deal, actualValue) {
    this.logEvent(`You signed an endorsement deal with ${deal.name} worth $${actualValue.toLocaleString()}!`, "good");
    this.money += actualValue;
    this.fame = Math.min(100, this.fame + 5);
    this.updateStats({ happiness: 20 });

    // Track active endorsement
    if (!this.activeEndorsements) this.activeEndorsements = [];
    this.activeEndorsements.push({
      dealId: deal.id,
      name: deal.name,
      value: actualValue,
      yearsRemaining: deal.duration
    });
  }

  triggerScandal(scandal) {
    this.logEvent(scandal.text, scandal.type || "bad");

    if (scandal.fameImpact) {
      this.fame = Math.max(0, Math.min(100, this.fame + scandal.fameImpact));
    }

    if (scandal.happinessImpact) {
      this.updateStats({ happiness: scandal.happinessImpact });
    }

    if (scandal.healthImpact) {
      this.updateStats({ health: scandal.healthImpact });
    }

    if (scandal.moneyCost) {
      this.money -= scandal.moneyCost;
      this.logEvent(`The scandal cost you $${scandal.moneyCost.toLocaleString()} in legal fees.`, "bad");
    }

    if (scandal.relationshipDamage && this.relationships.length > 0) {
      // Damage relationship with spouse/partner
      const partner = this.relationships.find(r => r.type === 'Spouse' || r.type === 'Partner');
      if (partner) {
        partner.stat = Math.max(0, partner.stat - 40);
      }
    }
  }

  // --- BUSINESS METHODS ---
  startCompany(companyType, companyName) {
    const { Company } = require('./BusinessLogic');
    const company = new Company(companyType, companyName, `${this.firstName} ${this.lastName}`);

    this.companies.push(company);
    this.money -= company.businessType.startupCost;

    this.logEvent(`You started ${companyName}!`, "good");
    this.updateStats({ happiness: 20 });

    return company;
  }

  manageCompany(companyId, action, data) {
    const company = this.companies.find(c => c.id === companyId);
    if (!company) return { success: false, message: "Company not found" };

    let result;
    switch (action) {
      case 'hire':
        result = company.hireEmployee();
        if (result.success) {
          this.logEvent(`${company.name}: ${result.message}`, "good");
        }
        return result;

      case 'fire':
        result = company.fireEmployee();
        if (result.success) {
          this.logEvent(`${company.name}: ${result.message}`, "neutral");
        }
        return result;

      case 'ipo':
        result = company.goPublic();
        if (result.success) {
          this.money += result.amount;
          this.logEvent(`${company.name}: ${result.message}`, "good");
          this.fame = Math.min(100, this.fame + 20);
        }
        return result;

      default:
        return { success: false, message: "Unknown action" };
    }
  }

  closeCompany(companyId) {
    const index = this.companies.findIndex(c => c.id === companyId);
    if (index === -1) return;

    const company = this.companies[index];

    // Liquidate assets
    if (company.cash > 0) {
      this.money += company.cash;
      this.logEvent(`You closed ${company.name} and recovered $${company.cash.toLocaleString()}.`, "neutral");
    } else {
      this.logEvent(`You closed ${company.name}. It was bankrupt.`, "bad");
    }

    this.companies.splice(index, 1);
    this.updateStats({ happiness: -10 });
  }
}
