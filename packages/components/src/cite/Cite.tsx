import { lazy, Suspense } from "react";

import type { CiteProps } from "./Cite.client";

// Dynamically import the client component
const CiteClient = lazy(async () => {
  const module = await import("./Cite.client");
  return { default: module.CiteClient };
});

/**
 * Render the default cite server component.
 * @param {CiteProps} props - The default cite server component properties
 * @returns The rendered default cite server component
 */
export const Cite = ({ isClient = false, children, ...rest }: CiteProps) => {
  const element = <cite {...rest}>{children}</cite>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <CiteClient {...rest}>{children}</CiteClient>
      </Suspense>
    );
  }

  return element;
};

Cite.displayName = "Cite";
