// src/components/AdminSidebar.tsx
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"

export default function AdminSidebar() {
    const pathname = usePathname()

    const links = [
        { name: "Ana Panel", href: "/admin/dashboard", icon: "📊" },
        { name: "Məhsullar", href: "/admin/products", icon: "👗" },
        { name: "Kateqoriyalar", href: "/admin/categories", icon: "🏷️" },
        { name: "Sayt Ayarları", href: "/admin/settings", icon: "⚙️" },
    ]

    return (
        <aside className="w-64 bg-gray-900 text-white min-h-screen p-6 fixed left-0 top-0 flex flex-col">

            {/* LOGO */}
            <div className="mb-10 text-center">
                <h2 className="text-2xl font-serif font-bold">Maidə<span className="text-amber-600">.</span></h2>
                <p className="text-xs text-gray-500 tracking-widest uppercase">Admin Panel</p>
            </div>

            {/* MENÜLER */}
            <nav className="flex-1 space-y-2">
                {links.map((link) => {
                    const isActive = pathname === link.href
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                ? "bg-amber-600 text-white font-bold"
                                : "text-gray-400 hover:bg-gray-800 hover:text-white"
                                }`}
                        >
                            <span>{link.icon}</span>
                            <span>{link.name}</span>
                        </Link>
                    )
                })}
            </nav>

            {/* ÇIKIŞ BUTONU */}
            <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="mt-auto flex items-center space-x-3 px-4 py-3 text-red-400 hover:bg-red-900/20 hover:text-red-300 rounded-lg transition-colors"
            >
                <span>🚪</span>
                <span>Çıxış</span>
            </button>

        </aside>
    )
}