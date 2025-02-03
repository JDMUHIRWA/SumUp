import Link from "next/link"; // Make sure to import Link correctly
import Image from "next/image";

export default function Login() {
  return (
    <>
      <div className="flex h-screen bg-gradient-to-b from-white to-[#fff5cd]">
        {/* Left Section - Login Form */}
        <div className="w-1/2 p-12 flex items-center">
          <div className="w-[479px] mx-auto">
            {/* Login Form */}
            <div className="space-y-5">
              <h1 className="text-4xl font-bold text-gray-900">
                Create account
              </h1>
              <p className="text-gray-600">Enter your credentials to sign in</p>

              <form className="space-y-3">
                <div className="space-y-0">
                  <input
                    type="tel"
                    id="number"
                    className="w-full p-3 rounded-2xl border border-gray-300 outline-none focus:ring-2 focus:ring-[#E87C3E] focus:border-transparent"
                    placeholder="123-456-7890"
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                  />
                </div>

                <div className="space-y-0">
                  <input
                    type="password"
                    id="password"
                    className="w-full p-3 rounded-2xl border border-gray-300 outline-none focus:ring-2 focus:ring-[#E87C3E] focus:border-transparent"
                    placeholder="Enter your password"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#E87C3E] text-white py-3 rounded-lg font-semibold hover:bg-[#d66d35] transition-colors"
                >
                  Sign in
                </button>
              </form>
              <div className="text-center">
                <span className="text-gray-600">
                  Don&apos;t have an account? {""}
                </span>
                <Link
                  href="/register"
                  className="text-[#E87C3E] font-semibold hover:underline"
                >
                  Register
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Card Payment Visual */}
        <div className="w-1/2 flex justify-center items-center">
          <Image src="/Image.svg" width={500} height={800} alt="Card Payment" />
        </div>
      </div>
    </>
  );
}
