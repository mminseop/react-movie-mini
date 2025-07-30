import { useEffect, useState } from "react";

function useDebounce(val, delay) {
  const [debounceValue, setDebounceValue] = useState(val);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(val);
    }, delay);

    return () => clearTimeout(timer);
  }, [val, delay]);

  return debounceValue;
}

export default useDebounce;
