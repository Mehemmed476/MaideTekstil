// src/components/ImageUpload.tsx
"use client"

import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';

interface ImageUploadProps {
    value: string;
    onChange: (src: string) => void;
}

export default function ImageUpload({ value, onChange }: ImageUploadProps) {
    return (
        <div className="space-y-4 w-full">

            <CldUploadWidget
                uploadPreset="uf7leify" // Preset adını yoxla!
                options={{
                    cloudName: 'drc6iu5np',
                    maxFiles: 1,
                    sources: ['local', 'url', 'camera']
                }}
                onSuccess={(result: any) => {
                    if (result.info && result.info.secure_url) {
                        onChange(result.info.secure_url);
                    }
                }}
            >
                {({ open }) => {
                    return (
                        <div
                            // DƏYİŞİKLİK BURADADIR 👇
                            onClick={(e) => {
                                e.preventDefault(); // <--- BU KOD SƏHİFƏNİN YENİLƏNMƏSİNİN QARŞISINI ALIR
                                open();
                            }}
                            // -----------------------
                            className="relative cursor-pointer hover:opacity-70 transition border-2 border-dashed border-gray-300 flex flex-col items-center justify-center p-10 rounded-xl gap-4 text-gray-500 bg-gray-50 hover:bg-gray-100"
                        >
                            <svg className="w-10 h-10 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="font-semibold text-sm">Şəkil Yükləmək Üçün Toxun</span>
                        </div>
                    );
                }}
            </CldUploadWidget>

            {/* Önizləmə */}
            {value && (
                <div className="relative w-full h-64 rounded-xl overflow-hidden shadow-md border border-gray-200">
                    <Image
                        fill
                        style={{ objectFit: 'cover' }}
                        alt="Upload"
                        src={value}
                    />
                    <button
                        onClick={(e) => {
                            e.preventDefault(); // Silmə düyməsi də formu göndərməsin
                            onChange("");
                        }}
                        className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold hover:bg-red-700 transition shadow-lg z-10"
                        type="button" // <--- Bu da vacibdir
                    >
                        ❌ Sil
                    </button>
                </div>
            )}
        </div>
    );
}