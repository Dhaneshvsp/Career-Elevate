// // import React from "react";
// // import { useRouter } from "next/navigation";

// // const categories = [
// //   {
// //     name: "Science",
// //     description:
// //       "Science is the pursuit and application of knowledge and understanding of the natural and social world following a systematic methodology based on evidence.",
// //     image: "/science.png", // Update with actual image paths
// //   },
// //   {
// //     name: "Technology",
// //     description: "Dive into the latest technological advancements.",
// //     image: "/technology.png",
// //   },
// //   {
// //     name: "Programming",
// //     description: "Learn about coding and software development.",
// //     image: "/programming.png",
// //   },
// //   {
// //     name: "Mathematics",
// //     description: "Master the language of numbers and patterns.",
// //     image: "/mathematics.png",
// //   },
// // ];

// // const QuizCategory = () => {
// //   const router = useRouter();

// //   const handleCategoryClick = (category) => {
// //     router.push(`/quiz/setup?category=${category}`);
// //   };

// //   return (
// //     <div className="min-h-screen flex flex-col items-center p-8">
// //       <h1 className="text-3xl font-bold mb-6">Quiz Catalog</h1>
// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
// //         {categories.map((category, index) => (
// //           <div
// //             key={index}
// //             className="bg-white shadow-lg rounded-lg p-6 cursor-pointer hover:shadow-xl transition"
// //             onClick={() => handleCategoryClick(category.name)}
// //           >
// //             <img src={category.image} alt={category.name} className="w-full h-40 object-cover mb-4" />
// //             <h2 className="text-xl font-semibold">{category.name}</h2>
// //             <p className="text-gray-600">{category.description}</p>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default QuizCategory;
// import Link from 'next/link';
// import { db } from '@/utils/db';
// import { QuizCategory } from '@/utils/schema';

// export default async function QuizCategories() {
//     const categories = await db.select().from(QuizCategory);
//     return (
//         <div>
//             <h1>Quiz Catalog</h1>
//             <div className="grid grid-cols-2 gap-4">
//                 {categories.map(category => (
//                     <Link key={category.id} href={`/quiz/${category.id}`}>
//                         <div className="border p-4 rounded-lg shadow-md hover:shadow-lg">
//                             <img src={category.imageUrl} alt={category.name} className="w-full h-32 object-cover rounded-md" />
//                             <h2 className="text-xl font-bold">{category.name}</h2>
//                             <p>{category.description}</p>
//                         </div>
//                     </Link>
//                 ))}
//             </div>
//         </div>
//     );
// }

import React from 'react'

function page() {
  return (
    <div>page</div>
  )
}

export default page