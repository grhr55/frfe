"use client";

import { motion,  } from "framer-motion";
import Link from "next/link"

export default function PricingSection({setvid}) {


    return(
        <div>
                  
      <motion.div
        className="flex flex-wrap justify-center gap-6 mb-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
     transition={{ duration: 2 }}
      >
        <button
onClick={() => {
  setvid(false);
  setTimeout(() => {
    const section = document.getElementById("portfol");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }, 300); 
}}


          className="px-8 py-4 rounded-xl text-white font-bold border border-white hover:bg-white hover:text-black transition-all hover:scale-105 shadow-lg"
        >
          Portfolio
        </button>
      

      <a
  href="https://t.me/Rocetk66"
  className="inline-block px-8 py-4 rounded-xl text-white font-bold border border-white hover:bg-white hover:text-black transition-all hover:scale-105 shadow-lg text-center"
>
  Contacts
</a>


      <Link href="/praus">
        <button   type="button" className="px-8 py-4 rounded-xl text-white font-bold border border-white hover:bg-white hover:text-black transition-transform hover:scale-105 shadow-lg">
          Price
        </button>
      </Link>
      </motion.div>
         

        </div>
    )
 
}
