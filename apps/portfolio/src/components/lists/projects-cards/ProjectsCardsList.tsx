import { forwardRef, memo } from 'react'

import Image from 'next/image'

import {
  Div,
  Heading,
  P,
  Span
} from '@guy-romelle-magayano/react-components/server'

import { isEmpty, isStringType } from '@guy-romelle-magayano/react-utils'

import {
  Card,
  type CardProps,
  type CardRef
} from '@guy-romelle-magayano/portfolio/components/card'
import { LinkSvg } from '@guy-romelle-magayano/portfolio/components/SVG'
import { ProjectsData } from '@guy-romelle-magayano/portfolio/types'

export type ProjectsCardsListRef = CardRef
export type ProjectsCardsListProps = CardProps &
  Pick<
    ProjectsData,
    'slug' | 'title' | 'description' | 'link' | 'category' | 'logo'
  >

const imageDimensions = {
  width: 32,
  height: 32
}

/**
 * Renders the projects cards list component.
 * @param name - The name of the project.
 * @param link - The link to the project.
 * @param logo - The logo of the project.
 * @param [alt=""] - The alternative text for the logo.
 * @param description - The description of the project.
 * @param rest - The rest of the props.
 * @returns The rendered projects cards list component.
 */
const ProjectsCardsList = memo(
  forwardRef<ProjectsCardsListRef, ProjectsCardsListProps>(
    ({ slug, title, link, logo, alt = '', description, ...rest }, ref) => {
      const href = `/projects/${slug}`

      return (
        !isEmpty(link?.url) &&
        isStringType(link?.url) &&
        !isEmpty(title) &&
        isStringType(title) &&
        !isEmpty(description) &&
        isStringType(description) &&
        !isEmpty(link?.text) &&
        isStringType(link?.text) && (
          <Card ref={ref} {...rest} as="li">
            {!isEmpty(logo) && (
              <Div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
                <Span className="h-8 w-8 overflow-hidden rounded-full">
                  <Image
                    src={logo}
                    alt={alt}
                    width={imageDimensions.width}
                    height={imageDimensions.height}
                    unoptimized
                    priority
                  />
                </Span>
              </Div>
            )}

            <Heading
              as="h2"
              className="mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100"
            >
              <Card.Link href={link.url} target="_blank">
                {title}
              </Card.Link>
            </Heading>

            <Card.Description>{description}</Card.Description>

            <P className="relative z-10 mt-6 flex text-sm font-medium text-zinc-400 transition group-hover:text-amber-500 dark:text-zinc-200">
              <LinkSvg className="h-6 w-6 flex-none" />
              <Span className="ml-2">{link.text}</Span>
            </P>
          </Card>
        )
      )
    }
  )
)

ProjectsCardsList.displayName = 'ProjectsCardsList'

export default ProjectsCardsList
