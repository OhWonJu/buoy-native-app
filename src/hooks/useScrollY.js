import { useState, useEffect, useCallback, useRef } from "react";
import _ from "underscore";

export function useScrollY(ref) {
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = useCallback(() => {
    const { current } = ref;
    if (current) {
      console.log(current);
      setScrollY(current.scrollY);
    }
  }, []);

  // 성능을 위해... 스로틀링, 디바운싱같은 기법 고려해야함.
  useEffect(() => {
    const { current } = ref;
    console.log(current.addEventListener);
    // if (current) {
    //   current.addEventListener("scroll", _.throttle(handleScroll, 150));
    // }
    // return () => {
    //   current.removeEventListener("scroll", handleScroll);
    // };
  }, [scrollY]);

  return {
    scrollY,
  };
}
