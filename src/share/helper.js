import { useEffect, useState } from "react";
import dayjs from "dayjs";
export const isEmptyOrNull = (value) => {
    return (value === "" || value === null || value === undefined) ? true : false
}

const ip_url = "192.168.100.127";
const local_url = "192.168.100.127";
export const config = {
  //base_server: "https://192.168.1.169:8085/api/",
  base_keyclock: `http://localhost:8080`,
  base_webSocket:`http://localhost:8089/ws`,
  version: 1,
};

const formatDate = "YYYY-MM-DD";
export const dateFormat = (value) => {
  return dayjs(value).format(formatDate);
};

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
