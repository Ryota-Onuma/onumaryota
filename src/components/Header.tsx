
import React, { useState } from 'react'
import { Icon } from '@iconify/react';
import Link from 'next/link'
import Image from 'next/image'

type Link = {
    displayName: string;
    url: string;
}


const PCHeader = (props: any) => {
    return (
        <div className='w-screen h-16 flex justify-between items-center px-14 bg-mainColor' >
            <div className='flex flex-col justify-center items-baseline h-20 cursor-pointer'>
                <Link href="/">
                    <div>
                        <Image src="/images/buntyo.png" width={42} height={42} alt="Offical Icon" />
                    </div>
                </Link>
            </div>
            <div className='h-16 flex items-start border-box'>
                {props.links.map((link: Link) => {
                    return (
                        <Link href={link.url} key={link.url}>
                            <span className='p-5 pb-3 hover:border-b-2 hover:border-solid  cursor-pointer box-border h-16 hover:border-fontColor' key={link.url}>
                                {link.displayName}
                            </span>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

const MobileHeader = (props: any) => {
    const [isClicked, setIsClicked] = useState(false)

    const clicked = (clickedVal: boolean): void => {
        setIsClicked(clickedVal)

        if (typeof window !== "undefined" && clickedVal) {
            window.document.querySelector(".page")?.classList.add("fixHeight")
            return
        }
        if (typeof window !== "undefined" && !clickedVal) {
            window.document.querySelector(".page")?.classList.remove("fixHeight")
            return
        }
        return
    }

    const pagemove = () => {
        clicked(false)
    }

    return (
        <div className='absolute top-0 w-screen text-fontColor bg-transparent flex flex-col z-30'>
            <div className='w-full flex justify-end z-50' onClick={() => clicked(!isClicked)}>
                {!isClicked &&
                    <div className='flex flex-col items-center justify-center fixed z-50 right-3 top-3 cursor-pointer text-center'>
                        <Icon icon="ant-design:menu-outlined" width="50" height="50" />
                    </div>
                }
                {isClicked &&
                    <div className='flex flex-col items-center justify-center fixed z-50 right-3 top-3 cursor-pointer text-center'>
                        <Icon icon="ep:close-bold" width="50" height="50" />
                    </div>
                }
            </div>
            {isClicked &&
                <div className='flex flex-col items-center justify-center w-screen h-screen overflow-hidden z-40 bg-mainColor'>
                    <div className='flex flex-col items-center justify-center'>
                        {props.links.map((link: Link) => {
                            return (
                                <span className='block my-2 font-bold text-2xl' key={link.url} onClick={() => pagemove()}>
                                    <Link href={link.url}>{link.displayName}</Link>
                                </span>
                            )
                        })}
                    </div>
                </div>
            }
        </div>
    )

}

const Header = () => {
    const links: Link[] = [
        {
            displayName: "Home",
            url: "/",
        },
        {
            displayName: "Introduction",
            url: "/#introduction",
        },
        {
            displayName: "Blog",
            url: "/blogs",
        },
        {
            displayName: "Contact",
            url: "/#contact",
        }
    ]
    return (
        <header>
            <div className='hidden lg:block'>
                <PCHeader links={links} />
            </div>
            <div className='block lg:hidden' >
                <MobileHeader links={links} />
            </div>
        </header>
    );
}
export default Header