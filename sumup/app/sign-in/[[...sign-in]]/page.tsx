import Image from "next/image";
import { SignIn } from "@clerk/nextjs";

// Don't define custom Props type — just extract from the function argument
export default function SignInPage({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const redirectUrl =
    typeof searchParams?.redirectUrl === "string"
      ? searchParams.redirectUrl
      : "/dashboard";

  return (
    <div className="flex h-screen bg-gradient-to-b from-white to-[#fff5cd]">
      {/* Left Section - Login Form */}
      <div className="w-1/2 p-12 flex items-center bg-retroGreen">
        <div className="w-[479px] mx-auto">
          <div className="space-y-5">
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
      </div>

      {/* Right Section - Card Payment Visual */}
      <div className="w-1/2 flex justify-center items-center">
        <Image src="/Image.svg" width={500} height={800} alt="Card Payment" />
      </div>
    </div>
  );
}
