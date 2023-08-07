import { IArticlesData } from '@/interfaces'

const ArticlesData = (): IArticlesData => {
    const meta = {
        title: 'Articles - Guy Romelle Magayano',
        description: 'Writing on web and mobile app development, JAMstack, e-commerce, and a lot more.',
        keywords:
            'writing, web development, mobile app development, jamstack, e-commerce, seo, amazon, google, javascript, typescript, html, css, react, react native, wordpress, tailwind, jamstack, gatsby, nextjs',
    }

    const hero = {
        heading: 'Writing on web and mobile app development, JAMstack, and e-commerce.',
        description: [
            'All of my learnings, experiences, and thoughts on programming, leadership, trends, and more, collected in chronological order.',
        ],
    }

    return { meta, hero }
}

export default ArticlesData
