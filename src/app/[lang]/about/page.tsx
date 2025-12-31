// src/app/[lang]/about/page.tsx
import Image from 'next/image'
import { getDictionary } from '../../../utils/get-dictionary'

type Props = {
    params: Promise<{ lang: 'az' | 'en' | 'ru' }>
}

export default async function AboutPage({ params }: Props) {
    const { lang } = await params
    const dict = await getDictionary(lang)

    return (
        <div className="container mx-auto px-6 lg:px-12 py-24 min-h-screen flex items-center">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                {/* SOL: Sanatsal Fotoğraf */}
                <div className="relative h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700 ease-out order-2 lg:order-1">
                    {/* Unsplash'ten terzi/kumaş görseli */}
                    <Image
                        src="/images/aboutphoto.png"
                        alt="MaidəTekstil Atelier"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20" />
                </div>

                {/* SAĞ: Hikaye */}
                <div className="space-y-8 order-1 lg:order-2 animate-fade-in-up">
                    <span className="text-amber-600 font-bold tracking-[0.2em] uppercase text-xs">
                        {dict.about.subtitle}
                    </span>

                    <h1 className="text-5xl md:text-7xl font-serif leading-tight text-gray-900 dark:text-white">
                        {dict.about.title}
                    </h1>

                    <div className="space-y-6 text-lg font-light text-gray-600 dark:text-gray-400 leading-relaxed">
                        <p>{dict.about.text1}</p>
                        <p>{dict.about.text2}</p>
                    </div>

                    {/* İstatistikler */}
                    <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200 dark:border-gray-800">
                        <div>
                            <span className="block text-4xl font-serif text-amber-600 mb-2">15+</span>
                            <span className="text-xs uppercase tracking-widest text-gray-500">{dict.about.stat1}</span>
                        </div>
                        <div>
                            <span className="block text-4xl font-serif text-amber-600 mb-2">500+</span>
                            <span className="text-xs uppercase tracking-widest text-gray-500">{dict.about.stat2}</span>
                        </div>
                        <div>
                            <span className="block text-4xl font-serif text-amber-600 mb-2">100%</span>
                            <span className="text-xs uppercase tracking-widest text-gray-500">{dict.about.stat3}</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}