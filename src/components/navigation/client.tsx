'use client'

import React, { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import styles from './navigation.module.scss';
import { MenuItem } from "@/lib/interfaces/menu";
import { Options } from "@/lib/interfaces/options";
import { usePathname } from 'next/navigation';

const NavigationClient = ({ options, menuItems }: { options: Options, menuItems: MenuItem[] }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            const threshold = 50;
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
                        <Image className={styles.logoImage} src={options.header_logo.url} alt={options.header_logo.alt} width={130} height={35} />
                        <Image className={styles.logoImageScrolled} src={options.header_logo_scrolled.url} alt={options.header_logo_scrolled.alt} width={130} height={35} />
                    </Link>
                </div>
                <nav className={styles.navContainer}>
                    <ul className={styles.navList}>
                        {menuItems.map(menuItem =>
                            <li key={menuItem.ID} className={styles.navListItem}>
                                <Link href={menuItem.url} className={`${styles.navListItemLink}  ${pathname === menuItem.url ? styles.navActive : ''}`}>
                                    <span className={styles.navText}>{menuItem.title}</span>
                                </Link>
                            </li>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default NavigationClient;
