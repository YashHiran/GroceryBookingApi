import { OrdersRepository } from '../repository/OrderRepository';
import { Order } from '../models/Order';
import { ItemRepositoryImpl } from '../repository/ItemRepositoryImpl';
import { ItemService } from './ItemService';

export class OrderService {
    constructor(private readonly orderRepository: OrdersRepository) {}
    
    itemRepository = new ItemRepositoryImpl();
    itemService = new ItemService(this.itemRepository);

    async createOrder(order: Order, userId: number): Promise<Order> {
      let itemErrors = [];
      try {
        const totalPrice = await this.validateOrder(order);
        order.totalPrice = totalPrice;
        return this.orderRepository.createOrder(order, userId);
      } catch(error) {
        throw error;
      }
    }

    async getALlOrders(userId: number): Promise<Order[]> {
      try {
        return await this.orderRepository.getOrderByUserId(userId);
      } catch(error) {
        throw error;
      }
    }

  private async validateOrder(order: Order) {
    const itemErrors = [];
    let totalPrice = 0;
    try {
      for (const item of order.items) {
        const retrivedItem = await this.itemService.getItem(item.itemId);
        totalPrice += retrivedItem.price * item.quantity;
        if (!retrivedItem || retrivedItem.quantity <= item.quantity) {
          itemErrors.push(`Grocery item with ID ${item.itemId} not available`);
        }
      }
  
      if (itemErrors.length > 0) {
        throw new Error(`Error creating order: ${itemErrors.join(', ')}`);
      }
    } catch(error) {
      throw error;
    }
    return totalPrice;
  }
}
