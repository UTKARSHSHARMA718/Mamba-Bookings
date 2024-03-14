"use client";

import { useEffect, useRef } from "react";

type UseOutsideClickType = {
  callback: () => void;
};

const useOutsideClick = (props: UseOutsideClickType) => {
  const { callback } = props;
  const ref = useRef();
  const shouldNotConsiderRef = useRef();

  useEffect(() => {
    const outsideClickhandler = (
      event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
      if (
        ref?.current?.contains(event?.target) === false &&
        shouldNotConsiderRef?.current?.contains(event?.target) === false
      ) {
        callback();
      }
    };

    document?.addEventListener("mousedown", outsideClickhandler);

    return () => {
      document?.removeEventListener("mousedown", outsideClickhandler);
    };
  }, []);

  return { ref, shouldNotConsiderRef };
};

export default useOutsideClick;
