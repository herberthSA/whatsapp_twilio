import express from "express";
import { postDatos } from "../controllers/apiController.js";

const router = express.Router();

// Endpoint POST
router.post("/", postDatos);

export default router;
