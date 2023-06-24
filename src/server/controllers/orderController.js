import login from "@/services/Login";
import { orderModel } from "../models/orderModel";

const calculProfitAndLoss = (orders) => {
    const sessionProfit = [];
    let currentProfit = 0;
    orders.forEach(order => {
        currentProfit += parseFloat(order.profit);
        currentProfit = parseFloat(currentProfit.toFixed(2));
        const profitLoss = {
            plValue: currentProfit,
            date: order.closed_date.toISOString().split('T')[0]
        };
        sessionProfit.push(profitLoss)
    });
    return sessionProfit;
}


const calculRatioLongShort = (orders) => {
    let short = 0;
    let long = 0;
    orders.forEach(order => {
        if (order.type == 'short') {
            short += 1;
        } else if (order.type == 'long') {
            long += 1;
        };
    }
    );
    return { short: short, long: long };
};


const getOrdersByAccountId = async (account_id) => {
    const orders = await orderModel.getOrdersByAccountId(account_id);
    return orders;
};

const insertTradeByAccountId = async (order) => {
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
    if (stopLoss < entryPrice) {
        return 'long';
    };
    return 'short';
}

const calculateOrderSize = (order, amount) => {
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
    calculateOrderSize,
    calculateTradeProfitLoss,
    convertProfitLossToPercentage,
    calculateTradePosition,
    insertTradeByAccountId,
    getOrdersByAccountId,
    calculRatioLongShort,
    calculProfitAndLoss
};
