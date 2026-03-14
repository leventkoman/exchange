import express from "express";
import {CurrencyController} from "../controller/currency.controller";

const router = express.Router();
router.get("/", CurrencyController.getCurrencies);

export default router;