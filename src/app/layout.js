import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "IT Fullstack Web – Web & App Development",
  description:
    "Full-stack web development: React, Next.js, Node.js, databases, and SEO optimization.",
  url: "https://portfolio45445.netlify.app/", 
  image: "https://portfolio45445.netlify.app/og-image.png", // картинка 1200x630px
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />

        {/* Open Graph */}
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={metadata.image} />
        <meta property="og:url" content={metadata.url} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:image" content={metadata.image} />

        <link rel="icon" href="/favicon.ico" />

        {/* JSON-LD для структурированных данных */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": metadata.title,
          "url": metadata.url,
          "description": metadata.description,
          "publisher": {
            "@type": "Organization",
            "name": metadata.title,
            "logo": {
              "@type": "ImageObject",
              "url": metadata.image
            }
          }
        })}} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
