'use client';
import React, { useEffect, useState } from 'react';
import ThemeSwitch from '../themeSwitch';
import styles from './navbar.module.scss';
import Hamburger from './hamburger';

const sections = ['about', 'skills', 'projects', 'contact', 'resume'];

interface NavbarProps {
    activeSection: string;
    scrollToSection: (sectionId: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeSection, scrollToSection }) => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <nav className={`${styles.navbar} ${isScrolled ? '' : 'bg-transparent'}`}>
            <div className={`flex justify-between p-4`}>
                <div className={`${styles.left} flex items-center`}>
                    <div className={`${styles.title}`}>Amad Mlinaric</div>
                </div>
                <div className={`${styles.middle} hidden md:flex w-2/5 justify-between items-center gap-3`}>
                    {sections.map((section) => (
                        <span
                            key={section}
                            className={`${styles.link} ${activeSection === section ? styles.active : ''}`}
                            onClick={() => scrollToSection(`#${section}`)} 
                        >
                            {section.charAt(0).toUpperCase() + section.slice(1)}
                        </span>
                    ))}
                </div>
                <div className={`${styles.hamburger} flex md:hidden justify-end`}>
                    <Hamburger
                        links={sections.map((section) => (
                            <span
                                key={section}
                                className={`${styles.link} ${activeSection === section ? styles.active : ''}`}
                                onClick={() => scrollToSection(`#${section}`)}
                            >
                                {section.charAt(0).toUpperCase() + section.slice(1)}
                            </span>
                        ))}
                        utils={[<ThemeSwitch key="theme-switch" />]}
                    />
                </div>
                <div className={`${styles.right} hidden md:flex items-center`}>
                    <ThemeSwitch />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
