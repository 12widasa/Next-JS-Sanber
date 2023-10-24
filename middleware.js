import { NextResponse } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const { pathname } = request.nextUrl
  // tanda operator !! (2 tanda seru) maka semnua data akan dikembalikan menjadi boleean (true false)
  const isCookiesExist = request.cookies.get("user_token")
  const isLoginPage = pathname.startsWith(`/login`)

  console.log("pathname: ", isCookiesExist)

  // jika cookies ada dan user masih di halaman login => akan redirect ke "/"

  if (isCookiesExist === false && isLoginPage) {
    return NextResponse.redirect(new URL(`/login`, request.url))
  }

  // jika cookies tidak ada dan user tidak di halaman login => akan redirect ke "/login
  if (isCookiesExist && isLoginPage) {
    return NextResponse.redirect(new URL('/', request.url))
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
}

// belum sempurna, seharusnya ketika di refersh langsung kembali otomatis ke /login