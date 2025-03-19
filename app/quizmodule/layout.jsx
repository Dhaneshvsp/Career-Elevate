// import { GlobalContextProvider } from "@/context/globalContext";

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body className="debug-static-class">
//         <GlobalContextProvider>{children}</GlobalContextProvider>
//       </body>
//     </html>
//   );
// }
import Header from "@/components/Header";
import ClientWrapper from "../ClientWrapper";
import { db } from "@/utils/db";
import { categories } from "@/utils/schema";
import { Toaster } from "react-hot-toast";
import PostHeader from "../homepage/_components/PostHeader";


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
      <body suppressHydrationWarning>
        <ClientWrapper initialCategories={initialCategories}>
        <Toaster position="top-center" />
        <Header/>
            <main className="py-8 mx-[15rem] xl:mx-[25rem] h-full">
              {children}
            </main>
        </ClientWrapper>
      </body>
    </html>
  );
}