export class Pet {
    constructor(type, name, age = 0) {
        this.id = Date.now() + Math.random();
        this.type = type;
        this.name = name;
        this.age = age;

        // random stats
        this.happiness = Math.floor(Math.random() * 50) + 50; // 50-100
        this.health = Math.floor(Math.random() * 40) + 60; // 60-100
        this.craziness = Math.floor(Math.random() * 100);
        this.smartness = Math.floor(Math.random() * 100);

        this.relationship = 50; // Start mediocre
    }

    static generateRandomPet() {
        const types = ['Dog', 'Cat', 'Rabbit', 'Hamster'];
        const names = {
            'Dog': ['Buddy', 'Max', 'Bella', 'Charlie', 'Rex'],
            'Cat': ['Luna', 'Oliver', 'Milo', 'Simba', 'Chloe'],
            'Rabbit': ['Thumper', 'Oreo', 'Bunbun'],
            'Hamster': ['Squeaky', 'Nibbles', 'Peanut']
        };

        const type = types[Math.floor(Math.random() * types.length)];
        const nameList = names[type] || ['Pet'];
        const name = nameList[Math.floor(Math.random() * nameList.length)];

        // Shelter pets are usually not babies
        const age = Math.floor(Math.random() * 5) + 1;

        return new Pet(type, name, age);
    }
}
