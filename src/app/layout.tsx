import type { Metadata } from "next";
import { Epilogue, Manrope } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const epilogue = Epilogue({
  variable: "--font-display",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tratia | CRM de WhatsApp para salones",
  description: "No pierdas clientes de WhatsApp: agenda más citas y cobra más rápido.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="es"
        className={`${epilogue.variable} ${manrope.variable} h-full antialiased`}
      >
        <body className="min-h-full flex flex-col bg-[#fdfcfb] text-[#1a1c1c]">{children}</body>
      </html>
    </ClerkProvider>
  );
}
