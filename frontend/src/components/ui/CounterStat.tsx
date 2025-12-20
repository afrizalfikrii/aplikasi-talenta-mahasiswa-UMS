import { useState, useEffect, useRef } from "react";
import { useCounterAnimation } from "../../lib/helpers";

interface CounterStatProps {
  endValue: number;
  label: string;
  icon: React.ReactNode;
}

export default function CounterStat({ endValue, label, icon }: CounterStatProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [isVisible]);

  useEffect(() => {
    const cleanup = useCounterAnimation(endValue, isVisible, setCount);
    return cleanup;
  }, [isVisible, endValue]);

  return (
    <div ref={elementRef}>
      <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4 text-emerald-700">
        {icon}
      </div>
      <h3 className="text-4xl font-bold text-slate-800 dark:text-slate-100 mb-2">
        {count}+
      </h3>
      <p className="text-slate-600 dark:text-slate-400">{label}</p>
    </div>
  );
}
