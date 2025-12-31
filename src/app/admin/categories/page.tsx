// src/app/admin/categories/page.tsx
"use client"

import { useState, useEffect } from "react"
import toast from "react-hot-toast"

type Category = {
    id: number
    slug: string
    title: { az: string; en: string; ru: string }
    _count: { products: number }
}

export default function CategoriesPage() {
    // Başlanğıc dəyəri mütləq boş array [] olmalıdır
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState(true)

    const [form, setForm] = useState({ title_az: "", title_en: "", title_ru: "", slug: "" })

    useEffect(() => {
        fetchCategories()
    }, [])

    const fetchCategories = async () => {
        try {
            const res = await fetch("/api/categories")
            const data = await res.json()

            console.log("Categories API Cavabı:", data) // Konsolda yoxlamaq üçün

            // Əgər gələn data Array-dirsə, yüklə
            if (Array.isArray(data)) {
                setCategories(data)
            } else {
                // Deyilsə, boş array qoy və xəta mesajı ver
                console.error("Gələn data array deyil:", data)
                setCategories([])
                toast.error("Kateqoriyalar yüklənmədi")
            }
        } catch (error) {
            console.error("Fetch Error:", error)
            setCategories([])
            toast.error("Server xətası")
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const toastId = toast.loading("Yaradılır...")

        try {
            const res = await fetch("/api/categories", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            })

            const data = await res.json()

            if (res.ok) {
                toast.success("Kateqoriya yaradıldı!", { id: toastId })
                // Siyahını yenilə (API-yə təkrar sorğu atmadan)
                // Yeni yaradılanın product sayı 0-dır
                setCategories([...categories, { ...data, _count: { products: 0 } }])
                setForm({ title_az: "", title_en: "", title_ru: "", slug: "" })
            } else {
                toast.error(data.error || "Xəta baş verdi", { id: toastId })
            }
        } catch (error) {
            toast.error("Server xətası", { id: toastId })
        }
    }

    const handleDelete = async (id: number) => {
        if (!confirm("Bu kateqoriyanı silmək istəyirsiniz?")) return

        const toastId = toast.loading("Silinir...")

        try {
            const res = await fetch("/api/categories", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id })
            })

            const data = await res.json()

            if (res.ok) {
                toast.success("Silindi!", { id: toastId })
                setCategories(categories.filter(c => c.id !== id))
            } else {
                toast.error(data.error || "Silinmədi", { id: toastId })
            }
        } catch (error) {
            toast.error("Xəta oldu", { id: toastId })
        }
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* SOL TƏRƏF: YENİ KATEQORİYA FORMU */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 h-fit">
                <h2 className="text-lg font-bold mb-4">Yeni Kateqoriya</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-xs font-bold text-gray-500">Ad (AZ)</label>
                        <input
                            value={form.title_az}
                            onChange={(e) => setForm({ ...form, title_az: e.target.value })}
                            className="w-full p-2 border rounded focus:ring-2 ring-amber-500 outline-none"
                            placeholder="Məs: İpək"
                            required
                        />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-500">Ad (EN)</label>
                        <input
                            value={form.title_en}
                            onChange={(e) => setForm({ ...form, title_en: e.target.value })}
                            className="w-full p-2 border rounded focus:ring-2 ring-amber-500 outline-none"
                            placeholder="Ex: Silk"
                            required
                        />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-500">Ad (RU)</label>
                        <input
                            value={form.title_ru}
                            onChange={(e) => setForm({ ...form, title_ru: e.target.value })}
                            className="w-full p-2 border rounded focus:ring-2 ring-amber-500 outline-none"
                            placeholder="Напр: Шелк"
                            required
                        />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-500">Slug (Link üçün - Boş qalsa avtomatik)</label>
                        <input
                            value={form.slug}
                            onChange={(e) => setForm({ ...form, slug: e.target.value })}
                            className="w-full p-2 border rounded bg-gray-50 text-sm"
                            placeholder="meselen: ipek-parcalar"
                        />
                    </div>
                    <button type="submit" className="w-full bg-amber-600 text-white py-3 rounded-lg font-bold hover:bg-amber-700 transition">
                        Əlavə Et
                    </button>
                </form>
            </div>

            {/* SAĞ TƏRƏF: KATEQORİYA SİYAHISI */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <h2 className="text-lg font-bold p-6 border-b">Mövcud Kateqoriyalar</h2>

                {loading ? (
                    <p className="p-6 text-gray-500">Yüklənir...</p>
                ) : categories.length === 0 ? (
                    <p className="p-6 text-gray-400">Heç bir kateqoriya yoxdur.</p>
                ) : (
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 text-gray-500 font-bold">
                            <tr>
                                <th className="p-4">Ad (AZ/EN)</th>
                                <th className="p-4">Slug</th>
                                <th className="p-4 text-center">Məhsul</th>
                                <th className="p-4 text-right">Əməliyyat</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {categories.map((cat) => (
                                <tr key={cat.id} className="hover:bg-gray-50">
                                    <td className="p-4">
                                        {/* Tip yoxlanışı (as any) ilə */}
                                        <span className="block font-bold">{(cat.title as any).az}</span>
                                        <span className="text-gray-400 text-xs">{(cat.title as any).en}</span>
                                    </td>
                                    <td className="p-4 font-mono text-xs text-blue-600">{cat.slug}</td>
                                    <td className="p-4 text-center">
                                        <span className="bg-gray-100 px-2 py-1 rounded text-xs font-bold">{cat._count?.products || 0}</span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <button
                                            onClick={() => handleDelete(cat.id)}
                                            className="text-red-500 hover:text-red-700 font-bold text-xs bg-red-50 px-3 py-2 rounded-lg hover:bg-red-100 transition"
                                        >
                                            SİL
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    )
}