import { FC } from 'react';
import styles from './social.module.scss';
import { BsTiktok, BsInstagram, BsFacebook } from "react-icons/bs";
// import { IImage } from '@/lib/interfaces/global';
import Image from 'next/image';
import { Options } from '@/lib/interfaces/options';
import { IImage } from '@/lib/interfaces/global';

interface ISocialMedia {
    footer_social_text: string;
    footer_social_title: string;
    footer_social_texture: IImage;
    facebook_url: string;
    instagram_url: string;
    tiktok_url: string
}

const SocialMedia: FC<ISocialMedia> = ({
    footer_social_text,
    footer_social_title,
    footer_social_texture,
    facebook_url,
    instagram_url,
    tiktok_url }) => {
    return (
        <div className={`${styles.container} container container--md`}>
            <div className={styles.socialTitle}>
                <Image className={styles.texture} src={footer_social_texture.url} width={150} height={130} alt={'buddies'} />
                <h4>{footer_social_title}</h4>
                <p>{footer_social_text}</p>
            </div>
            <div className={`${styles.tiktok} ${styles.socialSingle}`}>
                <a href={facebook_url} target='_blank' rel='noopener' aria-label='Social Media Link'>
                    <BsTiktok size={28} color={'#fff'} />
                </a>
            </div>
            <div className={`${styles.instagram} ${styles.socialSingle}`}>
                <a href={instagram_url} target='_blank' rel='noopener' aria-label='Social Media Link'>
                    <BsInstagram size={28} color={'#fff'} />
                </a>
            </div>
            <div className={`${styles.facebook} ${styles.socialSingle}`}>
                <a href={tiktok_url} target='_blank' rel='noopener' aria-label='Social Media Link'>
                    <BsFacebook size={28} color={'#fff'} />
                </a>
            </div>
        </div>
    )
}

export default SocialMedia