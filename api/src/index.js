"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const swagger_1 = require("./config/swagger");
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./config/db"));
const characters_1 = __importDefault(require("./routes/characters"));
const auth_1 = __importDefault(require("./routes/auth"));
const PORT = process.env.PORT || 5000;
const app = (0, express_1.default)();
/* Configutarion */
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Configuración de Swagger
(0, swagger_1.setupSwagger)(app);
/* Routes */
app.get("/", (req, res) => {
    res.redirect("/api");
});
app.get("/api", (req, res) => {
    res.send("Welcome to the API for Gravitad Technical Test");
});
app.use('/api/characters', characters_1.default);
app.use('/api/users', auth_1.default);
/* Server and database synchronization */
(0, db_1.default)().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch(error => {
    console.error('Error al conectar a MongoDB: ', error.message);
});
