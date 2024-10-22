import '@/styles/globals.css'
import '@/styles/prosemirror.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import { cn } from '@/lib/utils'
import { cal, inter } from '@/styles/fonts'
import { Analytics } from '@vercel/analytics/react'
import { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import { headers } from 'next/headers'
import NextTopLoader from 'nextjs-toploader'
import { Providers } from './providers'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

const title = 'Plantree: The best way to build web3 independent blog.'
const description =
  'Plantree is open-source, modern tool for building web3 independent blog.'

// const image = 'https://vercel.pub/thumbnail.png'

export const metadata: Metadata = {
  title,
  description,

  icons: ['https://plantree.xyz/favicon.ico'],
  openGraph: {
    title,
    description,
    // images: [image],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    // images: [image],
    creator: '@plantree',
  },
  metadataBase: new URL('https://plantree.xyz'),
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const headerList = headers()
  const cookies = headers().get('cookie')
  const url = headerList.get('x-current-path') || ''

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background text-foreground font-sans antialiased',
          cal.variable,
          inter.variable,
          fontSans.variable,
          // url === '/' && 'bg-zinc-100',
        )}
      >
        <NextTopLoader
          color="#000"
          // crawlSpeed={0.08}
          height={2}
          showSpinner={false}
          template='<div class="bar" role="bar"><div class="peg"></div></div>'
        />
        <ThemeProvider
          attribute="class"
          // defaultTheme="system"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Providers cookies={cookies}>
            {children}
            <Analytics />
          </Providers>
        </ThemeProvider>

        {process.env.NEXT_PUBLIC_UMAMIC_WEBSITE_ID && (
          <script
            async
            defer
            src="https://umamic.penx.io/script.js"
            data-website-id={process.env.NEXT_PUBLIC_UMAMIC_WEBSITE_ID}
          ></script>
        )}
      </body>
    </html>
  )
}
