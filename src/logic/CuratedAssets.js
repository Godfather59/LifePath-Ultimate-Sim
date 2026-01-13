export const LUXURY_ASSETS = [
    // JETS
    { id: 'jet_cessna', name: 'Cessna Citation', type: 'Plane', price: 2500000, happiness_bonus: 30, maintenance: 50000 },
    { id: 'jet_learner', name: 'Learjet 75', type: 'Plane', price: 13000000, happiness_bonus: 50, maintenance: 200000 },
    { id: 'jet_gulfstream', name: 'Gulfstream G650', type: 'Plane', price: 65000000, happiness_bonus: 80, maintenance: 1000000 },

    // YACHTS
    { id: 'yacht_sea', name: 'Sea Ray Sundancer', type: 'Yacht', price: 200000, happiness_bonus: 20, maintenance: 5000 },
    { id: 'yacht_sun', name: 'Sunseeker 95', type: 'Yacht', price: 11000000, happiness_bonus: 60, maintenance: 150000 },
    { id: 'yacht_mega', name: 'Megayacht Eclipse', type: 'Yacht', price: 150000000, happiness_bonus: 100, maintenance: 2000000 },

    // JEWELRY
    { id: 'jewel_rolex', name: 'Rolex Submariner', type: 'Jewelry', price: 10000, happiness_bonus: 5, maintenance: 0 },
    { id: 'jewel_ring', name: '2ct Diamond Ring', type: 'Jewelry', price: 25000, happiness_bonus: 10, maintenance: 0 },
    { id: 'jewel_necklace', name: 'Harry Winston Necklace', type: 'Jewelry', price: 500000, happiness_bonus: 40, maintenance: 0 }
];

export const getAssetsByType = (type) => {
    return LUXURY_ASSETS.filter(a => a.type === type);
};
