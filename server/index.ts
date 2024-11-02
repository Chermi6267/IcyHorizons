import express, { Request, Response } from "express";
import http from "http";
import cookieParser from "cookie-parser";
import cors from "cors";
import { authRouter } from "./routers/Auth";
import { landmarkRouter } from "./routers/Landmark";
import { tourRouter } from "./routers/Tour";
import { commentRouter } from "./routers/Comment";
import { catRouter } from "./routers/Cat";
import { gracefulShutdown } from "./gracefulShutDown";
import { Server } from "socket.io";
import { GigaChatService } from "./services/GigaChat";

const app = express();
app.use(cookieParser());
app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));
app.set("trust proxy", 1);
app.use(express.json());
app.use("/auth", authRouter);
app.use("/landmark", landmarkRouter);
app.use("/tour", tourRouter);
app.use("/comment", commentRouter);
app.use("/cat", catRouter);
const gigaChatService = new GigaChatService();

const server = http.createServer(app);
export const io = new Server(server, {
  cors: { origin: process.env.CLIENT_URL },
});

io.on("connection", (socket) => {
  socket.on("giga", async (data) => {
    return await gigaChatService.regionSpeech(data.adminCenterId, socket);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// Simple check for server start
app.get("/", async (req: Request, res: Response) => {
  try {
    const result = "THE SERVER HAS STARTED SUCCESSFULLY";
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

const PORT = process.env.PORT || 5555;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

process.on("SIGTERM", () => gracefulShutdown(server));
process.on("SIGINT", () => gracefulShutdown(server));
