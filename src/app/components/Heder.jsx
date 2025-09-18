
import Head from 'next/head';

// Пример: динамические SEO-данные
export default async function Page() {
  // Можно получить данные из API или базы
  const metadata = {
    title: "IT Fullstack Web – Web & App Development",
    description: "Full-stack web development: React, Next.js, Node.js, databases, and SEO optimization.",
    url: "https://portfolio45445.netlify.app/",
    image: "https://portfolio45445.netlify.app/favicon.ico", // 1200x630px
    keywords: "IT, Fullstack, React, Next.js, Node.js, SEO"
  };

  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />

        {/* Open Graph */}
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={metadata.url} />
        <meta property="og:image" content={metadata.image} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:image" content={metadata.image} />

        {/* Canonical URL */}
        <link rel="canonical" href={metadata.url} />

        {/* JSON-LD для структурированных данных */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
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
            })
          }}
        />
      </Head>

      <main>
        <h1>Welcome to IT Fullstack Web</h1>
        <p>Explore our projects, web & app development services, and more.</p>
      </main>
    </>
  );
}

"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import Factions from './Factions';
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ImageWithSkeleton from './Nrgrg'


export default function FullStackPortfolio() {
  const [products, setProducts] = useState([]);
  const [reactions, setReactions] = useState({}); 
  const [deviceId, setDeviceId] = useState(null);
  const [vid, setVid] = useState(true);
  const controls = useAnimation();

  
  useEffect(() => {
    if (typeof window === "undefined") return;
    let id = localStorage.getItem("deviceId");
    if (!id) {
      
      id = (crypto && crypto.randomUUID) ? crypto.randomUUID() : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
      localStorage.setItem("deviceId", id);
    }
    setDeviceId(id);
  }, []);

  useEffect(() => {
    if (!deviceId) return;
    fetchProducts();

  }, [deviceId]);
  



  

  const fetchProducts = async () => {
    try {
      const res = await fetch("https://iefhie.onrender.com/portfol/porf");
      if (!res.ok) throw new Error("Ошибка загрузки данных портфеля");
      const data = await res.json();
      setProducts(data);

      
      const initial = {};
      data.forEach(p => {
        initial[p._id] = { likeCount: 0, dizlace: 0, liked: false, disliked: false,  views: 0 };
      });
      setReactions(initial);

        data.forEach(p => {
        fetchReactions(p._id);
       
      });

    
    } catch (err) {
      console.error("fetchProducts:", err);
    }
  };



  
const fetchReactions = async (productId) => {
  try {
    if (!productId) return;

    const res = await fetch(`https://iefhie.onrender.com/likos/lice/${productId}`);
    if (!res.ok) throw new Error("Ошибка загрузки реакций");
    const arr = await res.json();

    let likeCount = 0, dizlace = 0, views = 0;
    let liked = false, disliked = false;
    let hasViewed = false;

    arr.forEach(doc => {
      likeCount += Number(doc.likeCount || 0);
      dizlace += Number(doc.dizlace || 0);
      views += Number(doc.views || 0);

      if (doc.deviceId === deviceId) {
        liked = Number(doc.likeCount || 0) > 0;
        disliked = Number(doc.dizlace || 0) > 0;
        hasViewed = Number(doc.views || 0) > 0; // уже был просмотр
      }
    });

    // 👉 при первом заходе засчитываем просмотр
    if (!hasViewed) {
      await sendDeviceReaction({ productId, views: 1 });
      views += 1;
    }

    setReactions(prev => ({
      ...prev,
      [productId]: { likeCount, dizlace, views, liked, disliked }
    }));

  } catch (err) {
    console.error("fetchReactions:", err);
  }
};

const sendDeviceReaction = async ({ productId, deviceLike = 0, deviceDislike = 0, views = 0 }) => {
  try {
    await fetch("https://iefhie.onrender.com/likos/reaction", { 
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ deviceId, productId, likeCount: deviceLike, dizlace: deviceDislike, views })
    });
  } catch (err) {
    console.error("sendDeviceReaction:", err);
  }
};


  
  const handleLike = async (productId) => {
    const cur = reactions[productId] || { likeCount: 0, dizlace: 0, liked: false, disliked: false,   };

    
    let likeDelta = 0, dizDelta = 0;
    const newLiked = !cur.liked;
    let newDisliked = cur.disliked;
    if (newLiked) {
      likeDelta = 1;
      if (cur.disliked) {
        dizDelta = -1;
        newDisliked = false;
      }
    } else {
      likeDelta = -1;
    }

    
    setReactions(prev => {
      const agg = prev[productId] || { likeCount: 0, dizlace: 0, liked: false, disliked: false,   };
      return {
        ...prev,
        [productId]: {
          ...agg,
          likeCount: agg.likeCount + likeDelta,
          dizlace: agg.dizlace + dizDelta,
          liked: newLiked,
          disliked: newDisliked
        }
      };
    });

    
    const deviceLike = newLiked ? 1 : 0;
    const deviceDislike = newDisliked ? 1 : 0;
    await sendDeviceReaction({ productId, deviceLike, deviceDislike,  });

    
    await fetchReactions(productId);
  };

  
  const handleDislike = async (productId) => {
    const cur = reactions[productId] || { likeCount: 0, dizlace: 0, liked: false, disliked: false, };

    let dizDelta = 0, likeDelta = 0;
    const newDisliked = !cur.disliked;
    let newLiked = cur.liked;
    if (newDisliked) {
      dizDelta = 1;
      if (cur.liked) {
        likeDelta = -1;
        newLiked = false;
      }
    } else {
      dizDelta = -1;
    }

    setReactions(prev => {
      const agg = prev[productId] || { likeCount: 0, dizlace: 0, liked: false, disliked: false,  };
      return {
        ...prev,
        [productId]: {
          ...agg,
          likeCount: agg.likeCount + likeDelta,
          dizlace: agg.dizlace + dizDelta,
          liked: newLiked,
          disliked: newDisliked
        }
      };
    });

    const deviceLike = newLiked ? 1 : 0;
    const deviceDislike = newDisliked ? 1 : 0;
    await sendDeviceReaction({ productId, deviceLike, deviceDislike,  });
    await fetchReactions(productId);
  };

  
  const TextWithSkeleton = ({ isLoading, children, width }) => {
  return isLoading ? <Skeleton width={width} /> : children;
};


    const extraImages = [
    '/img/Без названия (1).png',
    '/img/nextjs-icon-dark-background (1).png',
    '/img/nodejs-inner-removebg-preview (1).png',
    '/img/images (1).png',
    '/img/images (2) (1).png',
    '/img/pythonlogo (1).png',
    '/img/images (4) (1).png'
  ];

 const xOffsets = [-100, 100, -120, 500, 480];
  const yOffsets = [-100, -160, 100, 40, -60, 100, -150];


  
  useEffect(() => {
    const gradients = [
      "linear-gradient(120deg, #f59e0b, #3b82f6)",
      "linear-gradient(120deg, #9333ea, #10b981)",
      "linear-gradient(120deg, #f43f5e, #fbbf24)",
      "linear-gradient(120deg, #3b82f6, #f59e0b)"
    ];

    let i = 0;
    const animateGradient = () => {
      controls.start({
        background: gradients[i],
        transition: { duration: 3, ease: "linear" }
      }).then(() => {
        i = (i + 1) % gradients.length;
        animateGradient();
      });
    };

    animateGradient();
  }, [controls]);

  const skills = [ "HTML", "CSS", "JavaScript", "React", "Node.js", "Next.js", "TailwindCSS", "MongoDB", "Telegram Web App", "Python", "GitHub", "Figma" ];

  return (
    
    <motion.div className="  min-h-screen flex flex-col items-center justify-center text-center text-white p-6 overflow-hidden relative" animate={controls}>

  <motion.a
      href="https://t.me/Rocetk66"
      className="relative flex items-center w-full max-w-md  rounded-2xl shadow-lg p-4 overflow-visible cursor-pointer"
      whileHover="hover"
      initial={{ opacity: 0, y: -300 }} 
  animate={{ opacity: 1, y: 0 }}   
  transition={{ duration: 1, ease: "easeOut" }} 
  

      
    >
    
      <div className="relative w-20 h-20 flex-shrink-0 z-10">
        <Image
          src="/img/efef.jpg"
          width={80}
          height={80}
          alt="User Avatar"
          className="rounded-full object-cover w-full h-full"
        />
        <motion.span
          className="absolute bottom-0 right-0 w-5 h-5 bg-emerald-500 border-2 border-white rounded-full shadow-md"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [1, 1, 1],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
        />
      </div>

    
      <div className="ml-4 flex flex-col text-left z-10 drop-shadow-lg ">
        <h1 className="font-bold text-[clamp(6px,6vw,25px)] drop-shadow-lg">IT Fullstack Web</h1>
        <p className="text-sm  text-[clamp(6px,6vw,25px)] mt-1 drop-shadow-lg">💻 Разработчик Сайтов</p>
      </div>

{extraImages.map((src, index) => (
  <motion.div
    key={index}
    className="absolute w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-lg"
    initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
    variants={{
      hover: {
        x: xOffsets[index],
        y: yOffsets[index],
        scale: 1,
        opacity: 1,
      },
    }}
    transition={{ duration: 0.5, delay: 0.1 * index, ease: "easeOut" }}
  >
    <Image
      src={src}
      width={48}
      height={48}
      alt={`Extra ${index}`}
      className="object-cover w-full h-full"
    />
  </motion.div>
))}
    </motion.a>

      
      
      <motion.div initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-12">
        <h1 className="text-[clamp(33px,9vw,70px)] font-extrabold mb-4 mt-[60px] drop-shadow-lg leading-tight">Hi I'm a Full-Stack Developer + SEO</h1>
        <p className="text-xl md:text-2xl max-w-3xl mx-auto drop-shadow-md">I create modern, dynamic websites using the latest technologies.</p>
      </motion.div>

      <motion.div className="flex flex-wrap justify-center gap-3 mb-16" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }}>
        {skills.map((skill, i) => (
          <motion.span key={i} whileHover={{ scale: 1.1, backgroundColor: "#ffffff30" }} className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm md:text-base font-semibold transition-all cursor-default shadow-md">
            {skill}
          </motion.span>
        ))}
      </motion.div>

      <Factions setvid={setVid} />

      {!vid && (
        <motion.div className="w-[100%] flex justify-center" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="flex flex-wrap justify-center gap-8 max-w-[100%]">
            {products.map((product, index) => {
              const g = ["linear-gradient(120deg, #f59e0b, #3b82f6)",
                         "linear-gradient(120deg, #9333ea, #10b981)",
                         "linear-gradient(120deg, #f43f5e, #fbbf24)",
                         "linear-gradient(120deg, #3b82f6, #f59e0b)"];
              const r = reactions[product._id] || { likeCount: 0, dizlace: 0, liked: false, disliked: false, coment: "", views: 0 };

              return (
                <motion.div
  key={product._id}
  style={{ background: g[index % g.length] }}
  className="
    rounded-3xl shadow-2xl
    transition-transform duration-300
    hover:scale-105 hover:shadow-3xl
    cursor-pointer flex flex-col 
    sm:w-[370px] md:w-[340px] lg:w-[380px] xl:w-[380px] 2xl:w-[420px] w-[350px]
    min-h-[480px] sm:min-h-[500px] md:min-h-[520px] lg:min-h-[540px] 
    p-4
    backdrop-blur-md
  "
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: index * 0.12 }}
>

  
  <section id='portfol'>
     <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-center text-white drop-shadow-lg">
       <TextWithSkeleton isLoading={!product?.name} height={30} width="70%" className="mb-4" >
        {product.name}
       </TextWithSkeleton>
  </h3>
  </section>
 

 <div className="w-full h-44 sm:h-52 md:h-56 lg:h-60 mb-4 overflow-hidden rounded-2xl border border-white/30 shadow-xl relative">


    <ImageWithSkeleton
    src={`https://iefhie.onrender.com/portfol${product.img}`}
    alt={product.name || "Preview"}
    width={400}
    height={300}
    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
  />
    


 <div >
   <div className="absolute top-2 left-2 px-3 py-1 text-xs sm:text-sm bg-black/70 text-white rounded-full shadow-md">
     <TextWithSkeleton isLoading={!product?.teg} height='100%' width="70%" className="mb-4" >
       🚀 {product.teg}
       </TextWithSkeleton>
  
  </div>

 </div>
</div>


<div className="flex flex-col gap-3 mb-4 flex-grow justify-center">
  {product.orig && (
    <a href={product.orig} target="_blank" rel="noreferrer">
      <button className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-blue-400 to-indigo-500 text-white font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
        ⚡ Ready Layout
      </button>
    </a>
  )}
  {product.figma && (
    <a href={product.figma} target="_blank" rel="noreferrer">
      <button className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-pink-400 to-purple-500 text-white font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
        🎨 Design Layout
      </button>
    </a>
  )}
</div>


<div className="space-y-4 mb-6 p-4 sm:p-6 bg-black/5 rounded-2xl shadow-lg text-left text-[clamp(14px,2vw,18px)]">
  
  {/* Complexity */}
  
  <div className="flex flex-wrap items-center gap-2">
    <span className="text-[clamp(16px,4vw,20px)]">⚙️</span>
    <span className="font-semibold text-[clamp(22px,9vw,20px)]">Complexity:</span>
    <div className="flex-1 min-w-[80px]">
        <TextWithSkeleton isLoading={!product?.opis} height='100%' width="70%" className="mb-4" >
        {product.opis}
       </TextWithSkeleton>
    </div>
  </div>

  {/* Adaptation */}
  <div className="flex flex-wrap items-center gap-2">
    <span className="text-[clamp(16px,4vw,20px)]">📱</span>
    <span className="font-bold text-[clamp(10px,4vw,20px)]">Adaptation:</span>
    <span className="flex-1 font-black break-words text-[clamp(14px,6vw,20px)]">1920 to 350</span>
  </div>

  {/* SEO */}
  <div className="flex flex-wrap items-center gap-2">
    <span className="text-[clamp(16px,4vw,20px)]">🔎</span>
    <span className="font-semibold text-[clamp(20px,8vw,20px)]">SEO:</span>
    <span className="flex-1 break-words text-[clamp(15px,6vw,20px)]">     
      <TextWithSkeleton isLoading={!product?.seo} height='100%' width="70%" className="mb-4" >
      {product.seo}
       </TextWithSkeleton>
      </span>
  </div>

  {/* Производительность */}
  <div className="flex flex-wrap items-center gap-2">
    <span className="text-[clamp(16px,4vw,20px)]">⚡</span>
    <span className="font-semibold text-[clamp(14px,5vw,20px)]">Performance:</span>
    <div className="flex-1  font-black">
     <h1 className="text-[clamp(15px,6vw,20px)]" >
          <TextWithSkeleton isLoading={!product?.proizvol} height='100%' width="70%" className="mb-4" >
      {product.proizvol}
       </TextWithSkeleton>
 </h1>
    </div>
  </div>

  {/* Технологии */}
  <div className="flex flex-wrap items-center gap-2">
    <span className="text-[clamp(16px,4vw,20px)]">🛠️</span>
    <span className="font-bold text-[clamp(20px,8vw,20px)]">Technologies:</span>
    <span className="flex-1 text-[clamp(15px,6vw,20px)] font-black break-words">
                <TextWithSkeleton isLoading={!product?.sozdan} height='100%' width="70%" className="mb-4" >
      {product.sozdan}
       </TextWithSkeleton></span>
  </div>

</div>



<div className="flex justify-center gap-6 p-4">
 
  <motion.button
    onClick={() => handleLike(product._id)}
    className={`
      flex items-center justify-center gap-2
      px-5 py-3 rounded-2xl shadow-lg
      text-white font-bold text-base
      transition-all duration-300 transform
      hover:scale-110 active:scale-95
      ${r.liked
        ? "bg-gradient-to-tr from-green-400 to-green-600 shadow-2xl scale-110"
        : "bg-green-400 hover:bg-green-500"}
    `}
    animate={{ scale: r.liked ? 1.2 : 1 }}
  >
    👍 {r.likeCount || 0}
  </motion.button>

  
  <motion.button
    onClick={() => handleDislike(product._id)}
    className={`
      flex items-center justify-center gap-2
      px-5 py-3 rounded-2xl shadow-lg
      text-white font-bold text-base
      transition-all duration-300 transform
      hover:scale-110 active:scale-95
      ${r.disliked
        ? "bg-gradient-to-tr from-red-400 to-red-600 shadow-2xl scale-110"
        : "bg-red-400 hover:bg-red-500"}
    `}
    animate={{ scale: r.disliked ? 1.2 : 1 }}
  >
    👎 
  </motion.button>
</div>




</motion.div>

              );
            })}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
