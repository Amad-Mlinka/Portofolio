'use client';
import "./ui/globals.scss";
import "./tailwind.css";
import Providers from "./providers";
import Navbar from "./components/navbar";
import { Quicksand } from 'next/font/google';
import ScrollNext from "./components/scrollNext";
import { useEffect, useState } from 'react';

const sectionIds = ['about', 'skills', 'projects', 'contact']; 

const quicksand = Quicksand({
  subsets: ['latin'],
  display: 'swap',
});

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const [activeSection, setActiveSection] = useState<string>(sectionIds[0]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5, 
    };

    const handleScroll = (entries: IntersectionObserverEntry[]) => {
      let maxRatio = 0;
      let mostVisibleSection = '';

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const intersectionRatio = entry.intersectionRatio;

          if (intersectionRatio > maxRatio) {
            maxRatio = intersectionRatio;
            mostVisibleSection = entry.target.id;
          }
        }
      });

      if (mostVisibleSection) {
        console.log(`Most Visible Section: ${mostVisibleSection}`); 
        setActiveSection(mostVisibleSection); 
        window.history.replaceState({}, '', `#${mostVisibleSection}`);
      }
    };

    const observer = new IntersectionObserver(handleScroll, options);

    sectionIds.forEach((sectionId) => {
      const sectionElement = document.getElementById(sectionId);
      if (sectionElement) {
        observer.observe(sectionElement);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const sectionElement = document.getElementById(sectionId.slice(1)); 
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState({}, '', sectionId); 
    }
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${quicksand.className} antialiased`}>
        <Providers>
          <Navbar activeSection={activeSection} scrollToSection={scrollToSection} />
          <main>
            {children}
            <ScrollNext activeSection={activeSection} scrollToSection={scrollToSection} />
          </main>
        </Providers>
      </body>
    </html>
  );
}
