import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import cors from "cors";
import axios from "axios";

dotenv.config();

const app = express();
app.use(cors());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("chat message", async (msg) => {
    console.log("User:", msg);

    try {
      const response = await axios.post("http://localhost:11434/api/generate", {
        model: "gemma3",
        prompt: msg,
        stream: false
      });
      const botReply = response.data.response;
      socket.emit("bot reply", botReply);
    } catch (error) {
      console.error(error);
      socket.emit("bot reply", "Oops! Something went wrong.");
    }
  });
});

httpServer.listen(5000, () =>
  console.log("Server running on http://localhost:5000")
);
