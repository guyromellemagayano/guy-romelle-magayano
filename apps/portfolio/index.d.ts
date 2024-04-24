import { ReactNode } from 'react'

declare module '*.svg' {
  const content: any
  export const ReactComponent: any
  export default content
}

declare module 'focus-visible' {
  const focusVisible: () => void
  export default focusVisible
}

declare module '*.mdx' {
  let MDXComponent: (props: any) => ReactNode
  export default MDXComponent
}
