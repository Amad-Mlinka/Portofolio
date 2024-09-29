import React from 'react';
import ThemeSwitch from '../themeSwitch';
import Link from 'next/link';
import styles from './navbar.module.scss';
import Hamburger from './hamburger';

const Navbar = () => {
    return (
        <>
            <div className={`${styles.navbar}`}>
                <div className={`flex justify-between p-4`}>
                    <div className={`${styles.left} flex items-center`}>
                        <div className={`${styles.title}`}>
                            Amad Mlinaric
                        </div>
                    </div>
                    <div className={`${styles.middle} hidden md:flex w-2/5 justify-between items-center gap-3`}>
                        <Link href="">
                            <span className={styles.link}>About</span>
                        </Link>
                        <Link href="">
                            <span className={styles.link}>Skills</span>
                        </Link>
                        <Link href="">
                            <span className={styles.link}>Projects</span>
                        </Link>
                        <Link href="">
                            <span className={styles.link}>Contact</span>
                        </Link>
                        <Link href="">
                            <span className={styles.link}>Resume</span>
                        </Link>
                    </div>
                    <div className={`${styles.hamburger} flex md:hidden justify-end`}>
                    <Hamburger 
                        links={[
                            <Link href="" key="about">
                                <span className={styles.link}>About</span>
                            </Link>,
                            <Link href="" key="skills">
                                <span className={styles.link}>Skills</span>
                            </Link>,
                            <Link href="" key="projects">
                                <span className={styles.link}>Projects</span>
                            </Link>,
                            <Link href="" key="contact">
                                <span className={styles.link}>Contact</span>
                            </Link>,
                            <Link href="" key="resume">
                                <span className={styles.link}>Resume</span>
                            </Link>
                        ]}
                        utils={[
                            <ThemeSwitch key="theme-switch" />
                        ]}
                    />
                    </div>
                    <div className={`${styles.right} hidden md:flex items-center`}>
                        <ThemeSwitch/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
