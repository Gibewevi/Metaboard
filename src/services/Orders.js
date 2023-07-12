// const API_URL = process.env.API_URL;
const API_URL = process.env.NEXT_PUBLIC_API_URL;

const format = (pOrder) => {
  const order = {
      account_id: parseInt(pOrder.account_id),
      order_id: parseInt(pOrder.order_id),
      asset: pOrder.asset,
      type: pOrder.type,
      open: parseFloat(pOrder.open),
      close: parseFloat(pOrder.close),
      closed_date: pOrder.closed_date,
      profit: parseFloat((Math.round(pOrder.profit * 100) / 100).toFixed(2)) || 0,
      profit_percent: parseFloat((Math.round(pOrder.profit_percent * 100) / 100).toFixed(2)) || 0,
      stop_loss: parseFloat(pOrder.stop_loss),
      risk: parseFloat((Math.round(pOrder.risk * 100) / 100).toFixed(2)),
      risk_method: pOrder.risk_method,
      picture: pOrder.picture || null
  };
  return order;
};

const deleteOrderById = async (order) => {
  try {
    const response = await fetch(`/api/orders/delete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    });
    if (response.ok) {
      const updatedOrders = await response.json();
      return updatedOrders;
    }
  } catch (error) {
    // Vous devriez également gérer l'erreur ici, par exemple en la consignant ou en la renvoyant
    console.error(error);
  }
}


const sendOrderIntoDataBase = async (order) => {

  try {
    const response = await fetch(`/api/orders/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    });

    if (response.ok) {
      const newOrder = await response.json();
      return newOrder;
    } else {
      console.error('Failed to create order:', response.status);
    }
  } catch (error) {
    console.error('Error creating order:', error);
  }
};


const orders = {
  sendOrderIntoDataBase,
  deleteOrderById,
  format
}

export default orders;