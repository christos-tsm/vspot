import { FC } from 'react'
import styles from './sectionTitle.module.scss';

interface ISectionTitle {
    title: string;
    text?: string | TrustedHTML;
    className?: string;
}

const SectionTitle: FC<ISectionTitle> = ({ title, text, className }) => {
    return (
        <div className={`${styles.container} ${className ? className : ''}`}>
            <h2 className="sectionTitle">{title}</h2>
            {text ? <div dangerouslySetInnerHTML={{ __html: text }} /> : null}
        </div>
    )
}

export default SectionTitle