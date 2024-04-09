'use client'
import { Inter } from "next/font/google";
import "./globals.css";

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import { UserProvider } from "@/context/userContext";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "PayPlus Managment System",
//   description: "An employee managing system",
// };

const queryClient = new QueryClient()

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <QueryClientProvider client={queryClient}>
      <UserProvider>
      <body className={inter.className}>
        {children}
        </body>
      </UserProvider>
      </QueryClientProvider>
    </html>
  );
}
