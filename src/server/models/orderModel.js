
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// const getLastTenOrdersByAccounts = async(accounts){

// };

const setOrdersByOrders = async (orders) => {
    try {
        for (const order of orders) {
            await prisma.accounts_orders.update({
                where: {
                    order_id: order.order_id
                },
                data: {
                    account_id: order.account_id,
                    asset: order.asset,
                    type: order.type,
                    open: order.open,
                    close: order.close,
                    closed_date: order.closed_date,
                    profit: order.profit,
                    stop_loss: order.stop_loss,
                    risk: order.risk,
                    risk_percent : order.risk_percent,
                    risk_method : order.risk_method,
                    profit_percent: order.profit_percent,
                    risk_reward : order.risk_reward,
                    picture: order.picture,
                }
            });
        }
        return orders;
    } catch (error) {
        console.error(error);
    }
};


const getOrdersByAccountId = async (account_id) => {
    try {
        const orders = await prisma.accounts_orders.findMany({
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

const deleteOrder = async (orderId) => {
    try {
        // Supprimer l'ordre par son ID
        const deletedOrder = await prisma.accounts_orders.delete({
            where: {
                order_id: orderId
            }
        });
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'ordre:', error);
    } finally {
        // N'oubliez pas de fermer la connexion Prisma
        await prisma.$disconnect();
    }
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
                risk_percent : order.risk_percent,
                risk_reward : order.risk_reward,
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
    deleteOrder,
    setOrdersByOrders
}