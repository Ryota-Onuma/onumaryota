



import type { InferGetStaticPropsType, NextPage } from "next";
import { removeDuplicate } from "@/lib/arrayUtil"
import { GetStaticPaths, GetStaticProps } from 'next'
import { NextSeo } from 'next-seo';
import { getPostsByTag, getAllTags } from "@/lib/api";
import { Tags } from '@/components/Tags'
import { Blog } from '@/components/blogs'


type Props = InferGetStaticPropsType<typeof getStaticProps>;

type PageProps = {
    posts: any;
    tags: string[];
    currentTag: string;
}

type PathParams = {
    tag: string;
}


export const getStaticPaths: GetStaticPaths<PathParams> = async () => {
    const tags = await getAllTags()

    const filteredTags = removeDuplicate<string>(tags).map(tag => tag.toLowerCase())
    return {
        paths: filteredTags.map((tag: string) => {
            return {
                params: {
                    tag: tag,
                },
            };
        }),
        fallback: false,
    };

};

export const getStaticProps: GetStaticProps<PageProps> = async context => {
    const { tag } = context.params as PathParams
    const posts = await getPostsByTag(tag.toLowerCase());
    const currentTag = tag
    const tags = await getAllTags()

    return {
        props: { posts, tags, currentTag },
    };
};



const Blogs: NextPage<Props> = ({ posts, tags, currentTag }: Props) => {
    return (
        <div className='page'>
            <NextSeo
                title={`Blog > ${currentTag}`}
            />
            <Blog posts={posts} currentTag={currentTag} />
            <Tags tags={tags} />
        </div>
    );
};

export default Blogs;