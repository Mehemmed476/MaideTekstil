"use client"

import { useState } from "react"
import AdminSidebar from "./AdminSidebar"

export default function AdminLayoutClient({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setSidebarOpen] = useState(false)

    return (
        <div className="flex min-h-screen bg-gray-100 text-black relative">

            {/* MOBİL HAMBURGER MENU BUTTON */}
            <button
                onClick={() => setSidebarOpen(!isSidebarOpen)}
                className="lg:hidden fixed top-4 right-4 z-50 bg-black text-white p-2 rounded-md shadow-lg"
            >
                {isSidebarOpen ? "✕" : "☰"}
            </button>

            {/* SIDEBAR (Mobildə gizli, Desktopda sabit) */}
            <div className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-gray-900 transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:block
      `}>
                <AdminSidebar />
            </div>

            {/* QARA FON (Mobildə menyu açılanda arxanı qaraltmaq üçün) */}
            {isSidebarOpen && (
                <div
                    onClick={() => setSidebarOpen(false)}
                    className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                />
            )}

            {/* İÇERİK */}
            <main className="flex-1 p-4 lg:p-8 w-full overflow-x-hidden pt-16 lg:pt-8">
                {children}
            </main>
        </div>
    )
}