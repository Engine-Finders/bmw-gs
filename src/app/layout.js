import { Geist, Geist_Mono, Barlow, Roboto_Condensed } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import JsonLd from "@/components/shared/JsonLd";
import navbarData from "@/data/shared/navbar.json";
import footerData from "@/data/shared/footer.json";
import { businessGraph } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";

// re-exported so existing imports from "@/app/layout" keep working
export { SITE_URL };

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Homepage titles use Roboto Condensed (italic, 900) — same as the Mercedes garage site.
const robotoCondensed = Roboto_Condensed({
  variable: "--font-roboto-condensed",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  style: ["normal", "italic"],
});

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: "BMW Engine Rebuild Specialists | BMW Garage",
  description:
    "BMW engine rebuild specialists. Nationwide recovery, updated OEM components, fixed-price quotes, 12-month unlimited-mileage warranty. Enter your reg for an instant match.",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${barlow.variable} ${robotoCondensed.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <JsonLd data={businessGraph()} />
        <Navbar data={navbarData} />
        <main className="flex-1">{children}</main>
        <Footer data={footerData} />
      </body>
    </html>
  );
}
