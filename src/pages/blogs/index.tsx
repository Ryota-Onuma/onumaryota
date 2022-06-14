import type { InferGetStaticPropsType, NextPage } from "next";
import { NextSeo } from 'next-seo';
import { getPosts, getAllTags, getZennArticle } from "@/lib/api";
import { Blog } from '@/components/blogs'
import { Tags } from '@/components/Tags'
import { Pagenation, PER_PAGE } from '@/components/Pagenation'
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
            <NextSeo
                title="Blog"
            />
            <Blog posts={posts} />
            <Pagenation privious={privious} current={current} next={next} begin={begin} end={end} pathBase="/blogs" />
            <Tags tags={tags} />
        </div>
    );
};

export default Blogs;