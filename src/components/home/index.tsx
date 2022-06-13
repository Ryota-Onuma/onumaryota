import React, { useState } from 'react'
import { Link as Scroll } from 'react-scroll';
import Link from 'next/link'
import { Icon } from '@iconify/react';
import Image from 'next/image'
import { Loading } from "@/components/Loading"

export const Greeting = () => {
    return (
        <div id="greeting" className='sectionComponent'>
            <div className=' font-bold'>
                <h1 className='leading-snug text-4xl md:text-5xl lg:text-7xl'>Hello,</h1>
                <h1 className='leading-snug text-4xl md:text-5xl lg:text-7xl'>Welcome to</h1>
                <h1 className='text-enhanceColor lg:leading-snug text-4xl md:text-5xl lg:text-7xl'>onuma-ryota.com</h1>
            </div>
            <div className='my-11'>
                <div className='bg-subColor inline-block rounded-md sm:py-4 sm:px-5 p-3 cursor-pointer'>
                    <Scroll to="contact" smooth={true}>
                        CONTACT ME
                    </Scroll>
                </div>
            </div>
        </div>
    )
}

export const Introduction = () => {
    return (
        <div id="introduction" className='sectionComponent'>
            <h2 className='fontEnhanceColor text-5xl font-bold'> About Me</h2>
            <div className='flex flex-col-reverse lg:flex-row' >
                <div className='flex flex-col w-full lg:w-6/12'>

                    <p className="leading-loose w-10/12">
                        Ryota Onumaと申します。
                    </p>
                    <p className="leading-loose w-10/12">
                        横浜の大学卒業後、都内のリユース系企業でソフトウェアエンジニアとして働いています。
                    </p>
                    <p className="leading-loose w-10/12">
                        業務ではGoやRubyを中心にバックエンド領域に携わっています。
                    </p>
                    <div className='flex my-8 w-full justify-start px-2 box-border'>
                        <div className="mr-12">
                            <Link href="https://github.com/Ryota-Onuma"  >
                                <Icon icon="akar-icons:github-fill" width="40" />
                            </Link>
                        </div>
                        <div>
                            <Link href="https://github.com/Ryota-Onuma">
                                <Icon icon="akar-icons:twitter-fill" width="40" />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className='flex  justify-center items-start bg-transparent w-full lg:w-6/12 '>
                    <div>
                        <Image src="/images/buntyo.png" width="300" height="300" alt="Profile Image" />
                    </div>
                </div>
                {/* <div className='flex justify-start items-start bg-transparent w-full lg:w-6/12 bg-enhanceColor'>
                    <div className="relative filterShadow">
                        <div className='absolute bg-transparent clipPath bg-center bg-contain -top-1'>
                            <div>
                                <Image src="/images/buntyo.png" width="300" height="300" alt="Profile Image" />
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    )
}



export const SkillSets = (props) => {
    const [isClicked, setIsClicked] = useState(false)
    return (
        <div id="skillsets" className='sectionComponent'>
            <div>
                <h2 className='text-3xl font-bold'>Skill Set</h2>
                <div className={isClicked ? "skillContainer" : "skillContainer active"}>
                    {props.skills.map(skill => (
                        <div key={skill.categoryName} className='w-full'>
                            <h3 className='text-2xl font-bold my-6'>{skill.categoryName}</h3>
                            <div className="md:grid md:grid-cols-2 xl:grid-cols-3 flex-col items-center gap-3 w-full">
                                {skill.children.map(child => (
                                    <Skill skill={child} key={child.title} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className='my-11' style={{ "visibility": isClicked ? "hidden" : "visible" }}>
                <button type="button" onClick={() => setIsClicked(true)} className='text-enhanceColor bg-mainColor inline-block rounded-md p-4 px-5 cursor-pointer border-enhanceColor border-2 border-solid'>
                    READ MORE
                </button>
            </div>
        </div >
    )
}

export const Blogs = (props) => {
    const [isLoading, setLoading] = useState(true)
    const imageWidth = 450
    const imageHeight = 250

    const BlogsInner = (prop) => {
        return (
            <div className='w-full h-full'>
                <div className='w-full h-full relative'>
                    <div className='w-full h-52 flex flex-col items-center justify-center absolute'>
                        <Loading isLoading={isLoading} />
                    </div>
                    <div className='w-full h-52 relative'>
                        <Image
                            src={prop.post.thumbnail}
                            layout='fill'
                            alt={`${prop.post.title}のサムネイル`}
                            objectFit="contain"
                            onLoadingComplete={(e) => setLoading(false)}
                        />
                    </div>

                </div>
                <div className='w-full'>
                    <h2 className=' text-enhanceColor font-bold text-xl md:text-2x my-2'>{prop.post.title}</h2>
                    <div className='flex items-center my-2'><Icon icon="bx:time" />&ensp;{prop.post.date}</div>
                    <div dangerouslySetInnerHTML={{ __html: prop.post.introduction }} />
                </div>
            </div>
        )
    }
    return (
        <div id="blog" className='sectionComponent'>
            <h2 className='fontEnhanceColor text-5xl font-bold'>Blog</h2>
            <div className='w-full'>
                <div className='w-full flex flex-col items-start md:flex md:flex-row md:justify-between md:flex-wrap md:items-start md:gap-1 mt-8'>
                    {props.posts.map(post => {
                        return (
                            <div className='mb-10 w-full md:w-48 cursor-pointer' key={post.title}>
                                {post.externalUrl ? (
                                    <a href={post.externalUrl} key={post.externalUrl}>
                                        <BlogsInner post={post} />
                                    </a>
                                ) : (
                                    <Link href={`/blog/${post.slug}`} key={post.slug}>
                                        <div>
                                            <BlogsInner post={post} />
                                        </div>
                                    </Link>
                                )}

                            </div>
                        )
                    })
                    }
                </div>
            </div >
            <div>
                <Link href="/blog">
                    <div className='text-enhanceColor bg-mainColor border-enhanceColor border-solid border-2 inline-block rounded-md p-4 px-5 cursor-pointer'>
                        READ MORE
                    </div>
                </Link>
            </div>
        </div >
    )
}

const Graph = (props: any) => {
    return (
        <div>
            <div className='flex justify-around mt-7 text-sm'>
                <span>Hobby</span>
                <span>Work</span>
                <span>Great</span>
            </div>
            <div className='w-full bg-mainColor rounded-xl border border-enhanceColor border-solid relative mt-3' style={{ height: `15px` }}>
                <div className='bg-enhanceColor rounded-xl absolute -top-0 left-0' style={{ width: `${props.rate}%`, height: `14px` }}></div>
            </div>
        </div >
    )
}

const Skill = (props: any) => {
    return (
        <div className='skill px-9 pt-7 pb-11 mr-3 mb-3 font-bold w-full h-full'>
            <div className='flex justify-between items-center text-xl '>
                <span>{props.skill.title}</span>
                <Icon icon={props.skill.skillIcon} width="43" />
            </div>
            <div>{props.skill.rate && <Graph rate={props.skill.rate} />}</div>
            {props.skill.description &&
                <div className='skillDescriotion'
                    dangerouslySetInnerHTML={{ __html: props.skill.description }}
                />
            }
        </div>
    )
}


export const InqueryForm = () => {
    const [state, setState] = useState({})
    const handleChange = e => {
        setState({ ...state, [e.target.name]: e.target.value })
    }

    const encode = data => {
        return Object.keys(data)
            .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
            .join("&")
    }

    const handleSubmit = e => {
        e.preventDefault()
        let shouldContinue
        if (typeof window !== "undefined") {
            shouldContinue = window.confirm("本当に送信しますか？")
        }
        if (!shouldContinue) {
            return
        }
        const form = e.target
        fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: encode({
                "form-name": form.getAttribute("name"),
                ...state,
            }),
        })
            .then(() => {
                alert("メールを送信しました。")
                setState({})
            })
            .catch(error => alert(error))
    }

    const formData = [
        { name: "name", formType: "text", label: "Name" },
        { name: "email", formType: "email", label: "Email" },
        { name: "subject", formType: "subject", label: "Subject" },
        { name: "message", formType: "textarea", label: "Message" }
    ]
    return (
        <div id="contact" className='sectionComponent'>
            <div className='flex flex-col items-start lg:flex-row lg:justify-between'>
                <div className='w-full sm:w-6/12'>
                    <h2 className='fontEnhanceColor text-5xl font-bold leading-none mb-8'>
                        Contact
                    </h2>
                    <p>お問い合わせはこちらから</p>
                </div>
                <div className='flex flex-row justify-start w-full lg:w-6/12 '>
                    <form
                        name="contact"
                        method="POST"
                        data-netlify="true"
                        data-netlify-honeypot="bot-field"
                        onSubmit={handleSubmit}
                        className='w-full'
                    >
                        <input type="hidden" name="form-name" value="contact" />
                        <input type="hidden" name="bot-field" />
                        {formData.map(d => {
                            return (
                                <div className='flex flex-col items-start my-5' key={d.name}>
                                    <label htmlFor={d.name} className='text-enhanceColor mb-2'>{d.label}</label>
                                    {
                                        d.formType === "textarea" ?
                                            <textarea
                                                id={d.name}
                                                name={d.name}
                                                onChange={handleChange}
                                                placeholder={d.label}
                                                required
                                                className='rounded p-2 box-border bg-formPlacehoderColor w-full h-80'
                                            ></textarea> :
                                            <input
                                                id={d.name}
                                                type="text"
                                                name={d.name}
                                                onChange={handleChange}
                                                placeholder={d.label}
                                                required
                                                className='rounded p-2 box-border bg-formPlacehoderColor w-full'
                                            />
                                    }
                                </div>
                            )
                        })}
                        <div className='flex flex-row justify-end'>
                            <button type="submit" className='bg-mainColor rounded-xl border border-enhanceColor text-enhanceColor border-solid inline-block sm:py-4 sm:px-5 p-3 cursor-pointer'>Send a Message!</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}