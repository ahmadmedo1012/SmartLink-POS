import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { prisma } from "./prisma"

// ponytail: auto-generate secret if missing (first deploy)
const secret = process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || Buffer.from("smart-link-pos-v1").toString("base64")

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret,
  trustHost: true,
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        const user = await prisma.user.findUnique({ where: { email: credentials.email as string } })
        if (!user || !user.isActive) return null
        const valid = await bcrypt.compare(credentials.password as string, user.passwordHash)
        if (!valid) return null
        return { id: user.id, email: user.email, name: user.name, role: user.role }
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) { (token as any).role = (user as any).role; (token as any).id = user.id }
      return token
    },
    async session({ session, token }) {
      if (session.user) { (session.user as any).role = (token as any).role; (session.user as any).id = (token as any).id }
      return session
    },
  },
  pages: { signIn: "/login" },
})
