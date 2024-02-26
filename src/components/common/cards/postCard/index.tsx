import React, { FC } from 'react';
import Image from "next/image";
import styles from './postCard.module.scss';
import { IPost } from "@/lib/interfaces/pageData/homepage";
import Link from "next/link";

interface IPostCard {
    post: IPost;
}

const PostCard: FC<IPostCard> = ({ post }) => {
    const { ID, post_thumbnail_url, post_title, post_type, post_name, taxonomies, acf_fields } = post;

    return (
        <article id={`post-${ID}`} className={`${styles.container} postCard--${post_type}`}>
            <Link href={`/${post_type}/${post_name}/`} className={styles.postURL} aria-label={`Διαβάστε περισσότερα - ${post_title}`} ></Link>
            {post_thumbnail_url &&
                <div className={styles.imageContainer}>
                    <Image
                        src={post_thumbnail_url}
                        alt={post_title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </div>
            }
            <div className={styles.postCardContent}>
                <h3 className={styles.postCardTitle}>{post_title}</h3>
                {taxonomies && Object.keys(taxonomies).length > 0 && Object.entries(taxonomies).map(([taxonomyName, terms], index) => (
                    <div key={taxonomyName} className={`${styles.badge} badge badge--${taxonomyName}`}>
                        {terms.map(term => (
                            <span key={term.term_id}>{term.name}</span>
                        ))}
                    </div>
                ))}
            </div>
            {acf_fields.excerpt &&
                <div className={styles.postCardExcerpt}>
                    <p>{acf_fields.excerpt}</p>
                </div>
            }
        </article>
    )
}

export default PostCard