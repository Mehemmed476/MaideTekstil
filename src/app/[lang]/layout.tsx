// src/app/[lang]/layout.tsx
import React from 'react';
import Navbar from '../../components/Navbar';
import { getDictionary } from '../../utils/get-dictionary';
import Footer from '@/components/Footer';

// DİKKAT: Yeni eklenen kısım (CSS'te tanımladığımız .bg-noise sınıfı)
// Sayfanın en üstüne bir <div className="bg-noise" /> ekliyoruz.

type LayoutProps = {
    children: React.ReactNode;
    params: Promise<{ lang: 'az' | 'en' | 'ru' }>;
};

export default async function LangLayout({ children, params }: LayoutProps) {
    const resolvedParams = await params;
    const lang = resolvedParams.lang;
    const dict = await getDictionary(lang);

    return (
        <div className="flex min-h-screen flex-col relative">
            {/* TEXTURE KATMANI */}
            <div className="bg-noise" />

            <Navbar lang={lang} dict={dict} />
            <main className="flex-grow pt-24"> {/* Navbar fixed olduğu için padding verdik */}
                {children}
            </main>
            <Footer dict={dict} lang={lang} />
        </div>
    );
}