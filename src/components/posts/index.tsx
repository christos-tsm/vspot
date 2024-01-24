import PostItem from "@/components/posts/postsItem";
import {fetchPosts} from "@/services/wordpress";

interface Post {
    title: {
        rendered: string
    }
}

const Posts = async () => {
    const posts = await fetchPosts();

    return (
        <>
            {posts.map((post: Post) => post.title.rendered)}
        </>
    );
};

export default Posts;