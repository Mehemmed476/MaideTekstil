// src/app/admin/dashboard/page.tsx
export default function Dashboard() {
    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Ana Panel</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* KART 1: Toplam Ürün */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="text-gray-500 text-sm font-bold uppercase tracking-widest">Toplam Ürün</h3>
                    <p className="text-4xl font-serif font-bold text-gray-900 mt-2">5</p>
                    <p className="text-green-500 text-xs mt-2">Aktif yayında</p>
                </div>

                {/* KART 2: Kategoriler */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="text-gray-500 text-sm font-bold uppercase tracking-widest">Kategoriler</h3>
                    <p className="text-4xl font-serif font-bold text-gray-900 mt-2">4</p>
                    <p className="text-gray-400 text-xs mt-2">İpek, Pamuk, Keten...</p>
                </div>

                {/* KART 3: Ziyaret (Örnek) */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="text-gray-500 text-sm font-bold uppercase tracking-widest">Mesajlar</h3>
                    <p className="text-4xl font-serif font-bold text-gray-900 mt-2">0</p>
                    <p className="text-gray-400 text-xs mt-2">Henüz yeni mesaj yok</p>
                </div>

            </div>

            <div className="mt-12 bg-white p-8 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold mb-4">Hızlı İşlemler</h3>
                <p className="text-gray-500">Soldaki menüden <strong>"Ürünler"</strong> sayfasına giderek yeni ürün ekleyebilir veya düzenleyebilirsiniz.</p>
            </div>
        </div>
    )
}