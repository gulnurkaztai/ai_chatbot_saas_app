
import { SignIn } from "@clerk/nextjs"

export default function SignInPage() {


  return (
    <div>
      <SignIn routing="path" signUpUrl="/sign-up" redirectUrl="/dashboard"/>
    </div>
    
  )
}

