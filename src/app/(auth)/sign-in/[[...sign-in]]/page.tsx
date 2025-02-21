"use client"

import { SignIn, useAuth } from "@clerk/nextjs"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignInPage() {
  const {isSignedIn} = useAuth();
  const router = useRouter();

  useEffect(() => {
    if(isSignedIn){
      router.push("/dashboard");
    }
  });

  if(isSignedIn) return null;
  return (
    
    <div>
      <SignIn />
    </div>
    
  )
}

