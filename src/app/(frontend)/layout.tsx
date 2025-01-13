import type { Metadata } from 'next'
import localFont from 'next/font/local'
import Header from './components/Header/Header'
import './globals.css'

export const metadata: Metadata = {
  title: 'Himati',
  description: 'Official publication of UP Mindanao',
}

const acronym = localFont({
  src: [
    {
      path: './assets/fonts/Acronym/ACRONYM BOLD.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: './assets/fonts/Acronym/ACRONYM REGULAR.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--acronym',
})

const guardian = localFont({
  src: [
    {
      path: './assets/fonts/Guardian Egyptian/GUARDIANTEXTEGYPT-MEDIUM.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './assets/fonts/Guardian Egyptian/GUARDIANTEXTEGYPT-REGULAR.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './assets/fonts/Guardian Egyptian/GuardEgyptianDisp-Light.woff2',
      weight: '300',
      style: 'normal',
    }
  ],
  variable: '--guardian',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${acronym.variable} ${guardian.variable} font-guardian`}>
        <Header />
        {children}
      </body>
    </html>
  )
}
