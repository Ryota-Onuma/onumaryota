
import { countDuplicate, removeDuplicate } from "@/lib/arrayUtil"
import Link from 'next/link'

type TagsProps = {
    tags?: string[];
}
type TagProps = {
    tags?: string[];
    tag?: string;
}

export const Tags = (props: TagsProps) => {
    const tags = removeDuplicate<string>(props.tags)
    return (
        <div className='sectionComponent'>
            <div className='w-full border-2 border-solid border-subColor p-5 border-box flex justify-start items-center flex-wrap'>
                {tags && tags.map((tag: string) => <Tag tags={props.tags} tag={tag} key={tag} />)}
            </div>
        </div>
    )
}

export const Tag = (props: TagProps) => {
    return (
        <Link href={`/blogs/tags/${props.tag?.toLowerCase()}`}>
            <span className='inline-block bg-subColor py-1 px-2 rounded cursor-pointer m-3'>#{props.tag}{props.tags && ` (${countDuplicate(props.tags, props.tag)})`}</span>
        </Link>
    )
}

