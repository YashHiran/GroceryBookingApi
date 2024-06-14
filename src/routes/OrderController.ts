import express = require('express');
import { OrderService } from '../service/OrderService';
import { isUserExists } from '../service/userOperations';
import { OrderRepositoryImpl } from '../repository/OrderRepositoryImpl';
const ordersRouter = express.Router()

const orderRepository = new OrderRepositoryImpl();
const orderService = new OrderService(orderRepository);

ordersRouter.post('/users/:id/orders', async (req, res): Promise<void> => {
  try {
    const userId = parseInt(req.params.id); 
    if(! await isUserExists(userId)) {
      res.send(404).json({message: 'User not found.'});
      return;
    }
    const order = req.body;
    const createdOrder = await orderService.createOrder(order, userId);
    res.status(201).json(createdOrder); 
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(400).json({ message: 'Error creating order' }); 
  }
});

ordersRouter.get('/users/:id/orders', async (req, res) => {
  const userId = parseInt(req.params.id);
  try {
    if(! await isUserExists(userId)) {
      res.send(404).json({message: 'User not found.'});
      return;
    }
    const ordersList = await orderService.getALlOrders(userId);
    res.json(ordersList);
  } catch (error) {
    console.error('Error getting order for user ' , userId, error);
    res.status(500).json({ message: 'Error retrieving order' });
  }
});

export default ordersRouter;
