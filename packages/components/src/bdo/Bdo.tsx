import { lazy, Suspense } from "react";

import type { BdoProps } from "./Bdo.client";

// Dynamically import the client component
const BdoClient = lazy(async () => {
  const module = await import("./Bdo.client");
  return { default: module.BdoClient };
});

/**
 * Render the default bidirectional text override server component.
 * @param {BdoProps} props - The default bidirectional text override server component properties
 * @returns The rendered default bidirectional text override server component
 */
export const Bdo = ({ isClient = false, children, ...rest }: BdoProps) => {
  const element = <bdo {...rest}>{children}</bdo>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <BdoClient {...rest}>{children}</BdoClient>
      </Suspense>
    );
  }

  return element;
};

Bdo.displayName = "Bdo";
