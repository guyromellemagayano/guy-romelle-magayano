import { lazy, Suspense } from "react";

import type { ColgroupProps } from "./Colgroup.client";

// Dynamically import the client component
const ColgroupClient = lazy(async () => {
  const module = await import("./Colgroup.client");
  return { default: module.ColgroupClient };
});

/**
 * Render the default table column group server component.
 * @param {ColgroupProps} props - The default table column group server component properties
 * @returns The rendered default table column group server component
 */
export const Colgroup = ({
  isClient = false,
  children,
  ...rest
}: ColgroupProps) => {
  const element = <colgroup {...rest}>{children}</colgroup>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <ColgroupClient {...rest}>{children}</ColgroupClient>
      </Suspense>
    );
  }

  return element;
};

Colgroup.displayName = "Colgroup";
