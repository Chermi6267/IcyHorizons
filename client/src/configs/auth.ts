import axios from "axios";
import type { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { cookies } from "next/headers";
import { setCookie } from "cookies-next";

interface ExtendedProfile extends Record<string, any> {
  picture?: string;
}

export const authConfig: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],

  callbacks: {
    signIn: async ({ account, profile }) => {
      try {
        const extendedProfile = profile as ExtendedProfile;

        if (account?.provider === "google") {
          const response = await axios.post(
            "http://localhost:5550/auth/registration",
            {
              email: extendedProfile?.email,
              sub: extendedProfile?.sub,
              loggedWith: account?.provider,
              avatar: extendedProfile?.picture,
              name: extendedProfile?.name,
            },
            { withCredentials: true }
          );

          const cookie = response.headers["set-cookie"];
          if (!cookie) {
            throw new Error("Ошибка при входе пользователя");
          }

          const refreshToken = cookie[0].split(";")[0].split("=")[1];
          const maxAge = parseInt(cookie[0].split(";")[1].split("=")[1]);

          setCookie("refreshToken", refreshToken, {
            cookies,
            maxAge: maxAge,
            secure: false,
            httpOnly: true,
          });

          return true;
        }

        return true;
      } catch (error: any) {
        throw new Error(
          error.response?.data?.message || "Ошибка при входе пользователя"
        );
      }
    },

    redirect: async ({ url, baseUrl }) => {
      return `${baseUrl}/auth?status=ok`;
    },
  },

  pages: {
    signIn: "/auth",
    error: "/auth/error",
  },
};
