import { useEffect, useState } from "react";

const PerformanceLetterVisible = ({ grade }) => {
  const [fill, setFill] = useState(0);

  const colorMap = {
    A: "#22c55e", // зелёный
    B: "#4ade80",
    C: "#facc15", // жёлтый
    D: "#f97316", // оранжевый
    E: "#ef4444", // красный
    F: "#b91c1c", // тёмно-красный
  };

  useEffect(() => {
    let start = 0;
    const interval = setInterval(() => {
      start += 5;
      if (start >= 100) {
        start = 100;
        clearInterval(interval);
      }
      setFill(start);
    }, 15);
    return () => clearInterval(interval);
  }, [grade]);

  return (
    <div className="relative w-12 h-12 rounded-lg overflow-hidden flex items-center justify-center bg-gray-200">
      {/* Анимация фона */}
      <div
        className="absolute bottom-0 left-0 w-full"
        style={{
          height: `${fill}%`,
          backgroundColor: colorMap[grade] || "#ccc",
          transition: "height 0.3s ease-out",
          zIndex: 0,
        }}
      ></div>
      {/* Буква сверху, всегда видна */}
      <span
        className="relative font-bold text-lg"
        style={{ color: "#fff", zIndex: 10 }}
      >
        {grade}
      </span>
    </div>
  );
};

export default PerformanceLetterVisible;
