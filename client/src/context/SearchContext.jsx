import { createContext, useContext, useState } from "react";
import api from "../api/axios";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const performSearch = async (query, type = "churches") => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    try {
      setLoading(true);
      const { data } = await api.get(
        `/search?q=${encodeURIComponent(query)}&type=${type}`
      );
      setResults(data.results);
    } catch (error) {
      console.error("Search failed", error);
    } finally {
      setLoading(false);
    }
  };

  const clearResults = () => setResults([]);

  return (
    <SearchContext.Provider
      value={{ results, loading, performSearch, clearResults }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
