import type { Metadata } from "next";
import { Space_Grotesk, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/layout/smooth-scroll";
import CustomCursor from "@/components/layout/custom-cursor";
import GrainOverlay from "@/components/layout/grain-overlay";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { THEME_STORAGE_KEY } from "@/lib/theme";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const siteUrl = "https://manojkumar-dev.vercel.app";
const themeInitScript = `
  try {
    const storedTheme = localStorage.getItem("${THEME_STORAGE_KEY}");
    const theme = storedTheme === "light" ? "light" : "dark";
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    document.documentElement.classList.add("theme-ready");
  } catch {
    document.documentElement.dataset.theme = "dark";
    document.documentElement.style.colorScheme = "dark";
    document.documentElement.classList.add("theme-ready");
  }
`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Manojkumar — Full Stack Developer",
    template: "%s — Manojkumar",
  },
  description:
    "Full Stack Developer with 2.5+ years of experience shipping 7+ ERP, commerce, CLM, and CRM products using React, Next.js, Node.js, NestJS, and TypeScript.",
  keywords: [
    "Manojkumar",
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "Node.js Developer",
    "NestJS Developer",
    "Chennai",
  ],
  authors: [{ name: "Manojkumar" }],
  openGraph: {
    title: "Manojkumar — Full Stack Developer",
    description:
      "Full Stack Developer with 2.5+ years of experience shipping ERP, commerce, CLM, and CRM products with React, Next.js, Node.js, NestJS, and TypeScript.",
    url: siteUrl,
    siteName: "Manojkumar",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Manojkumar — Full Stack Developer",
    description:
      "Full Stack Developer with 2.5+ years of experience shipping ERP, commerce, CLM, and CRM products with React, Next.js, Node.js, NestJS, and TypeScript.",
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/favicons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
    ],
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jakarta.variable} ${jetbrainsMono.variable} h-full antialiased`}
      data-theme="dark"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col bg-bg text-ink">
        <ThemeProvider>
          <SmoothScroll />
          <CustomCursor />
          <GrainOverlay />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
