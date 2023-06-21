const API_URL = "http://localhost:3000";

const sendOrderIntoDataBase = async (order) => {

    try {
      const response = await fetch(`${API_URL}/api/orders/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      });
  
      if (response.ok) {
        const newOrder = await response.json();
        console.log('New order created:', newOrder);
      } else {
        console.error('Failed to create order:', response.status);
      }
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };
  

  const orders = {
    sendOrderIntoDataBase,
}

export default orders;