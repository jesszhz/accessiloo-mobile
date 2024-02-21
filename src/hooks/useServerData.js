import { useEffect, useState } from "react";

const useServerData = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);


  useEffect(() => {
    const getData = async () => {
      try {
        let ignore = false;
        console.log("fetching endpoint:", url);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error: The status is ${response.status}`);
        }
        const json = await response.json();

        if (!ignore) {
          setData(json);
          setError(null);
        }
      } catch (err) {
        setError(err.message);
        setData(null);
      }
    };

    getData();

    return () => {
      ignore = true;
    };
  }, [url]);

  return data;
};

export default useServerData;
