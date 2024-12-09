import "./ui/globals.scss"
import "./tailwind.css"
import Providers from "./providers"
import { Quicksand } from 'next/font/google'
import { Metadata } from 'next'
import ActiveSectionWrapper from "./components/ActiveSectionObserver"

const quicksand = Quicksand({ subsets: ['latin'], display: 'swap' })

export const metadata: Metadata = {
  title: 'Your Portfolio',
  description: 'A showcase of my work and skills',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${quicksand.className} antialiased`}>
        <Providers>
          <ActiveSectionWrapper>
            {children}
          </ActiveSectionWrapper>
        </Providers>
      </body>
    </html>
  )
}