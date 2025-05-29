import express, { type Request, Response, NextFunction } from "express";
import { createServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  // HTTPサーバーを作成
  const httpServer = createServer(app);
  
  // Serve the app on configurable port (default 3001 for local development)
  const port = process.env.PORT ? parseInt(process.env.PORT) : 3001;
  
  // Socket.IOサーバーを作成
  const io = new SocketIOServer(httpServer, {
    cors: {
      origin: process.env.NODE_ENV === "development" ? `http://localhost:${port}` : false,
      methods: ["GET", "POST"]
    }
  });

  const server = await registerRoutes(app);

  // Socket.IOのイベントハンドリング
  io.on('connection', (socket) => {
    log(`クライアントが接続されました: ${socket.id}`);

    // 基本的なイベントハンドラー
    socket.on('join-room', (roomId: string) => {
      socket.join(roomId);
      log(`クライアント ${socket.id} がルーム ${roomId} に参加しました`);
    });

    socket.on('leave-room', (roomId: string) => {
      socket.leave(roomId);
      log(`クライアント ${socket.id} がルーム ${roomId} から退出しました`);
    });

    socket.on('message', (data: { room: string; message: string; user: string }) => {
      // ルーム内の他のクライアントにメッセージを送信
      socket.to(data.room).emit('message', {
        id: Date.now().toString(),
        user: data.user,
        message: data.message,
        timestamp: new Date().toISOString()
      });
    });

    socket.on('disconnect', () => {
      log(`クライアントが切断されました: ${socket.id}`);
    });
  });

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, httpServer);
  } else {
    serveStatic(app);
  }


  httpServer.listen(port, "0.0.0.0", () => {
    log(`serving on port ${port}`);
    console.log(`\n🚀 サーバーが起動しました！`);
    console.log(`   ローカル:  http://localhost:${port}`);
    console.log(`   ネットワーク: http://0.0.0.0:${port}`);
    console.log(`\nCtrl+C で停止\n`);
  });
})();
