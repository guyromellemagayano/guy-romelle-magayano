import { forwardRef } from 'react'

import { Div } from '@guyromellemagayano/react-components/server'

import { isEmpty, isStringType } from '@guyromellemagayano/react-utils'

import {
  SectionLayout,
  type SectionLayoutProps,
  type SectionLayoutRef
} from '@guyromellemagayano/portfolio/components/layouts/section'

export type SkillsListRef = SectionLayoutRef
export type SkillsListProps = SectionLayoutProps & {
  title: string
}

/**
 * Renders the skills list component.
 * @param title - The title of the skills list.
 * @param children - The children of the skills list.
 * @param rest - The rest of the props of the skills list.
 * @returns The rendered skills list component.
 */
const SkillsList = forwardRef<SkillsListRef, SkillsListProps>(
  ({ title, children, ...rest }, ref) => {
    return (
      !isEmpty(children) &&
      !isEmpty(title) &&
      isStringType(title) && (
        <SectionLayout ref={ref} {...rest} title={title}>
          <Div className="space-y-16">{children}</Div>
        </SectionLayout>
      )
    )
  }
)

SkillsList.displayName = 'SkillsList'

export default SkillsList
