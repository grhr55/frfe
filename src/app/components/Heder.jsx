"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import Factions from './Factions';
import Tovar from './Tovar'

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
    <motion.div className="  min-h-screen flex flex-col items-center justify-center text-center text-white p-6 overflow-hidden relative" animate={controls}>
      <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-12">
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
                <Tovar   product={product} index={index} r={r} g={g} handleLike={handleLike}  handleDislike={handleDislike}/>
               

              );
            })}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
