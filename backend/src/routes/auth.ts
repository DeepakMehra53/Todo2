import { Router } from "express";
import AuthController from "../controllers/AuthController";
import { validate,authenticateToken,requireAuth } from "../middleware/authMiddleware";
import { signinSchema,signupSchema } from "../validators/auth";

const router =  Router();

router.post('signup', validate(signupSchema), AuthController.signup);
router.post('signin', validate(signinSchema), AuthController.signin);

export default router;