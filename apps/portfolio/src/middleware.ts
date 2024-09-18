import createMiddleware from 'next-intl/middleware'

import { routing } from '@portfolio/i18n/routing'

export default createMiddleware(routing, {
  localeDetection: false
})

export const config = {
  matcher: ['/', '/(en-US|fil)/:path*', '/((?!_next|_vercel|.*\\..*).*)']
}
