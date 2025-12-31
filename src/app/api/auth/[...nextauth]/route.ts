// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // 1. Kullanıcı formdan email ve şifre gönderdi mi?
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // 2. Veritabanında bu emaile sahip kullanıcı var mı?
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        })

        if (!user) {
          return null // Kullanıcı yok
        }

        // 3. Şifre doğru mu?
        // NOT: Normalde burada "bcrypt.compare" kullanılır ama biz seed dosyasında
        // şifreyi düz yazı (admin) olarak kaydettik. O yüzden düz kontrol ediyoruz.
        // İleride burayı şifreleme ile güçlendireceğiz.
        if (credentials.password === user.password) {
          // Giriş Başarılı! Kullanıcı bilgilerini döndür.
          return {
            id: user.id,
            email: user.email,
          }
        }

        // Şifre yanlış
        return null
      }
    })
  ],
  pages: {
    signIn: '/admin/login', // Kendi özel giriş sayfamızı yapacağız
  },
  callbacks: {
    async session({ session, token }) {
      return session
    },
    async jwt({ token, user }) {
      return token
    }
  }
})

export { handler as GET, handler as POST }