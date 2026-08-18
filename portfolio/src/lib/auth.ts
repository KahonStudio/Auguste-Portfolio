import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { z } from "zod";

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

async function verifyAdmin(email: string, password: string): Promise<boolean> {
  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  if (!adminEmail || email.toLowerCase() !== adminEmail) return false;

  const hash = process.env.ADMIN_PASSWORD_HASH?.trim();
  if (hash) {
    return bcrypt.compare(password, hash);
  }

  const plain = process.env.ADMIN_PASSWORD;
  if (plain) {
    return password === plain;
  }

  return false;
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(raw) {
        const parsed = credentialsSchema.safeParse(raw);
        if (!parsed.success) return null;
        const { email, password } = parsed.data;
        const ok = await verifyAdmin(email, password);
        if (!ok) return null;
        return { id: "admin", email, name: "Tagapangasiwa" };
      },
    }),
  ],
  pages: {
    signIn: "/tagapangasiwa/login",
  },
  session: { strategy: "jwt" },
  trustHost: true,
  callbacks: {
    authorized({ auth: session, request }) {
      const path = request.nextUrl.pathname;
      if (!path.startsWith("/tagapangasiwa")) return true;
      if (path.startsWith("/tagapangasiwa/login")) return true;
      return Boolean(session?.user);
    },
  },
});
