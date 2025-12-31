import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt' // 1. Bu importu ekleyin

const locales = ['az', 'en', 'ru']
const defaultLocale = 'az'

// 2. Fonksiyonu 'async' yapın (getToken kullanacağımız için)
export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // --- YENİ: ADMIN GÜVENLİK KONTROLÜ ---
  if (pathname.startsWith('/admin')) {
    // Kullanıcının oturum açıp açmadığını kontrol et
    // (Bunun çalışması için .env dosyanızda NEXTAUTH_SECRET tanımlı olmalı)
    const token = await getToken({ req: request })
    const isLoginPage = pathname === '/admin/login'

    // A) Kullanıcı giriş yapmamışsa ve giriş sayfasında değilse -> Login'e at
    if (!token && !isLoginPage) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    // B) Kullanıcı zaten giriş yapmışsa ve Login sayfasındaysa -> Dashboard'a at
    if (token && isLoginPage) {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url))
    }
    
    // Admin rotasındayız ve yetkiliyiz. 
    // Aşağıdaki dil (i18n) kodlarına girmemek için burada işlemi bitiriyoruz.
    return
  }
  // --------------------------------------

  // 3. Eğer gidilen yol api veya statik dosya ise KARIŞMA
  // (Not: 'admin'i buradan kaldırdık çünkü yukarıda özel olarak ele aldık)
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/images') ||
    pathname === '/favicon.ico'
  ) {
    return
  }

  // 4. URL'de dil kodu var mı? (az, en, ru)
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  // 5. Dil kodu yoksa, varsayılan dili ekle ve yönlendir
  if (pathnameIsMissingLocale) {
    const locale = defaultLocale
    return NextResponse.redirect(
      new URL(`/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`, request.url)
    )
  }
}

export const config = {
  // Matcher: Middleware'in hangi yollarda çalışacağını belirler.
  // ÖNEMLİ: 'admin' kelimesini buradaki hariç tutulanlar listesinden SİLDİK.
  // Artık middleware admin sayfalarında da devreye girecek.
  matcher: [
    '/((?!api|_next/static|_next/image|images|favicon.ico).*)',
  ],
}