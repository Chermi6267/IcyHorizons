"use client";

import { io } from "socket.io-client";

export const socket = io(`http://localhost:5550`);
// ${process.env.NEXT_PUBLIC_SERVER_URL}
