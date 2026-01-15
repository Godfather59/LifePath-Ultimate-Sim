export const MILITARY_BRANCHES = [
    { id: 'army', name: 'Army', color: '#4caf50' },
    { id: 'navy', name: 'Navy', color: '#2196f3' },
    { id: 'air_force', name: 'Air Force', color: '#03a9f4' },
    { id: 'marines', name: 'Marines', color: '#f44336' }
];

export const MILITARY_RANKS = {
    enlisted: [
        { id: 'e1', title: 'Private', salary: 20000 },
        { id: 'e2', title: 'Private First Class', salary: 24000 },
        { id: 'e3', title: 'Corporal', salary: 28000 },
        { id: 'e4', title: 'Sergeant', salary: 34000 },
        { id: 'e5', title: 'Staff Sergeant', salary: 40000 },
        { id: 'e6', title: 'Sergeant Major', salary: 50000 }
    ],
    officer: [
        { id: 'o1', title: 'Second Lieutenant', salary: 45000 },
        { id: 'o2', title: 'First Lieutenant', salary: 55000 },
        { id: 'o3', title: 'Captain', salary: 65000 },
        { id: 'o4', title: 'Major', salary: 80000 },
        { id: 'o5', title: 'Colonel', salary: 100000 },
        { id: 'o6', title: 'General', salary: 150000 }
    ]
};

export function getRank(type, index) {
    const list = MILITARY_RANKS[type] || MILITARY_RANKS.enlisted;
    return list[index] || list[list.length - 1]; // Cap at top rank
}
