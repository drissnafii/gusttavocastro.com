import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import { GA_TRACKING_ID } from '../lib/gtag'

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    const lang = (this.props as any).__NEXT_DATA__?.props?.pageProps?.post?.lang

    return (
      <Html lang={lang ? lang : 'en-US'}>
        <Head>
          <meta charSet="utf-8" />
          <meta content="Driss Nafii" name="author" />
          <meta property="og:type" content="website" />
          <meta content="summary_large_image" name="twitter:card" />
          <meta name="theme-color" content="#08070b" />

          <link rel="icon" href="/favicon.svg" sizes="any" type="image/svg+xml" />

          {/* Preload critical fonts */}
          <link
            rel="preload"
            href="/static/font/Biotif-Regular.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/static/font/Biotif-Bold.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/static/font/FiraCode-Regular.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />

          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}');
          `,
            }}
          />
          <script
            defer
            data-domain="drissnafii.me"
            src="https://plausible.io/js/script.hash.pageview-props.js"
          ></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
