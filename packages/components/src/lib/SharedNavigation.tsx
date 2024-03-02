import { ForwardedRef, HTMLAttributes, forwardRef, useId } from 'react'

import { TCommonSharedComponentsProps } from '@guy-romelle-magayano/components/server'

type SharedNavigationRef = HTMLElement

export type TSharedNavigationProps = HTMLAttributes<SharedNavigationRef> &
  TCommonSharedComponentsProps & {}

/**
 * Render the shared navigation component.
 * @param children - The children of the shared navigation.
 * @param rest - The rest of the props of the shared navigation.
 * @param ref - Ref forwarding from parent component.
 * @returns The rendered shared navigation component.
 */
export const SharedNavigation = forwardRef<
  SharedNavigationRef,
  TSharedNavigationProps
>(({ children, ...rest }, ref: ForwardedRef<SharedNavigationRef>) => {
  // Generates a unique ID that can be used for accessibility attributes
  const customId = useId()

  return (
    <nav ref={ref} {...rest} id={rest.id ?? customId}>
      {children}
    </nav>
  )
})

SharedNavigation.displayName = 'SharedNavigation'
