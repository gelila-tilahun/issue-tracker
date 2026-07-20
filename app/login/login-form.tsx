// app/login/login-form.tsx
'use client';

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  
  // Handle Credentials (Username & Password) Submission
  const handleCredentialsSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    
    // "cred" matches the provider name declared in your /lib/auth.ts
    await signIn("cred", { username, password, callbackUrl: "/" });
  };

  // Handle Google OAuth Authentication
  const handleGoogleSignIn = async () => {
    await signIn("google", { callbackUrl: "/" });
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your credentials below to login to your account
          </CardDescription>
          <CardAction>
            <Button variant="link">Sign Up</Button>
          </CardAction>
        </CardHeader>
        
        {/* Wrapped the inputs in a form connected to NextAuth handler */}
        <form onSubmit={handleCredentialsSubmit}>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                {/* Changed htmlFor/id/name to match "username" from your CredentialsProvider */}
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="yourusername"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input 
                  id="password" 
                  name="password" 
                  type="password" 
                  required 
                />
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="flex-col gap-2">
            {/* Kept type="submit" inside the form context to fire onSubmit */}
            <Button type="submit" className="w-full">
              Login
            </Button>
            
            {/* Attached NextAuth onClick trigger for Google Provider */}
            <Button 
              type="button"
              variant="outline" 
              className="w-full" 
              onClick={handleGoogleSignIn}
            >
              Login with Google
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
