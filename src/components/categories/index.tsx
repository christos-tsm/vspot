import {Carousel} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styles from './categories.module.scss';
import Category from "@/components/categories/category";
import Slider from "@/components/common/slider";

const Categories = () => {
    const categories = [
        {
            title: 'Category Title 1',
            icon: 'https://vspot-headles.local',
            id: 1,
        },
        {
            title: 'Category Title 2',
            icon: 'https://vspot-headles.local',
            id: 2,
        },
        {
            title: 'Category Title 3',
            icon: 'https://vspot-headles.local',
            id: 3,
        },
        {
            title: 'Category Title 4',
            icon: 'https://vspot-headles.local',
            id: 4,
        },
        {
            title: 'Category Title 5',
            icon: 'https://vspot-headles.local',
            id: 53,
        },
        {
            title: 'Category Title 6',
            icon: 'https://vspot-headles.local',
            id: 63,
        },
        {
            title: 'Category Title 7',
            icon: 'https://vspot-headles.local',
            id: 37,
        },
        {
            title: 'Category Title 8',
            icon: 'https://vspot-headles.local',
            id: 38,
        },
    ];

    return (
        <div className={styles.container}>
            <Slider slidesPerView={3} autoplaySpeed={3000} showArrows={true} showDots={true}>
                {categories.map(category =>
                    <Category key={category.id} title={category.title} iconUrl={category.icon}/>
                )}
            </Slider>
        </div>
    );
};


export default Categories;