import "@radix-ui/themes/styles.css";
import './theme-config.css';
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import NavBar from "./NavBar";
import { Container, Theme } from "@radix-ui/themes";
import AuthProvider from "./auth/Provider";
import QueryClientProvider from "./QueryClientProvider";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: {
    template: '%s | Issue Tracker',
    default: 'Issue Tracker',
  },
  description: 'Track and manage project issues efficiently',
  icons: {
    icon: "/ethio-telecom-logo.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className={geist.variable}>
        <AuthProvider>
          <QueryClientProvider>
            <Theme accentColor="lime" scaling="105%">
              <NavBar />
              <main className="p-5">
                <Container>
                  {children}
                </Container>
              </main>
            </Theme>
          </QueryClientProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
