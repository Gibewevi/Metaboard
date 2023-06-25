
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const getOrdersByAccountId = async (account_id) => {
    try {
        const orders = await prisma.orders.findMany({
            where: {
                account_id: account_id,
            },
        });
 
        return orders;
    } catch (error) {
        console.error(error);
        // Gérer l'erreur ici ou la propager vers l'appelant
        throw error;
    }
};



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
                profit_percent: order.profit_percent || 0, // assumez 0 si le profit_pourcent n'est pas fourni
                stop_loss: order.stop_loss,
                amount: order.amount
            }
        });
    } catch (error) {
        console.error(error);
    }
};

export const orderModel = {
    insertOrderByAccountId,
    getOrdersByAccountId
}