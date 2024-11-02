import prisma from "./repositories/prismaClient";

// Graceful shutdown
export const gracefulShutdown = async (server: any) => {
  console.log("Shutting down gracefully...");
  await prisma.$disconnect();
  server.close(() => {
    console.log("HTTP server closed.");
    process.exit(0);
  });

  // Forcefully shutdown in case server.close() hangs
  setTimeout(() => {
    console.error("Forcefully shutting down...");
    process.exit(1);
  }, 10000); // 10 seconds timeout
};
