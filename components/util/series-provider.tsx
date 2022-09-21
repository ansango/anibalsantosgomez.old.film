import { createContext, useContext } from "react";

const SeriesContext = createContext({
  allSeries: null,
});

export const useAllSeries = () => {
  const { allSeries } = useContext(SeriesContext);
  return allSeries;
};

export const SeriesProvider = ({ children, allSeries }) => {
  return (
    <SeriesContext.Provider value={{ allSeries }}>
      {children}
    </SeriesContext.Provider>
  );
};
