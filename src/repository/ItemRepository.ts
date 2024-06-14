import { Item } from "../models/Item";

export interface ItemRepository {
    addItem(item: Item): Promise<void>;
    getItem(itemId: number): Promise<Item>;
    getItems(): Promise<Item[]>;
    removeItem(itemId: number): Promise<void>;
    updateItem(itemId: number, updatedItem: Item): Promise<void>;
    decreaseInventory(itemId: number, quantity: number): Promise<void>;
  }
  