export const SOCIAL_PLATFORMS = [
    { id: 'bitbook', name: 'BitBook', icon: '📘' },
    { id: 'instafame', name: 'InstaFame', icon: '📸' },
    { id: 'toktik', name: 'TokTik', icon: '🎵' }
];

export class SocialMedia {
    static postUpdate(person, platformId = 'bitbook') {
        // Content Generation
        const topics = [
            "a selfie", "a political rant", "a cute cat video",
            "a dance challenge", "a motivational quote", "what they ate for lunch"
        ];
        const topic = topics[Math.floor(Math.random() * topics.length)];

        // Viral Logic
        // Base chance 5%, +1% per 10 Looks, +1% per 10 Smarts
        let viralChance = 0.05 + (person.looks / 1000) + (person.smarts / 1000);
        const isViral = Math.random() < viralChance;

        // Likes Calculation
        let baseLikes = Math.floor(Math.random() * 20) + 1; // 1-20 likes initially
        if (person.social.followers > 0) {
            baseLikes += Math.floor(person.social.followers * (Math.random() * 0.1)); // 0-10% of followers like it
        }

        if (isViral) {
            baseLikes *= Math.floor(Math.random() * 50) + 10; // 10x - 60x multiplier
        }

        // Follower Gain
        let newFollowers = 0;
        if (isViral) {
            newFollowers = Math.floor(baseLikes * 0.5);
        } else {
            // Small chance to gain followers normally
            if (Math.random() > 0.5) newFollowers = Math.floor(Math.random() * 5);
        }

        return {
            text: `You posted ${topic} on ${SOCIAL_PLATFORMS.find(p => p.id === platformId).name}.`,
            likes: baseLikes,
            newFollowers: newFollowers,
            isViral: isViral,
            platform: platformId // Store platform info
        };
    }

    static buyFollowers(person, amount = 1000) {
        const cost = 100;
        if (person.money < cost) return { success: false, reason: "Not enough money" };

        // Risk of getting banned or losing them? Maybe later.
        return { success: true, cost: cost, gained: amount };
    }
}
