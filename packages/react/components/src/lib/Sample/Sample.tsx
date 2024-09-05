import React from 'react'

export type SampleRef = HTMLElement
export type SampleProps = React.HTMLAttributes<SampleRef>

/**
 * Render the sample component.
 * @param {SampleProps} props - The sample component properties
 * @param {SampleRef} ref - The sample component reference
 * @returns The rendered sample component
 */
const Sample = React.forwardRef<SampleRef, SampleProps>(
  ({ children, ...rest }, ref) => {
    return (
      <samp ref={ref} {...rest}>
        {children}
      </samp>
    )
  }
)

Sample.displayName = 'Sample'

export default Sample
