import React from "react";
import { retryFetch } from "@/utils/retry-fetch";

function SuspenseSpin() {
  return <div>111</div>;
}

export function lazyLoadWrapper(
  lazyLoadFunc: () => Promise<{
    default: React.FC;
  }>
) {
  const LazyComponent = React.lazy(() => retryFetch<{ default: React.FC }>(lazyLoadFunc));

  return (
    <React.Suspense fallback={<SuspenseSpin />}>
      <LazyComponent />
    </React.Suspense>
  );
}
