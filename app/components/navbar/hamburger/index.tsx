'use client';
import React, { useState } from 'react';
import { Pivot as HamburgerIcon } from 'hamburger-react';
import styles from './hamburger.module.scss';
import { useTheme } from 'next-themes';

interface Props {
    links: React.ReactNode[];
    utils: React.ReactNode[];
}

const Hamburger = ({ links, utils }: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const { resolvedTheme } = useTheme()

    return (
        <>
            <HamburgerIcon toggled={isOpen} toggle={setIsOpen} color={resolvedTheme === "light" ? '#FF2D92' : '#E31B6D'} />
            <div className={`${styles.sidenav} fixed right-0 w-full h-full shadow-lg transition-transform transform ${isOpen ? 'translate-x-0' : 'translate-x-[201vw]'}`}>
                <div className="flex flex-col">
                    {/* Render links */}
                    {links.map((link, index) => (
                        <div 
                            key={`link-${index}`} 
                            className={`${styles.link} transition-opacity duration-300 p-4`} 
                            style={{
                                opacity: isOpen ? 1 : 0,
                                transform: isOpen ? 'translateX(0)' : 'translateX(-20px)',
                                transitionDelay: isOpen ? `${index * 100}ms` : '0ms'
                            }} 
                            onClick={() => setIsOpen(false)}
                        >
                            {link}
                        </div>
                    ))}

                    {/* Render utility components */}
                    {utils.map((util, index) => (
                        <div 
                            key={`util-${index}`}
                            className={`${styles.link} transition-opacity duration-300 p-4`} 
                            style={{
                                opacity: isOpen ? 1 : 0,
                                transform: isOpen ? 'translateX(0)' : 'translateX(-20px)',
                                transitionDelay: isOpen ? `${(links.length + index) * 100}ms` : '0ms'
                            }} 
                        >
                            {util}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Hamburger;
