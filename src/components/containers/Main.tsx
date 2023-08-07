/* eslint-disable @typescript-eslint/no-explicit-any */
import { IContainerProps } from '@/interfaces'
import clsx from 'clsx'
import React from 'react'

type DivRef = HTMLDivElement

// Outer container components
const OuterContainer = React.forwardRef<DivRef, IContainerProps & any>(function OuterContainer(
    { className, children, ...rest },
    ref
): React.ReactNode {
    return (
        <div ref={ref} className={clsx('sm:px-8', className)} {...rest}>
            <div className="mx-auto max-w-7xl lg:px-8">{children}</div>
        </div>
    )
})

// Inner container components
const InnerContainer = React.forwardRef<DivRef, IContainerProps & any>(function InnerContainer(
    { className, children, ...rest },
    ref
): React.ReactNode {
    return (
        <div ref={ref} className={clsx('relative px-4 sm:px-8 lg:px-12', className)} {...rest}>
            <div className="mx-auto max-w-2xl lg:max-w-5xl">{children}</div>
        </div>
    )
})

// Container with ref
const ContainerWithRef = React.forwardRef<DivRef, IContainerProps & any>(function ContainerWithRef(
    { children, ...rest },
    ref
): React.ReactNode {
    return (
        <OuterContainer ref={ref} {...rest}>
            <InnerContainer>{children}</InnerContainer>
        </OuterContainer>
    )
})

type ContainerType = typeof ContainerWithRef & {
    Outer: typeof OuterContainer
    Inner: typeof InnerContainer
}

// Container component
const Container = ContainerWithRef as ContainerType

Container.Outer = OuterContainer
Container.Inner = InnerContainer

export default Container
