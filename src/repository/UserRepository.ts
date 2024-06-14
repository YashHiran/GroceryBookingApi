import { User } from "../models/User";

export interface UserRepository {
  createUser(user: User): Promise<void>;
  getUserById(id: number): Promise<User>;
  getAllUsers(): Promise<User[]>;
}
