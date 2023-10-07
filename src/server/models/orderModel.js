
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getOrdersByAccountId = async (account_id) => {
    try {
        const orders = await prisma.accounts_orders.findMany({
            where: {
                account_id: account_id,
            },
            orderBy: {
                closed_date: 'asc',  // Trier par 'closed_date' en ordre croissant
            },
        });
        return orders;
    } catch (error) {
        console.error(error);
        // Gérer l'erreur ici ou la propager vers l'appelant
        throw error;
    }
};

const deleteOrderById = async (orderId) => {
    console.log('orderModel : deleteOrderById');
    // Supprimer l'ordre par son ID
    return prisma.accounts_orders.delete({
        where: {
            order_id: orderId
        }
    });
};

const insertOrderByAccountId = async (order) => {
    try {
        const newOrder = await prisma.accounts_orders.create({
            data: {
                account_id: parseInt(order.account_id),
                asset: order.asset,
                type: order.type,
                open: parseFloat(order.open),
                close: parseFloat(order.close),
                closed_date: new Date(order.closed_date),
                profit: Math.round(order.profit * 100) / 100 || 0, // assumez 0 si le profit n'est pas fourni
                profit_percent: order.profit_percent || 0, // assumez 0 si le profit_pourcent n'est pas fourni
                stop_loss: order.stop_loss,
                risk: order.risk,
                risk_method: order.risk_method,
                risk_percent: order.risk_percent,
                risk_reward: order.risk_reward,
                picture: order.picture || null
            }
        });
        return newOrder;
    } catch (error) {
        console.error(error);
    }
};

export const orderModel = {
    insertOrderByAccountId,
    getOrdersByAccountId,
    deleteOrderById,
}