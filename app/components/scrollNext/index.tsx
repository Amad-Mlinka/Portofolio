'use client';
import { ChevronDown } from 'lucide-react'
import React from 'react'

const ScrollNext = () => {
  return (
    <div className="w-100 flex justify-center">
        <div className="fixed bottom-16 w-100 transform -translate-x-1/2 animate-bounce">
            <ChevronDown size={32} className="text-[#E31B6D]" />
        </div>
    </div>
   
  )
}

export default ScrollNext