// const API_URL = process.env.API_URL;
const API_URL = process.env.NEXT_PUBLIC_API_URL;

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