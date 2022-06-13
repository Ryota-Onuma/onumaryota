import fs from "fs"
import path from "path";
import matter from "gray-matter";
import Parser from "rss-parser";
import { convertToJST } from "@/lib/timeUtil.ts"

type Post = {
    slug: string;
    externalUrl?: string;
    content?: string;
    title?: string;
    date: any;
    thumbnail?: string;
    tags: string[];
    introduction?: string;
};

const ZENN_TAG = 'Zenn'
const postsDirectory = path.join(process.cwd(), "content");

export const getPostSlugs = () => {
    const allDirents = fs.readdirSync(postsDirectory, { withFileTypes: true });
    return allDirents
        .filter((dirent) => dirent.isDirectory())
        .map(({ name }) => name);
}

export const getPostBySlug = (slug: string, fields: string[] = ["slug", "title", "date", "thumbnail", "introduction", "tags", "externalUrl"]) => {
    const fullPath = path.join(postsDirectory, slug, "index.md");
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    const items: Post = {
        slug: "",
        externalUrl: "",
        content: "",
        title: "",
        date: "",
        thumbnail: "",
        introduction: "",
        tags: [],
    };

    fields.forEach((field) => {
        if (field === "slug") {
            items[field] = slug;
        }
        if (field === "content") {
            items[field] = content;
        }
        if (
            field === "date"
        ) {
            items[field] = convertToJST(data[field])
        }

        if (
            field === "title" ||
            field === "thumbnail" ||
            field === "introduction" ||
            field === "tags"
        ) {

            items[field] = data[field];
        }

    });

    return items;
}

export const getPostsByTag = async (tagName: string, fields: string[] = ["slug", "title", "date", "thumbnail", "introduction", "tags", "externalUrl"]) => {
    const slugs = getPostSlugs();
    let posts = slugs
        .map((slug) => getPostBySlug(slug, fields))
    if (tagName.toLowerCase() == ZENN_TAG.toLowerCase()) {
        const zennItems = await getZennArticles()
        posts = [...zennItems].sort((a, b) => (a.date > b.date ? -1 : 1));
    }
    let filteredPosts = posts.map(post => {
        if (post.tags.map(tag =>

            tag.toLowerCase()).includes(tagName.toLowerCase())) {
            return post
        }
    })

    return filteredPosts.filter(v => v);
}

export const getPosts = async (fields: string[] = ["slug", "title", "date", "thumbnail", "introduction", "tags", "externalUrl"], displayNum?: number) => {
    const slugs = getPostSlugs();
    let posts = slugs.map((slug, i) => getPostBySlug(slug, fields))
    const zennItems = await getZennArticles()
    posts = [...posts, ...zennItems]
        .sort((a, b) => (a.date > b.date ? -1 : 1));

    if (!displayNum || posts.length < displayNum) {
        return posts
    }
    return posts.slice(0, displayNum + 1);

}

export const getAllTags = async (fields: string[] = ["tags"]) => {
    const slugs = getPostSlugs();
    let posts = slugs
        .map((slug) => getPostBySlug(slug, fields))
    const zennItems = await getZennArticles()
    posts = [...posts, ...zennItems]
    const tags: string[][] = posts.map(post => {
        return post["tags"]
    })

    return tags.flat()
}


export const getZennArticles = async (): Promise<Post[]> => {
    const parser = new Parser();
    const feedZenn = await parser.parseURL('https://zenn.dev/ryota_o/feed');
    const zennItems: Post[] = feedZenn.items.map(item => {
        const post: Post = {
            slug: "",
            externalUrl: item.link,
            content: "",
            title: item.title,
            date: convertToJST(item.pubDate),
            thumbnail: item.enclosure?.url,
            introduction: item.contentSnippet,
            tags: [ZENN_TAG],
        };
        return post

    })
    return zennItems
}
