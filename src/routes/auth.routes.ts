import Router from 'express'
import * as authCtrl from '../controllers/auth.controller'
import { validate } from '../middlewares/validate.middleware';
import { loginSchema } from '../validators/auth.validator';

const router = Router();

/**
* @openapi
* /auth/login:
*   post:
*     summary: Login User
*     tags: [Auth]
*     requestBody:
*       required: true
*       content: 
*         application/json:
*           schema:
*             type: object
*             properties:
*               username:
*                 type: string
*               password:
*                 type: string
*     responses:
*       200:
*         description: Login succesfull
*       401:
*         description: Login failed
*/
router.post('/login', validate(loginSchema), authCtrl.login)

export default router;