import Posts from "@/components/posts";
import {fetchPagesData} from "@/services/wordpress";
import styles from './page.module.scss';
import {pagesIds} from "@/lib/pages/page-ids";
import Image from "next/image";
import SearchForm from "@/components/forms/search";
import Categories from "@/components/categories";

export default async function Home() {
    const pageData = await fetchPagesData(pagesIds.homepage.id);
    const heroSectionGallery = pageData.acf.hero_section.gallery;
    return (
        <main className={styles.main}>
            <section className={`${styles.heroContainer} container container--md`}>
                <div className={styles.heroContent}>
                    <h1 dangerouslySetInnerHTML={{__html: pageData.acf.hero_section.title}}></h1>
                    <div dangerouslySetInnerHTML={{__html: pageData.acf.hero_section.text}}/>
                    <SearchForm/>
                    <Categories/>
                </div>
                {heroSectionGallery &&
                    <div className={styles.heroGallery}>
                        {heroSectionGallery.map((image: Image, index: number) =>
                            <div key={image.id} className={`${styles.heroImageContainer} heroImage-${image.id}`}>
                                <Image fill
                                       priority={index === 0}
                                       src={image.sizes.large}
                                       alt={image.alt}
                                       sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            </div>)
                        }
                    </div>
                }
            </section>

            {/*<Posts/>*/}
        </main>
    );
}
