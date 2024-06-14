import { Item } from "../models/Item";
import { ItemRepository } from "../repository/ItemRepository";

export class ItemService {
  constructor(private readonly itemRepository: ItemRepository) { }

  async getAvailableItems(): Promise<Item[]> {
    try {
      return await this.itemRepository.getItems();
    } catch (error) {
      throw error;
    }
  }

  async getItem(itemId: number): Promise<Item> {
    try {
      return await this.itemRepository.getItem(itemId);
    } catch (error) {
      throw error;
    }
  }

  async addItem(newItem: Item): Promise<void> {
    try {
      return await this.itemRepository.addItem(newItem);
    } catch (error) {
      throw error;
    }
  }

  async updateItem(itemId: number, updatedItem: Item): Promise<void> {
    try {
      return await this.itemRepository.updateItem(itemId, updatedItem);
    } catch (error) {
      throw error;
    }
  }

  async decreaseInventory(itemId: number, quantity: number): Promise<void> {
    try {
      return await this.itemRepository.decreaseInventory(itemId, quantity);
    } catch (error) {
      throw error;
    }
  }

  async removeItem(itemId: number): Promise<void> {
    try {
      return await this.itemRepository.removeItem(itemId);
    } catch (error) {
      throw error;
    }
  }
}
