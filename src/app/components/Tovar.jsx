

import { motion, useAnimation } from "framer-motion";
import Image from "next/image";


export default function Tovar({ product, index, r, g, handleLike, handleDislike }) {
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
        overflow-hidden
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
          src={`https://fourfeef.onrender.com/portfol/${product.img}`} // добавил / перед ${product.img}
          alt={product.name}
          width={400}
          height={300}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

      {/* Кнопки */}
      <div className="flex flex-col gap-3 mb-4">
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
            {r.dislikeCount || 0}
          </span>
        </motion.button>
      </div>
    </motion.div>
  );
}
