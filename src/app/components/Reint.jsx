import { useEffect, useState } from "react";

const AlignedLinearSpeedometer = ({ level }) => {
  const [progress, setProgress] = useState(0);

  const levelMap = {
    Simple: 25,
    Average: 50,
    Difficult: 75,
    Hardcore: 100,
  };

  const colorMap = {
    Simple: "#22c55e",
    Average: "#facc15",
    Difficult: "#f97316",
    Hardcore: "#ef4444",
  };

  const target = levelMap[level] || 0;

  useEffect(() => {
    let start = 0;
    const interval = setInterval(() => {
      start += 1 + start / 20; // имитация разгона
      if (start >= target) {
        start = target;
        clearInterval(interval);
      }
      setProgress(start);
    }, 10);
    return () => clearInterval(interval);
  }, [target]);

  return (
    <div className="flex items-center gap-2 w-full max-w-[250px]">
      {/* Полоса */}
      <div className="flex-1 h-3 bg-gray-300 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%`, background: colorMap[level] }}
        ></div>
      </div>
      {/* Процент */}
      <span className="text-sm font-semibold text-gray-700 w-[40px] text-right">
        {progress.toFixed(0)}%
      </span>
    </div>
  );
};

export default AlignedLinearSpeedometer;
