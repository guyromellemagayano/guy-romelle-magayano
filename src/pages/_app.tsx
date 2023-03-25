import Footer from '@/components/layouts/Footer'
import Header from '@/components/layouts/Header'
import usePrevious from '@/hooks/usePrevious'
import '@/styles/tailwind.css'
import { Analytics } from '@vercel/analytics/react'
import 'focus-visible'
import { AppProps } from 'next/app'

const App = ({ Component, pageProps, router }: AppProps): JSX.Element => {
  const previousPathname = usePrevious(router.pathname)

  return (
    <>
      <div className="fixed inset-0 flex justify-center sm:px-8 bg-white dark:bg-zinc-900">
        <div className="flex w-full max-w-7xl lg:px-8">
          <div className="w-full" />
        </div>
      </div>

      <div className="relative">
        <Header />
        <main>
          <Component previousPathname={previousPathname} {...pageProps} />
        </main>
        <Footer />
      </div>

      <Analytics />
    </>
  )
}

export default App
