import '../public/static/css/prism.css'
import 'remixicon/fonts/remixicon.css'

import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import plausible from 'plausible-tracker'
import Router from 'next/router'
import * as gtag from '../lib/gtag'
import CommandBar from '../components/CommandBar'
import { useRouter } from 'next/router'
import { useEffect, ComponentType, ReactElement } from 'react'
import { theme } from '../styles/theme'
import { GlobalStyles } from '../styles/GlobalStyles'

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

export default function MyApp({ Component, pageProps }: MyAppProps) {
  const Layout = Component.Layout || Noop
  const router = useRouter()

  useEffect(() => {
    trackPageview()

    router.events.on('routeChangeComplete', () => {
      trackPageview()
    })
  }, [router.events])

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <CommandBar>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </CommandBar>
    </ThemeProvider>
  )
}
