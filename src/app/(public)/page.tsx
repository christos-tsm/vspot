import Image from "next/image";
import styles from './page.module.scss';
import { fetchPagesData } from "@/services/wordpress";
import { pagesIds } from "@/lib/pages/page-ids";
import { IImage } from "@/lib/interfaces/global";
import SearchForm from "@/components/forms/search";
import Categories from "@/components/categories";
import PostCard from "@/components/common/cards/postCard";
import { IPageData, IPost } from "@/lib/interfaces/pageData/homepage";
import CardsGrid from "@/components/common/cards/cardsGrid";
import Link from "next/link";

export default async function Home() {
    const pageData: IPageData = await fetchPagesData(pagesIds.homepage.id);
    const hotelsData = pageData.acf.featured_hotels;
    const restaurantsData = pageData.acf.featured_restaurants;

    const heroSectionGallery = pageData.acf.hero_section.gallery;
    return (
        <main className={styles.main}>
            <section className={`${styles.heroContainer}`} style={{ backgroundImage: `url(${pageData.acf.hero_section.image.url})` }}>
                <div className={styles.overlay}></div>
                <div className={styles.heroContent}>
                    <h1 dangerouslySetInnerHTML={{ __html: pageData.acf.hero_section.title }}></h1>
                    <div dangerouslySetInnerHTML={{ __html: pageData.acf.hero_section.text }} />
                    <div className={styles.searchFormContainer}>
                        <SearchForm />
                    </div>
                </div>
                {heroSectionGallery &&
                    heroSectionGallery.map((image: IImage, index: number) =>
                        <div key={image.ID} className={`${styles.heroBottomImage} heroImage-${image.ID}`}>
                            <Image
                                fill
                                priority={index === 0}
                                src={image.url}
                                alt={image.alt}
                                sizes="(max-width: 768px) 90vw, (max-width: 1200px) 1000px, 1000px"
                            />
                        </div>)
                }
            </section>
            <section className={`container container--md`}>
                <div className="section-title-container">
                    <h2>{hotelsData.title}</h2>
                    <div dangerouslySetInnerHTML={{ __html: hotelsData.text }} />
                </div>
                <div className="posts-grid">
                    <CardsGrid columns={5}>
                        {hotelsData.hotels.map((post: IPost) => <PostCard key={post.ID} post={post} />)}
                    </CardsGrid>
                </div>
            </section>
            <section className={`container container--md`}>
                <div className="section-title-container">
                    <h2>{restaurantsData.title}</h2>
                    <div dangerouslySetInnerHTML={{ __html: restaurantsData.text }} />
                </div>
                <div className="posts-grid">
                    <CardsGrid columns={5}>
                        {restaurantsData.restaurants.map((post: IPost) => <PostCard key={post.ID} post={post} />)}
                    </CardsGrid>
                </div>
            </section>
            <section className={`${styles.destinationsContainer} container container--lg`}>
                <div className={styles.destinationsContent}>
                    <h2 className={`sectionTitle`}>{pageData.acf.locations.title}</h2>
                    <div dangerouslySetInnerHTML={{ __html: pageData.acf.locations.text }} />
                </div>
                {pageData.acf.locations.destinations &&
                    <CardsGrid columns={5}>
                        {
                            pageData.acf.locations.destinations.map((destination: IPost) =>
                                <PostCard key={destination.ID} post={destination} />
                            )
                        }
                    </CardsGrid>
                }
            </section>
            {pageData.acf.connect &&
                <section className={`${styles.connectContainer} container container--md`}>
                    <div className={styles.connectImage}>
                        {pageData.acf.connect.image &&
                            <Image src={pageData.acf.connect.image.url} alt={pageData.acf.connect.title} fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />}
                    </div>
                    <div className={styles.connectContent}>
                        <h2 className='sectionTitle'>{pageData.acf.connect.title}</h2>
                        <div dangerouslySetInnerHTML={{ __html: pageData.acf.connect.text }} />
                        <Link href={pageData.acf.connect.link.url}
                            className={'cta cta--primary cta--fill'}>{pageData.acf.connect.link.title}</Link>
                    </div>
                </section>
            }
        </main>
    );
}
