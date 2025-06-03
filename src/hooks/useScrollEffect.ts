import { useState, useEffect } from "react";

export function useScrollEffect(threshold: number = 0): [boolean, React.Dispatch<React.SetStateAction<boolean>>] {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > threshold) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    
    // Initial check in case page is loaded already scrolled
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [threshold]);

  return [isScrolled, setIsScrolled];
}
