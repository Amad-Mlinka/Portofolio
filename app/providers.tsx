"use client";

import { ThemeProvider } from 'next-themes';
import React, { useEffect, useState } from 'react';

const Providers = ({ children }: { children: React.ReactNode }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); 
  }, []);

  if (!isMounted) return null; 

  return (
    <ThemeProvider
      themes={["light", "dark"]}
      defaultTheme="dark"
      enableSystem={false}
      attribute="class"
      enableColorScheme={false}
    >
      {children}
    </ThemeProvider>
  );
};

export default Providers;
