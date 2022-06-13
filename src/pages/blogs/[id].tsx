import type { InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";
import { getPosts, getAllTags } from "@/lib/api";
import { Pagenation, PER_PAGE } from '@/components/Pagenation.tsx'
import { splitArray } from '@/lib/arrayUtil.ts'
import { Blog } from '@/components/blogs'
import { Tags } from '@/components/Tags.tsx'
type Props = InferGetStaticPropsType<typeof getStaticProps>;


export const getStaticPaths: GetStaticPaths<PathParams> = async () => {
    const allPosts = await getPosts();
    const splittedPosts = splitArray(allPosts, PER_PAGE)

    return {
        paths: splittedPosts.map((_, i) => {
            return {
                params: {
                    id: `${i + 1}`,
                },
            };
        }),
        fallback: false,
    };

};

export const getStaticProps = async (context) => {
    let id = context.params.id
    if (!id) {
        id = 1
    }
    const allPosts = await getPosts();
    const splittedPosts = splitArray(allPosts, PER_PAGE)
    if (!parseInt(id) || parseInt(id) > splittedPosts.length) {
        id = 1
    }
    const posts = splittedPosts[parseInt(id) - 1]
    const tags = await getAllTags()
    const privious = parseInt(id) - 1
    const current = parseInt(id)
    const next = parseInt(id) + 1
    const begin = 1
    const end = splittedPosts.length
    return {
        props: { posts, tags, privious, current, next, begin, end },
    };
};


const Blogs: NextPage<Props> = ({ posts, tags, privious, current, next, begin, end }) => {
    return (
        <div className='page'>
            <Head>
                <title>onuma-ryota.com | Blog</title>
            </Head>
            <Blog posts={posts} />
            <Pagenation privious={privious} current={current} next={next} begin={begin} end={end} pathBase="/blogs" />
            <Tags tags={tags} />
        </div>
    );
};

export default Blogs;