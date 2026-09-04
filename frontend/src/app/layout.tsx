import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Audio Track Catalogue",
  description: "A paginated audio track catalogue",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
