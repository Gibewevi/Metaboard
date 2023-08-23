const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const strategies = [
    'Breakout Strategy',
    'Moving Average Crossover Strategy',
    'Dual Moving Average Crossover Strategy',
    'Momentum Strategy',
    'Reversal Strategy',
    'Range Trading Strategy',
    'Support and Resistance Strategy',
    'Trend Trading Strategy',
    'Position Trading Strategy',
    'Swing Trading Strategy',
    'Stochastic Oscillator Strategy',
    'Fibonacci Retracement Strategy',
    'Bollinger Bands Strategy',
    'MACD Divergence Strategy',
    'RSI (Relative Strength Index) Strategy',
    'Parabolic SAR Strategy',
    'Volume Spread Analysis Strategy',
    'Harmonic Pattern Strategy',
    'Elliott Wave Strategy',
    'Pin Bar Strategy',
    'Inside Bar Strategy',
    'Triangular Arbitrage Strategy',
    'Gap Trading Strategy',
    'Candlestick Pattern Strategy',
    'Heiken Ashi Strategy',
    'Renko Chart Strategy',
    'Head and Shoulders Strategy',
    'Triangle Pattern Strategy',
    'Ichimoku Cloud Strategy',
    'Gann Square Strategy',
    'Scalping Strategy',
    'Martingale Strategy',
    'Anti-Martingale Strategy',
    "D'Alembert Strategy",
    'Straddle Strategy',
    'Pyramiding Strategy',
    'Overbought and Oversold Strategy',
    'ADX (Average Directional Index) Strategy',
    'Keltner Channel Strategy',
    'Donchian Channel Strategy',
    'Volume Weighted Average Price (VWAP) Strategy',
    'Money Flow Index Strategy',
    'Accumulation/Distribution Strategy',
    'Chandelier Exit Strategy',
    'Commodity Channel Index Strategy',
    'TRIX Indicator Strategy',
    'Aroon Oscillator Strategy',
    'On Balance Volume (OBV) Strategy',
    'Pivot Points Strategy',
    'Zero Line Cross Strategy',
    'Fractal Trading Strategy',
    'Breakaway Gap Strategy',
    'Dead Cat Bounce Strategy',
    'Hidden Divergence Strategy',
    'Linear Regression Strategy',
    'Golden Cross Strategy',
    'Death Cross Strategy',
    'Cup and Handle Strategy',
    'Double Top and Bottom Strategy',
    'Ascending and Descending Triangle Strategy',
];

const assets = [
    'US30', 'EURCAD', 'EURUSD', 'BTCUSD', 'ETHUSD', 
    'XRPUSD', 'AUDUSD', 'GBPUSD', 'USDJPY', 'USDCAD', 
    'NZDUSD', 'LTCUSD', 'XAUUSD', 'XAGUSD', 'CHFJPY'
];

function getRandomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

async function createRandomOrder(accountId, orderDate) {
    const randomAsset = assets[Math.floor(Math.random() * assets.length)];

    const order = {
        asset: randomAsset,
        open: Math.random() * 10000,
        close: Math.random() * 10000,
        closed_date: orderDate,
        stop_loss: Math.random() * 10000,
        risk: Math.random() * 10,
        risk_percent: Math.random() * 10,
        risk_method: 'percent',
        account_id: accountId,
        picture: null,
    };

    await prisma.accounts_orders.create({
        data: order,
    });
}

async function main() {
    const endDate = new Date('2023-08-15');
    const startDate = new Date('2022-01-01');

    for (let i = 0; i < 5; i++) {
        console.log('i : ',i);
        const userEmail = `user${i}@example.com`;

        const user = await prisma.users_credentials.create({
            data: {
                user_email: userEmail,
                user_password: 'testpassword',
            },
        });

        const randomStrategy = strategies[Math.floor(Math.random() * strategies.length)];
        const balances = [50000, 100000, 150000, 200000, 250000, 300000, 350000, 400000, 450000, 500000, 550000, 600000, 650000, 700000, 750000, 800000, 850000, 900000, 950000, 1000000];
        const randomBalance = balances[Math.floor(Math.random() * balances.length)];
        const randomLikes = Math.floor(Math.random() * 200);
        const randomComments = Math.floor(Math.random() * 50);

        const account = await prisma.users_accounts.create({
            data: {
                user_id: user.user_id,
                strategy: randomStrategy,
                devise: 'USD',
                initial_balance: randomBalance,
                current_balance: randomBalance,
                shared: true,
                likes: randomLikes,
                comments: randomComments,
            },
        });

        const orderCount = Math.floor(Math.random() * 11) + 5;
        let orderDate = getRandomDate(startDate, endDate);
        
        for (let j = 0; j < orderCount && orderDate <= endDate; j++) {
            await createRandomOrder(account.account_id, orderDate);
            orderDate.setDate(orderDate.getDate() + 1);
        }
    }
}

main()
    .catch(e => {
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect()
    });