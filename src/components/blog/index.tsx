import React, { useState, useEffect } from 'react'
import { Tag } from '@/components/Tags.tsx'
import Image from 'next/image'
import { Icon } from '@iconify/react';
import { marked } from 'marked'
import Prism from 'prismjs'
export const Post = (props: any) => {
    const [isLoading, setLoading] = useState(true)
    const [content, setContent] = useState<string | JSX.Element | JSX.Element[]>("")
    useEffect(() => {
        marked.setOptions({
            breaks: true,
            langPrefix: "language-",
            highlight: (code: string, lang: string) => {
                if (lang && lang.match(":")) {
                    lang = lang.substring(0, lang.indexOf(":"));
                }
                if (lang in Prism.languages) {
                    return Prism.highlight(code, Prism.languages[lang], lang);
                }
                return code;
            }
        });
        setContent(props.post.content)
        Prism.highlightAll()
    }, [content])
    const rawMarkup = (markup: string) => {

        const rawMarkup = marked(markup);
        return { __html: rawMarkup };
    };
    return (

        <article className='sectionComponent flex flex-col items-center'>
            <div className="w-full font-bold h-80 relative flex justify-center before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-80 before:z-10 before:bg-blackMask">
                <Image
                    src={props.post.thumbnail}
                    layout='fill'
                    alt={`${props.post.title}のサムネイル`}
                    objectFit="cover"
                    onLoadingComplete={(e) => setLoading(false)}
                />
                <div className='w-9/12 h-80 absolute top-0 z-20 flex flex-col justify-center items-start'>
                    <div className='flex flex-col items-start'>
                        <h1 className='text-xl lg:text-3xl text-enhanceColor font-bold'>{props.post.title}</h1>
                        <p className='flex items-center justify-center my-3'><Icon icon="bx:time" />&ensp;{props.post.date}</p>
                        <div className='flex justify-start gap-1'>
                            {props.post.tags && props.post.tags.map(tag => <Tag key={tag} tag={tag} />)}
                        </div>
                    </div>
                </div>
                {isLoading &&
                    <div className='pcBlogLoadingContainer' />
                }
            </div>

            <div className='postBody'>
                <div dangerouslySetInnerHTML={rawMarkup(content.toString())} />
            </div>
        </article >

    )
}
