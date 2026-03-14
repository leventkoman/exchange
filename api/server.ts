import express from "express";
import currencyRouter from "./router/currency.router";
import cors from "cors";
import dotenv from 'dotenv';

const app = express();
const env = process.env.NODE_ENV || "development";
dotenv.config({ path: `.env.${env}` });

export const config = {
    port: process.env.PORT || 8080,
    nodeEnv: process.env.NODE_ENV!,
};

app.use(cors());
app.use(express.json());
app.use('/api/currency', currencyRouter);

app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
})
