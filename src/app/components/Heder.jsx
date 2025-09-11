"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import Factions from './Factions';

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
      const res = await fetch("https://fourfeef.onrender.com/portfol/porf");
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
    const res = await fetch(`https://fourfeef.onrender.com/likos/lice/${productId}`);
    if (!res.ok) throw new Error("Ошибка загрузки реакций");
    const arr = await res.json();
  

    let likeCount = 0, dizlace = 0, views = 0;
    let liked = false, disliked = false;

    arr.forEach(doc => {
      likeCount += Number(doc.likeCount || 0);
      dizlace += Number(doc.dizlace || 0);
      views += Number(doc.views || 0);

      if (doc.deviceId === deviceId) {
        liked = Number(doc.likeCount || 0) > 0;
        disliked = Number(doc.dizlace || 0) > 0;
      }
    });

    setReactions(prev => ({
      ...prev,
      [productId]: { likeCount, dizlace, views, liked, disliked }
    }));

  } catch (err) {
    console.error("fetchReactions:", err);
  }
};

 
  const sendDeviceReaction = async ({ productId, deviceLike, deviceDislike,  views = 0 }) => {
    try {
      await fetch("https://fourfeef.onrender.com/likos/reaction", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deviceId, productId, likeCount: deviceLike, dizlace: deviceDislike,  views })
      });
    } catch (err) {
      console.error("sendDeviceReaction:", err);
    }
  };

  
  const handleLike = async (productId) => {
    const cur = reactions[productId] || { likeCount: 0, dizlace: 0, liked: false, disliked: false,  views: 0 };

    
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
      const agg = prev[productId] || { likeCount: 0, dizlace: 0, liked: false, disliked: false,  views: 0 };
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
    await sendDeviceReaction({ productId, deviceLike, deviceDislike,  views: cur.views });

    
    await fetchReactions(productId);
  };

  
  const handleDislike = async (productId) => {
    const cur = reactions[productId] || { likeCount: 0, dizlace: 0, liked: false, disliked: false,  views: 0 };

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
      const agg = prev[productId] || { likeCount: 0, dizlace: 0, liked: false, disliked: false,  views: 0 };
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
    await sendDeviceReaction({ productId, deviceLike, deviceDislike,  views: cur.views });
    await fetchReactions(productId);
  };

  
  useEffect(() => {
    controls.start({
      background: [
        "linear-gradient(120deg, #f59e0b, #3b82f6)",
        "linear-gradient(120deg, #9333ea, #10b981)",
        "linear-gradient(120deg, #f43f5e, #fbbf24)",
        "linear-gradient(120deg, #3b82f6, #f59e0b)"
      ],
      transition: { duration: 15, ease: "linear", repeat: Infinity, repeatType: "loop" }
    });
  }, [controls]);

  const skills = [ "HTML", "CSS", "JavaScript", "React", "Node.js", "Next.js", "TailwindCSS", "MongoDB", "Telegram Web App", "Python", "GitHub", "Figma" ];

  return (
    <motion.div className="  min-h-screen flex flex-col items-center justify-center text-center text-white p-4 overflow-hidden relative" animate={controls}>
      <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="mb-12">
        <h1 className="text-[clamp(33px,9vw,70px)] font-extrabold mb-4 drop-shadow-lg leading-tight">Hi, I'm a Full-Stack Developer + SEO</h1>
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
    sm:w-[280px] md:w-[330px] lg:w-[380px] xl:w-[380px] 2xl:w-[420px] w-[280px]
    min-h-[480px] sm:min-h-[500px] md:min-h-[520px] lg:min-h-[540px] 
    p-6
    backdrop-blur-md
  "
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: index * 0.12 }}
>
  {/* Название продукта */}
  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-center text-white drop-shadow-lg">
    {product.name}
  </h3>

  {/* Изображение */}
  <div className="w-full h-40 sm:h-44 md:h-48 lg:h-52 mb-4 overflow-hidden rounded-2xl border border-white/30 shadow-inner">
    <Image
      src={`https://fourfeef.onrender.com/portfol${product.img}`}
      alt={product.name}
      width={400}
      height={300}
      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
    />
  </div>

  {/* Кнопки */}
  <div className="flex flex-col gap-3 mb-4 flex-grow justify-center">
    {product.orig && (
      <a href={product.orig} target="_blank" rel="noreferrer">
        <button className="w-full px-4 py-3 rounded-xl bg-white text-black font-semibold shadow-md hover:shadow-xl transition-shadow duration-300">
          Ready Layout
        </button>
      </a>
    )}
    {product.figma && (
      <a href={product.figma} target="_blank" rel="noreferrer">
        <button className="w-full px-4 py-3 rounded-xl bg-black/70 text-white font-semibold shadow-md hover:shadow-xl transition-shadow duration-300">
          Design Layout
        </button>
      </a>
    )}
  </div>

  {/* Описание */}
  <p className="text-white text-sm sm:text-base md:text-lg text-center leading-relaxed drop-shadow-lg mb-4">
    {product.opis}
  </p>

  {/* Лайк/Дизлайк */}
<div className="flex justify-center gap-6 p-4">
  {/* ЛАЙК */}
  <motion.button
    onClick={() => handleLike(product._id)}
    className={`
      flex items-center justify-center gap-2
      p-3 rounded-2xl
      shadow-lg
      transition-all duration-300
      transform hover:scale-110 active:scale-95
      ${r.liked 
        ? "bg-gradient-to-tr from-green-400 to-green-600 shadow-2xl scale-110" 
        : "bg-green-300 hover:bg-green-400"}
    `}
    animate={{ scale: r.liked ? 1.15 : 1 }}
  >
    <img
      src="/img/fef.png"
      className="w-7 h-7"
      style={{
        filter: r.liked
          ? "brightness(1.2) saturate(150%)"
          : "none",
      }}
    />
    <span className="text-white font-semibold text-sm sm:text-base drop-shadow">
      {r.likeCount || 0}
    </span>
  </motion.button>

  {/* ДИЗЛАЙК */}
  <motion.button
    onClick={() => handleDislike(product._id)}
    className={`
      flex items-center justify-center gap-2
      p-3 rounded-2xl
      shadow-lg
      transition-all duration-300
      transform hover:scale-110 active:scale-95
      ${r.disliked
        ? "bg-gradient-to-tr from-red-400 to-red-600 shadow-2xl scale-110"
        : "bg-red-300 hover:bg-red-400"}
    `}
    animate={{ scale: r.disliked ? 1.15 : 1 }}
  >
    <img
      src="/img/like 1 (1).png"
      className="w-7 h-7"
      style={{
        filter: r.disliked
          ? "brightness(1.2) saturate(150%)"
          : "none",
      }}
    />
    <span className="text-white font-semibold text-sm sm:text-base drop-shadow">
      
    </span>
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
