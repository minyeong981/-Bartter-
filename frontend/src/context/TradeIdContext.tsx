import type {PropsWithChildren} from 'react';
import {createContext} from 'react';

type TradeIdContextProps = PropsWithChildren<{value: number}>;

export const TradeIdContext = createContext<number | null>(0);

const TradeIdContextProvider = ({children, value}: TradeIdContextProps) => {
  return (
    <TradeIdContext.Provider value={value}>{children}</TradeIdContext.Provider>
  );
};

export default TradeIdContextProvider;