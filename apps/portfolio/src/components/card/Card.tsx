'use client'

import {
  ElementType,
  ForwardRefExoticComponent,
  Ref,
  RefAttributes,
  forwardRef
} from 'react'

import Link from 'next/link'

import {
  Div,
  Heading,
  P,
  Span,
  type DivisionRef,
  type ParagraphProps,
  type ParagraphRef
} from '@guy-romelle-magayano/react-components/server'
import { CommonComponentsProps } from '@guy-romelle-magayano/react-components/types'

import { cn, isEmpty } from '@guy-romelle-magayano/react-utils'

import { ChevronRightSvg } from '@guy-romelle-magayano/portfolio/components/svg'

export type CardRef = Ref<any>
export type CardProps = CommonComponentsProps & {
  as?: ElementType
}
export type CardCommonProps = CardProps & {
  href?: string
  title?: string
  decorate?: boolean
  target?: string
  dateTime?: string
}
export type CardStaticComponents = {
  Link: typeof CardLink
  Title: typeof CardTitle
  Description: typeof CardDescription
  Cta: typeof CardCta
  Eyebrow: typeof CardEyebrow
}

/**
 * Renders the card component.
 * @param as - The HTML tag or React component to render as the card.
 * @param className - Additional CSS classes to apply to the card.
 * @param children - The content to render inside the card.
 * @param rest - The rest of the props of the card.
 * @returns The rendered card component.
 */
const Card = forwardRef<CardRef, CardProps>(
  ({ as: Component = Div, className, children, ...rest }, ref) => {
    return (
      !isEmpty(children) && (
        <Component
          ref={ref}
          {...rest}
          className={cn('group relative flex flex-col items-start', className)}
        >
          {children}
        </Component>
      )
    )
  }
) as ForwardRefExoticComponent<CardProps & RefAttributes<CardRef>> &
  CardStaticComponents

Card.displayName = 'Card'

export type CardLinkRef = DivisionRef
export type CardLinkProps = CardCommonProps

/**
 * Renders the card link component.
 * @param href - The URL to link to.
 * @param title - The title of the link.
 * @param target - The target of the link.
 * @param children - The content to render inside the link.
 * @param rest - The rest of the props of the link.
 * @returns The rendered card link component.
 */
const CardLink = forwardRef<CardLinkRef, CardLinkProps>(
  ({ href, title, target, children, ...rest }, ref) => {
    return (
      !isEmpty(children) && (
        <Div ref={ref} {...rest}>
          <Div className="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6 sm:rounded-2xl dark:bg-zinc-800/50" />

          {href && children ? (
            <Link href={href} title={title} target={target}>
              <Span className="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl" />
              <Span className="relative z-10">{children}</Span>
            </Link>
          ) : (
            children
          )}
        </Div>
      )
    )
  }
)

CardLink.displayName = 'CardLink'

export type CardTitleRef = CardRef
export type CardTitleProps = CardCommonProps

/**
 * Renders the card title component.
 * @param as - The HTML tag or React component to render as the title.
 * @param href - The URL to link to.
 * @param title - The title of the link.
 * @param children - The content to render inside the title.
 * @param className - Additional CSS classes to apply to the title.
 * @param rest - The rest of the props of the title.
 * @returns The rendered card title component.
 */
const CardTitle = forwardRef<CardTitleRef, CardTitleProps>(
  (
    { as: Component = Heading, href, title, children, className, ...rest },
    ref
  ) => {
    return (
      !isEmpty(children) && (
        <Component
          ref={ref}
          {...rest}
          as="h2"
          className={cn(
            'text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100',
            className
          )}
        >
          {href && children ? (
            <CardLink href={href} title={title}>
              {children}
            </CardLink>
          ) : (
            children
          )}
        </Component>
      )
    )
  }
)

CardTitle.displayName = 'CardTitle'

export type CardDescriptionRef = ParagraphRef
export type CardDescriptionProps = ParagraphProps & CardCommonProps

/**
 * Renders the card description component.
 * @param children - The content to render inside the description.
 * @param id - The ID of the description.
 * @param className - Additional CSS classes to apply to the description.
 * @param rest - The rest of the props of the description.
 * @returns The rendered card description component.
 */
const CardDescription = forwardRef<CardDescriptionRef, CardDescriptionProps>(
  ({ children, className, ...rest }, ref) => {
    return (
      !isEmpty(children) && (
        <P
          ref={ref}
          {...rest}
          className={cn(
            'relative z-10 my-2 text-sm text-zinc-600 dark:text-zinc-400',
            className
          )}
        >
          {children}
        </P>
      )
    )
  }
)

CardDescription.displayName = 'CardDescription'

export type CardCtaRef = DivisionRef
export type CardCtaProps = CardCommonProps

/**
 * Renders the card call to action component.
 * @param title - The title of the link.
 * @param children - The content to render inside the CTA.
 * @param className - Additional CSS classes to apply to the CTA.
 * @param href - The URL to link to.
 * @param rest - The rest of the props of the CTA.
 * @returns The rendered card CTA component.
 */
const CardCta = forwardRef<CardCtaRef, CardCtaProps>(
  ({ href, title, children, className, ...rest }, ref) => {
    return (
      !isEmpty(children) && (
        <Div
          ref={ref}
          {...rest}
          aria-hidden="true"
          className={cn(
            'relative z-10 mt-2 flex items-start text-sm font-medium text-amber-500',
            className
          )}
        >
          {href && children ? (
            <Link
              href={href}
              title={title}
              className="flex items-center transition hover:text-amber-600 dark:hover:text-amber-600"
            >
              {children}

              <ChevronRightSvg className="ml-1 h-4 w-4 stroke-current" />
            </Link>
          ) : (
            children
          )}
        </Div>
      )
    )
  }
)

CardCta.displayName = 'CardCta'

export type CardEyebrowRef = CardRef
export type CardEyebrowProps = CardCommonProps &
  Pick<CardCommonProps, 'decorate'>

/**
 * An eyebrow component that can be used inside a Card component.
 * @param [decorate=false] - Whether to decorate the eyebrow with a line.
 * @param className - Additional CSS classes to apply to the eyebrow.
 * @param children - The content to render inside the eyebrow.
 * @returns The rendered eyebrow component.
 */
const CardEyebrow = forwardRef<CardEyebrowRef, CardEyebrowProps>(
  (
    { as: Component = P, decorate = false, className, children, ...rest },
    ref
  ) => {
    return (
      !isEmpty(children) && (
        <Component
          ref={ref}
          {...rest}
          className={cn(
            'relative z-10 my-1 flex items-center text-sm font-medium',
            className,
            decorate && 'pl-3'
          )}
        >
          {decorate && (
            <Span
              className="absolute inset-y-0 left-0 flex items-center"
              aria-hidden="true"
            >
              <Span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
            </Span>
          )}

          {children}
        </Component>
      )
    )
  }
)

CardEyebrow.displayName = 'CardEyebrow'

Card.Link = CardLink
Card.Title = CardTitle
Card.Description = CardDescription
Card.Cta = CardCta
Card.Eyebrow = CardEyebrow

export default Card
