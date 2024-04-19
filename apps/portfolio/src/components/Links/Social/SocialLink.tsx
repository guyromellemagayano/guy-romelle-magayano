/* eslint-disable sort-imports */
import { FC, forwardRef } from 'react'

import { SvgProps } from '@guy-romelle-magayano/react-components'
import {
  A,
  Span,
  type HyperlinkProps,
  type HyperlinkRef
} from '@guy-romelle-magayano/react-components/server'

import {
  cn,
  convertStringToLowercase,
  isEmpty,
  isStringType
} from '@guy-romelle-magayano/react-utils'

import {
  GithubSvg,
  LinkedInSvg,
  MailSvg,
  TwitterSvg
} from '@guy-romelle-magayano/portfolio/components/SVG'
import { SocialLinksData } from '@guy-romelle-magayano/portfolio/types/data'

export type SocialLinkRef = HyperlinkRef
export type SocialLinkProps = HyperlinkProps &
  SocialLinksData & {
    showLabel?: boolean
  }

/**
 * Renders the social link component.
 * @param href - The href of the social link.
 * @param label - The label of the social link.
 * @param [showLabel=false] - The show label of the social link.
 * @param id - The id of the social link.
 * @param className - The class name of the social link.
 * @param rest - The rest of the props.
 * @returns The rendered social link component.
 */
const SocialLink = forwardRef<SocialLinkRef, SocialLinkProps>(
  ({ icon, href, label, showLabel = false, id, className, ...rest }, ref) => {
    let Icon: FC<SvgProps> | undefined = () => undefined

    const loweredIcon: string = icon ? convertStringToLowercase(icon) : ''

    // Set the Icon value based on the icon prop.
    if (loweredIcon) {
      switch (loweredIcon) {
        case 'twitter':
          Icon = TwitterSvg
          break
        case 'github':
          Icon = GithubSvg
          break
        case 'linkedin':
          Icon = LinkedInSvg
          break
        case 'mail':
          Icon = MailSvg
          break
        default:
          break
      }
    }

    return (
      !isEmpty(href) &&
      isStringType(href) && (
        <A
          ref={ref}
          {...rest}
          className={cn(
            className,
            'group -m-1 p-1',
            showLabel &&
              'flex text-sm font-medium text-zinc-800 transition hover:text-amber-500 dark:text-zinc-200 dark:hover:text-amber-500'
          )}
          href={href}
          aria-label={label}
          target="_blank"
          rel="noreferrer"
        >
          {!isEmpty(Icon) && (
            <Icon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
          )}

          {showLabel && !isEmpty(label) && (
            <Span className="ml-4">{label}</Span>
          )}
        </A>
      )
    )
  }
)

SocialLink.displayName = 'SocialLink'

export default SocialLink
