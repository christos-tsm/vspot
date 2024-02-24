import React, { FC } from 'react';
import Image from "next/image";
import styles from './postCard.module.scss';
import { IPost } from "@/lib/interfaces/pageData/homepage";
import Link from "next/link";

interface PostCardProps {
    post: IPost;
}

const PostCard: FC<PostCardProps> = ({ post }) => {
    const { ID, post_thumbnail_url, post_title, post_type, post_name } = post;
    return (
        <article id={`post-${ID}`} className={`${styles.postCard} postCard--${post_type}`}>
            <Link href={`/${post_type}/${post_name}/`} className={styles.postURL}></Link>
            {post_thumbnail_url &&
                <div className={styles.postCardImageContainer}>
                    <Image src={post_thumbnail_url} alt={post_title} fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                </div>
            }
            <h3 className={styles.postCardTitle}>{post_title}</h3>
        </article>
    );
};

export default PostCard;