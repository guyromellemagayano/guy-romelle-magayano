'use client'

import { Div } from '@guyromellemagayano/react-components/server'

import {
  isArrayType,
  isEmpty,
  isStringType
} from '@guyromellemagayano/react-utils'

import { ContentLayout } from '@guyromellemagayano/portfolio/components/layouts/content'
import { WorkList } from '@guyromellemagayano/portfolio/components/lists/work'
import { WorkCardsList } from '@guyromellemagayano/portfolio/components/lists/work-cards'
import {
  WorkExperienceData,
  WorkPageData
} from '@guyromellemagayano/portfolio/types'

export type WorkAppProps = WorkPageData

/**
 * Render the work application component.
 * @param props The props of the work application.
 * @returns The rendered work application component.
 */
const WorkApp = (props: WorkAppProps) => {
  const { hero, workExperiences } = props

  const heading = hero?.heading || undefined,
    description = hero?.description || undefined

  return (
    !isEmpty(heading) &&
    isStringType(heading) &&
    !isEmpty(description) &&
    (isStringType(description) || isArrayType(description)) && (
      <ContentLayout.Simple title={heading} intro={description}>
        {isArrayType(workExperiences) && !isEmpty(workExperiences) && (
          <Div className="grid gap-y-12">
            {workExperiences?.map(
              ({ duration, ...rest }: WorkExperienceData, index: number) => (
                <WorkList key={index} title={duration} {...rest}>
                  <WorkCardsList {...rest} />
                </WorkList>
              )
            )}
          </Div>
        )}
      </ContentLayout.Simple>
    )
  )
}

WorkApp.displayName = 'WorkApp'

export default WorkApp
