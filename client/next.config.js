module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: process.env.NEXT_PUBLIC_SERVER_IMG_PROTOCOL,
        hostname: process.env.NEXT_PUBLIC_SERVER_IMG_URL,
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
};
