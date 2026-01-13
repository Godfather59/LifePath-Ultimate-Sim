import { GameEngine } from './GameEngine';

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

    this.isAlive = true;
    this.job = null; // { title, salary, performance }
    this.education = "None";

    this.pendingEvent = null; // For interactive events

    // Assets
    this.assets = []; // Array of owned asset objects

    // Relationships
    this.relationships = []; // [{ id, name, type, stat }]

    // Education
    this.educationHistory = []; // [ "High School", "University (Science)" ]
    this.currentSchool = null; // { ...school, year: 1 }

    // Social Media
    this.social = {
      followers: 0,
      posts: 0,
      isInfluencer: false
    };

    // Crime
    this.isInPrison = false;
    this.prisonSentence = 0;
    this.notoriety = 0; // 0-100
    this.mafia = {
      family: null, // family object
      rank: null, // rank id
      standing: 0 // 0-100 reputation within family
    };

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
  }


  setJob(jobData) {
    this.job = {
      ...jobData,
      yearsEmployed: 0,
      performance: 50 // 0-100
    };
    this.logEvent(`You started working as a ${jobData.title}.`, "good");
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

    if (activity.isCrime) {
      this.commitCrime(activity.crimeType);
      return true;
    }

    this.money -= activity.cost;
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

  buyAsset(asset) {
    if (this.money < asset.price) {
      this.logEvent(`You cannot afford the ${asset.name}.`, "bad");
      return false;
    }

    this.money -= asset.price;
    this.assets.push({
      ...asset,
      purchasePrice: asset.price,
      value: asset.value || asset.price // Set initial value for appreciation tracking
    });
    this.updateStats({ happiness: asset.happiness_bonus || 10 }); // Default bonus
    this.logEvent(`You bought a ${asset.name} for $${asset.price.toLocaleString()}!`, "good");
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

  interactWithRel(relId, action) {
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
        text = `You complimented your ${rel.type}, ${rel.name}.`;
        change = 8;
        type = "good";
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
              gender: childGender
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
        if (rel.stat > 60) {
          rel.type = 'Fiancé';
          text = `You proposed to ${rel.name} and they said YES!`;
          change = 30; // Huge boost
          type = "good";
        } else {
          text = `You proposed to ${rel.name} but they said NO.`;
          change = -30;
          type = "bad";
        }
        break;
      case 'marry':
        const cost = 5000;
        if (this.money < cost) {
          this.logEvent(`You can't afford the wedding ($${cost})!`, "bad");
          return;
        }
        this.money -= cost;
        rel.type = 'Spouse';
        text = `You married ${rel.name}! It was a beautiful ceremony ($${cost}).`;
        change = 40;
        type = "good";
        break;
      case 'break_up':
        text = `You broke up with ${rel.name}.`;
        change = -10;
        this.relationships = this.relationships.filter(r => r.id !== relId);
        type = "neutral";
        break;
      case 'divorce':
        const split = Math.floor(this.money * 0.5);
        this.money -= split;
        text = `You divorced ${rel.name}. You lost $${split.toLocaleString()} in the settlement.`;
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

    if (this.smarts < school.smarts_req) {
      this.logEvent(`You were rejected from ${school.name} (Smarts too low).`, "bad");
      return false;
    }

    // Check prerequisites for Grad School
    if (school.req_degree && !this.educationHistory.includes(school.req_degree)) {
      this.logEvent(`You need a ${school.req_degree} degree first!`, "bad");
      return false;
    }

    // Scholarship chance logic (very simple)
    let tuition = school.cost;
    if (this.smarts > 90) {
      this.logEvent(`You won a scholarship to ${school.name}!`, "good");
      tuition = 0;
    } else if (this.money < school.cost) {
      this.logEvent(`You took out a loan for ${school.name}.`, "neutral");
      // Simplified: Debt is just negative money for now in this game engine
    } else {
      this.logEvent(`You paid tuition for ${school.name}.`, "neutral");
    }

    this.currentSchool = { ...school, year: 1, tuitionPaid: tuition };
    this.money -= tuition;
    this.logEvent(`You started studying at ${school.name}.`, "good");
    return true;
  }

  studyHard() {
    if (!this.currentSchool) return;

    // Performance gain
    this.currentSchool.performance = (this.currentSchool.performance || 50) + 10;
    if (this.currentSchool.performance > 100) this.currentSchool.performance = 100;

    // Smarts gain
    this.updateStats({ smarts: 2, stress: 5 });
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
    p.social = { ...this.social };

    // pendingEvent is untouched (reference copy) so we keep functions

    return p;
  }

  practiceSkill(skillId) {
    const isVoice = skillId === 'voice';
    if (!this.skills.instruments) this.skills.instruments = {};
    const current = isVoice ? this.skills.voice : (this.skills.instruments[skillId] || 0);

    const improvement = Math.floor(Math.random() * 6) + 1 + (this.musicalTalent > 80 ? 2 : 0);
    const newVal = Math.min(100, current + improvement);

    if (isVoice) {
      this.skills.voice = newVal;
      this.logEvent(`You took voice lessons. Skill: ${newVal}%`, "good");
    } else {
      this.skills.instruments[skillId] = newVal;
      this.logEvent(`You practiced the ${skillId}. Skill: ${newVal}%`, "good");
    }
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

    const action = actionId; // Assuming action object passed or looked up
    // Simplified: Logic handled in UI/Engine, here just state updates
    // Note: Ideally we pass the full action object or look it up from constants

    // We will implement full logic in the Modal or a specialized helper, 
    // but let's put core logic here if we have the Action definitions.
    // For now, let's assume valid action passed.
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

  joinMilitary(branch) {
    this.job = {
      title: `Private (${branch})`,
      salary: 20000,
      performance: 50,
      isMilitary: true,
      branch: branch,
      rankIndex: 0
    };
    this.logEvent(`You enlisted in the ${branch}. Sir, yes sir!`, "good");
    return true;
  }

  promoteMilitary() {
    if (!this.job || !this.job.isMilitary) return;

    const RANKS = ['Private', 'Corporal', 'Sergeant', 'Lieutenant', 'Captain', 'Major', 'Colonel', 'General'];
    const nextRankIndex = this.job.rankIndex + 1;

    if (nextRankIndex < RANKS.length) {
      const newTitle = `${RANKS[nextRankIndex]} (${this.job.branch})`;
      this.updateStats({ happiness: 20, money: 5000 }); // Bonus
    }
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
}
