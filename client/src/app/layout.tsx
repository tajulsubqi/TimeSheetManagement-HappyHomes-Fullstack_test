import type { Metadata } from "next"
import { Nunito } from "next/font/google"
import Provider from "./Provider"
import "./globals.css"

const font = Nunito({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}
