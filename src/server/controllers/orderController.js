import login from "@/services/Login";
import { orderModel } from "../models/orderModel";
import { calculations } from "../utils/calculations";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


const getRisksRewardsByOrders = (orders) => {
    let risksRewards = [];
    orders.forEach(order => {
        risksRewards.push(order.risk_reward);
    });
    return risksRewards;
};

const getRiskRewardMaxValue = (risksRewards) => {
    let max = Math.max(...risksRewards);
    return max;
};

const getRiskRewardAverage = (risksRewards) => {
    const sum = risksRewards.reduce((acc, val) => acc + parseFloat(val), 0);
    const average = sum / risksRewards.length;
    return average;
};


const deleteOrderById = async (orderId) => {
    console.log('orderController: deleteOrderById');
    // return the promise without resolving
    return orderModel.deleteOrderById(orderId);
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



const calculateTradePosition = (order) => {
    const stopLoss = order.stop_loss
    const entryPrice = order.open;
    if (stopLoss < entryPrice) {
        return 'long';
    };
    return 'short';
}

const calculRiskRewardByOrder = (order) => {
    let profit = order.close - order.open;
    let RR = (profit / (order.open - order.stop_loss))
    return RR;
};


export const orderController = {
    calculateTradePosition,
    insertTradeByAccountId,
    getOrdersByAccountId,
    calculRatioLongShort,
    calculProfitAndLoss,
    deleteOrderById,
    calculRiskRewardByOrder,
    getRisksRewardsByOrders,
    getRiskRewardAverage,
    getRiskRewardMaxValue
};
