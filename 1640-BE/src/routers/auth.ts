import { Router } from "express";
const router: Router = Router();
import authMiddleware from "../middlewares/authMiddleware";

import {
    login,
    register
} from "../controllers/authController"


router.post("/login", login)
router.post("/register", register)
export default router;