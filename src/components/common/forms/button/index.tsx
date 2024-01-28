import styles from './button.module.scss';
import React, {FC} from "react";

interface Button {
    variation: 'primary' | 'secondary' | 'danger',
    text: string
}

const Button: FC<Button> = ({variation, text}) => {
    const variationClass = {
        primary: styles.primary,
        secondary: styles.secondary,
        danger: styles.danger,
    }[variation];

    return (
        <button className={`${styles.btn} ${variationClass}`}>
            {text}
        </button>
    );
};

export default Button;
