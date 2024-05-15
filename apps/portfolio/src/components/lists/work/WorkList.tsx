import { forwardRef } from 'react'

import { Div } from '@guyromellemagayano/react-components/server'

import { isEmpty } from '@guyromellemagayano/react-utils'

import {
  SectionLayout,
  type SectionLayoutProps,
  type SectionLayoutRef
} from '@guyromellemagayano/portfolio/components/layouts/section'

export type WorkListRef = SectionLayoutRef
export type WorkListProps = SectionLayoutProps

/**
 * Renders the work list component.
 * @param children - The children of the work list.
 * @param rest - The rest of the props of the work list.
 * @returns The rendered work list component.
 */
const WorkList = forwardRef<WorkListRef, WorkListProps>(
  ({ children, ...rest }, ref) => {
    return (
      !isEmpty(children) && (
        <SectionLayout ref={ref} {...rest}>
          <Div className="space-y-16">{children}</Div>
        </SectionLayout>
      )
    )
  }
)

WorkList.displayName = 'WorkList'

export default WorkList
