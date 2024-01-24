import React from 'react';
import {fetchMenuItems, fetchThemeOptions} from "@/services/wordpress";
import styles from './navigation.module.scss';
import Image from "next/image";
import Link from "next/link";
import {MenuItem} from "@/lib/interfaces/menu";

const Navigation = async () => {
    const options = await fetchThemeOptions();
    const menuItems: MenuItem[] = await fetchMenuItems('header-menu');

    return (
        <header className={`${styles.container} container container--md`}>
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
        </header>
    );
};

export default Navigation;