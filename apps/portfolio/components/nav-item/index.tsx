'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { TNavItemProps } from 'types/components'

/**
 * A navigation item component.
 * @param href - The URL of the navigation item.
 * @param children - The content of the navigation item.
 * @param className - The class name of the navigation item.
 * @returns A JSX element representing the navigation item.
 */
export default function NavItem({
  href,
  children,
  className
}: TNavItemProps): JSX.Element {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <li>
      <Link
        href={href}
        className={clsx(
          'relative block px-3 py-2 transition',
          isActive
            ? 'text-amber-500 dark:text-amber-400'
            : 'hover:text-amber-500 dark:hover:text-amber-400',
          className
        )}
        passHref
      >
        {children}
        {isActive && (
          <span className="absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-amber-500/0 via-amber-500/40 to-amber-500/0 dark:from-amber-400/0 dark:via-amber-400/40 dark:to-amber-400/0" />
        )}
      </Link>
    </li>
  )
}
