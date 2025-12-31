// src/app/admin/products/[id]/page.tsx
"use client"

import { useState, useEffect, use } from "react"
import { useRouter, useParams } from "next/navigation" // <--- useParams əlavə etdik
import ImageUpload from "@/components/ImageUpload"
import toast from "react-hot-toast"
import Link from "next/link"

export default function EditProductPage() {
    const router = useRouter()

    // DƏYİŞİKLİK BURADA 👇
    // params prop-u əvəzinə, birbaşa hook istifadə edirik (Ən etibarlı yol)
    const params = useParams()
    const id = params?.id

    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [categories, setCategories] = useState<any[]>([])

    // Form State
    const [form, setForm] = useState({
        title_az: "", title_en: "", title_ru: "",
        description_az: "", description_en: "", description_ru: "",
        price: "",
        category: "",
        image: "",
        composition: "", width: "", weight: ""
    })

    // 1. MƏLUMATLARI GƏTİR
    useEffect(() => {
        // ID hələ yüklənməyibsə dayandır
        if (!id) return;

        const fetchData = async () => {
            try {
                console.log("İstənilən ID:", id) // Konsolda yoxlayaq

                // Kateqoriyalar
                const catRes = await fetch("/api/categories")
                const catData = await catRes.json()
                if (Array.isArray(catData)) setCategories(catData)

                // Məhsul
                const prodRes = await fetch(`/api/products/${id}`)

                if (!prodRes.ok) {
                    console.error("API Xətası:", prodRes.status)
                    toast.error("Məhsul tapılmadı")
                    router.push("/admin/products")
                    return
                }

                const product = await prodRes.json()
                console.log("Gələn Məhsul:", product)

                // Formu doldur
                setForm({
                    title_az: (product.title as any).az || "",
                    title_en: (product.title as any).en || "",
                    title_ru: (product.title as any).ru || "",

                    description_az: (product.description as any).az || "",
                    description_en: (product.description as any).en || "",
                    description_ru: (product.description as any).ru || "",

                    price: product.price.toString(),
                    category: product.category?.slug || "",
                    image: product.image,

                    // Specs (boşdursa xəta verməsin)
                    composition: (product.specs as any)?.composition || "",
                    width: (product.specs as any)?.width || "",
                    weight: (product.specs as any)?.weight || "",
                })

            } catch (error) {
                console.error("Fetch Error:", error)
                toast.error("Yüklənmə xətası")
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [id, router])

    // 2. YADDA SAXLA (UPDATE)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)

        const payload = {
            title: { az: form.title_az, en: form.title_en, ru: form.title_ru },
            description: { az: form.description_az, en: form.description_en, ru: form.description_ru },
            price: form.price,
            category: form.category,
            image: form.image,
            specs: { composition: form.composition, width: form.width, weight: form.weight }
        }

        try {
            const res = await fetch(`/api/products/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            })

            if (res.ok) {
                toast.success("✅ Məhsul yeniləndi!")
                router.push("/admin/products")
                router.refresh()
            } else {
                toast.error("Xəta baş verdi")
            }
        } catch (error) {
            toast.error("Server xətası")
        } finally {
            setSaving(false)
        }
    }

    if (loading) return <div className="p-20 text-center text-gray-500 font-bold text-lg">Məlumatlar yüklənir...</div>

    return (
        <form onSubmit={handleSubmit} className="max-w-7xl mx-auto pb-20">

            {/* BAŞLIQ */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Məhsulu Düzəlt</h1>
                    <p className="text-gray-500 text-sm mt-1">ID: {id}</p>
                </div>
                <div className="flex gap-3">
                    <Link href="/admin/products">
                        <button type="button" className="px-6 py-2.5 rounded-lg border border-gray-300 hover:bg-gray-50">Ləğv et</button>
                    </Link>
                    <button type="submit" disabled={saving} className="px-6 py-2.5 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 disabled:opacity-50">
                        {saving ? "Yadda saxlanılır..." : "Yadda Saxla"}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* SOL TƏRƏF */}
                <div className="lg:col-span-2 space-y-8">

                    {/* AZƏRBAYCAN */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-blue-50 text-blue-600 px-3 py-1 rounded-bl-lg text-xs font-bold">Əsas Dil</div>
                        <h3 className="text-lg font-bold text-gray-800 mb-4">🇦🇿 Azərbaycan Dilində</h3>
                        <div className="space-y-4">
                            <div><label className="block text-sm font-bold mb-1">Ad</label>
                                <input required className="w-full p-2 border rounded" value={form.title_az} onChange={e => setForm({ ...form, title_az: e.target.value })} /></div>
                            <div><label className="block text-sm font-bold mb-1">Təsvir</label>
                                <textarea required rows={4} className="w-full p-2 border rounded resize-none" value={form.description_az} onChange={e => setForm({ ...form, description_az: e.target.value })} /></div>
                        </div>
                    </div>

                    {/* ENGLISH */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">🇺🇸 English Version</h3>
                        <div className="space-y-4">
                            <div><label className="block text-sm font-bold mb-1">Title</label>
                                <input required className="w-full p-2 border rounded" value={form.title_en} onChange={e => setForm({ ...form, title_en: e.target.value })} /></div>
                            <div><label className="block text-sm font-bold mb-1">Description</label>
                                <textarea required rows={4} className="w-full p-2 border rounded resize-none" value={form.description_en} onChange={e => setForm({ ...form, description_en: e.target.value })} /></div>
                        </div>
                    </div>

                    {/* RUSSIAN */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">🇷🇺 Русская Версия</h3>
                        <div className="space-y-4">
                            <div><label className="block text-sm font-bold mb-1">Название</label>
                                <input required className="w-full p-2 border rounded" value={form.title_ru} onChange={e => setForm({ ...form, title_ru: e.target.value })} /></div>
                            <div><label className="block text-sm font-bold mb-1">Описание</label>
                                <textarea required rows={4} className="w-full p-2 border rounded resize-none" value={form.description_ru} onChange={e => setForm({ ...form, description_ru: e.target.value })} /></div>
                        </div>
                    </div>

                    {/* TEXNİKİ GÖSTƏRİCİLƏR */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                        <h3 className="font-bold mb-4">🧵 Texniki Göstəricilər</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                                <label className="text-sm font-bold">Tərkib (Composition)</label>
                                <input placeholder="Məs: 100% İpək" className="w-full p-2 border rounded" value={form.composition} onChange={e => setForm({ ...form, composition: e.target.value })} />
                            </div>
                            <div>
                                <label className="text-sm font-bold">En (Width)</label>
                                <input placeholder="Məs: 150 sm" className="w-full p-2 border rounded" value={form.width} onChange={e => setForm({ ...form, width: e.target.value })} />
                            </div>
                            <div>
                                <label className="text-sm font-bold">Qramaj (Weight)</label>
                                <input placeholder="Məs: 220 gr" className="w-full p-2 border rounded" value={form.weight} onChange={e => setForm({ ...form, weight: e.target.value })} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* SAĞ TƏRƏF */}
                <div className="space-y-8">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                        <h3 className="font-bold mb-4">📸 Şəkil</h3>
                        <ImageUpload value={form.image} onChange={(url) => setForm({ ...form, image: url })} />
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 space-y-4">
                        <h3 className="font-bold">📊 Satış</h3>
                        <div>
                            <label className="text-sm font-bold">Qiymət</label>
                            <div className="relative">
                                <input type="number" className="w-full p-2 border rounded font-mono" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
                                <span className="absolute right-3 top-2 text-gray-400">₼</span>
                            </div>
                        </div>
                        <div>
                            <label className="text-sm font-bold">Kateqoriya</label>
                            <select className="w-full p-2 border rounded bg-white" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                                {/* Kateqoriyalar buraya yüklənəcək */}
                                {categories.length === 0 && <option>Yüklənir...</option>}
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.slug}>{(cat.title as any).az}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

            </div>
        </form>
    )
}