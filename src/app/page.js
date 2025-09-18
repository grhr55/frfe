import Heder from './components/Heder';
import Seo from './Seo';

export default function Home() {
  const metadata = {
    title: "IT Fullstack Web – Web & App Development",
    description:
      "Full-stack web development: React, Next.js, Node.js, databases, and SEO optimization.",
    url: "https://portfolio45445.netlify.app/",
    image: "https://portfolio45445.netlify.app/favicon.ico", 
    keywords: "IT, Fullstack, React, Next.js, Node.js, SEO",
  };

  return (
    <div>
      <Seo {...metadata} />
      <Heder />
    </div>
  );
}
