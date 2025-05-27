import { Router } from 'express';
import { UserController } from '../controller/user_controller';
import { validate,authenticateToken,requireAuth } from '../middleware/auth_middleware';
import { signupSchema,signinSchema } from '../validators/auth';
const router = Router();

router.post('/signup',validate(signupSchema),UserController.signup)
router.post('/signin',validate(signinSchema),UserController.signin)
router.get('/me', authenticateToken, requireAuth, UserController.me);

export default router;