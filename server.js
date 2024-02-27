import express from "express";
import { Server } from "socket.io";
import http from "http";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const messages = [];

app.set("view engine", "ejs");

app.get("/", (req,res) => {
    res.render("index")
});

const port = process.env.PORT || 3000;
server.listen(port, console.log("Server on port: ", port));

io.on("connection", (socket) => {
    socket.emit("connection",messages);
    socket.on("messages", (msg)=> {
        messages.push(msg)
        io.emit("messages", (msg));
    });
})


export default server;