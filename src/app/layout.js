import { Geist, Geist_Mono, Barlow } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import navbarData from "@/data/shared/navbar.json";
import footerData from "@/data/shared/footer.json";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export const metadata = {
  title: "BMW Engine Rebuild Specialists | BMW Garage",
  description:
    "BMW engine rebuild specialists. Nationwide recovery, updated OEM components, fixed-price quotes, 12-month unlimited-mileage warranty. Enter your reg for an instant match.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${barlow.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar data={navbarData} />
        <main className="flex-1">{children}</main>
        <Footer data={footerData} />
      </body>
    </html>
  );
}
