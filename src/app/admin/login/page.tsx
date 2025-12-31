// src/app/admin/login/page.tsx
"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        // NextAuth'un giriş fonksiyonunu çağırıyoruz
        const res = await signIn("credentials", {
            email,
            password,
            redirect: false, // Sayfa yenilenmesin, biz yönlendireceğiz
        })

        if (res?.error) {
            setError("Email və ya şifrə yanlışdır!")
        } else {
            // Başarılı! Admin paneline git
            router.push("/admin/dashboard")
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white">
            <div className="w-full max-w-md p-8 space-y-8 bg-gray-900 rounded-2xl border border-gray-800 shadow-2xl">

                <div className="text-center">
                    <h1 className="text-3xl font-serif font-bold">MaidəTekstil</h1>
                    <p className="text-gray-500 text-sm tracking-widest uppercase mt-2">Admin Panel Giriş</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="text-xs uppercase font-bold text-gray-400">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full mt-2 p-3 bg-black border border-gray-700 rounded-lg focus:outline-none focus:border-amber-600 transition-colors text-white"
                            required
                        />
                    </div>

                    <div>
                        <label className="text-xs uppercase font-bold text-gray-400">Şifrə</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full mt-2 p-3 bg-black border border-gray-700 rounded-lg focus:outline-none focus:border-amber-600 transition-colors text-white"
                            required
                        />
                    </div>

                    {error && (
                        <div className="p-3 bg-red-900/50 border border-red-800 text-red-200 text-sm rounded">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest rounded-lg hover:bg-amber-600 hover:text-white transition-all"
                    >
                        Daxil Ol
                    </button>
                </form>

            </div>
        </div>
    )
}