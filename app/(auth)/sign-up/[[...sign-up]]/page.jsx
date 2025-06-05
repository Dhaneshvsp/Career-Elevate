// filepath: C:/Users/DELL/Desktop/web_project/career_elevate/app/(auth)/sign-up/[[...sign-up]]/page.jsx
"use client"; // Client component for Clerk

import { SignUp } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      {/* Card Container */}
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Sign Up for CareerElevate</h1>
          <p className="text-gray-600 mt-2">Get started with your AI-powered career boost.</p>
        </div>

        {/* Clerk SignUp */}
        <SignUp 
          appearance={{
            elements: {
              formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300",
              card: "bg-transparent shadow-none",
              headerTitle: "hidden",
              headerSubtitle: "hidden",
              socialButtons: "space-y-2",
              formFieldInput: "border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-md py-2",
              formFieldLabel: "text-gray-700 font-medium",
              footerActionLink: "text-blue-600 hover:text-blue-700",
            },
          }}
        />

        {/* Footer */}
        <p className="text-center text-gray-500 mt-6 text-sm">
          Already have an account?{' '}
          <a href="/sign-in" className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-300">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}