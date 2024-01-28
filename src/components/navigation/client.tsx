'use client'

import React, {useState, useEffect} from 'react';
import Image from "next/image";
import Link from "next/link";
import styles from './navigation.module.scss';
import {MenuItem} from "@/lib/interfaces/menu";
import {Options} from "@/lib/interfaces/options";

const NavigationClient = ({options, menuItems}: { options: Options, menuItems: MenuItem[] }) => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const threshold = 50; // Set your threshold
            setIsScrolled(window.scrollY > threshold);
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`${styles.container} ${isScrolled ? styles.headerScrolled : ''}`}>
            <div className={`${styles.headerContent} container container--md`}>
                <div className={styles.logoContainer}>
                    <Link href={'/'} className={styles.logo}>
                        <Image src={options.header_logo.url} alt={options.header_logo.alt} width={50} height={50}/>
                    </Link>
                </div>
                <nav className={styles.navContainer}>
                    <ul className={styles.navList}>
                        {menuItems.map(menuItem =>
                            <li key={menuItem.ID} className={styles.navListItem}>
                                <Link href={menuItem.url} className={styles.navListItemLink}>{menuItem.title}</Link>
                            </li>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default NavigationClient;
