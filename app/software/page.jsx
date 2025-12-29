'use client';

import { useRouter } from "next/navigation";
import AppTile from "@/src/components/AppTile";

export default function SoftwareHub() {
  const router = useRouter();
  return (
    <div className="min-h-[calc(100dvh-4rem)] grid place-items-center px-4">
      <div className="grid grid-cols-3 gap-8 max-sm:grid-cols-2">
        <AppTile icon="📝" label="Notes" onClick={() => router.push("/software/notes")} />
        <AppTile icon="🧪" label="Projects" onClick={() => router.push("/software/projects")} />
        <AppTile icon="🌐" label="Portfolio" href="https://example.com/" />
      </div>
    </div>
  );
}
