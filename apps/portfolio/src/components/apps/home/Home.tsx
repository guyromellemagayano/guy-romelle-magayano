'use client'

import {
  Article,
  Div,
  Heading,
  Section
} from '@guyromellemagayano/react-components/server'

import {
  cn,
  isArrayType,
  isEmpty,
  isStringType
} from '@guyromellemagayano/react-utils'

import { BaseContainer } from '@guyromellemagayano/portfolio/components/containers/base'
import { ArticleLayout } from '@guyromellemagayano/portfolio/components/layouts/article'
import { ContentLayout } from '@guyromellemagayano/portfolio/components/layouts/content'
import { NewsletterLayout } from '@guyromellemagayano/portfolio/components/layouts/newsletter'
import { PhotoLayout } from '@guyromellemagayano/portfolio/components/layouts/photo'
import { ResumeLayout } from '@guyromellemagayano/portfolio/components/layouts/resume'
import { SocialLinksLayout } from '@guyromellemagayano/portfolio/components/layouts/social-links'
import {
  type ArticlesData,
  type HomePageData,
  type ProjectsData,
  type SocialLinksData
} from '@guyromellemagayano/portfolio/types'

export type HomeAppProps = HomePageData & {
  links?: Array<SocialLinksData>
  articles?: Array<ArticlesData>
  projects?: Array<ProjectsData>
}

const strings = {
  articles: 'Articles',
  projects: 'Projects'
}

/**
 * Render the home application component.
 * @param props - The props of the home application.
 * @returns The rendered home application component.
 */
const HomeApp = (props: HomeAppProps) => {
  const {
    hero,
    slidePhotos,
    cvFile,
    workExperiences,
    links,
    articles,
    projects
  } = props

  const heading = hero?.heading || undefined,
    description = hero?.description || undefined

  return (
    <>
      {!isEmpty(heading) &&
        isStringType(heading) &&
        !isEmpty(description) &&
        (isStringType(description) || isArrayType(description)) && (
          <ContentLayout.Simple
            title={heading}
            intro={description}
            className="mt-9 sm:mt-9"
          >
            {!isEmpty(links) && isArrayType(links) && (
              <SocialLinksLayout className="mt-6 flex gap-6" data={links} />
            )}
          </ContentLayout.Simple>
        )}

      {!isEmpty(slidePhotos) && isArrayType(slidePhotos) && (
        <PhotoLayout className="mt-16 sm:mt-20" data={slidePhotos} />
      )}

      <BaseContainer className="mt-20 md:mt-24">
        <Div
          className={cn(
            'mx-auto grid w-full max-w-xl grid-cols-1 lg:max-w-none lg:grid-cols-2',
            !isEmpty(articles) &&
              isArrayType(articles) &&
              ((!isEmpty(cvFile) && isStringType(cvFile)) ||
                (!isEmpty(workExperiences) && isArrayType(workExperiences))) &&
              'gap-y-20'
          )}
        >
          <Section>
            {!isEmpty(articles) && isArrayType(articles) && (
              <Article className="mb-6">
                <Heading
                  as="h3"
                  className=" text-3xl font-bold tracking-tight text-zinc-800 sm:text-4xl dark:text-zinc-100"
                >
                  {strings.articles}
                </Heading>

                <ArticleLayout articles={articles} isHome />
              </Article>
            )}
          </Section>

          <Section className="space-y-10 lg:pl-16 xl:pl-24">
            <NewsletterLayout />

            {((!isEmpty(workExperiences) && isArrayType(workExperiences)) ||
              (!isEmpty(cvFile) && isStringType(cvFile))) && (
              <ResumeLayout
                cvFile={cvFile}
                workExperiences={workExperiences}
                className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40"
              />
            )}
          </Section>
        </Div>
      </BaseContainer>
    </>
  )
}

HomeApp.displayName = 'HomeApp'

export default HomeApp
