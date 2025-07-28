import { useEffect, useState } from "react";

function useDebounce(val, delay) {
  const [debounceValue, setDebouncValue] = useState(val);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncValue(val);
    }, delay);

    return () => clearTimeout(timer);
  }, [val, delay]);

  return debounceValue;
}

export default useDebounce;
