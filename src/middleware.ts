import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Desteklenen diller
const locales = ['az', 'en', 'ru']
const defaultLocale = 'az'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // 1. Eğer gidilen yol admin, api veya statik dosya ise KARIŞMA
  if (
    pathname.startsWith('/admin') || // <--- BURASI ÇOK ÖNEMLİ
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/images') || // Resimler için
    pathname === '/favicon.ico'
  ) {
    return
  }

  // 2. URL'de dil kodu var mı? (az, en, ru)
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  // 3. Dil kodu yoksa, varsayılan dili ekle ve yönlendir
  if (pathnameIsMissingLocale) {
    const locale = defaultLocale

    // Mevcut URL'yi alıp başına dili ekle
    return NextResponse.redirect(
      new URL(`/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`, request.url)
    )
  }
}

export const config = {
  // Matcher: Middleware'in hangi yollarda çalışacağını belirler
  // Burada negatif regex (negative lookahead) kullanarak hariç tutuyoruz
  matcher: [
    /*
     * Aşağıdakiler HARİÇ tüm request yollarını eşle:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - images (public folder images)
     * - admin (Admin panel) <--- YENİ EKLENEN
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|images|favicon.ico|admin).*)',
  ],
}