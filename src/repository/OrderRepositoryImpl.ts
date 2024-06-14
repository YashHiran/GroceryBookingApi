import { OrdersRepository } from './OrderRepository';
import { Order } from '../models/Order';
import { pool } from './utils/DBconfig';
import { OrderQueries } from '../sql/SqlQueries';
import { ItemRepositoryImpl } from './ItemRepositoryImpl';
import { PoolClient } from 'pg';
import query from './utils/DBQuery';

export class OrderRepositoryImpl implements OrdersRepository {

async createOrder(order: Order, userId: number): Promise<Order> {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const createdOrder = await this.addOrder(order, userId, client);
    await this.updateInventory(order);

    await client.query('COMMIT');

    return createdOrder; 
  } catch (error) {
    console.error('Error creating order:', error);
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

async getOrderByUserId(userId: number): Promise<Order[]> {
  try {
    return await query<Order>(OrderQueries.GET_ALL_ORDERS, [userId]);
  } catch(error) {
    throw error;
  }
}

  private async updateInventory(order: Order) {
    const itemRepository = new ItemRepositoryImpl();
    try {
      for (const item of order.items) {
        await itemRepository.decreaseInventory(item.itemId, item.quantity);
      }
    } catch(error) {
      throw error;
    }
  }

  private async addOrder(order: Order, userId: number, client: PoolClient): Promise<Order> {
    const insertOrderParams = [userId, JSON.stringify(order.items), order.totalPrice];
    const insertOrderResult = await client.query(OrderQueries.INSERT_INTO_ITEMS, insertOrderParams);
    const createdOrder = insertOrderResult.rows[0];
    if (!createdOrder) {
      throw new Error('Failed to create order');
    }
    return createdOrder;
  }
}
