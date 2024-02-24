import { FC } from 'react';
import styles from './categories.module.scss';
import Category from "@/components/categories/category";
import Slider from "@/components/common/slider";
import { ICategories } from "@/lib/interfaces/pageData/homepage";

interface CategoriesProps {
    categories: ICategories[];
}

const Categories: FC<CategoriesProps> = ({ categories }) => {
    return (
        <div className={styles.container}>
            <Slider slidesPerView={4} autoplaySpeed={3000} showArrows>
                {categories.map(category =>
                    <Category key={category.icon.id} title={category.title} iconUrl={category.icon.url}
                        link={category.link} />
                )}
            </Slider>
        </div>
    );
};


export default Categories;