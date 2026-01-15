export const STOCKS = [
    { id: 'sp500', name: 'S&P 500 Index', type: 'stock', volatility: 0.1, risk: 'low' },
    { id: 'tech', name: 'Tech ETF', type: 'stock', volatility: 0.2, risk: 'medium' },
    { id: 'pharma', name: 'Pharma Giant', type: 'stock', volatility: 0.15, risk: 'medium' },
    { id: 'startups', name: 'Emerging Startups', type: 'stock', volatility: 0.4, risk: 'high' }
];

export const CRYPTO = [
    { id: 'btc', name: 'BitCoin', type: 'crypto', volatility: 0.6, risk: 'high' },
    { id: 'eth', name: 'Ethereum', type: 'crypto', volatility: 0.5, risk: 'high' },
    { id: 'doge', name: 'DogeCoin', type: 'crypto', volatility: 0.9, risk: 'extreme' }
];

export function getInvestmentReturn(asset, economy) {
    let change = 0;
    const volatility = asset.volatility;

    if (asset.type === 'stock') {
        const baseReturn = economy === 'Boom' ? 0.15 : economy === 'Recession' ? -0.10 : 0.05;
        // Random fluctuation around base
        change = baseReturn + ((Math.random() - 0.5) * volatility);
    } else {
        // Crypto is wild, mostly ignored economy but slight correlation
        const sentiment = Math.random(); // 0-1
        if (sentiment > 0.9) change = 2.0; // Moon! +200%
        else if (sentiment < 0.2) change = -0.5; // Crash -50%
        else change = (Math.random() - 0.5) * volatility;
    }
    return change;
}
