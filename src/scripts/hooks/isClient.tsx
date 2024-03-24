import React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';

const IsClientCtx = createContext(false);

export const IsClientContext = ({children} : any) => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);
  return (
    <IsClientCtx.Provider value={isClient}>{children}</IsClientCtx.Provider>
  );
};

export function useIsClient() {
  return useContext(IsClientCtx);
}