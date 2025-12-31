// src/components/Footer.tsx
import Link from 'next/link'
import { FaInstagram, FaWhatsapp, FaFacebookF } from 'react-icons/fa' // İkonlar

type Props = {
    dict: any
    lang: string
}

export default function Footer({ dict, lang }: Props) {
    return (
        <footer className="bg-black text-white pt-20 pb-10 border-t border-gray-900">
            <div className="container mx-auto px-6 lg:px-12">

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">

                    {/* 1. SÜTUN: MARKA */}
                    <div className="space-y-6">
                        <Link href={`/${lang}`} className="text-3xl font-serif font-bold tracking-tighter block">
                            Maidə<span className="text-amber-600">Tekstil</span>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-xs font-light">
                            {dict.footer.about_text}
                        </p>
                        {/* Sosyal Medya İkonları */}
                        <div className="flex space-x-4 pt-2">
                            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-amber-600 transition-colors">
                                <FaInstagram className="text-white" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-green-600 transition-colors">
                                <FaWhatsapp className="text-white" />
                            </a>
                        </div>
                    </div>

                    {/* 2. SÜTUN: HIZLI LİNKLER */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-widest mb-6 text-gray-500">
                            {dict.footer.quick_links}
                        </h3>
                        <ul className="space-y-4 text-sm font-light text-gray-300">
                            <li>
                                <Link href={`/${lang}`} className="hover:text-amber-600 transition-colors hover:pl-2 duration-300">
                                    {dict.navigation.home}
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${lang}/products`} className="hover:text-amber-600 transition-colors hover:pl-2 duration-300">
                                    {dict.navigation.products}
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${lang}/about`} className="hover:text-amber-600 transition-colors hover:pl-2 duration-300">
                                    {dict.navigation.about}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* 3. SÜTUN: İLETİŞİM */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-widest mb-6 text-gray-500">
                            {dict.footer.contact}
                        </h3>
                        <ul className="space-y-4 text-sm font-light text-gray-300">
                            <li className="flex items-start space-x-3">
                                <span className="text-amber-600">📍</span>
                                <span>{dict.footer.address}</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <span className="text-amber-600">📞</span>
                                <span>+994 50 000 00 00</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <span className="text-amber-600">✉️</span>
                                <span>info@maidetekstil.com</span>
                            </li>
                        </ul>
                    </div>

                </div>

                {/* ALT ÇİZGİ VE COPYRIGHT */}
                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
                    <p>&copy; {new Date().getFullYear()} MaidəTekstil. {dict.footer.rights}</p>
                    <p className="mt-2 md:mt-0">Designed by Coding Partner</p>
                </div>

            </div>
        </footer>
    )
}