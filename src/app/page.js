import Heder from './components/Heder';

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


export default function Home() {


  

  return (
    <div>
      <Heder />
    </div>
  );
}
