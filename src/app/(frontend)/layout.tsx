import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Himati',
  description: 'Official publication of UP Mindanao',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
