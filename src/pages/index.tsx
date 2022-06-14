import React from 'react'
import type { InferGetStaticPropsType, NextPage } from "next";
import { NextSeo } from 'next-seo';
import { getPosts } from "@/lib/api";
import { Greeting, Introduction, SkillSets, Blogs, InqueryForm } from "@/components/home/index"
import { getSkills } from "@/components/home/consts.ts"
type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticProps = async () => {
  const displayNum = 3 // 表示数
  const posts = await getPosts(["slug", "title", "date", "thumbnail", "content", "introduction"], displayNum);
  return {
    props: { posts },
  };
};


const Home: NextPage<Props> = ({ posts }) => {
  const skills = getSkills()
  return (
    <div className='page'>
      <NextSeo
        title="onuma-ryota.com | Top"
      />
      <div>
        <Greeting />
        <Introduction />
        <SkillSets skills={skills} />
        <Blogs posts={posts} />
        <InqueryForm />
      </div>
    </div>
  );
};

export default Home;