import { useSearchParams } from "react-router-dom";
import useDebounce from "../hooks/useDebounce";
import { useEffect } from "react";


function MovieSearch() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const debounce = useDebounce(query, 500);

  useEffect(() => {
    // const fetchData = 
  }, []);
  return <h2>search</h2>;
}

export default MovieSearch;
