import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bookRouter from "./routes/bookRouter.js";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

app.get('/', (req, res) => {
    res.send('API en ligne !');
});

app.use(bookRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Serveur en ligne sur http://localhost:${PORT}`);
});