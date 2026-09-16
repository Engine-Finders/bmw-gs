import { Suspense } from "react";
import GetQuoteClient from "./GetQuoteClient";

export const metadata = {
  title: "Get Your BMW Engine Quote | BMW Garage",
  description: "Get a fast, no-obligation BMW engine rebuild quote. Compare prices from trusted BMW specialists.",
  robots: { index: false, follow: false },
};

export default function GetQuotePage() {
  return (
    <Suspense fallback={null}>
      <GetQuoteClient />
    </Suspense>
  );
}
