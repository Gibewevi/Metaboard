import { orderModel } from "../models/orderModel";

const insertTradeByAccountId = async(order) => {
    await orderModel.insertOrderByAccountId(order)
};

const calculateRiskAmount = (order, account) => {
    const currentBalance = account.current_balance;
    const tradeMethodOption = order.orderChoice;
    let amount = null;
    const position = order.amount;

    if (tradeMethodOption === 'percent') {
        amount = (position / 100) * currentBalance;
        return amount;
    }

    return amount = position;
};

const calculateTradePosition = (order) => {
    const stopLoss = order.stop_loss
    const entryPrice = order.open;
    if(stopLoss<entryPrice){
        return 'long';
    };
    return 'short';
}

const calculatePositionSize = (order, amount) => {
    const riskAmount = amount;
    const entryPrice = order.open;
    const stopLossPrice = order.stop_loss;
    const positionSize = riskAmount / (entryPrice - stopLossPrice);

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



export const orderController = {
    calculateRiskAmount,
    calculatePositionSize,
    calculateTradeProfitLoss,
    convertProfitLossToPercentage,
    calculateTradePosition,
    insertTradeByAccountId
};
