import { Server } from "socket.io";
import { platform } from "os";
import { spawn } from "node-pty";

const io = new Server(6060, {
  cors: {
    origin: "*",
  },
});

console.log("Socket is up and running...");

const shell = platform() === "win32" ? "powershell.exe" : "bash";

io.on("connection", (socket) => {
  console.log("new session");
  const ptyProcess = spawn(shell, [], {
    name: "xterm-color",
    cwd: process.env.HOME,
    env: process.env,
  });
  socket.on("data", (data) => {
    ptyProcess.write(data);
  });

  socket.on("resize", (dims) => {
    const { cols, rows } = dims;
    ptyProcess.resize(cols, rows);
  });

  socket.on("disconnect", () => {
    console.log("disconnected");
    ptyProcess.kill();
    socket.disconnect();
  });

  ptyProcess.on("data", function (data) {
    socket.emit("response", data);
  });
});
