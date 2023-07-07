import login from "@/services/Login";
import { orderModel } from "../models/orderModel";

const setOrdersByOrders = async (orders) => {
    let updatedOrders = await orderModel.setOrdersByOrders(orders);
    return updatedOrders;
};

const updateOrdersAfterOrderDelete = async (orders, account) => {
    account.current_balance = account.initial_balance;
    let current_balance = parseFloat(account.initial_balance);
    let ordersToUpdate = [];
    orders.forEach(order => {
        let risk = calculateRiskAmount(order, account);
        let orderSize = calculateOrderSize(order, risk);
        let profitLoss = calculateTradeProfitLoss(order, orderSize);
        let profitLossPercentage = convertProfitLossToPercentage(profitLoss, current_balance);
        order.risk = risk;
        order.profit = profitLoss;
        order.profit_percent = parseFloat(profitLossPercentage);
        current_balance = parseFloat((parseFloat(current_balance) + order.profit).toFixed(2));
        account.current_balance = current_balance;
        ordersToUpdate.push(order);
    });
    let ordersUpdated = await setOrdersByOrders(ordersToUpdate)
    return ordersUpdated;
};

const setOrdersByOrdersIntoDataBase = async (orders) => {
    const ordersUpdated = await orderModel.setOrdersByOrders(orders);
}


const deleteOrderById = async (orderId) => {
    await orderModel.deleteOrder(orderId);
};

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
    const newOrder = await orderModel.insertOrderByAccountId(order)
    return newOrder;
};

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

const calculateTradePosition = (order) => {
    const stopLoss = order.stop_loss
    const entryPrice = order.open;
    if (stopLoss < entryPrice) {
        return 'long';
    };
    return 'short';
}

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



export const orderController = {
    calculateRiskAmount,
    calculateOrderSize,
    calculateTradeProfitLoss,
    convertProfitLossToPercentage,
    calculateTradePosition,
    insertTradeByAccountId,
    getOrdersByAccountId,
    calculRatioLongShort,
    calculProfitAndLoss,
    deleteOrderById,
    updateOrdersAfterOrderDelete
};
