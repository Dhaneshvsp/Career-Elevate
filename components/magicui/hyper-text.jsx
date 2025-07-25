"use client";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion"; // ✅ Fixed Import
import { useEffect, useRef, useState } from "react";

const DEFAULT_CHARACTER_SET = Object.freeze("ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""));

const getRandomInt = (max) => Math.floor(Math.random() * max);

export function HyperText({
  children,
  className,
  duration = 20000,
  delay = 0,
  as: Component = "div",
  startOnView = false,
  animateOnHover = true,
  characterSet = DEFAULT_CHARACTER_SET,
  ...props
}) {
  const MotionComponent = motion(Component);
  
  // ✅ Ensure children is treated as a string
  const text = typeof children === "string" ? children : "";
  const [displayText, setDisplayText] = useState(() => text.split(""));

  const [isAnimating, setIsAnimating] = useState(false);
  const iterationCount = useRef(0);
  const elementRef = useRef(null);

  const handleAnimationTrigger = () => {
    if (animateOnHover && !isAnimating) {
      iterationCount.current = 0;
      setIsAnimating(true);
    }
  };

  useEffect(() => {
    if (!startOnView) {
      const startTimeout = setTimeout(() => {
        setIsAnimating(true);
      }, delay);
      return () => clearTimeout(startTimeout);
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          setIsAnimating(true);
        }, delay);
        observer.disconnect();
      }
    }, { threshold: 0.1, rootMargin: "-30% 0px -30% 0px" });

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [delay, startOnView]);

  useEffect(() => {
    if (!isAnimating) return;

    const intervalDuration = duration / (text.length * 10);
    const maxIterations = text.length;

    const interval = setInterval(() => {
      if (iterationCount.current < maxIterations) {
        setDisplayText(
          text.split("").map((letter, index) =>
            letter === " "
              ? letter
              : index <= iterationCount.current
                ? text[index]
                : characterSet[getRandomInt(characterSet.length)]
          )
        );
        iterationCount.current += 1;
      } else {
        setIsAnimating(false);
        clearInterval(interval);
      }
    }, intervalDuration);

    return () => clearInterval(interval);
  }, [text, duration, isAnimating, characterSet]);

  return (
    <MotionComponent
      ref={elementRef}
      className={cn("overflow-hidden py-2 text-4xl font-bold", className)}
      onMouseEnter={handleAnimationTrigger}
      {...props}
    >
      <AnimatePresence>
        {displayText.map((letter, index) => (
          <motion.span key={index} className={cn("font-mono", letter === " " ? "w-3" : "")}>
            {letter.toUpperCase()}
          </motion.span>
        ))}
      </AnimatePresence>
    </MotionComponent>
  );
}
