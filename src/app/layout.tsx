import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./page.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Solace Candidate Assignment",
  description: "Show us what you got",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Mollie+Glaston&display=swap" rel="stylesheet"/>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
        <link href="https://fonts.googleapis.com/css2?family=Lato:wght@200;300;400;500;600;700;900&family=Montserrat:wght@400;500;600;700;800;900&display=swap" rel="stylesheet"/>

      </head>
      <body className={`${inter.className} root`}>{children}</body>
    </html>
  );
}

