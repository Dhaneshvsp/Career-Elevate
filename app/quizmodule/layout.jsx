// filepath: C:/Users/DELL/Desktop/web_project/career_elevate/app/quizmodule/layout.jsx

import Header from "@/components/Header";
import ClientWrapper from "../ClientWrapper";
import { db } from "@/utils/db";
import { categories } from "@/utils/schema";
import { Toaster } from "react-hot-toast";
import PostHeader from "./_Components/PostHeaderForQuiz";


export default async function RootLayout({ children }) {
  let initialCategories = [];
  try {
    initialCategories = await db.select().from(categories);
    console.log("Server: Fetched categories from DB:", initialCategories);
  } catch (error) {
    console.error("Server: Error fetching categories from DB:", error);
    initialCategories = [];
  }

  return (
    <html lang="en">
      <body suppressHydrationWarning className="bg-gray-50 min-h-screen">
        <ClientWrapper initialCategories={initialCategories}>
          <Toaster position="top-center" />
          <Header/>
          <main className="py-12 px-4 sm:px-8 lg:px-16 xl:px-24 max-w-screen-xl mx-auto">
            {children}
          </main>
        </ClientWrapper>
      </body>
    </html>
  );
}