import { Router } from 'express';
import * as UserController from '../controllers/user.controller';
const router = new Router();

// Get authenticated user
router.route('/user').get(UserController.getAuthenticatedUser);

export default router;
