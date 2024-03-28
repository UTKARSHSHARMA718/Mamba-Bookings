import { useEffect, useState } from "react";

import { throttle } from "@/libs/services/throttle";

const useWindowDimension = () => {
  const [windowSize, setWindowSize] = useState({
    width: window?.innerWidth,
    height: window?.innerHeight,
  });

  const windowSizeChangehanlder = throttle(() => {
    setWindowSize((prev) => {
      return {
        ...prev,
        width: window?.innerWidth,
        height: window?.innerHeight,
      };
    });
  });

  useEffect(() => {
    window?.addEventListener("resize", windowSizeChangehanlder);

    return () => {
      window?.removeEventListener("resize", windowSizeChangehanlder);
    };
  }, []);

  return { windowSize };
};

export default useWindowDimension;