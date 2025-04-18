import React from "react";
import { ArrowRight, PiggyBank, Shield, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const features = [
    {
      icon: <PiggyBank className="w-6 h-6" />,
      title: "Smart Budgeting",
      description: "Set and track your budgets with intelligent insights",
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Goal Planning",
      description: "Save for your dreams with personalized milestones",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure & Private",
      description: "Bank-level security to protect your financial data",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-[#fff5cd]">
      {/* Hero Section */}
      <div className="flex-1 flex flex-col lg:flex-row items-center justify-center px-6 lg:px-16 py-12 gap-12">
        <div className="flex items-center w-full  px-6 fixed top-0">
          <Link href="/">
            <Image src="/Logo.svg" width={207} height={40} alt="SumUp Logo" />
          </Link>
        </div>
        {/* Left Content */}
        <div className="max-w-xl space-y-6  ">
          <h2 className="text-5xl font-bold text-gray-900 leading-tight">
            Smart budgeting for your
            <span className="text-[#E87C3E]"> financial goals</span>
          </h2>
          <p className="text-xl text-gray-600">
            Take control of your finances with our next-generation budgeting
            app. Set goals, track spending, and watch your savings grow.
          </p>
          <div className="flex gap-4">
            <Link href="/sign-up">
              <button className="bg-[#E87C3E] text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-[#d66d35] transition-colors">
                Get Started <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
            <button className="border-2 border-[#E87C3E] text-[#E87C3E] px-6 py-3 rounded-lg font-semibold hover:bg-[#fff5cd] transition-colors">
              Learn More
            </button>
          </div>
        </div>

        {/* Right Content - Feature Cards */}
        <div className="grid grid-cols-1 gap-6 max-w-md">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#fff5cd] rounded-lg text-[#E87C3E]">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
