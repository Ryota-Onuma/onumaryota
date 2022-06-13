import React, { useEffect } from 'react'
import { NextPage, InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Head from "next/head";
import { getPosts, getPostBySlug, getAllTags } from "@/lib/api";

type Props = InferGetStaticPropsType<typeof getStaticProps>;
import { Tags } from '@/components/Tags.tsx'
import { Post } from "@/components/blog/index.tsx"



/**
 * 記事のパスを取得する
 */
export const getStaticPaths = async () => {
    const posts = await getPosts(["slug"]);

    return {
        paths: posts.map((post) => {
            return {
                params: {
                    slug: post.slug,
                },
            };
        }),
        fallback: false,
    };
};

/**
 * 記事の内容を取得する
 */
export const getStaticProps = async ({ params }: any) => {
    const post = await getPostBySlug(params.slug, ["slug", "title", "date", "content", "thumbnail", "tags"]);
    const tags = await getAllTags()
    return {
        props: {
            post: {
                ...post,
            },
            tags: tags
        },
    };
};

const Blog: NextPage<Props> = ({ post, tags }) => {

    const router = useRouter();
    if (!router.isFallback && !post?.slug) {
        return <ErrorPage statusCode={404} />;
    }
    return (
        <div className='page'>
            <Head>
                <title>{`onuma-ryota.com | ${post.title}`}</title>
                <meta name="description" content={`onuma-ryota.com | ${post.introduction}`} />
            </Head>
            <div className='w-full lg:w-9/12 mx-auto'>
                <Post post={post}
                />
                <Tags tags={tags} />
            </div>
        </div>
    );
};

export default Blog;