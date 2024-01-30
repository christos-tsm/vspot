import {FC} from 'react';
import styles from './categories.module.scss';
import Category from "@/components/categories/category";
import Slider from "@/components/common/slider";
import {Categories} from "@/lib/interfaces/pageData/homepage";

interface CategoriesProps {
    categories: Categories[];
}

const Categories: FC<CategoriesProps> = ({categories}) => {
    return (
        <div className={styles.container}>
            <Slider slidesPerView={3} autoplaySpeed={3000} showArrows>
                {categories.map(category =>
                    <Category key={category.icon.id} title={category.title} iconUrl={category.icon.url}
                              link={category.link}/>
                )}
            </Slider>
        </div>
    );
};


export default Categories;