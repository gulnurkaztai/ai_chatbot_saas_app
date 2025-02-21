"use client"

import { SignUp, useAuth } from "@clerk/nextjs"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignUpPage() {
  const {isSignedIn} = useAuth();
  const router = useRouter();

  useEffect(() => {
    if(isSignedIn){
      router.push("/dashboard")
    }
  })

  return <SignUp/>
}

