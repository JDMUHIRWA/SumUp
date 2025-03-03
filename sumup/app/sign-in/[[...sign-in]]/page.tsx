import Image from "next/image";
import { SignIn } from "@clerk/nextjs";

export default function Login({
  searchParams,
}: {
  searchParams: { redirectUrl?: string };
}) {
  // Use the redirectUrl from searchParams or fallback to "/dashboard"
  const redirectUrl = searchParams.redirectUrl || "/dashboard";

  return (
    <div className="flex h-screen bg-gradient-to-b from-white to-[#fff5cd]">
      {/* Left Section - Login Form */}
      <div className="w-1/2 p-12 flex items-center bg-retroGreen">
        <div className="w-[479px] mx-auto">
          {/* Login Form */}
          <div className="space-y-5">
            {/* Clerk SignIn Component */}
            <SignIn
              afterSignInUrl={redirectUrl} // Redirect to the specified URL after sign-in
              appearance={{
                elements: {
                  formButtonPrimary: "bg-[#E87C3E] hover:bg-[#d66d35]",
                  footerActionLink: "text-[#E87C3E] hover:text-[#d66d35]",
                },
              }}
            />
          </div>
        </div>
      </div>

      {/* Right Section - Card Payment Visual */}
      <div className="w-1/2 flex justify-center items-center">
        <Image src="/Image.svg" width={500} height={800} alt="Card Payment" />
      </div>
    </div>
  );
}
