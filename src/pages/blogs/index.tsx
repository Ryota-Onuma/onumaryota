import type { InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";
import { getPosts, getAllTags, getZennArticle } from "@/lib/api";
import { Blog } from '@/components/blogs'
import { Tags } from '@/components/Tags.tsx'
import { Pagenation, PER_PAGE } from '@/components/Pagenation.tsx'
import { splitArray } from '@/lib/arrayUtil.ts'
type Props = InferGetStaticPropsType<typeof getStaticProps>;


export const getStaticProps = async (context) => {
    let id = 5
    const allPosts = await getPosts();
    const splittedPosts = splitArray(allPosts, PER_PAGE)
    const posts = splittedPosts[0]
    const tags = await getAllTags()
    const privious = 0
    const current = 1
    const next = 2
    const begin = 1
    const end = splittedPosts.length
    return {
        props: { posts, tags, privious, current, next, begin, end },
    };
};


const Blogs: NextPage<Props> = ({ posts, tags, privious, current, next, begin, end, zennArticle }) => {
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