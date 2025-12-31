// src/app/admin/products/new/page.tsx
"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import ImageUpload from "@/components/ImageUpload"
import toast from "react-hot-toast"
import Link from "next/link"

export default function NewProductPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState<any[]>([])

    // Form State - Düzəliş edildi: Tərkib, En, Qramaj
    const [form, setForm] = useState({
        title_az: "",
        title_en: "",
        title_ru: "",
        description_az: "",
        description_en: "",
        description_ru: "",
        price: "",
        category: "",
        image: "",

        // YENİ SAHƏLƏR
        composition: "", // Tərkib
        width: "",       // En
        weight: ""       // Qramaj
    })

    // Kateqoriyaları gətir
    useEffect(() => {
        fetch("/api/categories")
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data) && data.length > 0) {
                    setCategories(data)
                    // İlk kateqoriyanı avtomatik seç
                    setForm(prev => ({ ...prev, category: data[0].slug }))
                }
            })
            .catch(() => toast.error("Kateqoriyalar gəlmədi"))
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!form.image) return toast.error("Zəhmət olmasa şəkil yükləyin")

        // Kateqoriya boşdursa avtomatik doldur
        let selectedCategory = form.category
        if (!selectedCategory && categories.length > 0) {
            selectedCategory = categories[0].slug
        }

        setLoading(true)

        const payload = {
            title: { az: form.title_az, en: form.title_en, ru: form.title_ru },
            description: { az: form.description_az, en: form.description_en, ru: form.description_ru },
            price: form.price,
            category: selectedCategory,
            image: form.image,

            // SPESİFİKASİYALAR JSON KİMİ GEDİR
            specs: {
                composition: form.composition, // Tərkib
                width: form.width,             // En
                weight: form.weight            // Qramaj
            }
        }

        try {
            const res = await fetch("/api/products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            })

            if (res.ok) {
                toast.success("✅ Məhsul yaradıldı!")
                router.push("/admin/products")
                router.refresh()
            } else {
                const err = await res.json()
                toast.error(err.error || "Xəta baş verdi")
            }
        } catch (error) {
            toast.error("Server xətası")
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-7xl mx-auto pb-20">

            {/* BAŞLIQ */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Yeni Məhsul</h1>
                    <p className="text-gray-500 text-sm mt-1">Mağazaya yeni parça əlavə edin</p>
                </div>
                <div className="flex gap-3">
                    <Link href="/admin/products">
                        <button type="button" className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition">
                            Ləğv et
                        </button>
                    </Link>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2.5 rounded-lg bg-black text-white font-medium hover:bg-gray-800 transition shadow-lg flex items-center gap-2 disabled:opacity-50"
                    >
                        {loading ? "Gözlə..." : "Məhsulu Yarat"}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* SOL TƏRƏF (INPUTLAR) */}
                <div className="lg:col-span-2 space-y-8">

                    {/* AZƏRBAYCAN */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-blue-50 text-blue-600 px-3 py-1 rounded-bl-lg text-xs font-bold">Əsas Dil</div>
                        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                            🇦🇿 Azərbaycan Dilində
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Parçanın Adı</label>
                                <input required placeholder="Məs: İpək Şərf - Qırmızı" className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black outline-none"
                                    value={form.title_az} onChange={e => setForm({ ...form, title_az: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Haqqında</label>
                                <textarea required rows={4} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black outline-none resize-none"
                                    value={form.description_az} onChange={e => setForm({ ...form, description_az: e.target.value })} />
                            </div>
                        </div>
                    </div>

                    {/* ENGLISH */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">🇺🇸 English Version</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Product Title</label>
                                <input required placeholder="Ex: Silk Scarf" className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black outline-none"
                                    value={form.title_en} onChange={e => setForm({ ...form, title_en: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea required rows={4} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black outline-none resize-none"
                                    value={form.description_en} onChange={e => setForm({ ...form, description_en: e.target.value })} />
                            </div>
                        </div>
                    </div>

                    {/* RUSSIAN */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">🇷🇺 Русская Версия</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Название</label>
                                <input required placeholder="Напр: Шелковый шарф" className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black outline-none"
                                    value={form.title_ru} onChange={e => setForm({ ...form, title_ru: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Описание</label>
                                <textarea required rows={4} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black outline-none resize-none"
                                    value={form.description_ru} onChange={e => setForm({ ...form, description_ru: e.target.value })} />
                            </div>
                        </div>
                    </div>

                    {/* TEKSTİL XÜSUSİYYƏTLƏRİ (YENİLƏNDİ) */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">🧵 Texniki Göstəricilər</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            {/* Tərkib - Tam sətir */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Tərkib (Composition)</label>
                                <input
                                    placeholder="Məs: 70% Pambıq, 30% Polyester"
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black outline-none"
                                    value={form.composition}
                                    onChange={e => setForm({ ...form, composition: e.target.value })}
                                />
                            </div>

                            {/* En */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">En (Width)</label>
                                <input
                                    placeholder="Məs: 150 sm"
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black outline-none"
                                    value={form.width}
                                    onChange={e => setForm({ ...form, width: e.target.value })}
                                />
                            </div>

                            {/* Qramaj */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Qramaj (Weight)</label>
                                <input
                                    placeholder="Məs: 220 qr/m²"
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black outline-none"
                                    value={form.weight}
                                    onChange={e => setForm({ ...form, weight: e.target.value })}
                                />
                            </div>

                        </div>
                    </div>
                </div>

                {/* SAĞ TƏRƏF (MEDIA & AYARLAR) */}
                <div className="space-y-8">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">📸 Məhsul Şəkli</h3>
                        <div className="w-full">
                            <ImageUpload value={form.image} onChange={(url) => setForm({ ...form, image: url })} />
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 space-y-6">
                        <h3 className="text-lg font-bold text-gray-800">📊 Satış Məlumatları</h3>

                        {/* Qiymət */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Qiymət (AZN)</label>
                            <div className="relative">
                                <input required type="number" placeholder="0.00" className="w-full pl-4 pr-12 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black outline-none font-mono text-lg"
                                    value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
                                <span className="absolute right-4 top-3 text-gray-400 font-bold">₼</span>
                            </div>
                        </div>

                        {/* Kateqoriya */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Kateqoriya</label>
                            <div className="relative">
                                <select
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black outline-none appearance-none bg-white"
                                    value={form.category}
                                    onChange={e => setForm({ ...form, category: e.target.value })}
                                >
                                    {categories.length > 0 && <option value="">Kateqoriya Seçin...</option>}

                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.slug}>
                                            {(cat.title as any).az}
                                        </option>
                                    ))}

                                    {categories.length === 0 && <option value="">Yüklənir...</option>}
                                </select>
                                <div className="absolute right-4 top-3.5 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </form>
    )
}