
import React, { useState } from 'react'
import { Icon } from '@iconify/react';
import styles from "@/styles/components/Header.module.scss";
import Link from 'next/link'
import Image from 'next/image'

type Link = {
    displayName: string;
    url: string;
}

const HamburgerMenu = (props: any) => {
    const [isClicked, setIsClicked] = useState(false)
    return (
        <div className={styles.hamburgerContainer}>
            <div className={styles.hamburgerIconContainer} onClick={() => setIsClicked(!isClicked)}>
                {!isClicked &&
                    <div className={styles.hamburger}>
                        <Icon icon="ant-design:menu-outlined" width="50" height="50" />
                    </div>
                }
                {isClicked &&
                    <div className={styles.hamburger}>
                        <Icon icon="ep:close-bold" width="50" height="50" />
                    </div>
                }
            </div>
            {isClicked &&
                <div className={styles.globalMenuSp}>
                    <div className={styles.links}>
                        {props.links.map((link: Link) => {
                            return (
                                <span className={styles.link} key={link.url}>
                                    <Link href={link.url} >{link.displayName}</Link>
                                </span>
                            )
                        })}
                    </div>
                </div>
            }
        </div >
    )
}

const PCHeader = (props: any) => {
    return (
        <div className={styles.pc}>
            <div className={styles.pcHeader}>
                <div>
                    <Image src="/images/buntyo.png" width={42} height={42} alt="Offical Icoon" className={styles.icon} />
                </div>
                <div className={styles.links}>
                    {props.links.map((link: Link) => {
                        return (
                            <span className={styles.link} key={link.url}>
                                <Link href={link.url} >{link.displayName}</Link>
                            </span>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

const TabletHeader = (props: any) => {
    return (
        <div className={styles.tablet}>
            <div className={styles.tabletHeader}>
                <HamburgerMenu links={props.links} />
            </div>
        </div>
    )
}

const MobileHeader = (props: any) => {
    return (
        <div className={styles.mobile}>
            <div className={styles.mobileHeader} >
                <HamburgerMenu links={props.links} />
            </div>
        </div>
    )
}

const Header = () => {
    const links: Link[] = [
        {
            displayName: "Introduction",
            url: "/#introduction",
        },
        {
            displayName: "Works",
            url: "/works",
        },
        {
            displayName: "Blog",
            url: "/blog",
        },
        {
            displayName: "Contact",
            url: "/#contact",
        }
    ]
    return (
        <header className={styles.header}>
            <PCHeader links={links} />
            <TabletHeader links={links} />
            <MobileHeader links={links} />
        </header>
    );
}
export default Header