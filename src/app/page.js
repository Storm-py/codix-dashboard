"use client"
import Dashboard from "./components/Dashboard";
import Updates from "./components/Updates";
import { useRouter } from 'next/navigation'
import { useEffect } from "react";
import { useSession } from "next-auth/react"

export default function Home() {
  const router = useRouter()
  const { data: session, status } = useSession()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin")
    }
  }, [status, router])

  if (status === "loading") return null;

  return (
    <div>
      <Dashboard/>
    </div>
  );
}
