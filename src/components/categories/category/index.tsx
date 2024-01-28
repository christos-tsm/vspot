import {FC} from 'react';

type Props = {
    title: string,
    iconUrl: string
}

const Category: FC<Props> = ({title, iconUrl}) => {
    return (
        <div>
            <h3>{title}</h3>
            <p>{iconUrl}</p>
        </div>
    );
};

export default Category;