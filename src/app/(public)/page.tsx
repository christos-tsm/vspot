import Image from "next/image";
import styles from './page.module.scss';
import { fetchPagesData } from "@/services/wordpress";
import { pagesIds } from "@/lib/pages/page-ids";
import { IImage } from "@/lib/interfaces/global";
import Categories from "@/components/categories";
import { IDiscoverItem, IPageData, IPost } from "@/lib/interfaces/pageData/homepage";
import CardsGrid from "@/components/common/cards/cardsGrid";
import Link from "next/link";
import PostCard from "@/components/common/cards/postCard";
import Features from "./_components/features/featuresList";
import FeaturesItem from "./_components/features/featuresItem";
import RegisterForm from "@/components/forms/register";
import SectionTitle from "@/components/common/typograhpy/sectionTitle";

export default async function Home() {
    const pageData: IPageData = await fetchPagesData(pagesIds.homepage.id);
    const { hero_section, about, locations, discover, featured_restaurants, featured_hotels, categories } = pageData.acf;
    return (
        <main className={styles.main}>
            <section className={`${styles.heroContainer}`} style={{ backgroundImage: `url(${pageData.acf.hero_section.image.url})` }}>
                <div className={styles.overlay}></div>
                <div className={`${styles.heroContent} container container--md`}>
                    <SectionTitle className={styles.heroText} title={hero_section.title} text={hero_section.text} />
                    <RegisterForm />
                </div>
                {hero_section.gallery &&
                    hero_section.gallery.map((image: IImage, index: number) =>
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
            <section className={`section container container--md ${styles.aboutContainer}`}>
                <SectionTitle className={styles.aboutTitle} title={about.title} text={about.text} />
                <Features>
                    {about.features ?
                        about.features.map((item) => <FeaturesItem key={item.icon.ID} item={item} />)
                        : null
                    }
                </Features>
                {about.link ?
                    <Link href={about.link.url} className="cta cta--secondary cta--fill">{about.link.title}</Link>
                    : null}
            </section>
            <section className={`section ${styles.featuredLists} container container--md`}>
                <div className={styles.featuredList}>
                    <SectionTitle title={featured_hotels.title} text={featured_hotels.text} />
                    <CardsGrid columns={2}>
                        {featured_hotels.hotels.map((post: IPost) => <PostCard key={post.ID} post={post} />)}
                    </CardsGrid>
                    <Link href={featured_hotels.link.url} className="cta cta--primary cta--fill">{featured_hotels.link.title}</Link>
                </div>
                <div className={styles.featuredList}>
                    <SectionTitle title={featured_restaurants.title} text={featured_restaurants.text} />
                    <CardsGrid columns={2}>
                        {featured_restaurants.restaurants.map((post: IPost) => <PostCard key={post.ID} post={post} />)}
                    </CardsGrid>
                    <Link href={featured_restaurants.link.url} className="cta cta--secondary cta--fill">{featured_restaurants.link.title}</Link>
                </div>
            </section>
            <section className={`${styles.discoverContainer} container container--md`}>
                <div className={styles.discoverHeader}>
                    <h3 className="sectionTitle">{discover.title}</h3>
                    <Image className={styles.cartImage} src={discover.cart_image.url} width={184} height={172} alt={discover.title} />
                    <Image className={styles.headerBackground} src={discover.background_texture.url} width={1184} height={160} alt={discover.title} />
                </div>
                <div className={styles.discoverContent}>
                    {discover.items && discover.items.map((item: IDiscoverItem, index: number) => {
                        return (
                            <div className={styles.discoverItem} key={`item-${index}`}>
                                <h4 className="sectionSubTitle">{item.title}</h4>
                                <div className={styles.discoverText} dangerouslySetInnerHTML={{ __html: item.text }} />
                                <Link href={item.link.url} className="cta cta--secondary cta--fill">{item.link.title}</Link>
                            </div>
                        );
                    })}
                </div>
            </section>
            {/* <section className={`${styles.categoriesContainer} section container container--md`}>
                <Categories categories={categories} />
            </section> */}
            <section className={`section ${styles.destinationsContainer} container container--md`}>
                <SectionTitle title={locations.title} text={locations.text} className={styles.destinationsTitle} />
                {locations.destinations &&
                    <CardsGrid columns={3}>
                        {
                            locations.destinations.map((destination: IPost) =>
                                <PostCard key={destination.ID} post={destination} />
                            )
                        }
                    </CardsGrid>
                }
                <a href={locations.link.url} className="cta cta--primary cta--fill">{locations.link.title}</a>
            </section>
            {/* {pageData.acf.connect &&
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
            } */}
        </main>
    );
}
