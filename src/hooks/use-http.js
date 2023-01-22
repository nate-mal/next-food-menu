import { useState, useCallback } from "react";

const useHttp = (url) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const sendRequest = useCallback(
    async (httpConfig = { method: "GET" }, applyToData, customUrl) => {
      setIsLoading(true);
      setError(null);
      try {
        let response;
        if (customUrl) {
          response = await fetch(customUrl, {
            ...httpConfig,
          });
        } else {
          response = await fetch(url, {
            ...httpConfig,
          });
        }

        if (!response.ok) {
          throw new Error("Request failed!");
        }

        const data = await response.json();
        applyToData(data);
      } catch (err) {
        setError(err.message || "Something went wrong!");
      } finally {
        setIsLoading(false);
      }
    },
    [url]
  );

  return { isLoading, error, sendRequest };
};

export default useHttp;
