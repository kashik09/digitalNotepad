// Starter dataset: phases -> modules -> sections -> items
// Extend freely later
export const starter = {
  phases: [
    {
      id: "phase1",
      title: "Phase 1",
      subtitle: "SYS 400 (Week 1 D1–D3)",
      modules: [
        {
          id: "p1m1",
          title: "Module 1: SYS 400 (Week1 D1–D3)",
          sections: [
            {
              id: "p1m1s1",
              title: "Videos (2 videos, Total time: 57:05)",
              items: [
                { id: crypto.randomUUID(), type: "page", title: "SYS400-M1-1 — Assembly & Shellcode (28:21)", meta: { timeMin: 28 + 21/60 } },
                { id: crypto.randomUUID(), type: "page", title: "SYS400-M1-2 — Buffers (28:44)", meta: { timeMin: 28 + 44/60 } },
              ],
            },
            {
              id: "p1m1s2",
              title: "Slides",
              items: [
                { id: crypto.randomUUID(), type: "attachment", title: "Assembly & Shellcode Basics.pdf" },
                { id: crypto.randomUUID(), type: "attachment", title: "Buffers.pdf" },
              ],
            },
            {
              id: "p1m1s3",
              title: "Assignments",
              items: [
                { id: crypto.randomUUID(), type: "quiz", title: "Quiz — Intro to Assembly & Shellcode (Lab)", meta: { points: 9 } },
                { id: crypto.randomUUID(), type: "quiz", title: "Quiz — Buffers (Lab)", meta: { points: 10 } },
              ],
            },
            {
              id: "p1m1s4",
              title: "Notes",
              items: [
                { id: crypto.randomUUID(), type: "note", title: "📚 SYS400-M1-1 — Assembly & Shellcode #Notes" },
                { id: crypto.randomUUID(), type: "note", title: "📚 SYS400-M1-2 — Buffers #Notes" },
              ],
            },
          ],
        },
        {
          id: "p1m2",
          title: "Module 2: NET 400 (Week1 D4 – Week2 D6)",
          sections: [
            {
              id: "p1m2s1",
              title: "Videos (Web Spiders, WAFs & Exploits)",
              items: [
                { id: crypto.randomUUID(), type: "page", title: "NET400-M1-1 — Web Spiders (26:22)", meta: { timeMin: 26 + 22/60 } },
                { id: crypto.randomUUID(), type: "page", title: "NET400-M1-2 — WAFs & Common Exploits (81:23)", meta: { timeMin: 81 + 23/60 } },
              ],
            },
            {
              id: "p1m2s2",
              title: "Assignments",
              items: [
                { id: crypto.randomUUID(), type: "quiz", title: "Spiders (Lab)", meta: { points: 10 } },
                { id: crypto.randomUUID(), type: "quiz", title: "Scapy (Lab)", meta: { points: 10 } },
              ],
            },
            {
              id: "p1m2s3",
              title: "Notes",
              items: [
                { id: crypto.randomUUID(), type: "note", title: "📚 NET400-M1-1 — Web Spiders #Notes" },
                { id: crypto.randomUUID(), type: "note", title: "📚 NET400-M1-2 — WAFs & Exploits #Notes" },
              ],
            },
          ],
        },
      ],
    },
    { id: "phase2", title: "Phase 2", subtitle: "APP 100 (Week2 D7–D9)", modules: [] },
    { id: "phase3", title: "Phase 3", subtitle: "SIE 200 (Week2 D10–Week3 D12)", modules: [] },
    { id: "phase4", title: "Phase 4", subtitle: "GRC 200 (Week3 D12–D15)", modules: [] },
    { id: "phase5", title: "Phase 5", subtitle: "Resume & Feedback", modules: [] },
  ],
};
