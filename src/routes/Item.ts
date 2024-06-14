import express = require('express');
const itemRouter = express.Router()
import { ItemRepositoryImpl } from "../repository/ItemRepositoryImpl";
import { Item } from '../models/Item';
import { UserService } from '../service/UserService';
import { UserRepositoryImpl } from '../repository/UserRepositoryImpl';
import { ItemService } from '../service/ItemService';
import { Role } from '../utils/Role';
import { User } from 'src/models/User';

const itemRepository = new ItemRepositoryImpl();
const itemService = new ItemService(itemRepository);

const userRepository = new UserRepositoryImpl();
const userService = new UserService(userRepository);

const isUserExists = async(userId: number) => {
  const user: User = await userService.getUserById(userId);
  return !!user;
} 

const isUserAuthenticated = async(userId: number) => {
  const user: User = await userService.getUserById(userId);
  if(user.role == Role.Admin) return true;
  return false;
} 

itemRouter.get('/users/:id/items', async (req, res) => {
  const userId = parseInt(req.params.id); 
  try {
    if(! await isUserExists(userId)) {
      res.send(404).json({message: 'User not found.'});
      return;
    }
    const availableItems = await itemService.getAvailableItems();
    res.json(availableItems);
  } catch (error) {
    console.error('Error while getting items',error);
    res.status(500).json({ message: 'Error retrieving items' });
  }
});

itemRouter.get('/users/:id/items/:itemId', async (req, res) => {
  const userId = parseInt(req.params.id); 
  const itemId = parseInt(req.params.itemId); 
  try {
    if(! await isUserExists(userId)) {
      res.send(404).json({message: 'User not found.'});
      return;
    }
    const item = await itemService.getItem(itemId);
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (error) {
    console.error('Error while getting item with id ', itemId,  error);
    res.status(500).json({ message: 'Error retrieving item' });
  }
});

itemRouter.post('/users/:id/items', async (req, res) => {
  const userId = parseInt(req.params.id); 
  try {
    if(! await isUserExists(userId)) {
      res.send(404).json({message: 'User not found.'});
      return;
    }
    if(! await isUserAuthenticated(userId)) {
      res.status(401).json({message: 'User is not authorised for below operation'});
      return;
    }
    const newItem = req.body as Item;
    await itemService.addItem(newItem);
    res.status(201).json({ message: 'Item added successfully' });
  } catch (error) {
    console.error('Error while adding item', error);
    res.status(400).json({ message: 'Error adding item' });  
  }
});

itemRouter.put('/users/:id/items/:itemId', async (req, res) => {
  const userId = parseInt(req.params.id); 
  const itemId = parseInt(req.params.itemId);
  try {
    if(! await isUserExists(userId)) {
      res.send(404).json({message: 'User not found.'});
      return;
    }
    if(! await isUserAuthenticated(userId)) {
      res.status(401).json({message: 'User is not authorised for below operation'});
      return;
    }
    const updatedItem = req.body;
    await itemService.updateItem(itemId, updatedItem);
    res.json({ message: 'Item updated successfully' });
  } catch (error) {
    console.error('Error while updating item', error);
    res.status(400).json({ message: 'Error updating item' });  
  }
});

itemRouter.delete('/users/:id/items/:itemId', async (req, res) => {
  const userId = parseInt(req.params.id); 
  const itemId = parseInt(req.params.itemId);
  try {
    if(! await isUserExists(userId)) {
      res.send(404).json({message: 'User not found.'});
      return;
    }
    if(! await isUserAuthenticated(userId)) {
      res.status(401).json({message: 'User is not authorised for below operation'});
      return;
    }
    await itemService.removeItem(itemId);
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Error while deleting item', error);
    res.status(400).json({ message: 'Error while deleting item or item not found' });  
  }
});

export default itemRouter;
