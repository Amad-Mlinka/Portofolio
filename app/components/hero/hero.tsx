'use client';
import React, { useEffect, useState } from 'react'

import styles from './hero.module.scss'

  
const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])
  
  return (
    <div className={` ${styles.heroContainer} overflow-hidden p-4 md:p-0`}>
      <div className={`flex flex-col items-center justify-center ${styles.hero}`}>
        <h1 className={`text-6xl md:text-8xl font-bold mb-6 text-center ${styles.fadeIn} ${isLoaded ? styles.visible : ''}`}>
          <span className={`block ${styles.heroName}`}>Amad Mlinaric</span>
          <span className={`block ${styles.flicker}`}>Full Stack Developer</span>
        </h1>
        <p className={`text-xl md:text-2xl text-center mb-12 max-w-2xl ${styles.fadeIn} ${styles.delay200} ${isLoaded ? styles.visible : ''}`}>
          Transforming ideas into captivating digital experiences through innovative design and cutting-edge development
        </p>
        <div className={`flex space-x-6 ${styles.fadeIn} ${styles.delay400} ${isLoaded ? styles.visible : ''}`}>
          <a
            href="#projects"
            className="bg-[#E31B6D] text-white py-3 px-8 rounded-full text-sm lg:text-lg font-medium transition-transform hover:scale-105"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="border-2 border-[#FF2D92] text-[#FF2D92] py-3 px-8 rounded-full text-sm lg:text-lg font-medium transition-transform hover:scale-105"
          >
            Get in Touch
          </a>
        </div>
      </div>     
    </div>
  )
}

export default Hero