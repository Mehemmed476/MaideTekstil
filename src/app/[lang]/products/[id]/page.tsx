// src/app/[lang]/products/[id]/page.tsx
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getDictionary } from '../../../../utils/get-dictionary'
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

type Props = {
    params: Promise<{ lang: 'az' | 'en' | 'ru'; id: string }>
}

export default async function ProductDetailPage({ params }: Props) {
    const { lang, id } = await params
    const dict = await getDictionary(lang)

    // STATİK YERİNE VERİTABANINDAN ÇEKİYORUZ
    // findUnique yerine findFirst kullanıyoruz çünkü URL'den gelen id string, DB'de int olabilir
    const product = await prisma.product.findUnique({
        where: { id: Number(id) }
    })

    if (!product) {
        notFound()
    }

    // Type Casting (TypeScript'i rahatlatmak için)
    const title = (product.title as any)[lang]
    const description = (product.description as any)[lang]
    const specs = product.specs as any
    const categoryName = (dict.products as any)[product.category]

    // WhatsApp Mesajı
    const wpMessage = `Salam MaidəTekstil, ${title} (ID: ${product.id}) haqqında məlumat almaq istəyirəm.`
    const wpLink = `https://wa.me/994500000000?text=${encodeURIComponent(wpMessage)}`

    return (
        <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white pt-24 pb-12">

            {/* GERİ DÖN */}
            <div className="container mx-auto px-6 lg:px-12 mb-8">
                <Link href={`/${lang}/products`} className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-amber-600 transition-colors">
                    ← {dict.products.title}
                </Link>
            </div>

            <div className="container mx-auto px-6 lg:px-12">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">

                    {/* RESİM */}
                    <div className="w-full lg:w-1/2">
                        <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                            {product.image && product.image.startsWith('http') ? (
                                <Image
                                    src={product.image}
                                    alt={title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-6xl">🖼️</div>
                            )}
                        </div>
                    </div>

                    {/* DETAYLAR */}
                    <div className="w-full lg:w-1/2 lg:sticky lg:top-32 lg:h-fit flex flex-col justify-center">

                        <div className="mb-8 border-b border-gray-200 dark:border-gray-800 pb-8">
                            <p className="text-amber-600 font-bold uppercase tracking-widest text-xs mb-4">
                                {categoryName}
                            </p>
                            <h1 className="text-4xl md:text-6xl font-serif mb-4 leading-tight">
                                {title}
                            </h1>
                            <p className="text-2xl font-light text-gray-600 dark:text-gray-300">
                                {product.price} {dict.products.currency} <span className="text-sm text-gray-400">/ metr</span>
                            </p>
                        </div>

                        <div className="mb-8 space-y-6">
                            <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-400 font-light">
                                {description}
                            </p>

                            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-500 uppercase tracking-wider text-[10px]">Tərkib</span>
                                    <span className="font-medium">{specs.composition}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500 uppercase tracking-wider text-[10px]">En</span>
                                    <span className="font-medium">{specs.width}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500 uppercase tracking-wider text-[10px]">Qramaj</span>
                                    <span className="font-medium">{specs.weight}</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <a
                                href={wpLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full bg-green-600 text-white text-center py-4 rounded-full font-bold tracking-widest hover:bg-green-700 transition-colors shadow-lg hover:shadow-green-500/30"
                            >
                                WHATSAPP İLƏ SİFARİŞ
                            </a>
                        </div>

                        <p className="mt-6 text-xs text-gray-400 text-center leading-relaxed">
                            * Rənglər ekran parlaqlığına görə cüzi fərqlilik göstərə bilər.
                            Topdan satış üçün xüsusi qiymət təklifi alın.
                        </p>

                    </div>
                </div>
            </div>
        </div>
    )
}