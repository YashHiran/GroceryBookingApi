import { UserRepository } from "../repository/UserRepository";
import { User } from "../models/User";

export class UserService {
    constructor(private readonly userRepository: UserRepository) {}
    
    async getAllUsers(): Promise<User[]> {
      try {
        return await this.userRepository.getAllUsers();
      } catch(error) {
        throw error;
      }
    }

    async getUserById(id: number): Promise<User> {
      try {
        return await this.userRepository.getUserById(id);
      } catch(error) {
        throw error;
      }
    }

    async createUser(newUser: User): Promise<void> {
      try {
        return await this.userRepository.createUser(newUser);
      } catch(error) {
        throw error;
      }
    }
}
