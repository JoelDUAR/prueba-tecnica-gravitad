import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { setupSwagger } from './config/swagger';
import cors from 'cors';
import connectDB from './config/db';
import charactersRoutes from './routes/characters';
import authRoutes from './routes/auth';
const PORT = process.env.PORT || 5000;

const app = express();
/* Configutarion */
app.use(cors());
app.use(express.json());

// Configuración de Swagger
setupSwagger(app);

/* Routes */
app.get("/", (req, res) => {
    res.redirect("/api");
});

app.get("/api", (req, res) => {
    res.send("Welcome to the API for Gravitad Technical Test");
  });

app.use('/api/characters', charactersRoutes);
app.use('/api/users', authRoutes);

/* Server and database synchronization */
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch(error => {
    console.error('Error al conectar a MongoDB: ', error.message);
});

