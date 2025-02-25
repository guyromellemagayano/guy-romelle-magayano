import { lazy, Suspense } from "react";

import type { CaptionProps } from "./Caption.client";

// Dynamically import the client component
const CaptionClient = lazy(async () => {
  const module = await import("./Caption.client");
  return { default: module.CaptionClient };
});

/**
 * Render the default caption server component.
 * @param {CaptionProps} props - The default caption server component properties
 * @returns The rendered default caption server component
 */
export const Caption = ({
  isClient = false,
  children,
  ...rest
}: CaptionProps) => {
  const element = <caption {...rest}>{children}</caption>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <CaptionClient {...rest}>{children}</CaptionClient>
      </Suspense>
    );
  }

  return element;
};

Caption.displayName = "Caption";
