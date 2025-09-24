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
т
export const metadata = {
  title: "IT Fullstack Web – Web & App Development",
  description:
    "Full-stack web development: React, Next.js, Node.js, databases, and SEO optimization.",
  metadataBase: new URL("https://portfolio45445.netlify.app"),
  openGraph: {
    type: "website",
    url: "https://portfolio45445.netlify.app/",
    title: "IT Fullstack Web – Web & App Development",
    description:
      "Full-stack web development: React, Next.js, Node.js, databases, and SEO optimization.",
    images: [
      "https://opengraph.b-cdn.net/production/images/c5980f0b-f9c4-4372-b1fd-7429fe35be80.jpg?token=WoFDOxn2IEpUTljHv8h9x-TYvUYEKhMtKIHsX5sH4Og&height=640&width=640&expires=33294744186",
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IT Fullstack Web – Web & App Development",
    description:
      "Full-stack web development: React, Next.js, Node.js, databases, and SEO optimization.",
    images: [
      "https://opengraph.b-cdn.net/production/images/c5980f0b-f9c4-4372-b1fd-7429fe35be80.jpg?token=WoFDOxn2IEpUTljHv8h9x-TYvUYEKhMtKIHsX5sH4Og&height=640&width=640&expires=33294744186",
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
