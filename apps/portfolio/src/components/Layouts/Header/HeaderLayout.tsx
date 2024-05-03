/* eslint-disable sort-imports */
'use client'

import { CSSProperties, forwardRef, memo, useEffect, useRef } from 'react'

import { usePathname } from 'next/navigation'

import {
  Div,
  Header,
  type DivisionRef,
  type HeaderProps,
  type HeaderRef
} from '@guy-romelle-magayano/react-components/server'

import {
  clamp,
  cn,
  isArrayType,
  isEmpty
} from '@guy-romelle-magayano/react-utils'

import { Avatar } from '@guy-romelle-magayano/portfolio/components/avatar'
import { DarkModeButton } from '@guy-romelle-magayano/portfolio/components/buttons/dark-mode'
import { AvatarContainer } from '@guy-romelle-magayano/portfolio/components/containers/avatar'
import { BaseContainer } from '@guy-romelle-magayano/portfolio/components/containers/base'
import { DesktopNavigation } from '@guy-romelle-magayano/portfolio/components/Navigation/Desktop'
import { MobileNavigation } from '@guy-romelle-magayano/portfolio/components/Navigation/Mobile'
import { PagesData } from '@guy-romelle-magayano/portfolio/types/data'

export type HeaderLayoutRef = HeaderRef
export type HeaderLayoutProps = HeaderProps & {
  pages: Array<PagesData>
}

/**
 * Render the header layout component.
 * @param pages - The pages data.
 * @param className - The class name of the header layout.
 * @param rest - The rest of the header layout props.
 * @returns The rendered header layout component.
 */
const HeaderLayout = memo(
  forwardRef<HeaderLayoutRef, HeaderLayoutProps>(
    ({ pages, className, ...rest }, ref) => {
      const pathname = usePathname(),
        headerRef = useRef<DivisionRef | null>(null),
        avatarRef = useRef<DivisionRef | null>(null),
        isInitial = useRef<boolean>(true),
        isHomePage = pathname === '/'

      useEffect(() => {
        const downDelay = avatarRef.current?.offsetTop ?? 0,
          upDelay = 64,
          setProperty = (property: string, value: string): void => {
            document.documentElement.style.setProperty(property, value)
          },
          removeProperty = (property: string): void => {
            document.documentElement.style.removeProperty(property)
          }

        const updateHeaderStyles = (): void => {
          if (!headerRef.current) {
            return
          }

          const { top, height } = headerRef.current.getBoundingClientRect()
          const scrollY = clamp({
            number: window.scrollY,
            min: 0,
            max: document.body.scrollHeight - window.innerHeight
          })

          if (isInitial.current) {
            setProperty('--header-position', 'sticky')
          }

          setProperty('--content-offset', `${downDelay}px`)

          if (isInitial.current || scrollY < downDelay) {
            setProperty('--header-height', `${downDelay + height}px`)
            setProperty('--header-mb', `${-downDelay}px`)
          } else if (top + height < -upDelay) {
            const offset = Math.max(height, scrollY - upDelay)
            setProperty('--header-height', `${offset}px`)
            setProperty('--header-mb', `${height - offset}px`)
          } else if (top === 0) {
            setProperty('--header-height', `${scrollY + height}px`)
            setProperty('--header-mb', `${-scrollY}px`)
          }

          if (top === 0 && scrollY > 0 && scrollY >= downDelay) {
            setProperty('--header-inner-position', 'fixed')
            removeProperty('--header-top')
            removeProperty('--avatar-top')
          } else {
            removeProperty('--header-inner-position')
            setProperty('--header-top', '0px')
            setProperty('--avatar-top', '0px')
          }
        }

        const updateAvatarStyles = (): void => {
          if (!isHomePage) {
            return
          }

          const fromScale = 1,
            toScale = 36 / 64,
            fromX = 0,
            toX = 2 / 16

          const scrollY = downDelay - window.scrollY

          let scale = (scrollY * (fromScale - toScale)) / downDelay + toScale
          scale = clamp({ number: scale, min: fromScale, max: toScale })

          let x = (scrollY * (fromX - toX)) / downDelay + toX
          x = clamp({ number: x, min: fromX, max: toX })

          setProperty(
            '--avatar-image-transform',
            `translate3d(${x}rem, 0, 0) scale(${scale})`
          )

          const borderScale = 1 / (toScale / scale),
            borderX = (-toX + x) * borderScale,
            borderTransform = `translate3d(${borderX}rem, 0, 0) scale(${borderScale})`

          setProperty('--avatar-border-transform', borderTransform)
          setProperty('--avatar-border-opacity', scale === toScale ? '1' : '0')
        }

        const updateStyles = (): void => {
          updateHeaderStyles()
          updateAvatarStyles()
          isInitial.current = false
        }

        updateStyles()

        window.addEventListener('scroll', updateStyles, { passive: true })
        window.addEventListener('resize', updateStyles)

        return () => {
          window.removeEventListener('scroll', updateStyles)
          window.removeEventListener('resize', updateStyles)
        }
      }, [isHomePage])

      const headerPosition = {
          position: 'var(--header-position)'
        } as unknown as CSSProperties,
        headerInnerPosition = {
          position: 'var(--header-inner-position)'
        } as unknown as CSSProperties

      return (
        <>
          <Header
            ref={ref}
            {...rest}
            className={cn(
              'pointer-events-none relative z-50 flex flex-none flex-col',
              className
            )}
            style={{
              height: 'var(--header-height)',
              marginBottom: 'var(--header-mb)'
            }}
          >
            {isHomePage && (
              <>
                <Div
                  ref={avatarRef}
                  className="order-last mt-[calc(theme(spacing.16)-theme(spacing.3))]"
                />
                <BaseContainer
                  className="top-0 order-last -mb-3 pt-3"
                  style={headerPosition}
                >
                  <Div
                    className="top-[var(--avatar-top,theme(spacing.3))] w-full"
                    style={headerInnerPosition}
                  >
                    <Div className="relative">
                      <AvatarContainer
                        className="absolute left-0 top-3 origin-left transition-opacity"
                        style={{
                          opacity: 'var(--avatar-border-opacity, 0)',
                          transform: 'var(--avatar-border-transform)'
                        }}
                      />
                      <Avatar
                        large
                        className="block h-16 w-16 origin-left"
                        style={{ transform: 'var(--avatar-image-transform)' }}
                      />
                    </Div>
                  </Div>
                </BaseContainer>
              </>
            )}

            <Div
              ref={headerRef}
              className="top-0 z-10 h-16 pt-6"
              style={headerPosition}
            >
              <BaseContainer
                className="top-[var(--header-top,theme(spacing.6))] w-full"
                style={headerInnerPosition}
              >
                <Div className="relative flex gap-4">
                  <Div className="flex flex-1">
                    {!isHomePage && (
                      <AvatarContainer>
                        <Avatar />
                      </AvatarContainer>
                    )}
                  </Div>
                  <Div className="flex flex-1 justify-end md:justify-center">
                    {!isEmpty(pages) && isArrayType(pages) && (
                      <>
                        <MobileNavigation
                          className="pointer-events-auto md:hidden"
                          menu={pages}
                        />
                        <DesktopNavigation
                          className="pointer-events-auto hidden md:block"
                          menu={pages}
                        />
                      </>
                    )}
                  </Div>
                  <Div className="flex justify-end md:flex-1">
                    <Div className="pointer-events-auto">
                      <DarkModeButton />
                    </Div>
                  </Div>
                </Div>
              </BaseContainer>
            </Div>
          </Header>

          {isHomePage && (
            <Div
              className="flex-none"
              style={{ height: 'var(--content-offset)' }}
            />
          )}
        </>
      )
    }
  )
)

HeaderLayout.displayName = 'HeaderLayout'

export default HeaderLayout
