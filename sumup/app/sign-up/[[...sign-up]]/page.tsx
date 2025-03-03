import Image from "next/image";
import { SignUp } from "@clerk/nextjs";

export default function Register({
  searchParams,
}: {
  searchParams: { redirectUrl?: string };
}) {
  const redirectUrl = searchParams.redirectUrl || "/sign-in";

  return (
    <div className="flex h-screen bg-gradient-to-b from-white to-[#fff5cd]">
      {/* Left Section - Register Form */}
      <div className="w-1/2 h-full flex items-center">
        <div className="w-[479px] mx-auto">
          {/* Register Form */}
          <div className="space-y-5">
            {/* Clerk SignUp Component */}
            <SignUp
              afterSignUpUrl={redirectUrl} // Redirect to the specified URL after sign-up
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
      <div className="w-1/2 flex h-full justify-center items-center">
        <Image src="/Image.svg" width={500} height={800} alt="Card Payment" />
      </div>
    </div>
  );
}
