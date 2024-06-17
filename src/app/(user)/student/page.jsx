"use client"
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React from 'react'

const Student = () => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/student");
    },
  });

  return (
    <div>Student
      <p>{session?.user?.email}</p>
      <p>{session?.user?.role}</p>
    </div>
  )
}

export default Student
