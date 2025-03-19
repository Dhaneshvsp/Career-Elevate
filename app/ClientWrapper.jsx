"use client";
import { ThemeProvider } from "next-themes";
import { ClerkProvider } from "@clerk/nextjs";
import { GlobalContextProvider } from "@/context/globalContext";

export default function ClientWrapper({ children, initialCategories }) {
  console.log("Client: Initial categories:", initialCategories);
  return (
      <ThemeProvider attribute="class" defaultTheme="system">
        <GlobalContextProvider initialCategories={initialCategories}>
          {children}
        </GlobalContextProvider>
      </ThemeProvider>
  
  );
}