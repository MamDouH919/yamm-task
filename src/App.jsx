import { useEffect, useState } from 'react'
import { RouterProvider } from 'react-router'
import { router } from './router'

function App() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch('/refundOrders.json')
      .then(response => response.json())
      .then(data => setOrders(data))
      .catch(error => console.error('Error fetching refund orders:', error));
  }, []);

  console.log(orders);
  

  return (
    <RouterProvider
      router={router}
      future={{
        v7_startTransition: true
      }}
    />
  )
}

export default App
