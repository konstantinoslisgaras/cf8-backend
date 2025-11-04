import {Router} from 'express';
import * as userCtrl from '../controllers/user.controller';
import { validate } from '../middlewares/validate.middleware';
import { validateObjectId } from '../middlewares/validateObjectid.middleware';
import { createUserSchema, updateUserSchema } from '../validators/user.validator';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

/**
* @openapi
* /users:
*   get:
*     summary: List of all Users
*     tags: [Users]
*     security:
*       - bearAuth: []
*     responses:
*       200:
*         description: Response List of Users
*/
router.get("/", authenticate, userCtrl.list)
router.get("/:id", validateObjectId('id'), (userCtrl.getOne))

/**
* @openapi
* /users:
*   post:
*     summary: Creates a User
*     security:
*       - bearAuth: []
*     requestBody:
*       require: true
*       content: 
*         application/json:
*           schema:
*             type: object
*             properties: 
*               username:
*                 type: string
*               password:
*                 type: string
*               firstname:
*                 type: string
*               lastname:
*                 type: string
*               email:
*                 type: string
*     responses:
*        201:
*         description: User created
*/  
router.post("/", validate(createUserSchema), userCtrl.create)
router.put("/:id", validate(updateUserSchema), validateObjectId('id'), userCtrl.update)
router.delete("/:id", validateObjectId('id'), userCtrl.remove)

export default router;