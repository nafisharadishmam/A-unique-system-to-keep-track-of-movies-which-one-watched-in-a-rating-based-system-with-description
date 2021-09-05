const { createServer } = require("http");
const { Server } = require("socket.io");
const Client = require("socket.io-client");

describe("Messenger chat", () => {
  let io, serverSocket, clientSocket;

  beforeAll((done) => {
    const httpServer = createServer();
    io = new Server(httpServer);
    httpServer.listen(() => {
      const port = httpServer.address().port;
      clientSocket = new Client(`http://localhost:${port}`);
      io.on("connection", (socket) => {
        serverSocket = socket;
      });
      clientSocket.on("connect", done);
    });
  });

  afterAll(() => {
    io.close();
    clientSocket.close();
  });

  test("Send message from client", (done) => {
    clientSocket.on("sendMessage", (arg) => {
      expect(arg).toBe("I am test of send message");
      done();
    });
    serverSocket.emit("sendMessage", "I am test of send message");
  });

  test("Retrive message from server", (done) => {
    serverSocket.on("receiveMessage", (cb) => {
      cb("Receive message from server");
    });
    clientSocket.emit("receiveMessage", (arg) => {
      expect(arg).toBe("Receive message from server");
      done();
    });
  });
});