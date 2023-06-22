
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const insertOrderByAccountId = async (order) => {
    try {
        const newOrder = await prisma.orders.create({
            data: {
                account_id: parseInt(order.account_id),
                asset: order.asset,
                type: order.type,
                open: parseFloat(order.open),
                close: parseFloat(order.close),
                closed_date: new Date(order.closed_date),
                profit: order.profit || 0, // assumez 0 si le profit n'est pas fourni
                profit_pourcent: order.profit_pourcent || 0, // assumez 0 si le profit_pourcent n'est pas fourni
                stop_loss: order.stop_loss,
                amount: order.amount
            }
        });
    } catch (error) {
        console.error(error);
    }
};

export const orderModel = {
    insertOrderByAccountId
}