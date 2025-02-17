import React from 'react'
import './styles.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Footer } from '@/components/blocks/footer'
import { Navbar } from '@/components/blocks/navbar'

export const metadata = {
  description: 'Panagiotis Pitsikoulis - Portfolio',
  title: 'Specializing in web design and development',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <main className="px-4 md:px-[3svw]">
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
          >
            <Navbar />
            {children}
            <Footer />
          </ThemeProvider>
        </main>
      </body>
    </html>
  )
}
