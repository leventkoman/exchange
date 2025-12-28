import express from "express";
import currencyRouter from "./router/currency.router.ts";
import cors from "cors";
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use('/api/currency', currencyRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})
