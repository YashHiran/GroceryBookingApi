import { pool } from './utils/DBconfig';
import { User } from '../models/User';
import query from './utils/DBQuery';
import { UserRepository } from './UserRepository';
import { UserQueries } from '../sql/SqlQueries';
import { UserNotFoundException } from '../Utils/CustomExceptions/UserNotFoundException';

export class UserRepositoryImpl implements UserRepository {

  async createUser(user: User): Promise<void> {
    const client = await pool.connect();
    try {
      await client.query(UserQueries.INSERT_INTO_USER, [user.username, user.email, user.role]);
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    } finally {
      client.release();
    }
  }

  async getUserById(id: number): Promise<User> {
    try {
      const [rows] = await query<User>(UserQueries.GET_USER_BY_ID, [id]);
      if (!rows) {
        throw new UserNotFoundException(`User with ID ${id} not found`);
      }
      return rows;
    } catch (error) {
      throw error;
    }
  }

  async getAllUsers(): Promise<User[]> {
    try {
      return await query<User>(UserQueries.GET_ALL_USERS);
    } catch (error) {
      throw error;
    }
  }
}
