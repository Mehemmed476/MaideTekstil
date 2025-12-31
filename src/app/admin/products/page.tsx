// src/app/admin/products/page.tsx
"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import toast from "react-hot-toast"

// Gələn məlumatın tipi
type Product = {
    id: number
    title: { az: string; en: string }
    category: { slug: string; title: { az: string; en: string } } | null
    price: number
    image: string
}

export default function AdminProductsPage() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)

    // Səhifə açılanda məhsulları gətir
    useEffect(() => {
        fetchProducts()
    }, [])

    const fetchProducts = async () => {
        try {
            // Keşləmə olmasın deyə timestamp əlavə edirik (qoruma məqsədli)
            const res = await fetch(`/api/products?t=${Date.now()}`)
            const data = await res.json()

            if (Array.isArray(data)) {
                setProducts(data)
            } else {
                console.error("Gələn data array deyil:", data)
                toast.error("Məhsul siyahısı yüklənmədi")
                setProducts([])
            }
        } catch (error) {
            console.error("Fetch Xətası:", error)
            toast.error("Serverlə əlaqə kəsildi")
            setProducts([])
        } finally {
            setLoading(false)
        }
    }

    const deleteProduct = async (id: number) => {
        if (!confirm("Bu məhsulu silmək istədiyinizə əminsiniz?")) return

        const toastId = toast.loading("Silinir...")

        try {
            const res = await fetch(`/api/products/${id}`, { method: "DELETE" })

            if (res.ok) {
                // Siyahıdan dərhal sil (API-yə təkrar sorğu atmadan)
                setProducts((prev) => prev.filter((p) => p.id !== id))
                toast.success("Məhsul silindi!", { id: toastId })
            } else {
                toast.error("Silinmədi!", { id: toastId })
            }
        } catch (error) {
            toast.error("Xəta baş verdi", { id: toastId })
        }
    }

    return (
        <div className="max-w-7xl mx-auto">
            {/* BAŞLIQ HİSSƏSİ */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Məhsullar</h1>
                    <p className="text-gray-500 text-sm mt-1">Saytdakı bütün məhsulların idarə edilməsi</p>
                </div>

                <Link href="/admin/products/new">
                    <button className="bg-black text-white px-6 py-3 rounded-xl font-bold hover:bg-gray-800 transition-all shadow-lg flex items-center gap-2">
                        <span>+</span> Yeni Məhsul
                    </button>
                </Link>
            </div>

            {/* CƏDVƏL HİSSƏSİ */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                {loading ? (
                    <div className="p-12 text-center">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900 mx-auto mb-4"></div>
                        <p className="text-gray-500">Məhsullar yüklənir...</p>
                    </div>
                ) : products.length === 0 ? (
                    <div className="p-16 text-center text-gray-400 flex flex-col items-center">
                        <svg className="w-16 h-16 mb-4 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                        <p className="text-lg font-medium text-gray-500">Hələ heç bir məhsul yoxdur.</p>
                        <Link href="/admin/products/new" className="text-blue-600 hover:underline mt-2 text-sm">İlk məhsulu əlavə et</Link>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500 font-semibold">
                                    <th className="p-5">Şəkil</th>
                                    <th className="p-5">Ad (AZ)</th>
                                    <th className="p-5">Kateqoriya</th>
                                    <th className="p-5">Qiymət</th>
                                    <th className="p-5 text-right">Əməliyyatlar</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {products.map((product) => (
                                    <tr key={product.id} className="hover:bg-gray-50 transition-colors group">

                                        {/* ŞƏKİL */}
                                        <td className="p-4">
                                            <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 border border-gray-200 shadow-sm">
                                                {product.image ? (
                                                    <Image src={product.image} alt="img" fill className="object-cover" />
                                                ) : (
                                                    <span className="flex items-center justify-center h-full text-xs text-gray-400">Yoxdur</span>
                                                )}
                                            </div>
                                        </td>

                                        {/* AD */}
                                        <td className="p-4">
                                            <p className="font-bold text-gray-900">{(product.title as any).az}</p>
                                            <p className="text-xs text-gray-400 mt-0.5">{(product.title as any).en}</p>
                                        </td>

                                        {/* KATEQORİYA */}
                                        <td className="p-4">
                                            <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold border border-blue-100">
                                                {(product.category?.title as any)?.az || "Kateqoriyasız"}
                                            </span>
                                        </td>

                                        {/* QİYMƏT */}
                                        <td className="p-4 font-mono font-bold text-gray-800 text-lg">
                                            {product.price} <span className="text-sm text-gray-400">₼</span>
                                        </td>

                                        {/* DÜYMƏLƏR */}
                                        <td className="p-4 text-right space-x-2">
                                            {/* REDAKTƏ (UPDATE) DÜYMƏSİ */}
                                            <Link href={`/admin/products/${product.id}`}>
                                                <button className="bg-white border border-gray-200 text-gray-600 hover:text-blue-600 hover:border-blue-300 px-3 py-1.5 rounded-lg text-sm font-medium transition shadow-sm">
                                                    ✏️ Düzəlt
                                                </button>
                                            </Link>

                                            {/* SİLMƏ DÜYMƏSİ */}
                                            <button
                                                onClick={() => deleteProduct(product.id)}
                                                className="bg-white border border-red-100 text-red-500 hover:bg-red-50 hover:border-red-200 px-3 py-1.5 rounded-lg text-sm font-medium transition shadow-sm"
                                            >
                                                🗑️ Sil
                                            </button>
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}