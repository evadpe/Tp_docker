import mongoose from "mongoose";
import dotenv from "dotenv";

// Charger les variables d'environnement
dotenv.config();

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb://admin:pass123@mongodb:27017')
        console.log(`✅ MongoDB connecté : ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ Erreur MongoDB : ${error.message}`);
        process.exit(1);
    }
};