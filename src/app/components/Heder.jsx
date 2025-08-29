"use client";

import Link from "next/link";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function FullStackPortfolio() {
  const [products, setProducts] = useState([]);
  const controls = useAnimation();
  const [showProjects, setShowProjects] = useState(false);

  // fetch вместо axios
  const fetchProducts = async () => {
    try {
      const res = await fetch("https://rgree.onrender.com/portfol/porf");
      if (!res.ok) throw new Error("Ошибка загрузки данных");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Ошибка при загрузке товаров:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // анимация градиента
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
      className="w-screen min-h-screen flex flex-col items-center justify-center text-center text-white p-6 relative overflow-hidden"
      animate={controls}
    >
      {/* Hero Section */}
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
          onClick={() => setShowProjects(true)}
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

      {/* Projects Section */}
      {showProjects && (
        <motion.div
          className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {products.map((product, index) => (
            <motion.div
              key={index}
              className="bg-white/10 backdrop-blur-sm p-6 rounded-3xl shadow-2xl border border-white/20 hover:scale-105 hover:shadow-3xl transition-all cursor-pointer flex flex-col items-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <h3 className="text-2xl font-bold mb-4 text-center">{product.name}</h3>

              <Image
                src={`http://localhost:2000/portfol${product.img}`}
                alt={product.name}
                width={400}
                height={250}
                className="rounded-lg object-cover mb-4"
                loading="lazy"
              />

              {product.figma && (
                <a href={product.figma} target="_blank" rel="noopener noreferrer" className="mb-4 w-full">
                  <button className="w-full px-6 py-3 rounded-xl bg-white text-black font-semibold hover:bg-gray-200 transition-all">
                    Дизайн макет
                  </button>
                </a>
              )}
              {product.orig && (
                <a href={product.orig} target="_blank" rel="noopener noreferrer" className="mb-4 w-full">
                  <button className="w-full px-6 py-3 rounded-xl bg-white text-black font-semibold hover:bg-gray-200 transition-all">
                    Верстка
                  </button>
                </a>
              )}

              <p className="text-white/90 text-sm md:text-base text-center">{product.opis}</p>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
} 
