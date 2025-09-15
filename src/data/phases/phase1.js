// src/data/phases/phase1.js
// Phase 1 (Foundations) — full content

const id = (s) => s.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9-]/g, "").toLowerCase();

const phase1 = {
  id: "phase1",
  title: "Phase 1",
  subtitle: "Foundations • SYS100 · NET100 · PYT100 · CRY100 · GRC100",
  modules: [
    // ───────────────────────────────── SYS100
    {
      id: "p1-sys100",
      title: "Module 1 (Week 1 D1–D3) — SYS100",
      sections: [
        // Day 1
        {
          id: "p1-sys100-d1-videos",
          title: "SYS100 Day 1 — Videos (8 videos, 74:59)",
          items: [
            { id: id("SYS100-M1-1-Overview"), type: "page", title: "Videos 1 — Overview (1 • 2:37)", meta: { timeMin: 3 } },
            { id: id("SYS100-M1-1-Virtualization"), type: "page", title: "Videos 2 — Virtualization (3 • 34:29)", meta: { timeMin: 34 } },
            { id: id("SYS100-M1-2-Linux-OS"), type: "page", title: "Videos — Linux Operating Systems (4 • 37:53)", meta: { timeMin: 38 } },
            { id: id("SYS100-M1-1-Notes"), type: "page", title: "📚 SYS100 M1-1 — Intro #Notes" },
            { id: id("SYS100-M1-2-Notes"), type: "page", title: "📚 SYS100 M1-2 — Linux Basics and Binary #Notes" }
          ]
        },
        {
          id: "p1-sys100-d1-slides",
          title: "Day 1 — Slides",
          items: [
            { id: id("SYS100-M1-1-Slides-Hardware-and-Virtualization.pdf"), type: "attachment", title: "Hardware & Virtualization.pdf" },
            { id: id("SYS100-M1-2-Slides-Linux-Basics.pdf"), type: "attachment", title: "Linux Basics.pdf" }
          ]
        },
        {
          id: "p1-sys100-d1-assign",
          title: "Day 1 — Assignments",
          items: [
            { id: id("SYS100-M1-1-Quiz-1-Basic-Hardware"), type: "quiz", title: "Quiz — Basic Hardware (Lab)", meta: { points: 10, required: true } },
            { id: id("SYS100-M1-1-Lab-VirtualBox-Setup"), type: "assignment", title: "Lab — VirtualBox Setup" },
            { id: id("SYS100-M1-2-Quiz-1-Linux-Basics"), type: "quiz", title: "Quiz — Linux Basics (Lab) · Not required", meta: { points: 12, required: false } },
            { id: id("SYS100-M1-2-Quiz-2-VI-VIM"), type: "quiz", title: "Quiz — VI & VIM (Lab) · Not required", meta: { points: 10, required: false } }
          ]
        },

        // Day 2
        {
          id: "p1-sys100-d2-videos",
          title: "SYS100 Day 2 — Videos (5 videos, 51:07)",
          items: [
            { id: id("SYS100-M2-1-Users-Groups"), type: "page", title: "Users, Groups & File Permissions (3 • 29:01)", meta: { timeMin: 29 } },
            { id: id("SYS100-M2-2-FS-LVM"), type: "page", title: "Linux File Systems & Logical Volumes (2 • 22:06)", meta: { timeMin: 22 } },
            { id: id("SYS100-M2-1-Notes"), type: "page", title: "📚 SYS100 M2-1: Users, Groups, and Permissions #Notes" },
            { id: id("SYS100-M2-2-Notes"), type: "page", title: "📚 SYS100 M2-2: RAID and Fileshares #Notes" }
          ]
        },
        {
          id: "p1-sys100-d2-slides",
          title: "Day 2 — Slides",
          items: [
            { id: id("SYS100-M2-1-Slides-Users-Groups-Permissions.pdf"), type: "attachment", title: "Users/Groups/Permissions & xattrs.pdf" },
            { id: id("SYS100-M2-2-Slides-RAID-Fileshares.pdf"), type: "attachment", title: "RAID & Fileshares.pdf" }
          ]
        },
        {
          id: "p1-sys100-d2-assign",
          title: "Day 2 — Assignments",
          items: [
            { id: id("SYS100-M2-1-Quiz-Users"), type: "quiz", title: "Quiz — Linux Users (Lab) · Not required", meta: { points: 10, required: false } },
            { id: id("SYS100-M2-2-Quiz-LVM"), type: "quiz", title: "Quiz — LVM Processes (Lab) · Not required", meta: { points: 10, required: false } },
            { id: id("SYS100-M2-2-Quiz-Fileshares"), type: "quiz", title: "Quiz — Fileshares (Lab) · Not required", meta: { points: 10, required: false } }
          ]
        },

        // Day 3
        {
          id: "p1-sys100-d3-videos",
          title: "SYS100 Day 3 — Videos (9 videos, 100:15)",
          items: [
            { id: id("SYS100-M3-1-BASH-Shells"), type: "page", title: "BASH Shells (3 • 38:06)", meta: { timeMin: 38 } },
            { id: id("SYS100-M3-1-File-ops"), type: "page", title: "Bash File Ops & Special Permissions (2 • 24:11)", meta: { timeMin: 24 } },
            { id: id("SYS100-M3-1-Auth"), type: "page", title: "Authentication (2 • 13:53)", meta: { timeMin: 14 } },
            { id: id("SYS100-M3-2-SecModels"), type: "page", title: "Linux Security Models (2 • 24:05)", meta: { timeMin: 24 } },
            { id: id("SYS100-M3-1-Notes"), type: "page", title: "📚 SYS100 M3-1: Linux Shells #Notes" },
            { id: id("SYS100-M3-2-Notes"), type: "page", title: "📚 SYS100 M3-2: RAID/LVM and Security Models #Notes" }
          ]
        },
        {
          id: "p1-sys100-d3-slides",
          title: "Day 3 — Slides",
          items: [
            { id: id("SYS100-M3-1-Slides-Linux-Shells-Aliases-Links.pdf"), type: "attachment", title: "Linux Shells · Aliases · Links.pdf" },
            { id: id("SYS100-M3-2-Slides-Linux-Security-Models.pdf"), type: "attachment", title: "Linux Security Models.pdf" }
          ]
        },
        {
          id: "p1-sys100-d3-assign",
          title: "Day 3 — Assignments",
          items: [
            { id: id("SYS100-M3-1-Quiz-Processes-Bash"), type: "quiz", title: "Quiz — Linux Processes & Bash Scripting (Lab) · Not required", meta: { points: 11, required: false } },
            { id: id("SYS100-M3-1-Quiz-Extended-Attributes"), type: "quiz", title: "Quiz — Extended Attributes (Lab) · Not required", meta: { points: 8, required: false } },
            { id: id("SYS100-M3-1-Discussion-AI-PC-Building"), type: "discussion", title: "💬 Discussion — Leveraging AI for Custom PC Building and System Scaling" }
          ]
        },

        // Assessment
        {
          id: "p1-sys100-assessment",
          title: "Module 1 — Assessment & Survey",
          items: [
            { id: id("SYS100-M4-1-Assessment"), type: "quiz", title: "Assessment — Module Quiz (Mandatory)", meta: { points: 30, required: true } }
          ]
        }
      ]
    },

    // ───────────────────────────────── NET100
    {
      id: "p1-net100",
      title: "Module 2 (Week 1 D4–Week 2 D6) — NET100: Introduction to Networking",
      sections: [
        {
          id: "p1-net100-m1-videos",
          title: "NET100 M1 — Videos (13 videos, 155:56)",
          items: [
            { id: id("NET100-M1-1-Overview-Terms"), type: "page", title: "Overview & Terminology (2 • 11:51)", meta: { timeMin: 12 } },
            { id: id("NET100-M1-1-Network-Models"), type: "page", title: "Network Models (1 • 23:17)", meta: { timeMin: 23 } },
            { id: id("NET100-M1-1-Binary-Hex-Encoding-Wireshark"), type: "page", title: "Binary→Hex, Encoding & Wireshark Basics (3 • 45:18)", meta: { timeMin: 45 } },
            { id: id("NET100-M1-1-Notes"), type: "page", title: "📚 NET100 M1-1 — OSI & TCP/IP Models #Notes" },
            { id: id("NET100-M1-2-OSI-L1-L2"), type: "page", title: "OSI Layers 1 & 2 (2 • 32:42)", meta: { timeMin: 33 } },
            { id: id("NET100-M1-2-Network-Fundamentals"), type: "page", title: "Network Fundamentals (5 • 42:48)", meta: { timeMin: 43 } },
            { id: id("NET100-M1-2-Notes"), type: "page", title: "📚 NET100 M1-2 — L1/L2, Basic Protocols, Network Topologies #Notes" }
          ]
        },
        {
          id: "p1-net100-m1-slides",
          title: "M1 — Slides",
          items: [
            { id: id("NET100-M1-1-Slides-OSI-and-TCPIP-Models.pdf"), type: "attachment", title: "OSI & TCP/IP Models.pdf" },
            { id: id("NET100-M1-2-Slides-OSI-L1-L2.pdf"), type: "attachment", title: "OSI Layers 1 & 2.pdf" }
          ]
        },
        {
          id: "p1-net100-m1-assign",
          title: "M1 — Assignments",
          items: [
            { id: id("NET100-M1-1-Quiz-Wireshark-Basics"), type: "quiz", title: "Quiz — Wireshark Basics (Lab) · Mandatory", meta: { points: 12, required: true } },
            { id: id("NET100-M1-2-Quiz-Network-Diagramming"), type: "assignment", title: "Assignment — Network Diagramming (Lab) · Mandatory", meta: { points: 10, required: true } }
          ]
        },

        {
          id: "p1-net100-m2-videos",
          title: "NET100 M2 — Videos (9 videos, 130:56)",
          items: [
            { id: id("NET100-M2-1-IPv4-IP-Fundamentals"), type: "page", title: "IPv4 & IP Fundamentals (2 • 27:54)", meta: { timeMin: 28 } },
            { id: id("NET100-M2-1-Subnetting-IPv6"), type: "page", title: "Classful IP, Subnetting & IPv6 (3 • 31:09)", meta: { timeMin: 31 } },
            { id: id("NET100-M2-1-Notes"), type: "page", title: "📚 NET100 M2-1 — IPv4 and IPv6 #Notes" },
            { id: id("NET100-M2-2-Transport"), type: "page", title: "Transport Layer (2 • 50:43)", meta: { timeMin: 51 } },
            { id: id("NET100-M2-2-NAT-netcat"), type: "page", title: "NAT & netcat (2 • 21:10)", meta: { timeMin: 21 } },
            { id: id("NET100-M2-2-Notes"), type: "page", title: "📚 NET100 M2-2 — OSI Layers 3 and 4 # Notes" }
          ]
        },
        {
          id: "p1-net100-m2-slides",
          title: "M2 — Slides",
          items: [
            { id: id("NET100-M2-1-Slides-IPv4-IPv6.pdf"), type: "attachment", title: "IPv4 and IPv6.pdf" },
            { id: id("NET100-M2-2-Slides-OSI-L3-L4.pdf"), type: "attachment", title: "OSI Layers 3 and 4.pdf" }
          ]
        },
        {
          id: "p1-net100-m2-assign",
          title: "M2 — Assignments",
          items: [
            { id: id("NET100-M2-1-Quiz-Configure-NICs"), type: "quiz", title: "Quiz — Configure NICs (Lab) · Important Not required", meta: { points: 10, required: false } },
            { id: id("NET100-M2-2-Quiz-Wireshark-Hunt"), type: "quiz", title: "Quiz — Wireshark Hunt and Exploration (Lab) · Important Not required", meta: { points: 13, required: false } },
            { id: id("NET100-M2-2-Quiz-HTTP-Netcat"), type: "quiz", title: "Quiz — HTTP and Netcat (Lab) · Important Not required", meta: { points: 10, required: false } }
          ]
        },

        {
          id: "p1-net100-m3-videos",
          title: "NET100 M3 — Videos (12 videos, 84:31)",
          items: [
            { id: id("NET100-M3-1-L3L4-Recaps"), type: "page", title: "L3 and L4 Recaps (2 • 10:16)", meta: { timeMin: 10 } },
            { id: id("NET100-M3-1-TCP-Seq-Encap"), type: "page", title: "TCP — Sequence Numbers — Encapsulation (4 • 24:26)", meta: { timeMin: 24 } },
            { id: id("NET100-M3-1-HTTP-TLS"), type: "page", title: "HTTP and TLS (3 • 34:26)", meta: { timeMin: 34 } },
            { id: id("NET100-M3-1-Application-Layer"), type: "page", title: "Application Layer (3 • 14:14)", meta: { timeMin: 14 } },
            { id: id("NET100-M3-1-Notes"), type: "page", title: "📚 NET100: OSI Layers 5 through 7 #Notes" }
          ]
        },
        {
          id: "p1-net100-m3-slides",
          title: "M3 — Slides",
          items: [{ id: id("NET100-M3-1-Slides-OSI-Layers-5-7.pdf"), type: "attachment", title: "OSI Layers 5–7.pdf" }]
        },
        {
          id: "p1-net100-m3-assign",
          title: "M3 — Assignments",
          items: [
            { id: id("NET100-M3-1-Quiz-Identify-Traffic"), type: "quiz", title: "Quiz — Wireshark Identify Traffic (Lab) · Mandatory", meta: { points: 12, required: true } },
            { id: id("NET100-M3-1-Quiz-TCP-HTTP"), type: "quiz", title: "Quiz — TCP and HTTP (Lab) · Mandatory", meta: { points: 23, required: true } },
            { id: id("NET100-M3-1-Discussion-AI-Network-Config"), type: "discussion", title: "💬 Discussion — Using AI for Network Configuration" }
          ]
        },

        {
          id: "p1-net100-assessment",
          title: "Module 2 — Assessment & Survey",
          items: [{ id: id("NET100-M4-1-Assessment"), type: "quiz", title: "Assessment — Module Quiz · Mandatory", meta: { points: 28, required: true } }]
        }
      ]
    },

    // ───────────────────────────────── PYT100
    {
      id: "p1-pyt100",
      title: "Module 3 (Week 2 D7–D9) — PYT100: Introduction to Python",
      sections: [
        {
          id: "p1-pyt100-m1-videos",
          title: "PYT100 M1 — Videos (23 videos, 154:04)",
          items: [
            { id: id("PYT100-M1-1-Overview-History"), type: "page", title: "Overview & History (3 • 16:36)", meta: { timeMin: 17 } },
            { id: id("PYT100-M1-1-Algorithms-Flowcharts"), type: "page", title: "Algorithms, Flow Charts & Pseudocode (6 • 38:48)", meta: { timeMin: 39 } },
            { id: id("PYT100-M1-1-IDEs"), type: "page", title: "IDEs (3 • 20:35)", meta: { timeMin: 21 } },
            { id: id("PYT100-M1-1-Structure"), type: "page", title: "Python Code Structure (5 • 30:15)", meta: { timeMin: 30 } },
            { id: id("PYT100-M1-1-Notes"), type: "page", title: "📚 PYT100 M1-1 :History-Algorithms-IDEs #Notes" },
            { id: id("PYT100-M1-2-Commands"), type: "page", title: "Python Commands (6 • 47:50)", meta: { timeMin: 48 } },
            { id: id("PYT100-M1-2-Notes"), type: "page", title: "📚 PYT100 M1-2: Basic Commands and Structure #Notes" }
          ]
        },
        {
          id: "p1-pyt100-m1-slides",
          title: "M1 — Slides",
          items: [
            { id: id("PYT100-M1-1-Slides-History-Algorithms-IDEs.pdf"), type: "attachment", title: "History-Algorithms-IDEs.pdf" },
            { id: id("PYT100-M1-2-Slides-Basic-Commands.pdf"), type: "attachment", title: "Basic Commands.pdf" }
          ]
        },
        {
          id: "p1-pyt100-m1-assign",
          title: "M1 — Assignments",
          items: [
            { id: id("PYT100-M1-1-Quiz-Thonny-IDE"), type: "quiz", title: "Quiz — Thonny IDE (Lab) · Not required", meta: { points: 10, required: false } },
            { id: id("PYT100-M1-2-Quiz-Variables-IF-ELIF-ELSE"), type: "quiz", title: "Quiz — Variables / IF-ELIF-ELSE (Lab) · Not required", meta: { points: 12, required: false } }
          ]
        },

        {
          id: "p1-pyt100-m2-videos",
          title: "PYT100 M2 — Videos (8 videos, 61:09)",
          items: [
            { id: id("PYT100-M2-1-Conditionals"), type: "page", title: "Python Conditional Statements (4 • 31:50)", meta: { timeMin: 32 } },
            { id: id("PYT100-M2-1-Notes-Operators"), type: "page", title: "📚 PYT100-M2-1-Slides-Operators-Comparisons # Notes" },
            { id: id("PYT100-M2-2-While-Loops"), type: "page", title: "While Loops (4 • 29:19)", meta: { timeMin: 29 } },
            { id: id("PYT100-M2-2-Notes-While"), type: "page", title: "📚 PYT100-M2-1-Videos 1-While Loops #Notes" }
          ]
        },
        {
          id: "p1-pyt100-m2-slides",
          title: "M2 — Slides",
          items: [
            { id: id("PYT100-M2-1-Slides-Operators-Comparisons.pdf"), type: "attachment", title: "Operators & Comparisons.pdf" },
            { id: id("PYT100-M2-2-Slides-While-Loops.pdf"), type: "attachment", title: "While Loops.pdf" }
          ]
        },
        {
          id: "p1-pyt100-m2-assign",
          title: "M2 — Assignments",
          items: [
            { id: id("PYT100-M2-1-Quiz-Comparisons-Logical"), type: "quiz", title: "Quiz — Comparisons & Logical Operators (Lab) · Not required", meta: { points: 9, required: false } },
            { id: id("PYT100-M2-2-Quiz-While-Loops"), type: "quiz", title: "Quiz — While Loops (Lab) · Not required", meta: { points: 10, required: false } }
          ]
        },

        {
          id: "p1-pyt100-m3-videos",
          title: "PYT100 M3 — Videos (1 video, 9:18)",
          items: [
            { id: id("PYT100-M3-1-For-Loops"), type: "page", title: "For Loops (1 • 9:18)", meta: { timeMin: 9 } },
            { id: id("PYT100-M3-1-Notes-For"), type: "page", title: "📚 PYT100-M3-1-For Loops #Notes" }
          ]
        },
        {
          id: "p1-pyt100-m3-assign",
          title: "M3 — Assignments",
          items: [
            { id: id("PYT100-M3-1-Discussion-AI-Tasks"), type: "discussion", title: "💬 Discussion — Using Python in AI-related tasks" },
            { id: id("PYT100-M3-1-Quiz-For-Loops"), type: "quiz", title: "Quiz — For Loops (Lab) · Not required", meta: { points: 9, required: false } }
          ]
        },

        {
          id: "p1-pyt100-assessment",
          title: "Module 3 — Assessment & Survey",
          items: [{ id: id("PYT100-M4-1-Assessment"), type: "quiz", title: "Assessment — Module Quiz", meta: { points: 21, required: true } }]
        }
      ]
    },

    // ───────────────────────────────── CRY100
    {
      id: "p1-cry100",
      title: "Module 4 (Week 2 D10–Week 3 D12) — CRY100: Introduction to Cryptography",
      sections: [
        {
          id: "p1-cry100-m1",
          title: "CRY100 M1 — Videos (3 videos, 35:27)",
          items: [
            { id: id("CRY100-M1-1-Symmetric"), type: "page", title: "Symmetric Cryptography (2 • 21:04)", meta: { timeMin: 21 } },
            { id: id("CRY100-M1-2-Block-Ciphers"), type: "page", title: "Block Ciphers (1 • 14:23)", meta: { timeMin: 14 } },
            { id: id("CRY100-M1-Notes"), type: "page", title: "📚 CRY100-M1-Symmetric Crypto & Block Ciphers #Notes" }
          ]
        },
        {
          id: "p1-cry100-m1-slides",
          title: "M1 — Slides",
          items: [
            { id: id("CRY100-M1-1-Slides-Symmetric-Crypto.pdf"), type: "attachment", title: "Symmetric Crypto.pdf" },
            { id: id("CRY100-M1-2-Slides-Block-Ciphers.pdf"), type: "attachment", title: "Block Ciphers.pdf" }
          ]
        },
        {
          id: "p1-cry100-m1-assign",
          title: "M1 — Assignments",
          items: [
            { id: id("CRY100-M1-1-Quiz-Cryptanalysis"), type: "quiz", title: "Quiz — Cryptanalysis (Lab) · Not required", meta: { points: 9, required: false } },
            { id: id("CRY100-M1-2-Quiz-SPN"), type: "quiz", title: "Quiz — Substitution/Permutation Networks (Lab) · Not required", meta: { points: 9, required: false } }
          ]
        },

        {
          id: "p1-cry100-m2",
          title: "CRY100 M2 — Videos (3 videos, 23:02)",
          items: [
            { id: id("CRY100-M2-1-Modes"), type: "page", title: "Modes of Operation (1 • 9:46)", meta: { timeMin: 10 } },
            { id: id("CRY100-M2-2-Hashes"), type: "page", title: "Hash Functions (2 • 13:15)", meta: { timeMin: 13 } },
            { id: id("CRY100-M2-Notes"), type: "page", title: "📚 CRY100-M2 — Modes & Hash Functions #Notes" }
          ]
        },
        {
          id: "p1-cry100-m2-slides",
          title: "M2 — Slides",
          items: [
            { id: id("CRY100-M2-1-Slides-Modes.pdf"), type: "attachment", title: "Modes of Operation.pdf" },
            { id: id("CRY100-M2-2-Slides-Hashes.pdf"), type: "attachment", title: "Hash Functions.pdf" }
          ]
        },
        {
          id: "p1-cry100-m2-assign",
          title: "M2 — Assignments",
          items: [
            { id: id("CRY100-M2-1-Quiz-Modes"), type: "quiz", title: "Quiz — Modes of Operations (Lab) · Not required", meta: { points: 11, required: false } },
            { id: id("CRY100-M2-2-Quiz-Hashes"), type: "quiz", title: "Quiz — Hash Functions (Lab) · Not required", meta: { points: 9, required: false } }
          ]
        },

        {
          id: "p1-cry100-m3",
          title: "CRY100 M3 — Videos (1 video, 7:47)",
          items: [
            { id: id("CRY100-M3-1-HMAC"), type: "page", title: "HMAC Authentication (1 • 7:47)", meta: { timeMin: 8 } },
            { id: id("CRY100-M3-1-Notes"), type: "page", title: "📚 CRY100-M3-1 — HMAC Authentication #Notes" }
          ]
        },
        {
          id: "p1-cry100-m3-slides",
          title: "M3 — Slides",
          items: [{ id: id("CRY100-M3-1-Slides-HMAC.pdf"), type: "attachment", title: "HMAC Authentication.pdf" }]
        },
        {
          id: "p1-cry100-m3-assign",
          title: "M3 — Assignments",
          items: [
            { id: id("CRY100-M3-1-Quiz-HMAC"), type: "quiz", title: "Quiz — HMAC Authentication (Lab) · Not required", meta: { points: 10, required: false } },
            { id: id("CRY100-M3-1-Discussion-AI-in-Symmetric"), type: "discussion", title: "💬 Discussion — AI in symmetric encryption." }
          ]
        },

        {
          id: "p1-cry100-assessment",
          title: "Module 4 — Survey / Assessment",
          items: [
            { id: id("CRY100-M4-1-Assessment"), type: "quiz", title: "Assessment — Module Quiz", meta: { points: 28, required: true } },
            { id: id("Phase-1-Milestone-4"), type: "quiz", title: "Phase 1 Milestone 4" }
          ]
        }
      ]
    },

    // ───────────────────────────────── GRC100
    {
      id: "p1-grc100",
      title: "Module 5 (Week 3 D13–D15) — GRC100: Introduction to GRC",
      sections: [
        {
          id: "p1-grc100-m1",
          title: "GRC100 M1 — Videos (11 videos, 32:35)",
          items: [
            { id: id("GRC100-M1-1-Overview"), type: "page", title: "Course Overview (1 • 4:05)", meta: { timeMin: 4 } },
            { id: id("GRC100-M1-2-Definitions-Drivers"), type: "page", title: "GRC Definitions & Drivers (3 • 7:10)", meta: { timeMin: 7 } },
            { id: id("GRC100-M1-3-InfoSec-Drivers"), type: "page", title: "Information Security Drivers (5 • 13:16)", meta: { timeMin: 13 } },
            { id: id("GRC100-M1-4-Regs-Standards"), type: "page", title: "Regulations, Standards & Best Practices (2 • 8:04)", meta: { timeMin: 8 } },
            { id: id("GRC100-M1-1-Notes"), type: "page", title: "📚 GRC100-M1-1 Governance #Notes" },
            { id: id("GRC100-M1-2-Notes"), type: "page", title: "📚 GRC100-M1-2 Standards and Best Practices #Notes" }
          ]
        },
        {
          id: "p1-grc100-m1-slides",
          title: "M1 — Slides",
          items: [
            { id: id("GRC100-M1-1-Slides-Governance.pdf"), type: "attachment", title: "Governance.pdf" },
            { id: id("GRC100-M1-2-Slides-Standards-and-Best-Practices.pdf"), type: "attachment", title: "Standards and Best Practices.pdf" }
          ]
        },
        {
          id: "p1-grc100-m1-assign",
          title: "M1 — Assignments",
          items: [
            { id: id("GRC100-M1-1-Quiz-Governance"), type: "quiz", title: "Quiz — Governance · Not required", meta: { points: 10, required: false } },
            { id: id("GRC100-M1-2-Quiz-Standards"), type: "quiz", title: "Quiz — Standards & Best Practices · Not required", meta: { points: 12, required: false } }
          ]
        },

        {
          id: "p1-grc100-m2",
          title: "GRC100 M2 — Videos (8 videos, 22:56)",
          items: [
            { id: id("GRC100-M2-1-Privacy-GDPR"), type: "page", title: "Privacy & GDPR (2 • 7:36)", meta: { timeMin: 8 } },
            { id: id("GRC100-M2-2-Governance-Oversight"), type: "page", title: "Governance & Oversight (2 • 5:29)", meta: { timeMin: 5 } },
            { id: id("GRC100-M2-3-EA-Asset-Change"), type: "page", title: "Enterprise Architecture, Asset and Change Management (4 • 9:51)", meta: { timeMin: 10 } },
            { id: id("GRC100-M2-1-Notes"), type: "page", title: "📚 GRC100-M2-1 Privacy #Notes" },
            { id: id("GRC100-M2-2-Notes"), type: "page", title: "📚 GRC100-M2-2 Corporate Governance, Oversight and Asset Management #Notes" }
          ]
        },
        {
          id: "p1-grc100-m2-slides",
          title: "M2 — Slides",
          items: [
            { id: id("GRC100-M2-1-Slides-Privacy.pdf"), type: "attachment", title: "Privacy.pdf" },
            { id: id("GRC100-M2-2-Slides-Corporate-Governance.pdf"), type: "attachment", title: "Corporate Governance, Oversight and Asset Management.pdf" }
          ]
        },
        {
          id: "p1-grc100-m2-assign",
          title: "M2 — Assignments",
          items: [
            { id: id("GRC100-M2-1-Quiz-Privacy"), type: "quiz", title: "Quiz — Privacy · Mandatory", meta: { points: 10, required: true } },
            { id: id("GRC100-M2-2-Quiz-Corporate-Governance"), type: "quiz", title: "Quiz — Corporate Governance · Mandatory", meta: { points: 10, required: true } }
          ]
        },

        {
          id: "p1-grc100-m3",
          title: "GRC100 M3 — Videos (19 videos, 53:12)",
          items: [
            { id: id("GRC100-M3-1-BCP"), type: "page", title: "Business Continuity (5 • 15:00)", meta: { timeMin: 15 } },
            { id: id("GRC100-M3-2-BCP-Implementation"), type: "page", title: "Business Continuity Implementation (5 • 17:30)", meta: { timeMin: 18 } },
            { id: id("GRC100-M3-3-Security-Responsibilities"), type: "page", title: "Security Responsibilities (6 • 12:07)", meta: { timeMin: 12 } },
            { id: id("GRC100-M3-4-Ethics-Social-Responsibilities"), type: "page", title: "Ethical Decision Making & Social Responsibilities (3 • 8:35)", meta: { timeMin: 9 } },
            { id: id("GRC100-M3-1-Notes"), type: "page", title: "📚 GRC100-M3-1 Business Continuity Planning #Notes" },
            { id: id("GRC100-M3-2-Notes"), type: "page", title: "📚 GRC100-M3-2-Security Responsibilities #Notes" }
          ]
        },
        {
          id: "p1-grc100-m3-slides",
          title: "M3 — Slides",
          items: [
            { id: id("GRC100-M3-1-Slides-BCP.pdf"), type: "attachment", title: "Business Continuity Planning.pdf" },
            { id: id("GRC100-M3-2-Slides-Security-Responsibilities.pdf"), type: "attachment", title: "Security Responsibilities.pdf" }
          ]
        },
        {
          id: "p1-grc100-m3-assign",
          title: "M3 — Assignments",
          items: [
            { id: id("GRC100-M3-1-Quiz-BCP"), type: "quiz", title: "Quiz — Business Continuity Planning · Mandatory", meta: { points: 10, required: true } },
            { id: id("GRC100-M3-2-Quiz-Security-Resp"), type: "quiz", title: "Quiz — Security Responsibilities · Mandatory", meta: { points: 10, required: true } },
            { id: id("GRC100-M3-1-Discussion-AI-Ethics"), type: "discussion", title: "💬 Discussion — Potential Biases, Fairness Concerns, and Privacy Considerations with AI" }
          ]
        }
      ]
    }
  ]
};

export default phase1;
