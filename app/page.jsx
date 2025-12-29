'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AUTH_OK_KEY = "AUTH:ok";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const authed = localStorage.getItem(AUTH_OK_KEY) === "1";
    if (authed) {
      router.push('/hub');
    } else {
      router.push('/login');
    }
  }, [router]);

  return null;
}
