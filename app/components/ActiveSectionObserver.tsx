'use client'

import React, { useEffect, useState } from 'react'
import Navbar from "./navbar"
import ScrollNext from "./scrollNext"

const sectionIds = ['about', 'skills', 'projects', 'contact']

export default function ActiveSectionWrapper({ children }: { children: React.ReactNode }) {
  const [activeSection, setActiveSection] = useState<string>(sectionIds[0])

  useEffect(() => {
    const options = { root: null, rootMargin: '0px', threshold: 0.3 }

    const handleScroll = (entries: IntersectionObserverEntry[]) => {
      let maxRatio = 0
      let mostVisibleSection = ''

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const intersectionRatio = entry.intersectionRatio

          if (intersectionRatio > maxRatio) {
            maxRatio = intersectionRatio
            mostVisibleSection = entry.target.id
          }
        }
      })

      if (mostVisibleSection) {
        console.log(mostVisibleSection)
        setActiveSection(mostVisibleSection)
        window.history.replaceState({}, '', `#${mostVisibleSection}`)
      }
    }

    const observer = new IntersectionObserver(handleScroll, options)

    sectionIds.forEach((sectionId) => {
      const sectionElement = document.getElementById(sectionId)
      if (sectionElement) {
        observer.observe(sectionElement)
      }
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    const sectionElement = document.getElementById(sectionId.slice(1))
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth' })
      window.history.pushState({}, '', sectionId)
    }
  }

  return (
    <>
      <Navbar activeSection={activeSection} scrollToSection={scrollToSection} />
      <main>
        {children}
        <ScrollNext activeSection={activeSection} scrollToSection={scrollToSection} />
      </main>
    </>
  )
}