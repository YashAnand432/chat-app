import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import { app } from "./socket/socket.js";
import connectToMongoDB from "./db/connectToMongoDB.js";
import { Server } from "socket.io";
import { server } from "./socket/socket.js";
const PORT = process.env.PORT || 5000;
dotenv.config();

// app.get("/", (req, res)=> { 
    //     res.send("Hello world!!");
    // })
    
    app.use(express.json());     
    app.use(cookieParser());
    app.use(cors({
        origin: 'http://localhost:3000',  // Ensure the origin matches your front-end
        credentials: true  // Allows cookies and credentials
      }));

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);
server.listen(PORT, ()=> {
    connectToMongoDB();
    console.log('Server running on port 5000')
});
