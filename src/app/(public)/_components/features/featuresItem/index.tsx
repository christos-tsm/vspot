import React, { FC } from 'react';
import styles from './featuresItem.module.scss';
import { IFeatures } from '@/lib/interfaces/pageData/homepage';
import Image from 'next/image';


interface IFeaturesComp {
    item: IFeatures;
}

const FeaturesItem: FC<IFeaturesComp> = ({ item }) => {
    const { title, text, icon } = item;

    return (
        <div className={styles.container}>
            {icon ? <Image src={icon.url} width={75} height={80} alt={title} /> : null}
            <div className={styles.content}>
                <h3 className='sectionSubTitle'>{title}</h3>
                <div dangerouslySetInnerHTML={{ __html: text }} />
            </div>
        </div>
    )
}

export default FeaturesItem