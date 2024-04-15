'use client'

import Image from 'next/image'

import { Div } from '@guy-romelle-magayano/react-components/server'

import {
  isArrayType,
  isEmpty,
  isStringType
} from '@guy-romelle-magayano/react-utils'

import { BaseContainer } from '@guy-romelle-magayano/portfolio/components/Containers/Base'
import { ContentLayout } from '@guy-romelle-magayano/portfolio/components/Layouts/Content'
import {
  AboutPageData,
  SocialLinksData
} from '@guy-romelle-magayano/portfolio/types'

export type AboutAppProps = AboutPageData & {
  social?: Array<SocialLinksData>
}

const imagePortrait = '/images/portrait.jpg'

/**
 * Renders the about page component.
 * @param props - The props of the about page.
 * @returns The rendered about page component.
 */
const AboutApp = (props: AboutAppProps) => {
  const { hero, social } = props

  const heading = hero?.heading || undefined,
    description = hero?.description || undefined

  return (
    <BaseContainer className="mt-16 sm:mt-32">
      <Div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
        {!isEmpty(imagePortrait) && (
          <Div className="flex max-w-full justify-center lg:pl-20">
            <Div className="relative h-[32rem] w-full max-w-xs px-2.5 lg:max-w-none">
              <Image
                src={imagePortrait}
                alt=""
                sizes="(min-width: 1024px) 32rem, 20rem"
                className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
                fill
                priority
              />
            </Div>
          </Div>
        )}

        {!isEmpty(heading) &&
          isStringType(heading) &&
          !isEmpty(description) &&
          (isStringType(description) || isArrayType(description)) && (
            <Div className="lg:order-first lg:row-span-2">
              <ContentLayout.Aside title={heading} intro={description} />
            </Div>
          )}

        {/* {!isEmpty(social) && isArrayType(social) && (
          <Div className="lg:pl-20">
            <SocialLinksπ data={social} />
          </Div>
        )} */}
      </Div>
    </BaseContainer>
  )
}

AboutApp.displayName = 'AboutApp'

export default AboutApp
