import { NextApiRequest, NextApiResponse } from "next";
import { Server as IOServer } from "socket.io";
import { Server as HttpServer } from "http";
import { Socket as NetSocket } from "net";
import { NextRequest, NextResponse } from "next/server";

import models from "../../models";

interface SocketServer extends HttpServer {
  io?: IOServer;
}

interface SocketWithIO extends NetSocket {
  server: SocketServer;
}

interface NextApiResponseWithSocket extends NextApiResponse {
  socket: SocketWithIO;
}

export default async function SocketHandler(
  req: NextApiRequest,
  res: NextApiResponseWithSocket
) {
  if (res.socket.server.io) {
    res.status(200).json({
      success: true,
      message: "Socket is already running",
      socket: `:${3001}`,
    });
    return;
  }

  try {
    const io = new IOServer().listen(3001);

    io.on("connection", (socket) => {
      console.log("connected");
      // socket.on("hello", (data) => {
      //   io.emit("hello", data);
      //   try {
      //     console.log("hello");
      //   } catch (error) {
      //     console.error("Error updating location:", error);
      //     socket.emit("error", "Failed to update location");
      //   }
      // });
      socket.on("addition", (arg1, arg2, callback) => {
        console.log({ arg1, arg2 });
        callback({
          sum: Number(arg1) + Number(arg2),
        });
      });
    });

    res.socket.server.io = io;
    res.status(201).json({
      success: true,
      message: "Socket is started",
      socket: `:${3001}`,
    });
  } catch (e) {
    return NextResponse.json(
      { message: (e as Error).message },
      { status: 400 }
    );
  }
}
