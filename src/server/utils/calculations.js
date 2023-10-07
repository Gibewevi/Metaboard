// utils/calculations.js
const calculateRiskAmount = (order, account) => {
    const currentBalance = account.current_balance;
    let risk = null;
    const position = order.risk;

    if (order.risk_method === 'percent') {
        risk = (order.risk_percent / 100) * currentBalance;
        return risk;
    }
    return risk = position;
};

const calculateOrderSize = (pOrder, pRisk) => {
    const risk = pRisk;
    const entryPrice = pOrder.open;
    const stopLossPrice = pOrder.stop_loss;
    const positionSize = risk / (entryPrice - stopLossPrice);

    return positionSize;
};

const calculateTradeProfitLoss = (order, positionSize) => {
    const exitPrice = order.close;
    const entryPrice = order.open;
    const profitLoss = (exitPrice - entryPrice) * positionSize;

    return profitLoss;
};

const convertProfitLossToPercentage = (profitLoss, currentBalance) => {
    const profitLossPercentage = (profitLoss / currentBalance) * 100;

    return profitLossPercentage;
};

const isPositive = (number) => {
    if (number > 0) {
        return 1;
    };
    return 0;
};

const isNegative = (number) => {
    if (number < 0) {
        return 1;
    };
    return 0;
};

export const calculations = {
    calculateRiskAmount,
    calculateOrderSize,
    calculateTradeProfitLoss,
    convertProfitLossToPercentage,
    isPositive,
    isNegative
}
