export const HOUSE_TYPES = [
    { id: 'trailer', name: 'Trailer', basePrice: 15000, maintenance: 500, type: 'Real Estate' },
    { id: 'tiny_house', name: 'Tiny House', basePrice: 40000, maintenance: 1000, type: 'Real Estate' },
    { id: 'condo', name: 'Condo', basePrice: 120000, maintenance: 3000, type: 'Real Estate' },
    { id: 'suburban_house', name: '3-Bedroom House', basePrice: 350000, maintenance: 6000, type: 'Real Estate' },
    { id: 'farm', name: 'Farm', basePrice: 750000, maintenance: 15000, type: 'Real Estate' },
    { id: 'mansion', name: 'Mansion', basePrice: 2500000, maintenance: 50000, type: 'Real Estate' },
    { id: 'castle', name: 'Castle', basePrice: 10000000, maintenance: 200000, type: 'Real Estate' }
];

export const CAR_TYPES = [
    { id: 'beater', name: 'Used Beater', basePrice: 2000, maintenance: 1500, type: 'Vehicle' },
    { id: 'sedan', name: 'Sedan', basePrice: 25000, maintenance: 1000, type: 'Vehicle' },
    { id: 'suv', name: 'SUV', basePrice: 40000, maintenance: 1500, type: 'Vehicle' },
    { id: 'truck', name: 'Pickup Truck', basePrice: 50000, maintenance: 1800, type: 'Vehicle' },
    { id: 'sports', name: 'Sports Car', basePrice: 85000, maintenance: 4000, type: 'Vehicle' },
    { id: 'luxury', name: 'Luxury Sedan', basePrice: 120000, maintenance: 5000, type: 'Vehicle' },
    { id: 'supercar', name: 'Supercar', basePrice: 500000, maintenance: 15000, type: 'Vehicle' }
];

export class AssetMarket {
    static generateRealEstateListings(count = 5) {
        const listings = [];
        for (let i = 0; i < count; i++) {
            const template = HOUSE_TYPES[Math.floor(Math.random() * HOUSE_TYPES.length)];
            // Randomize price by +/- 20%
            const variance = (Math.random() * 0.4) - 0.2;
            const price = Math.floor(template.basePrice * (1 + variance));

            // Condition 0-100
            const condition = Math.floor(Math.random() * 50) + 50; // Listed homes usually decent

            listings.push({
                ...template,
                uniqueId: Date.now() + Math.random(),
                price: price,
                value: price, // Initial value = price paid roughly
                condition: condition,
                age: 0, // Age of ownership
                marketTrend: 1.0 // Multiplier for future calculations
            });
        }
        return listings.sort((a, b) => a.price - b.price);
    }

    static generateCarListings(count = 5) {
        const listings = [];
        for (let i = 0; i < count; i++) {
            const template = CAR_TYPES[Math.floor(Math.random() * CAR_TYPES.length)];
            const isUsed = Math.random() > 0.5;

            let condition = 100;
            let price = template.basePrice;

            if (isUsed) {
                condition = Math.floor(Math.random() * 70) + 20;
                // Price drops 50% + condition factor
                price = Math.floor(price * 0.5 * (condition / 100));
            } else {
                // New dealer markup
                price = Math.floor(price * 1.1);
            }

            listings.push({
                ...template,
                uniqueId: Date.now() + Math.random(),
                price: price,
                value: price,
                condition: condition,
                isBrandNew: !isUsed,
                age: isUsed ? Math.floor(Math.random() * 10) + 1 : 0
            });
        }
        return listings.sort((a, b) => a.price - b.price);
    }
}
