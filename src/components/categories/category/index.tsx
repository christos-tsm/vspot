import {FC} from 'react';
import Image from "next/image";
import styles from './category.module.scss';
import Link from "next/link";

type Props = {
    title: string;
    iconUrl: string;
    link: {
        title: string;
        url: string;
    }
}

const Category: FC<Props> = ({title, iconUrl, link}) => {
    return (
        <div className={styles.container}>
            <Link href={link.url} className={styles.cartegoryLink}/>
            <div className={styles.icon}>
                <Image src={iconUrl} alt={`vSpot - ${title} στον βόλο`} width={25} height={25}/>
            </div>
            <h3 className={styles.title}>{title}</h3>
            <Link className={`${styles.cta} cta cta--primary`} href={link.url}>{link.title}</Link>
        </div>
    );
};

export default Category;