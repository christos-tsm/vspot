import styles from './button.module.scss';
import React, { FC, ButtonHTMLAttributes } from "react";

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
    variation: 'primary' | 'secondary' | 'danger',
    children: string | React.ReactNode
}

const Button: FC<IButton> = ({ variation, children, ...props }) => {
    const variationClass = {
        primary: styles.primary,
        secondary: styles.secondary,
        danger: styles.danger,
    }[variation];

    return (
        <button className={`${styles.btn} ${variationClass}`} {...props}>
            {children}
        </button>
    );
};

export default Button;
