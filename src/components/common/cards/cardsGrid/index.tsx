import React, {FC} from 'react';
import styles from './cardsGrid.module.scss';
import {IPost} from "@/lib/interfaces/pageData/homepage";

interface CardsGridProp {
    children: React.ReactNode;
    columns: number;
}

const CardsGrid: FC<CardsGridProp> = ({children, columns}) => {
    return (
        <div className={styles.grid} style={{gridTemplateColumns: `repeat(${columns}, 1fr)`}}>
            {children}
        </div>
    );
};

export default CardsGrid;