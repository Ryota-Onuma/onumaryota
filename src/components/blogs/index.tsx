import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Icon } from '@iconify/react';
import { Loading } from '@/components/Loading.tsx'
import { Tag } from '@/components/Tags.tsx'


export const Blog = (props) => {
    return (
        <div>
            <div className='sectionComponent'>
                <div className='flex justify-start items-center my-5'>
                    {props.currentTag ? (<h2 className='text-enhanceColor text-5xl font-bold w-full'>「{props.currentTag}」がついたBlog</h2>) :
                        (<h2 className='text-enhanceColor text-5xl font-bold'>Blog</h2>)}
                    {!props.currentTag && (
                        <div className='flex justify-start items-center w-full h-2px ml-9'>
                            <span className='inline-block my-auto bg-enhanceColor w-8/12 h-full'></span>
                        </div>
                    )}

                </div>
            </div>
            <div className='sectionComponent'>
                {props.posts && props.posts.map(post => <EachBlog post={post} key={post.title} />)}
            </div>
        </div>
    )
}

const EachBlog = (props) => {
    const [isLoading, setLoading] = useState(true)

    const EachBlogInner = (prop) => {

        return (
            <div className='w-full flex flex-col-reverse items-center lg:flex-row lg:justify-between'>
                <div className='w-full lg:w-5/12 flex flex-col items-start'>
                    <h2 className='text-xl lg:text-3xl text-enhanceColor my-4 font-bold leading-none'>{prop.post.title}</h2>
                    <p className='flex items-center justify-center'><Icon icon="bx:time" />&ensp;{prop.post.date}</p>
                    <div className='w-full flex justify-start flex-wrap gap-3 my-2'>
                        {prop.post.tags.map(tag => <Tag tag={tag} key={tag} />)}
                    </div>
                    <div>{prop.post?.introduction}</div>
                </div>
                <div className='w-full h-60 lg:w-5/12 flex flex-col items-end relative'>
                    <div className='absolute top-0 w-full h-full flex flex-col items-center justify-center'>
                        <Loading isLoading={isLoading} />
                    </div>
                    <div className='w-full h-full flex flex-col items-center justify-center my-3'>
                        <Image
                            src={prop.post.thumbnail}
                            layout='fill'
                            alt={`${prop.post.title}のサムネイル`}
                            objectFit="contain"
                            onLoadingComplete={(e) => setLoading(false)}
                        />
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className='w-full mb-9 cursor-pointer'>
            {props.post.externalUrl ? (
                <a href={props.post.externalUrl} target="_blank" key={props.post.externalUrl}>
                    <EachBlogInner post={props.post} />
                </a>
            ) :
                <Link href={`/blog/${props.post.slug}`} key={props.post.slug}>
                    <div>
                        <EachBlogInner post={props.post} />
                    </div>
                </Link>
            }
        </div>
    )
}
