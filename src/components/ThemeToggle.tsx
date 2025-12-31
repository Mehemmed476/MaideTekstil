// src/components/ThemeToggle.tsx
"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { FaMoon, FaSun } from "react-icons/fa" // İkonlar

export function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    // Hata önleyici: Sayfa tam yüklenmeden butonu gösterme
    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 transition-all hover:scale-110"
            aria-label="Temayı Değiştir"
        >
            {theme === "dark" ? (
                <FaSun className="h-5 w-5 text-yellow-500" />
            ) : (
                <FaMoon className="h-5 w-5 text-blue-600" />
            )}
        </button>
    )
}