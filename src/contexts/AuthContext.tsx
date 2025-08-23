"use client";

import React, { createContext, useContext } from "react";
import { SessionProvider, useSession, signIn, signOut } from "next-auth/react";

interface User {
  id: string;
  name: string;
  email: string;
}

interface Session {
  user: User;
  expires: string;
}

interface AuthContextType {
  session: Session | null;
  loading: boolean;
  signIn: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  signUp: (
    name: string,
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const { data: sessionData, status } = useSession();

  const session = sessionData as Session | null;
  const loading = status === "loading";

  // sign in function using NextAuth
  const handleSignIn = async (email: string, password: string) => {
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        return { success: false, error: "Invalid email or password" };
      } else {
        return { success: true };
      }
    } catch {
      return { success: false, error: "Network error. Please try again." };
    }
  };

  // Sign up function
  const signUp = async (name: string, email: string, password: string) => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // after successful registration, sign in with NextAuth
        const signInResult = await handleSignIn(email, password);
        return signInResult;
      } else {
        return { success: false, error: data.message };
      }
    } catch {
      return { success: false, error: "Network error. Please try again." };
    }
  };

  // sign out function using NextAuth
  const handleSignOut = async () => {
    await signOut({ redirect: false });
  };

  // Google sign in function
  const signInWithGoogle = async () => {
    await signIn("google", { callbackUrl: "/" });
  };

  const value = {
    session,
    loading,
    signIn: handleSignIn,
    signUp,
    signOut: handleSignOut,
    signInWithGoogle,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AuthContextProvider>{children}</AuthContextProvider>
    </SessionProvider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
