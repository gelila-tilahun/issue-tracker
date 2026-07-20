'use client';

import { signIn } from "next-auth/react";

export function SignupForm() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-semibold">Create an account</h1>
        <p className="text-gray-500 text-sm">Sign up with your Google account to get started</p>
        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="flex items-center gap-3 px-5 py-2.5 border rounded-lg hover:bg-gray-50 transition mx-auto"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" fill="currentColor"/>
          </svg>
          Sign up with Google
        </button>
        <p className="text-sm text-gray-500">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">Sign in</a>
        </p>
      </div>
    </div>
  );
}
