'use client';
import React, { useEffect, useState } from 'react'

import styles from './hero.module.scss'
import NeonButton from '../ui/buttons/neonButton';
import Button from '../ui/buttons/button';

  
const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])
  
  return (
    <div className={` ${styles.heroContainer} overflow-hidden p-4 md:p-0 `}>
      <div className={`flex flex-col items-center justify-center ${styles.hero}`}>
        <h1 className={`text-6xl md:text-8xl font-bold mb-6 text-center ${styles.fadeIn} ${isLoaded ? styles.visible : ''}`}>
          <span className={`block ${styles.heroName}`}>Amad Mlinaric</span>
          <span className={`block ${styles.heroTitle} flicker`}>Full Stack Developer</span>
        </h1>
        <p className={`text-xl md:text-2xl text-center mb-12 max-w-2xl ${styles.fadeIn} ${styles.delay200} ${isLoaded ? styles.visible : ''}`}>
          Transforming ideas into captivating digital experiences through innovative design and cutting-edge development
        </p>
        <div className={`flex space-x-6 ${styles.fadeIn} ${styles.delay400} ${isLoaded ? styles.visible : ''}`}>
          <NeonButton
            href="#projects"
          >
            View Projects
          </NeonButton>
          <Button
            href="#contact"
          >
            Get in Touch
          </Button>
        </div>
      </div>     
    </div>
  )
}

export default Hero