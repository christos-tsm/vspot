import React, { FC } from 'react';
import styles from './cardsGrid.module.scss';

interface CardsGridProp {
    children: React.ReactNode;
    columns: number;
}

const CardsGrid: FC<CardsGridProp> = ({ children, columns }) => {
    return (
        <div className={styles.container} style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
            {children}
        </div>
    );
};

export default CardsGrid;