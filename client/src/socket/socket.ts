"use client";

import { io } from "socket.io-client";

export const socket = io(`http://192.168.0.10:5550`);
// ${process.env.NEXT_PUBLIC_SERVER_URL}
