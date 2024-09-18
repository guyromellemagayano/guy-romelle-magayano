'use client'

import { FC, useEffect } from 'react'

import * as Sentry from '@sentry/nextjs'
import NextError from 'next/error'

import { Body, Html } from '@react-components'

import { cn } from '@react-utils'

export type TGlobalErrorProps = {
  error: Error & { digest?: string }
}

/**
 * Render the global error app page.
 * @returns The rendered global error app page
 */
const GlobalError: FC<TGlobalErrorProps> = ({ error }) => {
  useEffect(() => {
    Sentry.captureException(error)
  }, [error])

  return (
    <Html className={cn('h-full antialiased')} suppressHydrationWarning>
      <Body className={cn('flex h-full bg-zinc-50 dark:bg-black')}>
        <NextError statusCode={0} />
      </Body>
    </Html>
  )
}

GlobalError.displayName = 'GlobalError'

export default GlobalError
