// Adding "use client" to indicate this file should be treated as using client-side JavaScript.
"use client";
import React, { useState, useEffect } from 'react';
import { SignedIn, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from 'next/navigation'; // Adjusted from 'next/navigation' to 'next/router' for correct usage

import Header from "@/components/shared/Header";
import { Button } from "@/components/ui/button";
import { plans } from "@/constants";
import { getUserById } from "@/lib/actions/user.actions";
import Checkout from "@/components/shared/Checkout";

const Credits = () => {
  const [userDetails, setUserDetails] = useState(null);
  const router = useRouter();
  const { user } = useUser(); // useUser hook to manage user state

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!user) {
        router.push("/sign-in");
        return;
      }
      // Assuming getUserById is your function to fetch additional user details; adjust as necessary
      const fetchedUserDetails = await getUserById(user.id);
      if (fetchedUserDetails) {
        setUserDetails(fetchedUserDetails);
      }
    };

    fetchUserDetails();
  }, [user, router]);

  if (!userDetails) return <div>Loading...</div>; // Or any other loading state representation

  return (
    <>
      <Header
        title="Buy Credits"
        subtitle="Choose a credit package that suits your needs!"
      />

      <section>
        <ul className="credits-list">
          {plans.map((plan) => (
            <li key={plan.name} className="credits-item">
              <div className="flex-center flex-col gap-3">
                <Image src={plan.icon} alt="check" width={50} height={50} />
                <p className="p-20-semibold mt-2 text-purple-500">
                  {plan.name}
                </p>
                <p className="h1-semibold text-dark-600">${plan.price}</p>
                <p className="p-16-regular">{plan.credits} Credits</p>
              </div>

              <ul className="flex flex-col gap-5 py-9">
                {plan.inclusions.map((inclusion) => (
                  <li key={plan.name + inclusion.label} className="flex items-center gap-4">
                    <Image
                      src={`/assets/icons/${inclusion.isIncluded ? "check.svg" : "cross.svg"}`}
                      alt={inclusion.label}
                      width={24}
                      height={24}
                    />
                    <p className="p-16-regular">{inclusion.label}</p>
                  </li>
                ))}
              </ul>

              {plan.name === "Free" ? (
                <Button variant="outline" className="credits-btn">
                  Free Consumable
                </Button>
              ) : (
                <SignedIn>
                  <Checkout
                    plan={plan.name}
                    amount={plan.price}
                    credits={plan.credits}
                    buyerId={user.id} // Adjusted to use id from useUser hook
                  />
                </SignedIn>
              )}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default Credits;
























// import { SignedIn, auth } from "@clerk/nextjs";
// import Image from "next/image";
// import { redirect } from "next/navigation";

// import Header from "@/components/shared/Header";
// import { Button } from "@/components/ui/button";
// import { plans } from "@/constants";
// import { getUserById } from "@/lib/actions/user.actions";
// import Checkout from "@/components/shared/Checkout";

// const Credits = async () => {
//   const { userId } = auth();
  
//   if (!userId) redirect("/sign-in");



//   const user = await getUserById(userId);
  



//   return (
//     <>
//       <Header
//         title="Buy Credits"
//         subtitle="Choose a credit package that suits your needs!"
//       />

//       <section>
//         <ul className="credits-list">
//           {plans.map((plan) => (
//             <li key={plan.name} className="credits-item">
//               <div className="flex-center flex-col gap-3">
//                 <Image src={plan.icon} alt="check" width={50} height={50} />
//                 <p className="p-20-semibold mt-2 text-purple-500">
//                   {plan.name}
//                 </p>
//                 <p className="h1-semibold text-dark-600">${plan.price}</p>
//                 <p className="p-16-regular">{plan.credits} Credits</p>
//               </div>

//               {/* Inclusions */}
//               <ul className="flex flex-col gap-5 py-9">
//                 {plan.inclusions.map((inclusion) => (
//                   <li
//                     key={plan.name + inclusion.label}
//                     className="flex items-center gap-4"
//                   >
//                     <Image
//                       src={`/assets/icons/${
//                         inclusion.isIncluded ? "check.svg" : "cross.svg"
//                       }`}
//                       alt="check"
//                       width={24}
//                       height={24}
//                     />
//                     <p className="p-16-regular">{inclusion.label}</p>
//                   </li>
//                 ))}
//               </ul>

//               {plan.name === "Free" ? (
//                 <Button variant="outline" className="credits-btn">
//                   Free Consumable
//                 </Button>
//               ) : (
//                 <SignedIn>
//                   <Checkout
//                     plan={plan.name}
//                     amount={plan.price}
//                     credits={plan.credits}
//                     buyerId={user._id}
//                   />
//                 </SignedIn>
//               )}
//             </li>
//           ))}
//         </ul>
//       </section>
//     </>
//   );
// };

// export default Credits;