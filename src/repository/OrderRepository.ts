import { Order } from "../models/Order";

export interface OrdersRepository {
    createOrder(order: Order, userId: number): Promise<Order>;
    getOrderByUserId(userId: number):Promise<Order[]>;
  }
