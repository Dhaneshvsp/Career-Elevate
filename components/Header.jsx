// "use client";
// import { chart, home, login } from "@/utils/icons";
// import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
// import Image from "next/image";
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import { Button } from "./ui/button";

// function Header() {
//   const pathname = usePathname();
//   const router = useRouter();

//   const menu = [
//     { name: "Home", icon: home, link: "/quizmodule" },
//     { name: "My Stats", icon: chart, link: "/quizmodule/stats" },
//   ];

//   return (
//     <header className="min-h-[8vh] px-[10rem] xl:px-[15rem] border-b-2 flex items-center">
//       <nav className="flex-1 flex items-center justify-between">
//         <Link href="/" className="flex items-center gap-2">
//           <Image src="/logo.png" alt="logo" width={50} height={50} />
//           <h1 className="text-3xl font-bold text-blue-400">CareerElevate</h1>
//         </Link>
//         <ul className="flex items-center gap-8">
//           {menu.map((item, index) => (
//             <li key={index}>
//               <Link
//                 href={item.link}
//                 className={`py-1 px-6 flex items-center gap-2 text-lg leading-none text-gray-400 rounded-lg ${pathname === item.link ? "bg-blue-500/20 text-blue-400 border-2 border-blue-400" : ""}`}
//               >
//                 <span className="text-2xl text-blue-400">{item.icon}</span>
//                 <span className={`font-bold uppercase ${pathname === item.link ? "text-blue-400" : "text-gray-400"}`}>{item.name}</span>
//               </Link>
//             </li>
//           ))}
//         </ul>
//         <div>
//           <SignedIn>
//             <UserButton appearance={{ elements: { userButtonAvatarBox: "w-12 h-12 border-2 border-gray-300 rounded-full" } }} />
//           </SignedIn>
//           <SignedOut>
//             <Button className="py-5 bg-blue-400 flex items-center gap-2 font-semibold text-lg rounded-lg hover:bg-blue-500/90" onClick={() => router.push("/sign-in")}>
//               {login} Login / Sign Up
//             </Button>
//           </SignedOut>
//         </div>
//       </nav>
//     </header>
//   );
// }

// export default Header;
"use client";

import { chart, login } from "@/utils/icons"; // Removed 'home' since it’s in PostHeader links
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { motion } from "framer-motion";

function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const menu = [
    { href: "/homepage", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/contact-us", label: "Contact Us" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/quizmodule/stats", label: "My Stats", icon: chart }, // Added My Stats here
  ];

  return (
    <header className="flex justify-between items-center p-4 sm:p-6 bg-gradient-to-r from-teal-50 via-blue-50 to-indigo-50 shadow-md sticky top-0 z-50">
      <motion.div
        className="flex items-center space-x-3"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Image
          src="/logo.svg" // Use .png since your original Header uses it
          alt="CareerElevate Logo"
          width={40}
          height={40}
          className="sm:w-12 sm:h-12 transition-transform duration-300 hover:scale-110"
        />
        <span className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-indigo-600">
          CareerElevate
        </span>
      </motion.div>
      <nav className="hidden sm:flex items-center space-x-6 lg:space-x-10">
        {menu.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href={item.href}
              className={`flex items-center gap-2 text-sm sm:text-lg font-medium transition-colors duration-300 ${
                pathname === item.href
                  ? "text-teal-600 border-b-2 border-teal-600"
                  : "text-gray-700 hover:text-teal-600"
              }`}
            >
              {item.icon && (
                <span className="text-lg sm:text-xl text-teal-600">{item.icon}</span>
              )}
              <span className={item.label === "My Stats" ? "uppercase" : ""}>
                {item.label}
              </span>
            </Link>
          </motion.div>
        ))}
      </nav>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-4"
      >
        <SignedIn>
          <UserButton
            appearance={{
              elements: {
                userButtonAvatarBox: "w-10 h-10 sm:w-12 sm:h-12 border-2 border-gray-300 rounded-full",
              },
            }}
          />
        </SignedIn>
        <SignedOut>
          <Button
            onClick={() => router.push("/sign-in")}
            className="px-4 py-2 sm:px-6 sm:py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm sm:text-lg rounded-lg flex items-center gap-2 transition-colors duration-300"
          >
            {login} Login / Sign Up
          </Button>
        </SignedOut>
      </motion.div>
    </header>
  );
}

export default Header;