"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const Auth_1 = require("./routers/Auth");
const Landmark_1 = require("./routers/Landmark");
const prismaClient_1 = __importDefault(require("./repositories/prismaClient"));
const Tour_1 = require("./routers/Tour");
const Comment_1 = require("./routers/Comment");
const Cat_1 = require("./routers/Cat");
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({ credentials: true, origin: process.env.CLIENT_URL }));
app.use(express_1.default.json());
app.use("/auth", Auth_1.authRouter);
app.use("/landmark", Landmark_1.landmarkRouter);
app.use("/tour", Tour_1.tourRouter);
app.use("/comment", Comment_1.commentRouter);
app.use("/cat", Cat_1.catRouter);
const server = http_1.default.createServer(app);
dotenv_1.default.config();
// Simple check for server start
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = "THE SERVER HAS STARTED SUCCESSFULLY";
        res.send(result);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}));
const PORT = process.env.PORT || 5555;
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
// Graceful shutdown
const gracefulShutdown = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Shutting down gracefully...");
    yield prismaClient_1.default.$disconnect();
    server.close(() => {
        console.log("HTTP server closed.");
        process.exit(0);
    });
    // Forcefully shutdown in case server.close() hangs
    setTimeout(() => {
        console.error("Forcefully shutting down...");
        process.exit(1);
    }, 10000); // 10 seconds timeout
});
process.on("SIGTERM", gracefulShutdown);
process.on("SIGINT", gracefulShutdown);
