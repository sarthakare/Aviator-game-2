import React from "react";

const HistoryBar = () => {
  // Helper to determine color
  const getTextColor = (val) => {
    if (val >= 4) return "text-purple-400";
    return "text-blue-400";
  };

  // All static values
  const values = [
    1.09, 1.00, 6.62, 1.15, 1.19,
    1.63, 1.85, 6.55, 4.34, 1.23,
    1.23, 1.23, 4.34, 1.23, 1.23,
    1.23, 1.23, 6.55
  ];

  // Responsive: show 5 on small, 10 on medium+
  const [count, setCount] = React.useState(window.innerWidth < 640 ? 5 : 10);

  React.useEffect(() => {
    const handleResize = () => {
      setCount(window.innerWidth < 640 ? 5 : 10);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-wrap gap-2 text-sm w-full">
      {values.slice(0, count).map((val, idx) => (
        <span
          key={idx}
          className={`px-3 py-1 rounded-xl bg-[#18181b] ${getTextColor(val)} font-mono`}
        >
          {val.toFixed(2)}x
        </span>
      ))}
    </div>
  );
};

export default HistoryBar;
