// src/app/[lang]/products/page.tsx
import { getDictionary } from '../../../utils/get-dictionary'
import ProductFilter from '../../../components/ProductFilter'
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

type Props = {
    params: Promise<{ lang: 'az' | 'en' | 'ru' }>
}

// Veritabanı verisinin önbellekte ne kadar kalacağını (revalidate) belirleyebiliriz.
// 0 yaparsan her girişten taze veri çeker.
export const revalidate = 0

export default async function ProductsPage({ params }: Props) {
    const { lang } = await params
    const dict = await getDictionary(lang)

    // VERİTABANINDAN ÜRÜNLERİ ÇEK (En yeniden en eskiye)
    const products = await prisma.product.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    })

    return (
        <div className="container mx-auto px-6 lg:px-12 py-12 min-h-screen pt-32">

            {/* BAŞLIK */}
            <div className="mb-12 text-center animate-fade-in-up">
                <h1 className="text-4xl md:text-5xl font-serif font-medium text-gray-900 dark:text-white mb-4">
                    {dict.products.title}
                </h1>
                <div className="h-1 w-20 bg-amber-600 mx-auto"></div>
            </div>

            {/* Veriyi (products) Client Component'e gönderiyoruz */}
            <ProductFilter dict={dict} lang={lang} dbProducts={products} />

        </div>
    )
}