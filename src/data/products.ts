// src/data/products.ts

export type Product = {
  id: number;
  category: string;
  price: number;
  image: string;
  // YENİ EKLENEN TEKNİK ÖZELLİKLER
  specs: {
    composition: string; // İçerik (%100 İpek vs)
    width: string;       // En (140cm)
    weight: string;      // Gramaj (200gr/m2)
  };
  title: {
    az: string;
    en: string;
    ru: string;
  };
  description: {
    az: string;
    en: string;
    ru: string;
  };
};

export const products: Product[] = [
  {
    id: 1,
    category: "silk",
    price: 120,
    image: "https://images.unsplash.com/photo-1616406432452-07bc59265dc1?auto=format&fit=crop&q=80&w=800",
    specs: {
      composition: "100% Silk / İpək",
      width: "140 cm",
      weight: "180 g/m²"
    },
    title: {
      az: "Kraliyet İpəyi",
      en: "Royal Silk Satin",
      ru: "Королевский Шелк",
    },
    description: {
      az: "Yüksək keyfiyyətli, yumşaq toxunuşlu təbii ipək. Axşam geyimləri üçün idealdır.",
      en: "High quality, soft touch natural silk. Ideal for evening wear.",
      ru: "Высококачественный, мягкий на ощупь натуральный шелк. Идеально подходит для вечерних нарядов.",
    },
  },
  {
    id: 2,
    category: "cotton",
    price: 45,
    image: "https://images.unsplash.com/photo-1596240224855-465495c074f7?auto=format&fit=crop&q=80&w=800",
    specs: {
      composition: "100% Cotton / Pambıq",
      width: "150 cm",
      weight: "140 g/m²"
    },
    title: {
      az: "Misir Pambığı",
      en: "Egyptian Cotton",
      ru: "Египетский Хлопок",
    },
    description: {
      az: "Nəfəs alan quruluş, yay ayları üçün sərin tutan özəl toxuma.",
      en: "Breathable structure, special weave that keeps cool for summer months.",
      ru: "Дышащая структура, специальное плетение, сохраняющее прохладу в летние месяцы.",
    },
  },
  // Diğer ürünlere de "specs" kısmını aynen kopyalayabilirsin, hata vermesin diye hepsine ekle
  {
    id: 3,
    category: "velvet",
    price: 85,
    image: "https://images.unsplash.com/photo-1617101735706-e77840134b2d?auto=format&fit=crop&q=80&w=800",
    specs: { composition: "100% Polyester", width: "140 cm", weight: "300 g/m²" },
    title: { az: "Lüks Məxmər", en: "Luxury Velvet", ru: "Роскошный Бархат" },
    description: { az: "Mebellər üçün.", en: "For furniture.", ru: "Для мебели." }
  },
  {
    id: 4,
    category: "silk",
    price: 150,
    image: "https://images.unsplash.com/photo-1579361715423-3b1a2e7c9f8d?auto=format&fit=crop&q=80&w=800",
    specs: { composition: "100% Silk", width: "140 cm", weight: "120 g/m²" },
    title: { az: "Qızıl İpək", en: "Golden Silk", ru: "Золотой Шелк" },
    description: { az: "Özəl günlər üçün.", en: "Special days.", ru: "Особые случаи." }
  },
  {
    id: 5,
    category: "linen",
    price: 60,
    image: "https://images.unsplash.com/photo-1594911772125-07fc7a2d8d1f?auto=format&fit=crop&q=80&w=800",
    specs: { composition: "100% Linen", width: "150 cm", weight: "200 g/m²" },
    title: { az: "Təbii Kətan", en: "Organic Linen", ru: "Органический Лен" },
    description: { az: "Təbiiliyi sevənlər üçün.", en: "Nature lovers.", ru: "Любители природы." }
  },
];