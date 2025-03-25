// "use client";
// import Image from "next/image";
// import { useRouter } from "next/navigation";

// function HomeCard({ category }) {
//   const router = useRouter();

//   return (
//     <div
//       className="border-2 rounded-xl p-1 cursor-pointer shadow-[0_.3rem_0_0_rgba(0,0,0,0.1)]
//         hover:-translate-y-1 transition-transform duration-300 ease-in-out"
//         onClick={() => router.push(`/quizmodule/categories/${category.id}`)}
//         >
//       <div className="rounded-xl h-[9rem] py-1">
//         {/* <Image
//           src={
//             category.image
//               ? category.image
//               : `/categories/image--${category.name
//                   .toLowerCase()
//                   .split(" ")
//                   .join("-")}.svg`
//           }
//           width={300}
//           height={200}
//           alt={category.name}
//           className="h-full rounded-xl"
//         /> */}
//         <Image
//   src={
//     category.image
//       ? category.image
//       : `/categories/image--${category.name.toLowerCase().split(" ").join("-")}.svg`
//   }
//   width={300}
//   height={200}
//   alt={category.name}
//   className="h-full w-auto rounded-xl"
// />

//       </div>

//       <div className="py-2 px-6 flex flex-col gap-4">
//         <div>
//           <h2 className="text-xl font-bold">{category.name}</h2>
//           <p className="text-gray-600 text-sm leading-none font-semibold">
//             {category.description}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default HomeCard;
"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

function HomeCard({ category }) {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.5, hover: { duration: 0.2 } }}
      className="w-full max-w-sm bg-white border-2 border-gray-200 rounded-xl shadow-md hover:shadow-lg cursor-pointer transition-shadow duration-300"
      onClick={() => router.push(`/quizmodule/categories/${category.id}`)}
    >
      <div className="w-full h-40 sm:h-48 overflow-hidden rounded-t-xl">
        <Image
          src={
            category.image || `/categories/image--${category.name.toLowerCase().split(" ").join("-")}.svg`
          }
          alt={category.name || "Category Image"}
          width={300}
          height={200}
          className="w-full h-full object-contain"
          onError={(e) => (e.target.src = "/categories/default-image.svg")}
        />
      </div>
      <div className="p-4 flex flex-col gap-3">
        <h2 className="text-lg sm:text-xl font-bold text-gray-800 truncate">
          {category.name}
        </h2>
        <p className="text-sm sm:text-base text-gray-600 font-medium line-clamp-2">
          {category.description || "No description available"}
        </p>
      </div>
    </motion.div>
  );
}

export default HomeCard;