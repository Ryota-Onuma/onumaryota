import { Icon } from '@iconify/react';
import Link from 'next/link'
type Props = {
    begin: number;
    privious: number;
    current: number;
    next: number;
    end: number;
    pathBase: string;
}
export const PER_PAGE = 5

const displayLeftLink = (begin: number, current: number) => {
    return (current - begin) >= 1
    // 2 - 1
}
const displayRightLink = (end: number, current: number) => {
    return (end - current) >= 1
}

export const Pagenation = (props: Props) => {
    return (
        <div className='w-full flex justify-center'>
            <div style={{ visibility: displayLeftLink(props.begin, props.current) ? 'visible' : 'hidden' }}>
                <span className='flex flex-col items-center justify-center m-4 cursor-pointer py-1 px-2 bg-subColor rounded leading-6'>
                    <Link href={`${props.pathBase}/${props.privious}`}>
                        <Icon icon="akar-icons:triangle-left" width={25} height={25} />
                    </Link>
                </span>
            </div>
            <span className='flex flex-col items-center justify-center m-4 cursor-pointer py-1 px-2 bg-subColor rounded leading-6'>
                {props.current}/{props.end}
            </span>
            <div style={{ visibility: displayRightLink(props.end, props.current) ? 'visible' : 'hidden' }}>
                <span className='flex flex-col items-center justify-center m-4 cursor-pointer py-1 px-2 bg-subColor rounded leading-6'>
                    <Link href={`${props.pathBase}/${props.next}`}>
                        <Icon icon="akar-icons:triangle-right" width={25} height={25} />
                    </Link>
                </span>
            </div>
        </div >
    )
} 
