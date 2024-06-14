import { User } from '../models/User';
import { Role } from '../models/Role';
import { UserService } from './UserService';
import { UserRepositoryImpl } from '../repository/UserRepositoryImpl';

const userService = new UserService(new UserRepositoryImpl());

export const isUserExists = async (userId: number) => {
  const user: User = await userService.getUserById(userId);
  return !!user;
};
export const isUserAuthenticated = async (userId: number) => {
  const user: User = await userService.getUserById(userId);
  if (user.role == Role.Admin) return true;
  return false;
};
