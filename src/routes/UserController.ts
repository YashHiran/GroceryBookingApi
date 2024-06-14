import express = require('express');
const userRouter = express.Router()
import { UserRepositoryImpl } from '../repository/UserRepositoryImpl';
import { UserService } from '../service/UserService';
import { User } from '../models/User';
import { UserNotFoundException } from '../Utils/CustomExceptions/UserNotFoundException';

const userRepository = new UserRepositoryImpl();
const userService = new UserService(userRepository);

userRouter.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const item = await userService.getUserById(id);
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    if (error instanceof UserNotFoundException) {
      res.status(404).json({ message: error.message });
    }
    console.error('Error getting user with id', id, error);
    res.status(500).json({ message: 'Error retrieving user' });
  }
});

userRouter.get('/', async (req, res) => {
  try {
    const usersList = await userService.getAllUsers();
    res.json(usersList);
  } catch (error) {
    console.error('Error retrieving users', error);
    res.status(500).json({ message: 'Error retrieving users' });
  }
});

userRouter.post('/', async (req, res) => {
  try {
    const newUser = req.body as User;
    await userService.createUser(newUser);
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user', error);
    res.status(400).json({ message: 'Error creating user' });
  }
});

export default userRouter;
