export const SOCIAL_PLATFORMS = [
    { id: 'bitbook', name: 'BitBook', type: 'text', audience: 'older', growth_rate: 1.0 },
    { id: 'insta', name: 'InstaPic', type: 'image', audience: 'mixed', growth_rate: 1.2 },
    { id: 'toktik', name: 'TokTik', type: 'video', audience: 'young', growth_rate: 1.5 },
    { id: 'utube', name: 'YouTube', type: 'video', audience: 'mixed', growth_rate: 1.1 },
    { id: 'x', name: 'X', type: 'text', audience: 'mixed', growth_rate: 0.9 }
];

export const POST_TYPES = [
    { id: 'selfie', title: 'Post a Selfie', risk: 5, viral_chance: 10, looks_bonus: true },
    { id: 'meme', title: 'Post a Meme', risk: 2, viral_chance: 15, looks_bonus: false },
    { id: 'dance', title: 'Dance Video', risk: 10, viral_chance: 25, looks_bonus: true },
    { id: 'political', title: 'Political Rant', risk: 40, viral_chance: 30, looks_bonus: false },
    { id: 'vlog', title: 'Life Vlog', risk: 5, viral_chance: 5, looks_bonus: false },
    { id: 'challenge', title: 'Viral Challenge', risk: 20, viral_chance: 40, looks_bonus: true }
];
