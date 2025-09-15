// src/data/phases/phase3.js
// Phase 3 — SYS300, NET300, CRY300, CTI200, SIE100
export default {
  id: "phase3",
  title: "Phase 3 — Cybersecurity Skills Development",
  subtitle: "SYS300 • NET300 • CRY300 • CTI200 • SIE100",
  modules: [
    /* ===========================
     * Module 1 — SYS300 (W1 D1–D3)
     * =========================== */
    {
      id: "sys300",
      badge: "SYS300",
      title: "Module 1 (Week 1 Day 1–3) — SYS300",
      sections: [
        {
          id: "sys300-m1",
          title: "SYS300 — M1",
          items: [
            { id: "sys300-m1-1-v", type: "page", title: "Directory Traversals & chroot jails (1 video)", meta: { timeMin: 17 } },
            { id: "sys300-m1-1-notes", type: "page", title: "📚 SYS300-M1-1 — Directory Traversals & chroot jails #Notes" },
            { id: "sys300-m1-2-v", type: "page", title: "BASH Scripts & Cron jobs (1 video)", meta: { timeMin: 23 } },
            { id: "sys300-m1-2-notes", type: "page", title: "📚 SYS300-M1-2 — BASH Scripts & CRON #Notes" },
          ],
        },
        {
          id: "sys300-m1-assign",
          title: "Assignments",
          items: [
            { id: "sys300-m1-1-quiz", type: "quiz", title: "Quiz — Directory Traversals & chroot jail (Lab) (Required)", meta: { points: 9 } },
            { id: "sys300-m1-2-quiz", type: "quiz", title: "Quiz — BASH Scripts & Cron Jobs (Lab) (Required)", meta: { points: 10 } },
          ],
        },

        {
          id: "sys300-m2",
          title: "SYS300 — M2",
          items: [
            { id: "sys300-m2-1-v", type: "page", title: "Race Conditions (1 video)", meta: { timeMin: 16 } },
            { id: "sys300-m2-1-notes", type: "page", title: "📚 SYS300-M2-1 — Race Conditions #Notes" },
            { id: "sys300-m2-2-v", type: "page", title: "Compiling Code (1 video)", meta: { timeMin: 5 } },
            { id: "sys300-m2-2-notes", type: "page", title: "📚 SYS300-M2-2 — Compiling #Notes" },
          ],
        },
        {
          id: "sys300-m2-assign",
          title: "Assignments",
          items: [
            { id: "sys300-m2-1-quiz", type: "quiz", title: "Quiz — Race Conditions (Lab) (Required)", meta: { points: 10 } },
            { id: "sys300-m2-2-quiz", type: "quiz", title: "Quiz — Compiling (Lab) (Required)", meta: { points: 10 } },
          ],
        },

        {
          id: "sys300-m3",
          title: "SYS300 — M3",
          items: [
            { id: "sys300-m3-1-v", type: "page", title: "Secure Coding & C Format Strings (1 video)", meta: { timeMin: 14 } },
            { id: "sys300-m3-1-notes", type: "page", title: "📚 SYS300-M3-1 — Secure Coding & C Format Strings #Notes" },
          ],
        },
        {
          id: "sys300-m3-assign",
          title: "Assignments",
          items: [
            { id: "sys300-m3-1-quiz", type: "quiz", title: "Quiz — C Code Exploits (Lab) (Required)", meta: { points: 10 } },
            { id: "sys300-m3-1-disc", type: "page", title: "📚 Discussion — Using AI to Detect TOCTOU exploits" },
            { id: "sys300-phase-assessment", type: "quiz", title: "SYS300-M4-1 — Phase Assessment", meta: { points: 24 } },
          ],
        },
      ],
    },

    /* ===========================
     * Module 2 — NET300 (W1 D4–W2 D6)
     * =========================== */
    {
      id: "net300",
      badge: "NET300",
      title: "Module 2 (Week 1 Day 4 – Week 2 Day 6) — NET300",
      sections: [
        {
          id: "net300-m1",
          title: "NET300 — M1",
          items: [
            { id: "net300-m1-1-v1", type: "page", title: "LAMP Environment (3 videos)", meta: { timeMin: 19 } },
            { id: "net300-m1-1-notes", type: "page", title: "📚 NET300-M1-1 — Web & LAMP Development #Notes" },
            { id: "net300-m1-2-v1", type: "page", title: "Sessions, Cookies & Internet Applications (3 videos)", meta: { timeMin: 16 } },
            { id: "net300-m1-2-v2", type: "page", title: "Browsers, HTML, CSS, JavaScript Overview (7 videos)", meta: { timeMin: 62 } },
            { id: "net300-m1-2-notes", type: "page", title: "📚 NET300-M1-2 — Internet Applications #Notes" },
          ],
        },
        {
          id: "net300-m1-assign",
          title: "Assignments",
          items: [
            { id: "net300-fedora-install", type: "assignment", title: "Installing Fedora Linux" },
            { id: "net300-m1-1-quiz", type: "quiz", title: "Quiz — LAMP Setup (Lab) (Required)", meta: { points: 10 } },
            { id: "net300-m1-2-quiz1", type: "quiz", title: "Quiz — HTTP Proxies (Lab) (Required)", meta: { points: 9 } },
            { id: "net300-m1-2-quiz3", type: "quiz", title: "Quiz — Application Expansion (Lab) (Required)", meta: { points: 11 } },
            { id: "net300-m1-2-quiz2", type: "quiz", title: "Quiz — Writing HTML (Lab) (Required)", meta: { points: 9 } },
          ],
        },

        {
          id: "net300-m2",
          title: "NET300 — M2",
          items: [
            { id: "net300-m2-1-v1", type: "page", title: "Server Configuration & Hardening (3 videos)", meta: { timeMin: 16 } },
            { id: "net300-m2-1-v2", type: "page", title: "JavaScript (3 videos)", meta: { timeMin: 15 } },
            { id: "net300-m2-1-v3", type: "page", title: "Same-Origin Policy & CORS (2 videos)", meta: { timeMin: 16 } },
            { id: "net300-m2-1-notes", type: "page", title: "📚 NET300-M2-1 — Web Server Configuration #Notes" },
            { id: "net300-m2-2-v1", type: "page", title: "Database, SQL & MySQL (3 videos)", meta: { timeMin: 30 } },
            { id: "net300-m2-2-v2", type: "page", title: "Authentication (3 videos)", meta: { timeMin: 43 } },
            { id: "net300-m2-2-notes", type: "page", title: "📚 NET300-M2-2 — SQL & Authentication #Notes" },
          ],
        },
        {
          id: "net300-m2-assign",
          title: "Assignments",
          items: [
            { id: "net300-m2-1-quiz1", type: "quiz", title: "Quiz — Apache Configuration (Lab) (Required)", meta: { points: 10 } },
            { id: "net300-m2-1-quiz2", type: "quiz", title: "Quiz — JavaScript (Lab) (Required)", meta: { points: 10 } },
            { id: "net300-m2-2-quiz", type: "quiz", title: "Quiz — PHP DB (Lab) (Required)", meta: { points: 12 } },
          ],
        },

        {
          id: "net300-m3",
          title: "NET300 — M3",
          items: [
            { id: "net300-m3-1-v", type: "page", title: "Authorization, APIs & Web Service Models (3 videos)", meta: { timeMin: 27 } },
            { id: "net300-m3-1-notes", type: "page", title: "📚 NET300-M3-1 — Access Control & Web Services #Notes" },
          ],
        },
        {
          id: "net300-m3-assign",
          title: "Assignments",
          items: [
            { id: "net300-m3-1-quiz", type: "quiz", title: "Quiz — Authorization (Lab) (Required)", meta: { points: 10 } },
            { id: "net300-m3-1-project-note", type: "page", title: "Project — Web Presentations (turn in at NET300-M4-1)" },
          ],
        },
        {
          id: "net300-m4",
          title: "NET300 — M4",
          items: [
            { id: "net300-m4-1-project", type: "assignment", title: "Project — Web Presentations", meta: { points: 25 } },
          ],
        },
      ],
    },

    /* ===========================
     * Module 3 — CRY300 (W2 D10–W3 D12)
     * =========================== */
    {
      id: "cry300",
      badge: "CRY300",
      title: "Module 3 (Week 2 Day 10 – Week 3 Day 12) — CRY300",
      sections: [
        {
          id: "cry300-m1",
          title: "CRY300 — M1",
          items: [
            { id: "cry300-m1-1-v", type: "page", title: "TOR & Bitcoin (2 videos)", meta: { timeMin: 37 } },
            { id: "cry300-m1-1-notes", type: "page", title: "📚 CRY300-M1-1 — Tor & Anonymous Browsing #Notes" },
            { id: "cry300-m1-2-v", type: "page", title: "SSLStrip (1 video)", meta: { timeMin: 8 } },
            { id: "cry300-m1-2-notes", type: "page", title: "📚 CRY300-M1-2 — Blockchain #Notes" },
          ],
        },
        {
          id: "cry300-m1-assign",
          title: "Assignments",
          items: [
            { id: "cry300-m1-1-quiz", type: "quiz", title: "Quiz — Tor & Anonymous Browsing (Lab) (Required)", meta: { points: 10 } },
            { id: "cry300-m1-2-quiz", type: "quiz", title: "Quiz — Blockchain (Lab) (Required)", meta: { points: 10 } },
          ],
        },

        {
          id: "cry300-m2",
          title: "CRY300 — M2",
          items: [
            { id: "cry300-m2-1-v", type: "page", title: "Heartbleed (1 video)", meta: { timeMin: 8 } },
            { id: "cry300-m2-1-notes", type: "page", title: "📚 CRY300-M2-1 — File Integrity Checks #Notes" },
            { id: "cry300-m2-2-v", type: "page", title: "Padding Oracles (1 video)", meta: { timeMin: 14 } },
            { id: "cry300-m2-2-notes", type: "page", title: "📚 CRY300-M2-2 — Heartbleed #Notes" },
          ],
        },
        {
          id: "cry300-m2-assign",
          title: "Assignments",
          items: [
            { id: "cry300-m2-1-quiz", type: "quiz", title: "Quiz — File Integrity Checks (Lab) (Required)", meta: { points: 10 } },
            { id: "cry300-m2-1-a1", type: "assignment", title: "Infosec — Examining Wireless Networks", meta: { points: 10 } },
            { id: "cry300-m2-2-quiz", type: "quiz", title: "Quiz — Heartbleed (Lab) (Required)", meta: { points: 10 } },
          ],
        },

        {
          id: "cry300-m3",
          title: "CRY300 — M3",
          items: [
            { id: "cry300-m3-1-notes", type: "page", title: "📚 WEP & SSLStrip #Notes" },
          ],
        },
        {
          id: "cry300-m3-assign",
          title: "Assignments",
          items: [
            { id: "cry300-m3-1-quiz", type: "quiz", title: "Quiz — Intercepting SSL (Lab) (Required)", meta: { points: 12 } },
            { id: "cry300-m3-1-a1", type: "assignment", title: "Infosec — Breaking WEP/WPA & Decrypting Traffic", meta: { points: 10 } },
            { id: "cry300-m3-1-disc", type: "page", title: "📚 Discussion — Using AI for Cryptographic-based Attacks" },
            { id: "cry300-phase-assessment", type: "quiz", title: "CRY300-M4-1 — Phase Assessment", meta: { points: 28 } },
          ],
        },
      ],
    },

    /* ===========================
     * Module 4 — CTI200 (W2 D7–D9)
     * =========================== */
    {
      id: "cti200",
      badge: "CTI200",
      title: "Module 4 (Week 2 Day 7–9) — CTI200",
      sections: [
        {
          id: "cti200-intro",
          title: "Reading",
          items: [{ id: "cti200-m3-1-notes", type: "page", title: "📚 Cyber Mission Analysis #Notes" }],
        },

        {
          id: "cti200-m1",
          title: "CTI200 — M1",
          items: [
            { id: "cti200-m1-1-v1", type: "page", title: "CTI Cycle & Process Introduction (4 videos)", meta: { timeMin: 26 } },
            { id: "cti200-m1-1-v2", type: "page", title: "IPCE & Managing Requirements (6 videos)", meta: { timeMin: 33 } },
            { id: "cti200-m1-1-v3", type: "page", title: "Targeting Process & Guidance (3 videos)", meta: { timeMin: 21 } },
            { id: "cti200-m1-1-v4", type: "page", title: "Target Analysis (6 videos)", meta: { timeMin: 42 } },
            { id: "cti200-m1-1-notes", type: "page", title: "📚 CTI Cycle & Process #Notes" },

            { id: "cti200-m1-2-v1", type: "page", title: "Center of Gravity Analysis (4 videos)", meta: { timeMin: 18 } },
            { id: "cti200-m1-2-v2", type: "page", title: "COG Capabilities & Vulnerabilities (4 videos)", meta: { timeMin: 22 } },
            { id: "cti200-m1-2-v3", type: "page", title: "CARVER Method (2 videos)", meta: { timeMin: 14 } },
            { id: "cti200-m1-2-notes", type: "page", title: "📚 Center of Gravity Analysis #Notes" },
          ],
        },
        {
          id: "cti200-m1-assign",
          title: "Assignments",
          items: [
            { id: "cti200-m1-1-quiz", type: "quiz", title: "Quiz — Cyber Threat Intelligence (Required)", meta: { points: 9 } },
            { id: "cti200-m1-2-quiz", type: "quiz", title: "Quiz — Center of Gravity (Required)", meta: { points: 9 } },
          ],
        },

        {
          id: "cti200-m2",
          title: "CTI200 — M2",
          items: [
            { id: "cti200-m2-1-v1", type: "page", title: "Diamond Model Overview (3 videos)", meta: { timeMin: 12 } },
            { id: "cti200-m2-1-v2", type: "page", title: "Diamond Model Axioms 1–3 (4 videos)", meta: { timeMin: 23 } },
            { id: "cti200-m2-1-v3", type: "page", title: "Diamond Model Axioms 4–7 (4 videos)", meta: { timeMin: 21 } },
            { id: "cti200-m2-1-v4", type: "page", title: "Diamond Model Activity Threads (3 videos)", meta: { timeMin: 23 } },
            { id: "cti200-m2-1-notes", type: "page", title: "📚 Diamond Model #Notes" },

            { id: "cti200-m2-2-v1", type: "page", title: "Intelligence Preparation of the Cyber Environment (4 videos)", meta: { timeMin: 18 } },
            { id: "cti200-m2-2-v2", type: "page", title: "IPCE Step 1: Environment Characteristics (3 videos)", meta: { timeMin: 20 } },
            { id: "cti200-m2-2-v3", type: "page", title: "IPCE Step 2: Describe the Effects (5 videos)", meta: { timeMin: 34 } },
            { id: "cti200-m2-2-v4", type: "page", title: "IPCE Step 3: Evaluate the Adversary (3 videos)", meta: { timeMin: 15 } },
            { id: "cti200-m2-2-v5", type: "page", title: "IPCE Step 4: Determine Adversary COA (2 videos)", meta: { timeMin: 14 } },
            { id: "cti200-m2-2-notes", type: "page", title: "📚 Intelligence Preparation of the Cyber Environment #Notes" },
          ],
        },
        {
          id: "cti200-m2-assign",
          title: "Assignments",
          items: [
            { id: "cti200-m2-1-quiz", type: "quiz", title: "Quiz — Diamond Model (Required)", meta: { points: 9 } },
            { id: "cti200-m2-2-quiz", type: "quiz", title: "Quiz — IPCE (Required)", meta: { points: 10 } },
          ],
        },

        {
          id: "cti200-m3",
          title: "CTI200 — M3",
          items: [
            { id: "cti200-m3-1-v1", type: "page", title: "Mission Analysis (3 videos)", meta: { timeMin: 13 } },
            { id: "cti200-m3-1-v2", type: "page", title: "Mission Analysis Steps 1–4 (4 videos)", meta: { timeMin: 16 } },
            { id: "cti200-m3-1-v3", type: "page", title: "Mission Analysis Steps 5–11 (5 videos)", meta: { timeMin: 28 } },
            { id: "cti200-m3-2-v", type: "page", title: "CTI Summary (2 videos)", meta: { timeMin: 73 } },
            { id: "cti200-m3-1-disc", type: "page", title: "📚 Discussion — Using AI for Complex Environments" },
          ],
        },
        {
          id: "cti200-m3-assign",
          title: "Assignments",
          items: [
            { id: "cti200-m3-1-quiz", type: "quiz", title: "Quiz — Mission Analysis (Required)", meta: { points: 10 } },
            { id: "cti200-m4-1-group", type: "assignment", title: "Group Project — IPCE Report & MA Presentation", meta: { points: 25 } },
            { id: "cti200-m4-1-quiz", type: "quiz", title: "Quiz — Phase Assessment", meta: { points: 25 } },
          ],
        },
      ],
    },

    /* ===========================
     * Module 5 — SIE100 (W3 D13–D15)
     * =========================== */
    {
      id: "sie100",
      badge: "SIE100",
      title: "Module 5 (Week 3 Day 13–15) — SIE100",
      sections: [
        {
          id: "sie100-m1",
          title: "SIE100 — M1",
          items: [
            { id: "sie100-m1-1-v1", type: "page", title: "Learning Objectives (3 videos)", meta: { timeMin: 9 } },
            { id: "sie100-m1-1-v2", type: "page", title: "SIEM Basics (7 videos)", meta: { timeMin: 28 } },
            { id: "sie100-m1-1-notes", type: "page", title: "📚 SIEM Introduction #Notes" },

            { id: "sie100-m1-2-v1", type: "page", title: "Source Logs (15 videos)", meta: { timeMin: 46 } },
            { id: "sie100-m1-2-v2", type: "page", title: "Calculating Volume (3 videos)", meta: { timeMin: 11 } },
            { id: "sie100-m1-2-notes", type: "page", title: "📚 Architecting a SIEM #Notes" },
          ],
        },
        {
          id: "sie100-m1-assign",
          title: "Assignments",
          items: [
            { id: "sie100-m1-1-quiz", type: "quiz", title: "Quiz — Log Mess (Lab) (Required)", meta: { points: 12 } },
            { id: "sie100-m1-2-quiz", type: "quiz", title: "Quiz — Elastic Stack Installation (Lab) (Required)", meta: { points: 12 } },
          ],
        },

        {
          id: "sie100-m2",
          title: "SIE100 — M2",
          items: [
            { id: "sie100-m2-1-v", type: "page", title: "Data & Normalization (6 videos)", meta: { timeMin: 17 } },
            { id: "sie100-m2-1-notes1", type: "page", title: "📚 Log Files #Notes" },
            { id: "sie100-m2-1-notes2", type: "page", title: "📚 Types of Data #Notes" },
            { id: "sie100-m2-2-v", type: "page", title: "Regular Expressions (3 videos)", meta: { timeMin: 15 } },
          ],
        },
        {
          id: "sie100-m2-assign",
          title: "Assignments",
          items: [
            { id: "sie100-m2-1-quiz", type: "quiz", title: "Quiz — Logstash & Filebeat (Lab) (Required)", meta: { points: 12 } },
            { id: "sie100-m2-2-quiz", type: "quiz", title: "Quiz — Regular Expressions (Lab) (Required)", meta: { points: 9 } },
          ],
        },

        {
          id: "sie100-m3",
          title: "SIE100 — M3",
          items: [
            { id: "sie100-m3-2-v", type: "page", title: "Architecting a SIEM (4 videos)", meta: { timeMin: 14 } },
            { id: "sie100-m3-1-v", type: "page", title: "Create Use Cases for Handling (5 videos)", meta: { timeMin: 14 } },
            { id: "sie100-m3-1-disc", type: "page", title: "📚 Discussion — Using AI to Enhance SIEM" },
          ],
        },
        {
          id: "sie100-m3-assign",
          title: "Assignments",
          items: [
            { id: "sie100-m3-1-quiz", type: "quiz", title: "Quiz — Splunk Install (Lab) (Required)", meta: { points: 10 } },
            { id: "sie100-phase-assessment", type: "quiz", title: "SIE100-M4-1 — Phase Assessment" },
          ],
        },
      ],
    },
  ],
};
