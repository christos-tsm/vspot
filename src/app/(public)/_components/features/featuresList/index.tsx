import React, { FC } from 'react'
import styles from './features.module.scss';

interface IFeaturesList {
    children: React.ReactNode
}

const FeaturesList: FC<IFeaturesList> = ({ children }) => {
    return (
        <div className={styles.container}>
            {children}
        </div >
    )
}

export default FeaturesList