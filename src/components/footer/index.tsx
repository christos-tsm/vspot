import { MenuItem } from "@/lib/interfaces/menu";
import { fetchMenuItems, fetchThemeOptions } from "@/services/wordpress";
import styles from './footer.module.scss';
import Link from "next/link";
import Image from "next/image";
import SocialMedia from "./social";
import { Fragment } from "react";
import { Options } from "@/lib/interfaces/options";

export const Footer = async () => {
    const {
        header_logo,
        footer_menu_text,
        footer_social_text,
        footer_social_title,
        footer_social_texture,
        facebook_url,
        instagram_url,
        tiktok_url
    }: Options = await fetchThemeOptions();
    const menuIds = ['footer-menu-1', 'footer-menu-2', 'footer-menu-3', 'footer-menu-4'];
    const menuItemsPromises = menuIds.map(id => fetchMenuItems(id));
    const menuItems = await Promise.all(menuItemsPromises);

    return (
        <>
            <footer className={styles.container}>
                <SocialMedia
                    footer_social_text={footer_social_text}
                    footer_social_title={footer_social_title}
                    footer_social_texture={footer_social_texture}
                    facebook_url={facebook_url}
                    instagram_url={instagram_url}
                    tiktok_url={tiktok_url}
                />
                <div className={`${styles.content} container container--md`}>
                    <div className={styles.footerLogoContainer}>
                        <Link href={'/'}>
                            <Image src={header_logo.url} width={130} height={35} alt={'Buddies'} />
                        </Link>
                        {footer_menu_text && <p className={styles.footerText}>{footer_menu_text}</p>}
                    </div>
                    {menuItems && menuItems.map((menuGroup, index) => {
                        return (
                            <ul key={`menu-${index}`} className={styles.footerMenu}>
                                {menuGroup.map((menu: MenuItem, index: number) => {
                                    return (
                                        <Fragment key={menu.ID}>
                                            {menu.attr_title ?
                                                <li className={styles.footerMenuTitle} key={menu.ID}>
                                                    <h5>{menu.title}</h5>
                                                </li>
                                                :
                                                <li className={`${styles.footerMenuItem}`} key={menu.ID}>
                                                    <Link href={menu.url} className={styles.footerMenuItemLink}>
                                                        {menu.title}
                                                    </Link>
                                                </li>
                                            }

                                        </Fragment>
                                    )
                                })}
                            </ul>
                        )
                    })}
                </div>
                <div className={`${styles.copyrightsContainer} container container--md`}>
                    <p className={styles.copyrights}>Copyrights &copy; Reserved - Buddies {new Date().getFullYear()}</p>
                    <p className={styles.version}>v1.0.0 BETA</p>
                </div>
            </footer>
        </>
    );
};

export default Footer;
