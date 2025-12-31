// src/components/ProductFilter.tsx
"use client"

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
    dict: any
    lang: 'az' | 'en' | 'ru'
    dbProducts: any[] // Veritabanından gelen ürünler
}

export default function ProductFilter({ dict, lang, dbProducts }: Props) {
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [maxPrice, setMaxPrice] = useState(500) // Fiyat limitini biraz artırdım
    const [searchQuery, setSearchQuery] = useState('')

    // Veritabanından gelen ürünleri filtrele
    const filteredProducts = dbProducts.filter((product) => {
        // TypeScript JSON verisinde hata vermesin diye 'as any' kullanıyoruz
        const title = (product.title as any)[lang] || ""

        const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory
        const priceMatch = product.price <= maxPrice
        const searchMatch = title.toLowerCase().includes(searchQuery.toLowerCase())

        return categoryMatch && priceMatch && searchMatch
    })

    const categories = ['all', 'silk', 'cotton', 'velvet', 'linen']

    return (
        <div className="flex flex-col lg:flex-row gap-16 relative">

            {/* SOL TARA - FİLTRELER */}
            <aside className="w-full lg:w-1/5 space-y-12 animate-fade-in-up delay-100 lg:sticky lg:top-32 lg:h-fit">

                {/* Arama */}
                <div className="relative group">
                    <input
                        type="text"
                        placeholder={dict.products.search}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full py-2 bg-transparent border-b border-gray-300 dark:border-gray-700 text-lg font-serif placeholder-gray-400 focus:border-amber-600 focus:outline-none transition-colors"
                    />
                    <span className="absolute right-0 top-2 text-gray-400">🔍</span>
                </div>

                {/* Kategoriler */}
                <div>
                    <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400 mb-6">{dict.products.category}</h3>
                    <div className="space-y-4">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`block text-left text-lg transition-all duration-300 group flex items-center ${selectedCategory === cat
                                        ? 'text-amber-600 font-serif italic pl-4 border-l-2 border-amber-600'
                                        : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white font-light'
                                    }`}
                            >
                                {dict.products[cat]}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Fiyat */}
                <div>
                    <div className="flex justify-between mb-4 text-xs font-bold tracking-widest uppercase text-gray-400">
                        <span>{dict.products.price_range}</span>
                        <span className="text-amber-600">{maxPrice} {dict.products.currency}</span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="1000"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(Number(e.target.value))}
                        className="w-full h-[2px] bg-gray-200 dark:bg-gray-800 rounded-lg appearance-none cursor-pointer accent-amber-600"
                    />
                </div>
            </aside>

            {/* SAĞ TARA - GALERİ */}
            <div className="w-full lg:w-4/5">
                <p className="text-right text-xs uppercase tracking-widest text-gray-400 mb-8">
                    {filteredProducts.length} {dict.products.title}
                </p>

                {filteredProducts.length === 0 ? (
                    <div className="text-center py-20 text-gray-400 font-serif text-2xl italic">
                        {dict.products.no_results}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16 animate-fade-in-up delay-200">
                        {filteredProducts.map((product) => (
                            <Link
                                href={`/${lang}/products/${product.id}`}
                                key={product.id}
                                className="group block cursor-pointer"
                            >
                                {/* Resim Alanı */}
                                <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-100 dark:bg-gray-800 mb-6">
                                    {/* Resim Kontrolü: Eğer resim yoksa ikon göster */}
                                    {product.image && product.image.startsWith('http') ? (
                                        <Image
                                            src={product.image}
                                            alt={(product.title as any)[lang]}
                                            fill
                                            className="object-cover group-hover:scale-105 group-hover:opacity-90 transition-all duration-700 ease-out"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-4xl text-gray-300">🖼️</div>
                                    )}

                                    <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                                        <button className="w-full bg-white/90 dark:bg-black/90 backdrop-blur text-black dark:text-white py-4 text-xs font-bold uppercase tracking-widest hover:bg-amber-600 hover:text-white transition-colors">
                                            İncələ
                                        </button>
                                    </div>
                                </div>

                                {/* Bilgiler */}
                                <div className="text-center md:text-left">
                                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2">
                                        {dict.products[product.category]}
                                    </p>
                                    <div className="flex flex-col md:flex-row md:justify-between md:items-end">
                                        <h3 className="text-2xl font-serif text-gray-900 dark:text-white group-hover:text-amber-600 transition-colors duration-300">
                                            {(product.title as any)[lang]}
                                        </h3>
                                        <span className="text-lg font-light text-gray-600 dark:text-gray-300 mt-2 md:mt-0">
                                            {product.price} {dict.products.currency}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}