import '../public/static/css/prism.css'
import 'remixicon/fonts/remixicon.css'

import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import plausible from 'plausible-tracker'
import Router from 'next/router'
import * as gtag from '../lib/gtag'
import CommandBar from '../components/CommandBar'
import { useRouter } from 'next/router'
import { useEffect, ComponentType, ReactElement, useState } from 'react'
import { theme } from '../styles/theme'
import { GlobalStyles } from '../styles/GlobalStyles'
import { AnimatePresence, motion } from 'framer-motion'

Router.events.on('routeChangeComplete', url => gtag.pageview(url))

interface NoopProps {
  children: ReactElement
}

const Noop = ({ children }: NoopProps) => children

const { trackPageview } = plausible({
  domain: 'drissnafii.me',
})

type ComponentWithLayout = ComponentType & {
  Layout?: ComponentType<{ children: ReactElement }>
}

interface MyAppProps extends AppProps {
  Component: ComponentWithLayout
}

const MotionDiv = motion.div as any

export default function MyApp({ Component, pageProps }: MyAppProps) {
  const Layout = Component.Layout || Noop
  const router = useRouter()
  const [isRouteChanging, setIsRouteChanging] = useState(false)

  useEffect(() => {
    trackPageview()

    const handleStart = () => setIsRouteChanging(true)
    const handleComplete = () => {
      trackPageview()
      setIsRouteChanging(false)
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleComplete)
    }
  }, [router.events])

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <CommandBar>
        <AnimatePresence exitBeforeEnter initial={false}>
          <MotionDiv
            key={router.pathname}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{
              duration: 0.3,
              ease: 'easeInOut',
            }}
          >
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </MotionDiv>
        </AnimatePresence>
      </CommandBar>
    </ThemeProvider>
  )
}
