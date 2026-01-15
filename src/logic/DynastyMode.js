// Dynasty & Legacy System - Multi-generational gameplay

export class FamilyTree {
    constructor() {
        this.generations = [];
        this.heirlooms = [];
        this.familyWealth = 0;
        this.familyName = '';
        this.foundedYear = 0;
        this.load();
    }

    load() {
        const saved = localStorage.getItem('bitlife_family_tree');
        if (saved) {
            const data = JSON.parse(saved);
            this.generations = data.generations || [];
            this.heirlooms = data.heirlooms || [];
            this.familyWealth = data.familyWealth || 0;
            this.familyName = data.familyName || '';
            this.foundedYear = data.foundedYear || 0;
        }
    }

    save() {
        const data = {
            generations: this.generations,
            heirlooms: this.heirlooms,
            familyWealth: this.familyWealth,
            familyName: this.familyName,
            foundedYear: this.foundedYear
        };
        localStorage.setItem('bitlife_family_tree', JSON.stringify(data));
    }

    addGeneration(person) {
        const generation = {
            id: Date.now(),
            name: `${person.firstName} ${person.lastName}`,
            birthYear: new Date().getFullYear() - person.age,
            deathYear: new Date().getFullYear(),
            age: person.age,
            peakWealth: person.getTotalEstateValue(),
            occupation: person.job ? person.job.title : 'Unemployed',
            children: person.relationships.filter(r => r.type === 'Child').length,
            achievements: person.achievements ? person.achievements.length : 0,
            royalty: person.royalty ? person.royalty.title : null,
            fame: person.fame,
            companies: person.companies ? person.companies.length : 0
        };

        this.generations.push(generation);
        this.familyWealth += generation.peakWealth;

        if (this.generations.length === 1) {
            this.familyName = person.lastName;
            this.foundedYear = generation.birthYear;
        }

        this.save();
        return generation;
    }

    getGenerationCount() {
        return this.generations.length;
    }

    getTotalFamilyWealth() {
        return this.familyWealth;
    }

    getPatriarchMatriarch() {
        return this.generations[0];
    }

    getMostSuccessful() {
        if (this.generations.length === 0) return null;
        return this.generations.reduce((max, gen) =>
            gen.peakWealth > max.peakWealth ? gen : max
        );
    }

    reset() {
        this.generations = [];
        this.heirlooms = [];
        this.familyWealth = 0;
        this.familyName = '';
        this.foundedYear = 0;
        localStorage.removeItem('bitlife_family_tree');
    }
}

export const HEIRLOOM_TYPES = [
    {
        id: 'family_ring',
        name: 'Family Ring',
        description: 'A precious ring passed down through generations',
        value: 5000,
        effects: { looks: 5, happiness: 10 },
        rarity: 'common'
    },
    {
        id: 'grandfather_watch',
        name: 'Grandfather\'s Watch',
        description: 'An antique timepiece with sentimental value',
        value: 10000,
        effects: { happiness: 15 },
        rarity: 'uncommon'
    },
    {
        id: 'family_bible',
        name: 'Family Bible',
        description: 'Records of your family history spanning centuries',
        value: 2000,
        effects: { happiness: 20, karma: 10 },
        rarity: 'common'
    },
    {
        id: 'royal_crown',
        name: 'Royal Crown',
        description: 'A crown from your royal ancestor',
        value: 500000,
        effects: { fame: 20, happiness: 30 },
        rarity: 'legendary',
        requiresRoyalty: true
    },
    {
        id: 'war_medal',
        name: 'War Medal',
        description: 'Medal of Honor from a military ancestor',
        value: 50000,
        effects: { fame: 10, karma: 15 },
        rarity: 'rare',
        requiresMilitary: true
    },
    {
        id: 'business_deed',
        name: 'Original Business Deed',
        description: 'Founding documents of your family\'s first company',
        value: 100000,
        effects: { smarts: 10, happiness: 20 },
        rarity: 'rare',
        requiresBusiness: true
    }
];

export function createHeirloom(person) {
    const eligible = HEIRLOOM_TYPES.filter(h => {
        if (h.requiresRoyalty && !person.royalty) return false;
        if (h.requiresMilitary && (!person.job || !person.job.isMilitary)) return false;
        if (h.requiresBusiness && (!person.companies || person.companies.length === 0)) return false;
        return true;
    });

    if (eligible.length === 0) return null;

    // Higher chance for rarer items based on person's success
    const netWorth = person.getTotalEstateValue();
    let heirloom;

    if (netWorth > 10000000 && Math.random() < 0.3) {
        // Chance for legendary
        const legendary = eligible.filter(h => h.rarity === 'legendary');
        if (legendary.length > 0) {
            heirloom = legendary[Math.floor(Math.random() * legendary.length)];
        }
    } else if (netWorth > 1000000 && Math.random() < 0.5) {
        // Chance for rare
        const rare = eligible.filter(h => h.rarity === 'rare');
        if (rare.length > 0) {
            heirloom = rare[Math.floor(Math.random() * rare.length)];
        }
    }

    // Default to common/uncommon
    if (!heirloom) {
        const common = eligible.filter(h => h.rarity === 'common' || h.rarity === 'uncommon');
        heirloom = common[Math.floor(Math.random() * common.length)];
    }

    return {
        ...heirloom,
        inheritedFrom: `${person.firstName} ${person.lastName}`,
        yearAcquired: new Date().getFullYear()
    };
}

export const familyTree = new FamilyTree();
