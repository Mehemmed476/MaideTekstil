// src/components/Navbar.tsx
"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { ThemeToggle } from "./ThemeToggle"
import { usePathname } from "next/navigation"

type NavbarProps = {
    lang: string
    dict: any
}

export default function Navbar({ lang, dict }: NavbarProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const switchLanguage = (newLang: string) => {
        if (!pathname) return "/"
        const segments = pathname.split("/")
        segments[1] = newLang
        return segments.join("/")
    }

    // Mobilde menü açılınca arkadaki sayfanın kaymasını engelle
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
    }, [isOpen])

    return (
        <>
            <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 border-b border-transparent ${scrolled ? "bg-white/90 dark:bg-black/90 backdrop-blur-md py-4 shadow-sm border-gray-200 dark:border-gray-800" : "bg-transparent py-6 md:py-8"
                }`}>
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="flex justify-between items-center">

                        {/* SOL - Linkler (Masaüstü) */}
                        <div className="hidden md:flex space-x-8 text-xs font-bold tracking-[0.2em] uppercase">
                            <Link href={`/${lang}/products`} className="hover:text-amber-600 transition-colors">{dict.navigation.products}</Link>
                            <Link href={`/${lang}/about`} className="hover:text-amber-600 transition-colors">{dict.navigation.about}</Link>
                        </div>

                        {/* ORTA - LOGO (Düzeltildi) */}
                        <div className="flex-grow md:flex-grow-0 text-center z-[101]">
                            <Link href={`/${lang}`} onClick={() => setIsOpen(false)} className="text-2xl md:text-3xl font-serif font-bold tracking-tighter hover:opacity-80 transition-opacity">
                                Maidə<span className="text-amber-600">Tekstil</span>
                            </Link>
                        </div>

                        {/* SAĞ - Dil ve Tema (Masaüstü) */}
                        <div className="hidden md:flex items-center space-x-6">
                            <div className="flex space-x-3 text-[10px] font-black tracking-widest">
                                {['az', 'en', 'ru'].map((l) => (
                                    <Link
                                        key={l}
                                        href={switchLanguage(l)}
                                        className={`uppercase hover:text-amber-600 transition-colors ${lang === l ? 'text-amber-600 underline underline-offset-4' : 'text-gray-400'}`}
                                    >
                                        {l}
                                    </Link>
                                ))}
                            </div>
                            <ThemeToggle />
                        </div>

                        {/* MOBİL BUTON (Hamburger) */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden p-2 z-[101] relative group"
                            aria-label="Toggle Menu"
                        >
                            <div className="relative flex overflow-hidden items-center justify-center w-[20px] h-[20px] transform transition-all duration-200">
                                <div className={`flex flex-col justify-between w-[20px] h-[14px] transform transition-all duration-300 origin-center overflow-hidden ${isOpen ? "-rotate-90" : ""}`}>
                                    <div className={`bg-black dark:bg-white h-[2px] w-7 transform transition-all duration-300 origin-left ${isOpen ? "rotate-[42deg]" : ""}`}></div>
                                    <div className={`bg-black dark:bg-white h-[2px] w-1/2 rounded transform transition-all duration-300 ${isOpen ? "-translate-x-10" : ""}`}></div>
                                    <div className={`bg-black dark:bg-white h-[2px] w-7 transform transition-all duration-300 origin-left ${isOpen ? "-rotate-[42deg]" : ""}`}></div>
                                </div>
                            </div>
                        </button>
                    </div>
                </div>
            </nav>

            {/* MOBİL TAM EKRAN MENÜ */}
            <div className={`fixed inset-0 bg-white dark:bg-black z-[90] flex flex-col items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}>

                {/* Menü Linkleri */}
                <div className="flex flex-col space-y-6 text-center mb-12">
                    <Link href={`/${lang}`} onClick={() => setIsOpen(false)} className="text-4xl font-serif font-medium hover:text-amber-600 transition-colors">{dict.navigation.home}</Link>
                    <Link href={`/${lang}/products`} onClick={() => setIsOpen(false)} className="text-4xl font-serif font-medium hover:text-amber-600 transition-colors">{dict.navigation.products}</Link>
                    <Link href={`/${lang}/about`} onClick={() => setIsOpen(false)} className="text-4xl font-serif font-medium hover:text-amber-600 transition-colors">{dict.navigation.about}</Link>
                </div>

                {/* Mobilde Dil Seçimi (DÜZELTİLDİ) */}
                <div className="flex items-center space-x-8 border-t border-gray-100 dark:border-gray-800 pt-8">
                    <div className="flex space-x-6">
                        {['az', 'en', 'ru'].map((l) => (
                            <Link
                                key={l}
                                href={switchLanguage(l)}
                                // Tıklayınca menüyü kapatıyoruz
                                onClick={() => setIsOpen(false)}
                                className={`text-lg font-bold uppercase tracking-widest ${lang === l ? 'text-amber-600 scale-110' : 'text-gray-400'}`}
                            >
                                {l}
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="mt-8">
                    <ThemeToggle />
                </div>
            </div>
        </>
    )
}