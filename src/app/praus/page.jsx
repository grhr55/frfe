"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import Link from "next/link";

export default function PricingSection() {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      background: [
        "linear-gradient(120deg, #f59e0b, #3b82f6)",
        "linear-gradient(120deg, #9333ea, #10b981)",
        "linear-gradient(120deg, #f43f5e, #fbbf24)",
        "linear-gradient(120deg, #3b82f6, #f59e0b)",
      ],
      transition: {
        duration: 15,
        ease: "linear",
        repeat: Infinity,
        repeatType: "loop",
      },
    });
  }, [controls]);

  const pricingPlans = [
    { name: "Basic", price: "$300", features: ["Next.js/Tailwind", "Responsive Design", "1 Page"] },
    { name: "Standard", price: "$550", features: ["Next.js", "Backend API", "3 Pages"] },
    { name: "Premium", price: "$1000+", features: ["Full-Stack App", "Database", "5 Pages"] },
    { name: "Ultimate", price: "$2000+", features: ["Full-Stack + SEO", "Deploy + Support", "Unlimited Pages"] },
  ];

  return (
    <motion.div
      className="w-screen min-h-screen relative overflow-hidden flex flex-col items-center justify-center text-center text-white p-6"
      animate={controls}
    >
      {/* Hero Section */}
      <h1 className="text-6xl md:text-7xl font-extrabold mb-4 drop-shadow-xl">
        Pricing Plans
      </h1>
      <p className="text-xl md:text-2xl mb-12 max-w-3xl drop-shadow-md">
        Choose a plan that fits your needs. Simple, transparent, and scalable pricing.
      </p>

      {/* Pricing Plans Section */}
      <motion.div
        className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {pricingPlans.map((plan, index) => (
          <motion.div
            key={index}
            className="bg-gray-800 p-6 rounded-2xl shadow-xl hover:scale-105 hover:shadow-2xl transition-all cursor-pointer flex flex-col"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
            <p className="text-3xl font-extrabold mb-4">{plan.price}</p>
            <ul className="flex flex-col gap-2 mb-4 text-gray-300">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="before:content-['✔'] before:mr-2">
                  {feature}
                </li>
              ))}
            </ul>
            <p className="text-sm text-gray-400 mt-auto">
              Note: The price is finalized after discussing design and functionality.
            </p>
          </motion.div>
        ))}
        
      </motion.div>


      <Link href="/">
       <button className="px-8 cursor-pointer  text-[20px] mt-[50px] py-4 border border-white rounded-xl text-white font-bold hover:bg-white hover:text-black transition-colors hover:scale-105">
          ←
        </button>
      </Link>
      


    </motion.div>
  );
}
