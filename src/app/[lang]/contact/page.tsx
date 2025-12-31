// src/app/[lang]/contact/page.tsx
import { getDictionary } from '../../../utils/get-dictionary'

type Props = {
    params: Promise<{ lang: 'az' | 'en' | 'ru' }>
}

export default async function ContactPage({ params }: Props) {
    const { lang } = await params
    const dict = await getDictionary(lang)

    return (
        <div className="container mx-auto px-6 lg:px-12 py-24 min-h-screen">

            <div className="text-center mb-16 animate-fade-in-up">
                <h1 className="text-5xl md:text-6xl font-serif mb-4">{dict.contact.title}</h1>
                <p className="text-gray-500 font-light">{dict.contact.subtitle}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

                {/* SOL: Bilgiler ve Harita */}
                <div className="space-y-12 animate-fade-in-up delay-100">
                    <div>
                        <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400 mb-6">
                            {dict.contact.info_title}
                        </h3>
                        <div className="space-y-6 text-lg font-light">
                            <p className="flex items-center space-x-4">
                                <span className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-amber-600">📍</span>
                                <span>{dict.footer.address}</span>
                            </p>
                            <p className="flex items-center space-x-4">
                                <span className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-amber-600">📞</span>
                                <span>+994 50 000 00 00</span>
                            </p>
                            <p className="flex items-center space-x-4">
                                <span className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-amber-600">✉️</span>
                                <span>info@maidetekstil.com</span>
                            </p>
                        </div>
                    </div>

                    {/* Google Maps (Bakü Merkez - Örnek) */}
                    <div className="w-full h-64 rounded-2xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-500">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3039.428674853609!2d49.8517592765377!3d40.37719097144594!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307d079efb5163%3A0xc20aa51a5f0f5e01!2zQmFrxLEsIEF6yZlyYmF5Y2Fu!5e0!3m2!1str!2str!4v1709210000000!5m2!1str!2str"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>

                {/* SAĞ: Form */}
                <div className="bg-gray-50 dark:bg-gray-900 p-8 md:p-12 rounded-3xl animate-fade-in-up delay-200">
                    <form className="space-y-8">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-500">{dict.contact.form_name}</label>
                            <input type="text" className="w-full bg-transparent border-b border-gray-300 dark:border-gray-700 py-2 focus:outline-none focus:border-amber-600 transition-colors" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-500">{dict.contact.form_email}</label>
                            <input type="email" className="w-full bg-transparent border-b border-gray-300 dark:border-gray-700 py-2 focus:outline-none focus:border-amber-600 transition-colors" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-500">{dict.contact.form_message}</label>
                            <textarea rows={4} className="w-full bg-transparent border-b border-gray-300 dark:border-gray-700 py-2 focus:outline-none focus:border-amber-600 transition-colors resize-none"></textarea>
                        </div>

                        <button type="button" className="w-full bg-black dark:bg-white text-white dark:text-black py-4 rounded-full font-bold tracking-widest hover:bg-amber-600 dark:hover:bg-amber-600 hover:text-white dark:hover:text-white transition-all duration-300">
                            {dict.contact.btn_send}
                        </button>
                    </form>
                </div>

            </div>
        </div>
    )
}