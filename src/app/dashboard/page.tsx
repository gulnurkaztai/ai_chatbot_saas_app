'use client'

import { useAuth, UserButton } from "@clerk/nextjs"
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function DashboardPage() {

  const {isSignedIn} = useAuth();
  const router = useRouter();

  useEffect(()=>{
    if(!isSignedIn){
      router.push("/auth/sign-in");
    }
  });

  if(!isSignedIn) return null;


  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="border-b bg-white p-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <h1 className="text-xl font-bold">AI Mail Genie</h1>
          <UserButton afterSignOutUrl="/" />
        </div>
      </nav>
      
      <main className="max-w-7xl mx-auto p-4">
        <h2 className="text-2xl font-semibold mb-4">Welcome to your Dashboard</h2>
        <p className="text-gray-600">
          Your workspace is ready. Start managing your emails and campaigns.
        </p>
      </main>
    </div>
  )
}
