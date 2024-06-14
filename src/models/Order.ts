export interface Order {
  id: number;
  userId: number;
  totalPrice: number;
  items: OrderItem[];
}

export interface OrderItem {
  itemId: number;
  quantity: number;
}
