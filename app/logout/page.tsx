'use client';

import Image from "next/image";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-2xl shadow-md w-full max-w-sm p-8 space-y-6 text-center">

        <div className="flex justify-center">
          <Image
            src="/ethio-telecom-logo.png"
            alt="Ethio Telecom"
            width={160}
            height={60}
            priority
          />
        </div>

        <div>
          <h1 className="text-xl font-semibold text-gray-800">Sign Out</h1>
          <p className="text-sm text-gray-500 mt-2">
            Are you sure you want to sign out of Issue Tracker?
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition"
          >
            Yes, Sign Out
          </button>
          <button
            onClick={() => router.back()}
            className="w-full py-2.5 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition"
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
}
