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
    },
    {
        id: 'born_royal',
        title: 'Blue Blood',
        description: 'Be born into Royalty.',
        icon: '👑'
    },
    {
        id: 'monarch',
        title: 'Long Live the King/Queen',
        description: 'Become the Monarch of your country.',
        icon: '🏰'
    },
    {
        id: 'tyrant',
        title: 'Tyrant',
        description: 'Execute a subject.',
        icon: '☠️'
    },
    {
        id: 'general',
        title: 'Five Star General',
        description: 'Reach the highest rank in the military.',
        icon: '🎖️'
    },
    {
        id: 'war_hero',
        title: 'War Hero',
        description: 'Survive a minefield deployment.',
        icon: '💣'
    },
    {
        id: 'made_man',
        title: 'Made Man',
        description: 'Join the Mafia.',
        icon: '🌹'
    },
    {
        id: 'godfather',
        title: 'The Godfather',
        description: 'Become the head of a Mafia family.',
        icon: '🐴'
    },
    {
        id: 'phd',
        title: 'Academic',
        description: 'Graduate from Graduate School.',
        icon: '📜'
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

    // --- Royalty ---
    if (person.royalty) {
        if (person.history.some(h => h.text.includes('born a Prince') || h.text.includes('born a Princess')) && !unlockedIds.includes('born_royal')) newUnlocks.push('born_royal');

        if ((person.royalty.title === 'King' || person.royalty.title === 'Queen') && !unlockedIds.includes('monarch')) newUnlocks.push('monarch');

        if (person.history.some(h => h.text.includes('executed')) && !unlockedIds.includes('tyrant')) newUnlocks.push('tyrant');
    }

    // --- Military ---
    if (person.job && person.job.isMilitary) {
        if ((person.job.title.includes('General') || person.job.title.includes('Admiral')) && !unlockedIds.includes('general')) newUnlocks.push('general');
    }
    // War hero check needs history log of medal or survival
    if (person.history.some(h => h.text.includes('survived the minefield')) && !unlockedIds.includes('war_hero')) newUnlocks.push('war_hero');

    // --- Mafia ---
    if (person.mafia) {
        if (!unlockedIds.includes('made_man')) newUnlocks.push('made_man');
        if (person.mafia.rank === 'Godfather' && !unlockedIds.includes('godfather')) newUnlocks.push('godfather');
    }

    // --- Education ---
    if (person.educationHistory.some(e => ['Medical School', 'Law School', 'Business School'].some(s => e.includes(s))) && !unlockedIds.includes('phd')) newUnlocks.push('phd');

    return newUnlocks;
}
