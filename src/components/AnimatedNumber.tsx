import React, { useEffect, useRef, useState } from "react";

interface AnimatedNumberProps {
  value: number;
  symbol?: string;
  symbolPosition?: "left" | "right";
  duration?: number; // ms
  decimals?: number;
  title?: string;
}

function AnimatedNumber({
  value,
  symbol = "",
  symbolPosition = "left",
  duration = 1000,
  decimals = 2,
  title,
}: AnimatedNumberProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startValue = useRef(0);
  const startTime = useRef<number | null>(null);

  useEffect(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    startValue.current = displayValue;
    startTime.current = null;

    const animate = (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp;
      const progress = Math.min((timestamp - startTime.current) / duration, 1);
      const current =
        startValue.current + (value - startValue.current) * progress;
      setDisplayValue(current);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
    // eslint-disable-next-line
  }, [value, duration]);

  const formatted = displayValue.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <div className="flex flex-col items-center">
      {title && (
        <span
          className="text-lg font-semibold mb-2"
          style={{ color: "#566173" }}
        >
          {title}
        </span>
      )}
      <span className="text-7xl font-extrabold" style={{ color: "#566173" }}>
        {symbolPosition === "left" && symbol}
        {formatted}
        {symbolPosition === "right" && symbol}
      </span>
    </div>
  );
}

export default AnimatedNumber;
