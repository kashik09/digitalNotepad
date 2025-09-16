// src/data/phases/phase4.js
// Phase 4 — Gray Hat Hacking
export default {
  id: "phase4",
  title: "Phase 4 — Gray Hat Hacking",
  subtitle: "SYS400 • NET400 • APP100 • SIE200 • GRC200",
  modules: [
    /* ===========================
     * Module 1 — SYS400 (W1 D1–D3)
     * =========================== */
    {
      id: "sys400",
      badge: "SYS400",
      title: "Module 1 (Week 1 Day 1–3) — SYS400",
      sections: [
        {
          id: "sys400-m1",
          title: "SYS400 — M1",
          items: [
            { id: "sys400-m1-1-v", type: "page", title: "Assembly & Shellcode (1 video, 28:21)", meta: { timeMin: 28 } },
            { id: "sys400-m1-1-notes", type: "page", title: "📚 Assembly & Shellcode Basics #Notes" },
            { id: "sys400-m1-2-v", type: "page", title: "Buffers (1 video, 28:44)", meta: { timeMin: 29 } },
            { id: "sys400-m1-2-notes", type: "page", title: "📚 Buffers #Notes" },
          ],
        },
        {
          id: "sys400-m1-slides",
          title: "Slides",
          items: [
            { id: "sys400-m1-1-slide", type: "attachment", title: "Slides — Assembly & Shellcode Basics.pdf" },
            { id: "sys400-m1-2-slide", type: "attachment", title: "Slides — Buffers.pdf" },
          ],
        },
        {
          id: "sys400-m1-assign",
          title: "Assignments",
          items: [
            { id: "sys400-m1-1-quiz", type: "quiz", title: "Quiz — Intro to Assembly & Shellcode (Lab)", meta: { points: 9 } },
            { id: "sys400-m1-2-quiz", type: "quiz", title: "Quiz — Buffers (Lab)", meta: { points: 10 } },
          ],
        },

        {
          id: "sys400-m2",
          title: "SYS400 — M2",
          items: [
            { id: "sys400-m2-1-v", type: "page", title: "Stack & Memory Protections (1 video, 9:42)", meta: { timeMin: 10 } },
            { id: "sys400-m2-1-notes", type: "page", title: "📚 Stack & Memory Protections #Notes" },
            { id: "sys400-m2-2-v", type: "page", title: "Windows Security Model (1 video, 12:19)", meta: { timeMin: 12 } },
            { id: "sys400-m2-2-notes", type: "page", title: "📚 Windows Security Model #Notes" },
          ],
        },
        {
          id: "sys400-m2-slides",
          title: "Slides",
          items: [
            { id: "sys400-m2-1-slide", type: "attachment", title: "Slides — Stack & Memory Protections.pdf" },
            { id: "sys400-m2-2-slide", type: "attachment", title: "Slides — Windows Security Model.pdf" },
          ],
        },
        {
          id: "sys400-m2-assign",
          title: "Assignments",
          items: [
            { id: "sys400-m2-1-quiz", type: "quiz", title: "Quiz — Buffer Overflow Exploit (Lab)", meta: { points: 9 } },
            { id: "sys400-m2-2-quiz", type: "quiz", title: "Quiz — Windows Security Model (Lab)", meta: { points: 10 } },
          ],
        },

        {
          id: "sys400-m3",
          title: "SYS400 — M3",
          items: [
            { id: "sys400-m3-1-v", type: "page", title: "Rootkits (1 video, 33:30)", meta: { timeMin: 34 } },
            { id: "sys400-m3-1-notes", type: "page", title: "📚 Rootkits #Notes" },
          ],
        },
        {
          id: "sys400-m3-slides",
          title: "Slides",
          items: [{ id: "sys400-m3-1-slide", type: "attachment", title: "Slides — Rootkits.pdf" }],
        },
        {
          id: "sys400-m3-disc",
          title: "Discussion",
          items: [{ id: "sys400-m3-1-disc", type: "page", title: "📚 Discussion — AI for Enhancing Memory Protection" }],
        },
      ],
    },

    /* ===========================
     * Module 2 — NET400 (W1 D4–W2 D6)
     * =========================== */
    {
      id: "net400",
      badge: "NET400",
      title: "Module 2 (Week 1 Day 4 – Week 2 Day 6) — NET400",
      sections: [
        {
          id: "net400-m1",
          title: "NET400 — M1",
          items: [
            { id: "net400-m1-1-v", type: "page", title: "Web Spiders (3 videos, 26:22)", meta: { timeMin: 26 } },
            { id: "net400-m1-1-notes", type: "page", title: "📚 Web Spiders #Notes" },
            { id: "net400-m1-2-v", type: "page", title: "WAFs & Common Exploits (8 videos, 81:23)", meta: { timeMin: 81 } },
            { id: "net400-m1-2-notes", type: "page", title: "📚 Web App Firewalls & Common Exploits #Notes" },
          ],
        },
        {
          id: "net400-m1-slides",
          title: "Slides",
          items: [
            { id: "net400-m1-1-slide", type: "attachment", title: "Slides — Web Spiders.pdf" },
            { id: "net400-m1-2-slide", type: "attachment", title: "Slides — Web App Firewalls & Common Exploits.pdf" },
          ],
        },
        {
          id: "net400-m1-assign",
          title: "Assignments",
          items: [
            { id: "net400-m1-1-quiz", type: "quiz", title: "Quiz — Spiders (Lab)", meta: { points: 10 } },
            { id: "net400-m1-2-quiz", type: "quiz", title: "Quiz — Scapy (Lab)", meta: { points: 10 } },
          ],
        },

        {
          id: "net400-m2",
          title: "NET400 — M2",
          items: [
            { id: "net400-m2-2-v", type: "page", title: "Security Scanners (4 videos, 40:34)", meta: { timeMin: 41 } },
            { id: "net400-m2-2-notes", type: "page", title: "📚 Security Scanners #Notes" },
            { id: "net400-m2-1-v", type: "page", title: "Honeypots & Cowrie (4 videos, 29:18)", meta: { timeMin: 29 } },
            { id: "net400-m2-1-notes", type: "page", title: "📚 Honeypots & Cowrie #Notes" },
          ],
        },
        {
          id: "net400-m2-slides",
          title: "Slides",
          items: [
            { id: "net400-m2-1-slide", type: "attachment", title: "Slides — Honeypots & Cowrie.pdf" },
            { id: "net400-m2-2-slide", type: "attachment", title: "Slides — Security Scanners.pdf" },
          ],
        },
        {
          id: "net400-m2-assign",
          title: "Assignments",
          items: [
            { id: "net400-m2-1-quiz1", type: "quiz", title: "Quiz — Twisted (Lab)", meta: { points: 9 } },
            { id: "net400-m2-1-quiz2", type: "quiz", title: "Quiz — Cowrie (Lab)", meta: { points: 9 } },
            { id: "net400-m2-2-quiz", type: "quiz", title: "Quiz — CTF (Lab)", meta: { points: 10 } },
          ],
        },

        {
          id: "net400-m3",
          title: "NET400 — M3",
          items: [
            { id: "net400-m3-1-v", type: "page", title: "Botnets (5 videos, 58:14)", meta: { timeMin: 58 } },
            { id: "net400-m3-1-notes", type: "page", title: "📚 Botnets #Notes" },
          ],
        },
        {
          id: "net400-m3-slides",
          title: "Slides",
          items: [{ id: "net400-m3-1-slide", type: "attachment", title: "Slides — Botnets.pdf" }],
        },
        {
          id: "net400-m3-assign",
          title: "Assignments",
          items: [{ id: "net400-m3-1-quiz", type: "quiz", title: "Quiz — Botnets (Lab)", meta: { points: 10 } }],
        },
        {
          id: "net400-m3-disc",
          title: "Discussion",
          items: [{ id: "net400-m3-1-disc", type: "page", title: "📚 Discussion — The Role of AI in App Layer Protection" }],
        },
      ],
    },

    /* ===========================
     * Module 3 — APP100 (W2 D7–D9)
     * =========================== */
    {
      id: "app100",
      badge: "APP100",
      title: "Module 3 (Week 2 Day 7–9) — APP100",
      sections: [
        {
          id: "app100-m1",
          title: "APP100 — M1",
          items: [
            { id: "app100-m1-1-v", type: "page", title: "Intro to Pentesting & AppSec (5 videos, 59:50)", meta: { timeMin: 60 } },
            { id: "app100-m1-1-notes", type: "page", title: "📚 Intro to Pentesting & AppSec #Notes" },
            { id: "app100-m1-2-v", type: "page", title: "Intelligence Gathering (2 videos, 18:57)", meta: { timeMin: 19 } },
            { id: "app100-m1-2-notes", type: "page", title: "📚 Intelligence Gathering #Notes" },
          ],
        },
        {
          id: "app100-m1-slides",
          title: "Slides",
          items: [
            { id: "app100-m1-1-slide", type: "attachment", title: "Slides — Intro to Pentesting & AppSec.pdf" },
            { id: "app100-m1-2-slide", type: "attachment", title: "Slides — Intelligence Gathering.pdf" },
          ],
        },
        {
          id: "app100-m1-assign",
          title: "Assignments",
          items: [
            { id: "app100-m1-a1", type: "assignment", title: "Assignment — Penetration Test Report", meta: { points: 10 } },
            { id: "app100-m1-a2", type: "assignment", title: "Assignment — Audit Requirements: Assets", meta: { points: 10 } },
            { id: "app100-m1-q1", type: "quiz", title: "Quiz — Reconnaissance (Lab)", meta: { points: 9 } },
            { id: "app100-m1-q2", type: "quiz", title: "Quiz — Tools & Intelligence Automation (Lab)", meta: { points: 9 } },
          ],
        },

        {
          id: "app100-m2",
          title: "APP100 — M2",
          items: [
            { id: "app100-m2-1-v", type: "page", title: "Vulnerability Scanning (3 videos, 38:14)", meta: { timeMin: 38 } },
            { id: "app100-m2-1-notes", type: "page", title: "📚 Vulnerability Scanning #Notes" },
            { id: "app100-m2-2-v", type: "page", title: "Tools & Tool Creation (2 videos, 17:28)", meta: { timeMin: 17 } },
            { id: "app100-m2-2-notes", type: "page", title: "📚 Tools & Tool Creation #Notes" },
          ],
        },
        {
          id: "app100-m2-slides",
          title: "Slides",
          items: [
            { id: "app100-m2-1-slide", type: "attachment", title: "Slides — Vulnerability Scanning.pdf" },
            { id: "app100-m2-2-slide", type: "attachment", title: "Slides — Tools & Tool Creation.pdf" },
          ],
        },
        {
          id: "app100-m2-assign",
          title: "Assignments",
          items: [
            { id: "app100-m2-q1", type: "quiz", title: "Quiz — Nessus Installation (Lab)", meta: { points: 10 } },
            { id: "app100-m2-q2", type: "quiz", title: "Quiz — Vulnerability Scanning with Nessus (Lab)", meta: { points: 10 } },
            { id: "app100-m2-a1", type: "assignment", title: "Assignment — Advanced: Nessus on Metasploitable", meta: { points: 0 } },
            { id: "app100-m2-q3", type: "quiz", title: "Quiz — Banner Grabbing (Lab)", meta: { points: 9 } },
            { id: "app100-m2-q4", type: "quiz", title: "Quiz — Dictionary Attacks (Lab)", meta: { points: 9 } },
            { id: "app100-m2-q5", type: "quiz", title: "Quiz — Account Hacking (Lab)", meta: { points: 10 } },
          ],
        },

        {
          id: "app100-m3",
          title: "APP100 — M3",
          items: [
            { id: "app100-m3-1-v", type: "page", title: "Configuration Management (2 videos, 21:44)", meta: { timeMin: 22 } },
            { id: "app100-m3-1-notes", type: "page", title: "📚 Configuration Mgmt & App Weaknesses #Notes" },
          ],
        },
        {
          id: "app100-m3-slides",
          title: "Slides",
          items: [{ id: "app100-m3-1-slide", type: "attachment", title: "Slides — Config Mgmt & App Weaknesses.pdf" }],
        },
        {
          id: "app100-m3-assign",
          title: "Assignments",
          items: [
            { id: "app100-m3-q1", type: "quiz", title: "Quiz — Configuration Management (Lab)", meta: { points: 9 } },
            { id: "app100-m3-q2", type: "quiz", title: "Quiz — Authentication Bypass Attack (Lab)", meta: { points: 9 } },
            { id: "app100-m3-disc", type: "page", title: "📚 Discussion — Using AI for OSINT" },
          ],
        },
      ],
    },

    /* ===========================
     * Module 4 — SIE200 (W2 D10–W3 D12)
     * =========================== */
    {
      id: "sie200",
      badge: "SIE200",
      title: "Module 4 (Week 2 Day 10 – Week 3 Day 12) — SIE200",
      sections: [
        {
          id: "sie200-m1",
          title: "SIE200 — M1",
          items: [
            { id: "sie200-m1-1-v", type: "page", title: "Roles & Architecture Components (3 videos, 11:45)", meta: { timeMin: 12 } },
            { id: "sie200-m1-2-v", type: "page", title: "Storage, Indexing & SPL (5 videos, 23:37)", meta: { timeMin: 24 } },
            { id: "sie200-m1-3-v", type: "page", title: "SIEM Data (4 videos, 13:01)", meta: { timeMin: 13 } },
          ],
        },
        {
          id: "sie200-m1-slides",
          title: "Slides",
          items: [
            { id: "sie200-m1-1-slide", type: "attachment", title: "Slides — SIEM Architecture.pdf" },
            { id: "sie200-m1-2-slide", type: "attachment", title: "Slides — SIEM Data.pdf" },
          ],
        },
        {
          id: "sie200-m1-assign",
          title: "Assignments",
          items: [
            { id: "sie200-m1-1-quiz", type: "quiz", title: "Quiz — Getting Data into the SIEM (Lab)", meta: { points: 10 } },
            { id: "sie200-m1-2-quiz", type: "quiz", title: "Quiz — Asset Discovery (Lab)", meta: { points: 10 } },
          ],
        },

        {
          id: "sie200-m2",
          title: "SIE200 — M2",
          items: [
            { id: "sie200-m2-1-v", type: "page", title: "Data Visualization: Use Cases (7 videos, 22:17)", meta: { timeMin: 22 } },
            { id: "sie200-m2-2-v", type: "page", title: "SIEM Reporting (7 videos, 22:22)", meta: { timeMin: 22 } },
            { id: "sie200-m2-3-v", type: "page", title: "Visualizations (6 videos, 17:41)", meta: { timeMin: 18 } },
          ],
        },
        {
          id: "sie200-m2-slides",
          title: "Slides",
          items: [
            { id: "sie200-m2-1-slide", type: "attachment", title: "Slides — Visualization.pdf" },
            { id: "sie200-m2-2-slide", type: "attachment", title: "Slides — Reporting.pdf" },
          ],
        },
        {
          id: "sie200-m2-assign",
          title: "Assignments",
          items: [
            { id: "sie200-m2-1-quiz", type: "quiz", title: "Quiz — Dashboards (Lab)", meta: { points: 10 } },
            { id: "sie200-m2-2-quiz", type: "quiz", title: "Quiz — Reporting (Lab)", meta: { points: 12 } },
          ],
        },

        {
          id: "sie200-m3",
          title: "SIE200 — M3",
          items: [{ id: "sie200-m3-disc", type: "page", title: "📚 Discussion — Using AI for Metadata Management" }],
        },
        {
          id: "sie200-m3-videos",
          title: "Videos",
          items: [
            { id: "sie200-m3-1-v", type: "page", title: "Compliance & Alerting (7 videos, 25:11)", meta: { timeMin: 25 } },
            { id: "sie200-m3-2-v", type: "page", title: "Configuring & Tuning the SIEM (8 videos, 25:43)", meta: { timeMin: 26 } },
          ],
        },
        {
          id: "sie200-m3-slides",
          title: "Slides",
          items: [
            { id: "sie200-m3-1-slide", type: "attachment", title: "Slides — Compliance & Alerting.pdf" },
            { id: "sie200-m3-2-slide", type: "attachment", title: "Slides — Configure the SIEM.pdf" },
          ],
        },
        {
          id: "sie200-m3-assign",
          title: "Assignments",
          items: [{ id: "sie200-m3-1-quiz", type: "quiz", title: "Quiz — Alerting (Lab)", meta: { points: 12 } }],
        },
      ],
    },

    /* ===========================
     * Module 5 — GRC200 (W3 D12–D15)
     * =========================== */
    {
      id: "grc200",
      badge: "GRC200",
      title: "Module 5 (Week 3 Day 12–15) — GRC200",
      sections: [
        {
          id: "grc200-m1",
          title: "GRC200 — M1",
          items: [
            { id: "grc200-m1-1-v", type: "page", title: "Risk Management (14 videos, 92:32)", meta: { timeMin: 93 } },
            { id: "grc200-m1-2-v", type: "page", title: "Risk Assessment (11 videos, 59:59)", meta: { timeMin: 60 } },
          ],
        },
        {
          id: "grc200-m1-slides",
          title: "Slides & Labs",
          items: [
            { id: "grc200-m1-1-slide", type: "attachment", title: "Slides — Risk Management.pdf" },
            { id: "grc200-m1-2-slide", type: "attachment", title: "Slides — Risk Assessments.pdf" },
            { id: "grc200-m1-2-lab1", type: "attachment", title: "Lab — NIST SP800-53A r5 Assessment Procedures.xlsx" },
            { id: "grc200-m1-2-lab2", type: "attachment", title: "Lab — NIST SP800-53 r5 Control Catalog.xlsx" },
          ],
        },
        {
          id: "grc200-m1-assign",
          title: "Assignments",
          items: [
            { id: "grc200-m1-1-quiz", type: "quiz", title: "Quiz — Risk Management", meta: { points: 10 } },
            { id: "grc200-m1-2-quiz", type: "quiz", title: "Quiz — Risk Assessments", meta: { points: 10 } },
          ],
        },

        {
          id: "grc200-m2",
          title: "GRC200 — M2",
          items: [
            { id: "grc200-m2-1-v", type: "page", title: "Risk Treatment Methods & Controls (10 videos, 51:51)", meta: { timeMin: 52 } },
            { id: "grc200-m2-2-v", type: "page", title: "Risk Management Frameworks (13 videos, 86:36)", meta: { timeMin: 87 } },
          ],
        },
        {
          id: "grc200-m2-slides",
          title: "Slides",
          items: [
            { id: "grc200-m2-1-slide", type: "attachment", title: "Slides — Risk Treatment Methods & Controls.pdf" },
            { id: "grc200-m2-2-slide", type: "attachment", title: "Slides — Risk Management Frameworks.pdf" },
          ],
        },
        {
          id: "grc200-m2-assign",
          title: "Assignments",
          items: [
            { id: "grc200-m2-1-quiz", type: "quiz", title: "Quiz — Risk Treatment Methods & Controls", meta: { points: 10 } },
            { id: "grc200-m2-2-quiz", type: "quiz", title: "Quiz — Risk Management Frameworks", meta: { points: 10 } },
          ],
        },

        {
          id: "grc200-m3",
          title: "GRC200 — M3",
          items: [{ id: "grc200-m3-1-v", type: "page", title: "Risk Communication (5 videos, 30:30)", meta: { timeMin: 31 } }],
        },
        {
          id: "grc200-m3-slides",
          title: "Slides",
          items: [{ id: "grc200-m3-1-slide", type: "attachment", title: "Slides — Risk Communication.pdf" }],
        },
        {
          id: "grc200-m3-assign",
          title: "Assignments",
          items: [
            { id: "grc200-m3-1-quiz", type: "quiz", title: "Quiz — Risk Communication", meta: { points: 10 } },
            { id: "grc200-m3-1-lab", type: "assignment", title: "Lab — Risk Management Simulation", meta: { points: 30 } },
          ],
        },
        {
          id: "grc200-m3-disc",
          title: "Discussion",
          items: [{ id: "grc200-m3-1-disc", type: "page", title: "📚 Discussion — GRC and Artificial Intelligence" }],
        },
      ],
    },
  ],
};
