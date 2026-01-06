import express from 'express';
import { CreateUser, GetAllUsers } from '../controller/userController.js';

const router = express.Router();

router.post('/create', CreateUser);
// GET all users (Admin)
router.get('/', GetAllUsers);


export default router;