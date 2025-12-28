import express from "express";
import {CurrencyController} from "../controller/currency.controller.ts";

const router = express.Router();
router.get("/", CurrencyController.getCurrencies);

export default router;