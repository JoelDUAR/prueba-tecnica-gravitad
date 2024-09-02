"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const charactersController_1 = require("../controllers/charactersController");
dotenv_1.default.config();
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 1000, // Incrementa el timeout a 20 segundos
        });
        await (0, charactersController_1.storeDataInDB)();
        console.log('Connected to MongoDB');
    }
    catch (error) {
        console.error(error.message);
        process.exit(1);
    }
};
exports.default = connectDB;
