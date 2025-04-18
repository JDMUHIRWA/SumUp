"use client"; // 👈 IMPORTANT if you're using Clerk components

import Image from "next/image";
import { SignIn } from "@clerk/nextjs";

export default function SignInPage({
  searchParams,
}: {
  searchParams?: { redirectUrl?: string };
}) {
  const redirectUrl = searchParams?.redirectUrl || "/dashboard";

  return (
    <div className="flex h-screen bg-gradient-to-b from-white to-[#fff5cd]">
      <div className="w-1/2 p-12 flex items-center bg-retroGreen">
        <div className="w-[479px] mx-auto space-y-5">
          <SignIn
            afterSignInUrl={redirectUrl}
            appearance={{
              elements: {
                formButtonPrimary: "bg-[#E87C3E] hover:bg-[#d66d35]",
                footerActionLink: "text-[#E87C3E] hover:text-[#d66d35]",
              },
            }}
          />
        </div>
      </div>
      <div className="w-1/2 flex justify-center items-center">
        <Image src="/Image.svg" width={500} height={800} alt="Card Payment" />
      </div>
    </div>
  );
}
