// src/app/[lang]/page.tsx
import { getDictionary } from '../../utils/get-dictionary'
import Image from 'next/image'

type Props = {
  params: Promise<{ lang: 'az' | 'en' | 'ru' }>
}

export default async function Home({ params }: Props) {
  const { lang } = await params
  const dict = await getDictionary(lang)

  return (
    // Mobilde padding'i azalttık (min-h-screen), Masaüstünde artırdık
    <div className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20 pb-10 md:pt-0 md:pb-0">

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Mobilde sıralamayı değiştirdik: Önce Yazı, Sonra Resim (flex-col-reverse de yapılabilir ama standart akış iyidir) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* SOL TARA - Tipografi */}
          <div className="lg:col-span-7 space-y-6 md:space-y-8 animate-fade-in-up text-center lg:text-left order-2 lg:order-1">
            <span className="inline-block py-1 px-3 border border-gray-300 dark:border-gray-700 rounded-full text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-gray-500">
              {dict.home.est}
            </span>

            {/* Mobilde text-5xl, Masaüstünde text-8xl */}
            <h1 className="text-5xl md:text-8xl font-serif font-medium leading-[0.95] tracking-tight text-gray-900 dark:text-white">
              {dict.home.hero_line1} <br />
              <span className="italic text-gray-400 font-light">{dict.home.hero_span}</span> {dict.home.hero_line2}
            </h1>

            <p className="text-base md:text-xl text-gray-600 dark:text-gray-400 max-w-md mx-auto lg:mx-0 font-light leading-relaxed delay-100 animate-fade-in-up opacity-0 fill-mode-forwards">
              {dict.home.description}
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-6 delay-200 animate-fade-in-up opacity-0 fill-mode-forwards">
              <button className="w-full sm:w-auto bg-black dark:bg-white text-white dark:text-black px-8 py-4 rounded-full text-sm font-bold tracking-widest hover:scale-105 transition-transform duration-300 shadow-lg">
                {dict.home.cta_collection}
              </button>
              <button className="text-sm font-bold tracking-widest border-b border-black dark:border-white pb-1 hover:text-amber-600 hover:border-amber-600 transition-colors">
                {dict.home.cta_contact}
              </button>
            </div>
          </div>

          {/* SAĞ TARA - Görsel */}
          <div className="lg:col-span-5 relative delay-300 animate-fade-in-up opacity-0 fill-mode-forwards order-1 lg:order-2">
            {/* Arkaplan efekti */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-72 md:h-72 bg-amber-200 dark:bg-amber-900/30 rounded-full blur-3xl opacity-60" />

            {/* Resim Kutusu: Mobilde yükseklik ayarı (h-[400px]) ekledik */}
            <div className="relative w-full h-[400px] md:aspect-[3/4] md:h-auto rounded-2xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700 ease-out mx-auto max-w-sm lg:max-w-full">

              <Image
                src="/images/hero2.png" // DÜZELTME: hero2.png (senin dosya adın)
                alt="MaidəTekstil Luxury Fabric"
                fill
                priority
                className="object-cover scale-105 hover:scale-100 transition-transform duration-1000"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

              <div className="absolute bottom-5 left-5 text-white text-left">
                <p className="font-serif text-xl md:text-2xl italic">{dict.home.img_caption_title}</p>
                <p className="text-[10px] uppercase tracking-widest opacity-90">{dict.home.img_caption_sub}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}