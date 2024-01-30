import Posts from "@/components/posts";
import Image from "next/image";
import styles from './page.module.scss';
import {fetchPagesData} from "@/services/wordpress";
import {pagesIds} from "@/lib/pages/page-ids";
import {InterfaceImage} from "@/lib/interfaces/global";
import SearchForm from "@/components/forms/search";
import Categories from "@/components/categories";
import PostCard from "@/components/common/cards/postCard";
import {IPost} from "@/lib/interfaces/pageData/homepage";
import CardsGrid from "@/components/common/cards/cardsGrid";

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
                    <Categories categories={pageData.acf.categories}/>
                </div>
                {heroSectionGallery &&
                    <div className={styles.heroGallery}>
                        {heroSectionGallery.map((image: InterfaceImage, index: number) =>
                            <div key={image.id} className={`${styles.heroImageContainer} heroImage-${image}`}>
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
            <section className={`${styles.destinationsContainer} container container--lg`}>
                <div className={styles.destinationsContent}>
                    <h1 className={`sectionTitle`}>{pageData.acf.locations.title}</h1>
                    <div dangerouslySetInnerHTML={{__html: pageData.acf.locations.text}}/>
                </div>
                {pageData.acf.locations.destinations &&
                    <CardsGrid columns={5}>
                        {
                            pageData.acf.locations.destinations.map((destination: IPost) =>
                                <PostCard key={destination.ID} post={destination}/>
                            )
                        }
                    </CardsGrid>
                }
            </section>
        </main>
    );
}
