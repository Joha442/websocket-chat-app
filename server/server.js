const express = require("express")
const { createServer } = require("http")
const { Server } = require("socket.io")
const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
  serveClient: false,
})

io.on("connection", (socket) => {
  socket.on("message", (msg) => {
    io.emit("message", { ...msg, time: Date.now() })
  })

  socket.on("typing", function (data) {
    socket.broadcast.emit("typing", data)
  })
})

app.get("/", (req, res) => {
  res.send("<h1> HELLO WORLD </h1>")
})
const PORT = 3000
httpServer.listen(PORT, () => {
  console.log(`Server is live on port ${PORT}`)
})
