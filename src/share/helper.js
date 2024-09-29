import { useEffect, useState } from "react";

export const isEmptyOrNull = (value) => {
    return (value === "" || value === null || value === undefined) ? true : false
}

export const WindowSize = () => {
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    
      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };
    
      useEffect(() => {
        // Add event listener to handle window resize
        window.addEventListener("resize", handleResize);
    
        // Cleanup the event listener on component unmount
        return () => {
          window.removeEventListener("resize", handleResize);
        };
      }, []); // Empty dependency array ensures that the effect runs only once on mount
      
    return windowSize;
}
