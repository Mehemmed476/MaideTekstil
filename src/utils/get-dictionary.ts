// src/utils/get-dictionary.ts
import 'server-only'

// Tip tanımlaması ekleyelim ki TypeScript rahatlasın
type Locale = 'az' | 'en' | 'ru'

const dictionaries = {
  az: () => import('../dictionaries/az.json').then((module) => module.default),
  en: () => import('../dictionaries/en.json').then((module) => module.default),
  ru: () => import('../dictionaries/ru.json').then((module) => module.default),
}

export const getDictionary = async (locale: Locale) => {
  // Eğer listede olmayan bir dil gelirse varsayılan olarak 'az' verelim (Güvenlik önlemi)
  const dictionaryLoader = dictionaries[locale] || dictionaries['az']
  return dictionaryLoader()
}