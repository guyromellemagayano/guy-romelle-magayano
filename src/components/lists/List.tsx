/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, LinkSvgIcon, Section } from '@/components'
import {
    IArticleListCardProps,
    IChildrenProps,
    IProjectListCardProps,
    ISkillsListCardsProps,
    IUsesToolsItemsData,
    IWorkListData,
} from '@/interfaces'
import { formatDate, isEmpty } from '@/lib'
import Image from 'next/image'

// Skills list component
const SkillsList = ({ children, ...rest }: IChildrenProps & any): React.ReactNode => {
    return (
        <Section {...rest}>
            <div className="space-y-16">{children}</div>
        </Section>
    )
}

// Skills list card component
const SkillsListCards = ({ title, description, technologies, cta }: ISkillsListCardsProps): React.ReactNode => {
    return (
        <Card as="article">
            <Card.Title as="h3" title={title}>
                {title}
            </Card.Title>

            {!isEmpty(description) && description.map((text) => <Card.Description key={text}>{text}</Card.Description>)}

            {!isEmpty(technologies) && (
                <div className="flex flex-row items-start gap-x-6 my-2">
                    <Card.Eyebrow as="h4" className="text-rose-400 dark:text-rose-500 text-base">
                        Technologies
                    </Card.Eyebrow>

                    <Card.Eyebrow as="ul" className="flex-wrap gap-x-4 text-zinc-400 dark:text-zinc-500">
                        {/* eslint-disable-next-line @typescript-eslint/no-unused-vars */}
                        {technologies.map(({ name, link }) => (
                            <li key={name}>
                                <a
                                    href={link}
                                    className="hover:text-amber-500 dark:hover:text-amber-400 transition"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    {name}
                                </a>
                            </li>
                        ))}
                    </Card.Eyebrow>
                </div>
            )}

            {!isEmpty(cta) && (
                <span className="flex items-start gap-x-4">
                    {cta.map((item) => {
                        const projectCtaText = 'See projects'

                        !isEmpty(item.projects) && (item.text = projectCtaText)

                        return (
                            !isEmpty(item.projects) && (
                                <Card.Cta key={item.text} title={item.text}>
                                    {item.text}
                                </Card.Cta>
                            )
                        )
                    })}
                </span>
            )}
        </Card>
    )
}

// Tools list component
const ToolsList = ({ children, ...rest }: IChildrenProps & any): React.ReactNode => {
    return (
        <Section {...rest}>
            <ul className="space-y-16">{children}</ul>
        </Section>
    )
}

// Tools list card component
const ToolsListCards = ({ title, description }: IUsesToolsItemsData): React.ReactNode => {
    return (
        <Card as="li">
            <Card.Title as="h3">{title}</Card.Title>
            <Card.Description>{description}</Card.Description>
        </Card>
    )
}

// Articles list component
const ArticlesList = ({ children }: IChildrenProps): React.ReactNode => {
    return (
        <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
            <div className="flex max-w-3xl flex-col space-y-16">{children}</div>
        </div>
    )
}

// Articles list cards component
const ArticlesListCards = ({ slug, meta: { title, date, description } }: IArticleListCardProps): React.ReactNode => {
    return (
        <article className="md:grid md:grid-cols-4 md:items-baseline">
            <Card.Eyebrow as="time" dateTime={date} className="mt-1 hidden md:block text-zinc-400 dark:text-zinc-500">
                {formatDate(date)}
            </Card.Eyebrow>

            <Card className="md:col-span-3">
                <Card.Title href={`/articles/${slug}`}>{title}</Card.Title>
                <Card.Description>{description}</Card.Description>
                <Card.Cta>Read article</Card.Cta>
            </Card>
        </article>
    )
}

// Projects list component
const ProjectsList = ({ children }: IChildrenProps): React.ReactNode => {
    return <ul className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">{children}</ul>
}

// Projects list cards component
const ProjectsListCards = ({ project }: IProjectListCardProps): React.ReactNode => {
    return (
        !isEmpty(project?.name) &&
        !isEmpty(project?.link?.url) && (
            <Card as="li" key={project.name}>
                {!isEmpty(project?.logo) && (
                    <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
                        <span className="h-8 w-8 overflow-hidden rounded-full">
                            <Image src={project.logo} alt="" className="h-full w-full" unoptimized priority />
                        </span>
                    </div>
                )}

                <h2 className="mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100">
                    <Card.Link href={project.link.url} target="_blank">
                        {project.name}
                    </Card.Link>
                </h2>
                <Card.Description>{project?.description || ''}</Card.Description>
                <p className="relative z-10 mt-6 flex text-sm font-medium text-zinc-400 transition group-hover:text-amber-500 dark:text-zinc-200">
                    <LinkSvgIcon className="h-6 w-6 flex-none" />
                    <span className="ml-2">{project?.link?.text || ''}</span>
                </p>
            </Card>
        )
    )
}

// Work list component
const WorkList = ({ children, ...rest }: IChildrenProps & any): React.ReactNode => {
    return (
        <Section {...rest}>
            <div className="space-y-16">{children}</div>
        </Section>
    )
}

// Work list card component
const WorkListCards = ({ company, country, contributions, skills }: IWorkListData): React.ReactNode => {
    return (
        <Card as="article">
            {!isEmpty(company) && !isEmpty(country) && (
                <Card.Title as="h3" title={company} className=" !mb-2">
                    {company} &nbsp;
                    <h5 className="mb-2 hidden md:block text-sm">{country}</h5>
                </Card.Title>
            )}

            {!isEmpty(contributions) && (
                <div className="flex flex-row items-start my-2">
                    <Card.Eyebrow as="ul" className="flex-wrap gap-y-4 text-zinc-400 dark:text-zinc-500">
                        {contributions.map((item: string) => (
                            <li key={item}>{item}</li>
                        ))}
                    </Card.Eyebrow>
                </div>
            )}

            {!isEmpty(skills) && (
                <div className="flex flex-row items-start gap-x-6 mt-4 mb-2">
                    <Card.Eyebrow as="h4" className="text-rose-400 dark:text-rose-500 text-base">
                        Skills
                    </Card.Eyebrow>
                    <Card.Eyebrow as="ul" className="flex-wrap gap-x-3 gap-y-1 text-zinc-400 dark:text-zinc-500">
                        {skills.map((item: string) => (
                            <li key={item}>{item}</li>
                        ))}
                    </Card.Eyebrow>
                </div>
            )}
        </Card>
    )
}

export {
    ArticlesList,
    ArticlesListCards,
    ProjectsList,
    ProjectsListCards,
    SkillsList,
    SkillsListCards,
    ToolsList,
    ToolsListCards,
    WorkList,
    WorkListCards,
}
