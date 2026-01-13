export const INSTRUMENTS = [
    { id: 'guitar', name: 'Guitar', type: 'String', difficulty: 1 },
    { id: 'piano', name: 'Piano', type: 'Keys', difficulty: 1 },
    { id: 'drums', name: 'Drums', type: 'Percussion', difficulty: 2 },
    { id: 'bass', name: 'Bass Guitar', type: 'String', difficulty: 1 },
    { id: 'violin', name: 'Violin', type: 'String', difficulty: 3 },
    { id: 'saxophone', name: 'Saxophone', type: 'Wind', difficulty: 2 }
];

export const GENRES = [
    { id: 'pop', name: 'Pop', popularity: 1.0 },
    { id: 'rock', name: 'Rock', popularity: 0.8 },
    { id: 'rap', name: 'Hip Hop / Rap', popularity: 0.9 },
    { id: 'country', name: 'Country', popularity: 0.6 },
    { id: 'rb', name: 'R&B', popularity: 0.7 }
];

export class MusicManager {
    static practice(person, instrumentId) {
        // If instrumentId is 'voice', it's voice lessons
        const isVoice = instrumentId === 'voice';

        // Check if person knows this instrument
        let skill = 0;
        if (isVoice) {
            skill = person.skills?.voice || 0;
        } else {
            skill = person.skills?.instruments?.[instrumentId] || 0;
        }

        // Improvement calculation
        // Younger people learn faster?
        let improvement = Math.floor(Math.random() * 5) + 1; // 1-6%
        if (person.smarts > 80) improvement += 2;
        if (person.musicalTalent > 80) improvement += 3;

        // Cap at 100
        const newSkill = Math.min(100, skill + improvement);

        return {
            improvement,
            newSkill,
            message: `You practiced ${isVoice ? 'Voice' : instrumentId} and improved by ${improvement}% (Skill: ${newSkill}%)`
        };
    }
}
