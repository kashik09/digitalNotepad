'use client';

import { useRouter } from "next/navigation";
import AppTile from "@/src/components/AppTile";

export default function Hub() {
  const router = useRouter();
  return (
    <div className="min-h-[calc(100dvh-4rem)] grid place-items-center px-4">
      <div className="flex items-center justify-center gap-8">
        <AppTile icon="🛡️" label="Cybersecurity" onClick={() => router.push("/cyber")} />
        <AppTile icon="💻" label="Software Engineering" onClick={() => router.push("/software")} />
      </div>
    </div>
  );
}
