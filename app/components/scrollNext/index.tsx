'use client';
import { ChevronDown } from 'lucide-react';
import React from 'react';
import styles from './scrollNext.module.scss';

interface ScrollNextProps {
  activeSection: string;
  scrollToSection: (sectionId: string) => void; 
}

const sectionIds = ['#about', '#skills', '#projects', '#contact']; 

const ScrollNext: React.FC<ScrollNextProps> = ({ activeSection, scrollToSection }) => {
  const currentSectionIndex = sectionIds.indexOf(`#${activeSection}`);
  const isLastSection = currentSectionIndex === sectionIds.length - 1;

  const scrollToNextSection = () => {
    const nextSection = (currentSectionIndex + 1) % sectionIds.length;
    scrollToSection(sectionIds[nextSection]);
  };

  return (
    <div className="w-100 flex justify-center">
      <div
        className={`${styles.scrollNext} fixed bottom-16 w-100 transform -translate-x-1/2 animate-bounce transition-transform duration-300 cursor-pointer`}
        onClick={scrollToNextSection}
      >
        <ChevronDown
          size={32}
          className={`${isLastSection ? 'rotate-180' : ''} transition-transform duration-300`}
        />
      </div>
    </div>
  );
};

export default ScrollNext;
