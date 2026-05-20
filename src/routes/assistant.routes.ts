import { Router } from "express";
import { queryAssistant } from "../controllers/assistantController.js";

export const assistantRouter = Router();

assistantRouter.post("/query", queryAssistant);