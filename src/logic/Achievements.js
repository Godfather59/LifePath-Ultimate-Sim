export const ACHIEVEMENTS = [
    {
        id: 'survivor',
        title: 'Survivor',
        description: 'Survive to age 50.',
        icon: '🎂'
    },
    {
        id: 'centenarian',
        title: 'Centenarian',
        description: 'Live to be 100 years old.',
        icon: '🐢'
    },
    {
        id: 'millionaire',
        title: 'Millionaire',
        description: 'Amass a net worth of $1,000,000.',
        icon: '🤑'
    },
    {
        id: 'multi_millionaire',
        title: 'Multi-Millionaire',
        description: 'Amass a net worth of $10,000,000.',
        icon: '💎'
    },
    {
        id: 'criminal',
        title: 'Criminal',
        description: 'Go to prison.',
        icon: '🚓'
    },
    {
        id: 'educated',
        title: 'Scholar',
        description: 'Graduate from University.',
        icon: '🎓'
    },
    {
        id: 'doctor',
        title: 'Brain Surgeon',
        description: 'Become a Brain Surgeon.',
        icon: '🧠'
    },
    {
        id: 'casanova',
        title: 'Casanova',
        description: 'Have 5 or more partners in one life.',
        icon: '❤️'
    },
    {
        id: 'fertile',
        title: 'Fertile',
        description: 'Have 3 or more children in one life.',
        icon: '👶'
    },
    {
        id: 'thief',
        title: 'Cat Burglar',
        description: 'Successfully burgle a house.',
        icon: '💰'
    }
];

export function checkAchievements(person, unlockedIds) {
    const newUnlocks = [];

    // Net Worth Calculation
    let netWorth = person.money;
    person.assets.forEach(a => netWorth += a.price);

    // Checkers
    if (person.age >= 50 && !unlockedIds.includes('survivor')) newUnlocks.push('survivor');
    if (person.age >= 100 && !unlockedIds.includes('centenarian')) newUnlocks.push('centenarian');

    if (netWorth >= 1000000 && !unlockedIds.includes('millionaire')) newUnlocks.push('millionaire');
    if (netWorth >= 10000000 && !unlockedIds.includes('multi_millionaire')) newUnlocks.push('multi_millionaire');

    if (person.isInPrison && !unlockedIds.includes('criminal')) newUnlocks.push('criminal');

    if (person.educationHistory.some(e => e.includes('University')) && !unlockedIds.includes('educated')) newUnlocks.push('educated');

    if (person.job && person.job.title === 'Brain Surgeon' && !unlockedIds.includes('doctor')) newUnlocks.push('doctor');

    // Partners (history check)
    const partners = person.history.filter(h => h.text.includes('started dating')).length;
    if (partners >= 5 && !unlockedIds.includes('casanova')) newUnlocks.push('casanova');

    // Children
    const children = person.relationships.filter(r => r.type === 'Child').length;
    if (children >= 3 && !unlockedIds.includes('fertile')) newUnlocks.push('fertile');

    // Thief (history check for success)
    if (person.history.some(h => h.text.includes('successfully committed Burglary')) && !unlockedIds.includes('thief')) newUnlocks.push('thief');

    return newUnlocks;
}
