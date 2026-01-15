export const SOCIAL_PLATFORMS = [
    { id: 'bitbook', name: 'BitBook', type: 'text', audience: 'older', growth_rate: 1.0 },
    { id: 'insta', name: 'InstaPic', type: 'image', audience: 'mixed', growth_rate: 1.2 },
    { id: 'toktik', name: 'TokTik', type: 'video', audience: 'young', growth_rate: 1.8 }, // Viral potential high
    { id: 'utube', name: 'YouTube', type: 'video', audience: 'mixed', growth_rate: 1.1 },
    { id: 'x', name: 'X', type: 'text', audience: 'mixed', growth_rate: 0.9 }
];

export const POST_TYPES = [
    { id: 'selfie', title: 'Post a Selfie', risk: 5, viral_chance: 10, looks_bonus: true },
    { id: 'meme', title: 'Post a Meme', risk: 2, viral_chance: 15, looks_bonus: false },
    { id: 'dance', title: 'Dance Video', risk: 10, viral_chance: 35, looks_bonus: true },
    { id: 'political', title: 'Political Rant', risk: 40, viral_chance: 30, looks_bonus: false },
    { id: 'vlog', title: 'Life Vlog', risk: 5, viral_chance: 5, looks_bonus: false },
    { id: 'challenge', title: 'Viral Challenge', risk: 20, viral_chance: 40, looks_bonus: true }
];

export function handlePost(person, platformId, postId) {
    const platform = SOCIAL_PLATFORMS.find(p => p.id === platformId);
    const postType = POST_TYPES.find(p => p.id === postId);

    // Ensure platform data exists on person
    if (!person.social.platforms[platformId]) {
        person.social.platforms[platformId] = { followers: 0, posts: 0 };
    }

    const account = person.social.platforms[platformId];

    // Viral Calculation
    let viralScore = Math.random() * 100;

    // Bonuses
    if (postType.looks_bonus) {
        viralScore += (person.looks / 10); // +0-10
    }
    // Smarts bonus for text
    if (platform.type === 'text') {
        viralScore += (person.smarts / 10);
    }

    // Outcome
    let followersGained = 0;
    let feedback = "";
    let type = "neutral";
    let statsChange = {};

    // 1. Viral Hit
    if (viralScore > (100 - postType.viral_chance)) {
        const base = 1000 * platform.growth_rate;
        followersGained = Math.floor(base * (Math.random() * 10 + 1)); // 1k - 10k+
        feedback = `YOUR POST WENT VIRAL! You gained ${followersGained.toLocaleString()} followers on ${platform.name}.`;
        type = "good";
        statsChange = { happiness: 10, fame: 5 };
    }
    // 2. Cancellation / Trolled
    else if (Math.random() * 100 < postType.risk) {
        const loss = Math.floor(account.followers * 0.1) + 10;
        followersGained = -loss;
        feedback = `You were trolled for your post. You lost ${loss} followers.`;
        type = "bad";
        statsChange = { happiness: -10, stress: 5 };
    }
    // 3. Normal Post
    else {
        const base = 10 + (account.followers * 0.05); // Organic growth
        followersGained = Math.floor(base * Math.random() * platform.growth_rate);
        feedback = `You posted a ${postType.title}. You gained ${followersGained} followers.`;
        type = "neutral";
        statsChange = { happiness: 1 };
    }

    // Apply
    account.followers = Math.max(0, account.followers + followersGained);
    account.posts++;
    person.social.totalFollowers = Object.values(person.social.platforms).reduce((acc, curr) => acc + curr.followers, 0);

    // Influencer Status?
    if (person.social.totalFollowers > 100000 && !person.social.isInfluencer) {
        person.social.isInfluencer = true;
        feedback += " You are now a recognized Influencer!";
    }

    person.updateStats(statsChange);
    person.logEvent(feedback, type);
}

export function handleMonetization(person, platformId) {
    if (!person.social.platforms[platformId]) return;
    const followers = person.social.platforms[platformId].followers;

    if (followers < 5000) {
        person.logEvent("You don't have enough followers for a brand deal (Need 5k).", "bad");
        return;
    }

    // Success chance based on followers/fame
    const pay = Math.floor(followers * 0.05); // $0.05 per follower per deal? High but okay for game balance.
    // e.g., 100k followers -> $5000. 1M -> $50k.

    if (Math.random() > 0.3) {
        person.money += pay;
        person.logEvent(`You promoted 'Raid Shadow Legends' on ${SOCIAL_PLATFORMS.find(p => p.id === platformId).name}. You earned $${pay.toLocaleString()}.`, "good");

        // Sellout penalty?
        person.social.platforms[platformId].followers = Math.floor(followers * 0.98); // Lose 2% followers
    } else {
        person.logEvent("No brands were interested in working with you right now.", "neutral");
    }
}
