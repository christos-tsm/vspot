import Posts from "@/components/posts";
import {fetchPagesData} from "@/services/wordpress";
import styles from './page.module.scss';
import {pagesIds} from "@/lib/pages/page-ids";

export default async function Home() {
    const pageData = await fetchPagesData(pagesIds.homepage.id);

    return (
        <main className={`${styles.main} container container--md`}>
            <h1>{pageData.acf.hero_section.title}</h1>
            <div dangerouslySetInnerHTML={{__html: pageData.acf.hero_section.text}}/>
            <Posts/>
        </main>
    );
}
