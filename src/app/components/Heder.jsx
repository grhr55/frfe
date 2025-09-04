"use client";

import Link from "next/link";
import { motion, useAnimation  } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function FullStackPortfolio() {
  const [products, setProducts] = useState([]);
  const controls = useAnimation();


  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [dizlace, setDizlace] = useState(0);
  const [views, setViews] = useState(0);
  const [coment, setcoment] = useState('');
  const [vidcoment ,setvidcoment] = useState(true)
  const [vid ,setvid] = useState(true)
 










  const fetchProducts = async () => { try { const res = await fetch("https://rgree.onrender.com/portfol/porf"); 
    if (!res.ok) throw new Error("Ошибка загрузки данных"); const data = await res.json(); 
    setProducts(data)
            
       } catch (error) { console.error("Ошибка при загрузке товаров:", error); } 

   
      };
        useEffect(() => { fetchProducts(); }, []);



  const fetchProderucts = async () => {
  try {
    const res = await fetch("https://rgree.onrender.com/likos/lice");
    if (!res.ok) throw new Error("Ошибка загрузки данных");

    const data = await res.json();
    const item = Array.isArray(data) ? data[0] : data;

    setLikeCount(Number(item.likeCount) || 0);
    setDizlace(Number(item.dizlace) || 0);
    setcoment(item.coment || "");
    setViews(Number(item.views) || 0);

  } catch (error) {
    console.error("Ошибка при загрузке товаров:", error);
  }

  // Проверка локальных лайков/дизлайков
  const hasLiked = localStorage.getItem("liked") === "true";
  const hasDisliked = localStorage.getItem("disliked") === "true";
  setLiked(hasLiked);
  setDisliked(hasDisliked);

  // Проверка просмотров
  const hasViewed = localStorage.getItem("viewed") === "true";
  if (!hasViewed) {
    setViews(prev => prev + 1);
    localStorage.setItem("viewed", "true");
  }

let deviceId = localStorage.getItem('deviceId');
if (!deviceId) {
  deviceId = crypto.randomUUID();
  localStorage.setItem('deviceId', deviceId);
}

};
useEffect( () => {
  fetchProderucts()
},[])







  
  const handleReaction = async ( likeCount, dizlace) => {
    
    try {
      const res = await fetch("https://rgree.onrender.com/likos/reaction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ likeCount,dizlace, coment, views })
      });
     
      
      
  

    } catch (err) {
      console.error("Ошибка отправки реакции:", err);
    }
  };

    const handleReact = async (e) => {
      e.preventDefault();
    
    try {
      const res = await fetch("https://rgree.onrender.com/likos/reaction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ coment })
      });
       setvidcoment(true)
       setcoment('')
      
      
  

    } catch (err) {
      console.error("Ошибка отправки реакции:", err);
    }
  };

  const handleLike = () => {
    let newLikeCount = likeCount;
    let newDizCount = dizlace;

    if (liked) {
      newLikeCount = Math.max(0, likeCount - 1);
      setLiked(false);
      localStorage.setItem('liked', 'false');
    } else {
      newLikeCount = likeCount + 1;
      setLiked(true);
      localStorage.setItem('liked', 'true');
      setvidcoment(true)

      if (disliked) {
        newDizCount = Math.max(0, dizlace - 1);
        setDisliked(false);
        localStorage.setItem('disliked', 'false');
        setDizlace(newDizCount);
      }
    }

    

    setLikeCount(newLikeCount);
    handleReaction(newLikeCount, newDizCount);
  };


  
  const handleDislike = () => {
    let newDizCount = dizlace;
    let newLikeCount = likeCount;
   

    if (disliked) {
      newDizCount = Math.max(0, dizlace - 1);
      setDisliked(false);
      localStorage.setItem('disliked', 'false');
       setvidcoment(true)

    } else {
      newDizCount = dizlace + 1;
      setDisliked(true);
      localStorage.setItem('disliked', 'true');
       setvidcoment(false)

      if (liked) {
        newLikeCount = Math.max(0, likeCount - 1);
        setLiked(false);
        localStorage.setItem('liked', 'false');
        setLikeCount(newLikeCount);
      }
    }

    setDizlace(newDizCount);
    handleReaction(newLikeCount, newDizCount);
  };


  
  useEffect(() => {
    controls.start({
      background: [
        "linear-gradient(120deg, #f59e0b, #3b82f6)",
        "linear-gradient(120deg, #9333ea, #10b981)",
        "linear-gradient(120deg, #f43f5e, #fbbf24)",
        "linear-gradient(120deg, #3b82f6, #f59e0b)",
      ],
      transition: { duration: 15, ease: "linear", repeat: Infinity, repeatType: "loop" },
    });
  }, [controls]);

  const skills = [
    "HTML", "CSS", "JavaScript", "React", "Node.js",
    "Next.js", "TailwindCSS", "MongoDB", "Telegram Web App",
    "Python", "GitHub", "Figma"
  ];





  return (
    <motion.div
      className="w-screen min-h-screen flex flex-col items-center justify-center text-center text-white p-4  overflow-hidden relative"
      animate={controls}
    >
        

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="mb-12"
      >
        <h1 className="text-[clamp(33px,9vw,70px)] font-extrabold mb-4 drop-shadow-lg leading-tight">
          Hi, I'm a Full-Stack Developer + SEO
        </h1>
        <p className="text-xl md:text-2xl max-w-3xl mx-auto drop-shadow-md">
          I create modern, dynamic websites using the latest technologies.
        </p>

  
      </motion.div>

      {/* Skills */}
      <motion.div
        className="flex flex-wrap justify-center gap-3 mb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        {skills.map((skill, index) => (
          <motion.span
            key={index}
            whileHover={{ scale: 1.1, backgroundColor: "#ffffff30" }}
            className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm md:text-base font-semibold transition-all cursor-default shadow-md"
          >
            {skill}
          </motion.span>
        ))}
      </motion.div>

      {/* Buttons */}
      <motion.div
        className="flex flex-wrap justify-center gap-6 mb-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <button
          onClick={() => setvid(false)}
          className="px-8 py-4 rounded-xl text-white font-bold border border-white hover:bg-white hover:text-black transition-all hover:scale-105 shadow-lg"
        >
          Portfolio
        </button>

        <a href="https://t.me/Rocetk66">
          <button className="px-8 py-4 rounded-xl text-white font-bold border border-white hover:bg-white hover:text-black transition-all hover:scale-105 shadow-lg">
            Contacts
          </button>
        </a>

        <Link href="/praus">
          <button className="px-8 py-4 rounded-xl text-white font-bold border border-white hover:bg-white hover:text-black transition-all hover:scale-105 shadow-lg">
            Price
          </button>
        </Link>
      </motion.div>



{!vid && (
  <motion.div
    className=" w-[100%] flex justify-center"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
  >
    <div className="flex flex-wrap justify-center gap-8 max-w-[100%] ">
      {products.map((product, index) => {
        const gradients = [
          "linear-gradient(120deg, #f59e0b, #3b82f6)",
          "linear-gradient(120deg, #9333ea, #10b981)",
          "linear-gradient(120deg, #f43f5e, #fbbf24)",
          "linear-gradient(120deg, #3b82f6, #f59e0b)"
        ];

        return (
        <motion.div
  key={index}
  style={{ background: gradients[index % gradients.length] }}
  className="rounded-3xl shadow-xl hover:scale-105 hover:shadow-2xl 
             transition-all duration-300 cursor-pointer flex flex-col
             w-full sm:w-[300px] md:w-[340px] lg:w-[360px] max-w-[380px]
             min-h-[480px] p-6"
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: index * 0.15 }}
>
  {/* Название проекта */}
  <h3 className="text-2xl font-bold mb-4 text-center text-white drop-shadow-md">
    {product.name}
  </h3>

  {/* Контейнер изображения */}
  <div className="w-full h-48 mb-4 overflow-hidden rounded-xl border border-white/30 shadow-inner">
    <Image
      src={`https://rgree.onrender.com/portfol${product.img}`}
      alt={product.name}
      width={400}
      height={300}
      className="w-full h-full object-cover"
    />
  </div>

  {/* Кнопки */}
  <div className="flex flex-col gap-3 mb-4 flex-grow justify-center">
    {product.orig && (
      <a href={product.orig} target="_blank" rel="noopener noreferrer">
        <button className="w-full px-6 py-3 rounded-xl bg-white text-black font-semibold hover:bg-gray-200 transition-colors shadow-md">
          Ready layout
        </button>
      </a>
    )}
    {product.figma && (
      <a href={product.figma} target="_blank" rel="noopener noreferrer">
        <button className="w-full px-6 py-3 rounded-xl bg-black/70 text-white font-semibold hover:bg-black transition-colors shadow-md">
          Design Layout
        </button>
      </a>
    )}
  </div>
  
  {/* Описание */}
  <p className="text-white text-sm md:text-base text-center leading-relaxed drop-shadow">
    {product.opis}
  </p>


<div className="flex justify-center gap-6 p-8">
  {/* Кнопка лайка */}
  <motion.button
    onClick={handleLike}
    className="flex flex-col items-center p-4 bg-white/10 backdrop-blur-sm rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300"
    animate={{ scale: liked ? 1.2 : 1 }}
    transition={{ type: "spring", stiffness: 300, damping: 15 }}
  >
    <img
      src="/img/fef.png"
      className="w-12 h-12 mb-2"
      style={{
        filter: liked
          ? "brightness(0) saturate(100%) invert(63%) sepia(52%) saturate(482%) hue-rotate(74deg) brightness(95%) contrast(92%)"
          : "none"
      }}
    />
    <span className="text-xl font-semibold text-white">{Number(likeCount) || 0}</span>
  </motion.button>

  
  <motion.button
    onClick={handleDislike}
    className="flex flex-col items-center p-4 bg-white/10 backdrop-blur-sm rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300"
    animate={{ scale: disliked ? 1.2 : 1 }}
    transition={{ type: "spring", stiffness: 300, damping: 15 }}
  >
    <img
      src="/img/like 1 (1).png"
      className="w-12 h-12 mb-2"
      style={{
        filter: disliked
          ? "brightness(0) saturate(100%) invert(20%) sepia(95%) saturate(600%) hue-rotate(350deg) brightness(95%) contrast(105%)"
          : "none"
      }}
    />
    <span className="text-xl font-semibold text-white">{Number(dizlace) || 0}</span>
  </motion.button>
</div>


{ !vidcoment && (<div>
  <form onSubmit={handleReact}>
 <input
  type="text"
  value={coment}
  placeholder="Почему??"
  onChange={(e) => setcoment(e.target.value)}
  className="
    w-full max-w-md
    px-4 py-3
    border-2 border-gray-400
    rounded-2xl
    bg-white/80
    placeholder-gray-500
    text-gray-900
    focus:outline-none
    focus:border-blue-500 focus:ring-2 focus:ring-blue-200
    shadow-sm
    transition-all duration-300
    hover:shadow-md
  "
/>
  <button type='submit' >Отправить</button>
  </form>
 


</div>)}



   
    
       
      
    

</motion.div>

        );
      })}
    </div>
  </motion.div>
)}



    </motion.div>
  );
} 
