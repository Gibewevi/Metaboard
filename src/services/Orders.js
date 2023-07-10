// const API_URL = process.env.API_URL;
const API_URL = process.env.NEXT_PUBLIC_API_URL;


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
  deleteOrderById
}

export default orders;