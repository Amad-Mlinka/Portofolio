"use client"

import { ThemeProvider } from 'next-themes'
import React from 'react'

const Providers = ({children}:{children: React.ReactNode}) => {
  return (
    <ThemeProvider  
    themes={["light", "dark"]}
    defaultTheme="dark"
    enableSystem={false}
    attribute="class"
    enableColorScheme={false}>
        {children}
    </ThemeProvider>
  )
}

export default Providers