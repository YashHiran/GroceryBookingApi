import query from "./utils/DBQuery";
import { Item } from "../models/Item";
import { ItemRepository } from "./ItemRepository";
import { pool } from "./utils/DBconfig";
import { ItemQueries } from '../sql/SqlQueries';
import { ItemNotFoundException } from "../Utils/CustomExceptions/ItemNotFoundException";

export class ItemRepositoryImpl implements ItemRepository {

  async addItem(item: Item): Promise<void> {
    const client = await pool.connect();
    try {
      const params = [item.name, item.price, item.quantity];
      await client.query(ItemQueries.INSERT_INTO_ITEMS, params);
    } catch (error) {
      console.error('Error adding item:', error);
      throw error;
    } finally {
      client.release();
    }
  }

  async getItem(itemId: number): Promise<Item> {
    try {
      const params = [itemId];
      const [rows] = await query<Item>(ItemQueries.GET_ITEM_BY_ID, params);
      if (!rows) {
        throw new ItemNotFoundException(`Item with ID ${itemId} not found`);
      }
      return rows;
    } catch (error) {
      throw error;
    }
  }

  async getItems(): Promise<Item[]> {
    try {
      return await query<Item>(ItemQueries.GET_ALL_ITEMS);
    } catch (error) {
      throw error;
    }
  }

  async removeItem(itemId: number): Promise<void> {
    try {
      const params = [itemId];
      await query(ItemQueries.REMOVE_ITEM_BY_ID, params);
    } catch (error) {
      throw error;
    }

  }

  async updateItem(itemId: number, updatedItem: Item): Promise<void> {
    try {
      const params = [updatedItem.name, updatedItem.price, updatedItem.quantity, itemId];
      await query(ItemQueries.UPDATE_ITEM_BY_ID, params);
    } catch (error) {
      throw error;
    }

  }

  async decreaseInventory(itemId: number, quantity: number): Promise<void> {
    try {
      await query(ItemQueries.UPDATE_ITEM_DECREASE_INVENTORY, [quantity, itemId]);
    } catch (error) {
      throw error;
    }
  }
}
