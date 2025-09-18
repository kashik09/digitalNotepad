// src/data/overview.js
export const overview = {
  intro:
    "Our Cybersecurity Engineering curriculum will prepare you to jump into the cybersecurity industry. You will get fluent in tools like Python, Wireshark, Linux, Metasploit, and more—and learn how to use them to defend against cybercriminals. The program includes 9 courses designed to prepare you for roles like tier 1+ security engineer, technical analyst, penetration tester, or consultant.",

  note: "The primary student view for course lectures, videos, assignments, etc. is Modules (left-hand menu).",

  phaseCards: [
    {
      id: "phase1",
      title: "Phase 1 – Cybersecurity Foundational Skills",
      summary:
        "Foundations of Networking, Systems, Symmetric Encryption, Python, and intro to GRC. Linux basics, OS architecture, traffic fundamentals, symmetric crypto, Python scripting, and risk/compliance basics.",
      applied: [
        "NET100: OSI layers, modern comms, tools per layer.",
        "SYS100: Linux CLI for files, apps, configs (Ubuntu focus).",
        "CRY100: Symmetric algorithms, security properties, implementations.",
        "PYT100: Variables, logic, loops, troubleshooting in Python.",
        "GRC100: Governance/compliance best practices; assess risk & recommend controls."
      ]
    },
    {
      id: "phase2",
      title: "Phase 2 – Cybersecurity Intermediate Skills",
      summary:
        "Subnetting/routing, Windows OS & directory services, asymmetric encryption, advanced Python, intro to adversaries and CTI.",
      applied: [
        "NET200: Routing, subnetting, DNS, VPN, IDS; traffic analysis.",
        "SYS200: Windows architecture, logs, registry; LDAP/AD auth & authz.",
        "CRY200: Asymmetric crypto and modern integrations.",
        "PYT200: Functions, I/O validation, logging, files.",
        "CTI100: Threat intel foundations; motivations, TTPs, analytical writing."
      ]
    },
    {
      id: "phase3",
      title: "Phase 3 – Cybersecurity Skills Development",
      summary:
        "Exploit mindset with command line; build LAMP stack; SIEM collection/regex; crypto applications/weaknesses; scenario analysis & recommendations.",
      applied: [
        "NET300: Install/configure LAMP; assess web stack vulns & countermeasures.",
        "SYS300: CLI exploitation techniques; compilation & secure coding pitfalls.",
        "SIE100: Log sources, install/config SIEM, parse with RegEx.",
        "CRY300: Crypto apps (e.g., blockchain), known weaknesses & mitigations.",
        "CTI200: CTI analysis, tools, and defense-in-depth recommendations."
      ]
    },
    {
      id: "phase4",
      title: "Phase 4 – Gray Hat Hacking",
      summary:
        "Deep dive exploitation: memory, buffers, app/web vulns, pentest workflows, SIEM asset discovery/visualization/reporting, and risk treatment.",
      applied: [
        "NET400: Web scraping/back-channels, honeypots & attacker telemetry.",
        "SYS400: Assembly, shellcode, memory exploitation (e.g., buffer overflows).",
        "APP100: Pentest fundamentals, recon, reporting.",
        "SIE200: SIEM asset discovery, dashboards, reporting, compliance.",
        "GRC200: Risk assessment/mitigation planning in org context."
      ]
    },
    {
      id: "phase5",
      title: "Phase 5 – Cybersecurity Skills Application",
      summary:
        "Synthesize breadth/depth across OSes (iOS/Android), cloud, SIEM for IR/forensics, advanced exploitation (Metasploit), team capstone portfolio.",
      applied: [
        "NET500: Apply techniques in cloud architectures.",
        "SYS500: iOS/Android similarities/differences.",
        "APP200: Metasploit for automated exploitation.",
        "SIE300: UEBA/process monitoring, correlations, IR/forensics workflows.",
        "Capstone: Multi-disciplinary team project; portfolio-ready."
      ]
    }
  ],

  // Courses grid (as shown in your doc)
  courseGrid: [
    ["NET100","NET200","NET300","NET400","NET500"],
    ["SYS100","SYS200","SYS300","SYS400","SYS500"],
    ["CRY100","CRY200","CRY300","APP100","APP200"],
    ["PYT100","PYT200","SIE100","SIE200","SIE300"],
    ["GRC100","CTI100","CTI200","GRC200","Capstone"]
  ],

  // Course detail cards (short + objectives)
  courses: [
    {
      key: "CRY",
      name: "Applied Cryptography",
      description:
        "Strong theory + practice across symmetric/public-key crypto, auth, major attacks, and defenses. Tools include OpenSSL and protocol analysis.",
      programObjectives: [
        "Define cryptography goals and their role in cybersecurity.",
        "Implement crypto software for secure comms & storage.",
        "Apply best practices; analyze application crypto posture.",
        "Create tools to attack/secure apps in lab settings."
      ],
      modules: [
        {
          code: "CRY100",
          objectives: [
            "Historical crypto approaches; block ciphers & modes.",
            "Use hash functions in realistic apps.",
            "Basics of encryption & authentication."
          ]
        },
        {
          code: "CRY200",
          objectives: [
            "Differentiate symmetric vs asymmetric; PKI via SSL/SSH.",
            "Examine authenticity of public key certificates."
          ]
        },
        {
          code: "CRY300",
          objectives: [
            "Explain TOR & identity obfuscation.",
            "Describe notable crypto attacks & mitigations (e.g., SSLStrip, Heartbleed, padding oracles).",
            "Explain WEP weaknesses."
          ]
        }
      ]
    },
    {
      key: "APP",
      name: "Application Security",
      description:
        "Core AppSec/PenTesting concepts; PTES; Kali/Metasploit usage; payload delivery & countermeasures; reporting.",
      programObjectives: [
        "Use Metasploit & Kali pentesting tooling.",
        "Practice PTES methodology end-to-end.",
        "Mount attacks and select countermeasures.",
        "Deliver/maintain payload access; apply defensive actions."
      ],
      modules: [
        {
          code: "APP100",
          objectives: [
            "Explain purpose and steps of a penetration test.",
            "Design a penetration test report with a standard template."
          ]
        },
        {
          code: "APP200",
          objectives: [
            "Probe for known vulnerabilities; automate with Metasploit.",
            "Produce a final pentest report from findings."
          ]
        }
      ]
    },
    {
      key: "CTI",
      name: "Cyber Threat Intelligence",
      description:
        "Foundational & advanced intelligence analysis skills, models (Kill Chain, Diamond Model), and mission analysis (CMA/IPE).",
      programObjectives: [
        "Explain CTI's role in strategic/operational planning.",
        "Identify CTI sources & methods; use analytical tools.",
        "Perform CMA and IPE."
      ],
      modules: [
        {
          code: "CTI100",
          objectives: [
            "Describe strategic planning and apply to cybersecurity.",
            "Apply strategic/operational concepts to Information Warfare."
          ]
        },
        {
          code: "CTI200",
          objectives: [
            "Apply Kill Chain & Center of Gravity modeling.",
            "Practice IPE; produce a Cyber Mission Analysis brief."
          ]
        }
      ]
    },
    {
      key: "GRC",
      name: "Governance, Risk, and Compliance",
      description:
        "Foundations of governance, risk, and compliance; align security initiatives to influence org outcomes; security & privacy communication.",
      programObjectives: [] // (can extend later if you have the bullet list)
    },
    {
      key: "NET",
      name: "Networking Security",
      description:
        "Protocols/ports, firewalls, TCP/IP, VLANs, subnetting, IDS/IPS, exploits & countermeasures; hands-on labs and exams.",
      programObjectives: [
        "Categorize protocols & vulnerabilities.",
        "Use tools to analyze traffic/ports; mount/bypass attacks; select countermeasures.",
        "Install web services and analyze web vulns & mitigations."
      ],
      modules: [
        {
          code: "NET100",
          objectives: [
            "Explain OSI/TCP-IP layers and traffic.",
            "Basic Wireshark usage; identify protocols and technologies."
          ]
        },
        {
          code: "NET200",
          objectives: [
            "Subnetting & security zones; DNS/DNSSEC.",
            "Traffic analysis; VPNs; IDS/IPS; firewalls."
          ]
        },
        {
          code: "NET300",
          objectives: [
            "LAMP stack function; browser tradeoffs.",
            "Build simple web pages (HTML/CSS/JS); add SQL, auth, input validation."
          ]
        },
        {
          code: "NET400",
          objectives: [
            "Execute app-layer exploits; design honeypots.",
            "Install/configure a WAF; describe/build a botnet."
          ]
        },
        {
          code: "NET500",
          objectives: [
            "Cloud architecture & security considerations.",
            "IoT devices; network auditing techniques."
          ]
        }
      ]
    },
    {
      key: "PYT",
      name: "Python",
      description:
        "History and role of Python in cybersecurity; scripting fundamentals; modules/packages; crypto libraries.",
      programObjectives: [
        "Compare interpreted vs compiled languages.",
        "Pseudocode/flowcharts for algorithms.",
        "Script loops & data flows; leverage packages/modules."
      ],
      modules: [
        {
          code: "PYT100",
          objectives: [
            "Role of scripting in security.",
            "Analyze/modify scripts; use lists/tuples/dicts.",
            "Write algorithms with if/while/for."
          ]
        },
        {
          code: "PYT200",
          objectives: [
            "Use third-party packages; create custom packages.",
            "Use Crypto/OpenSSL packages for security features."
          ]
        }
      ]
    },
    {
      key: "SIE",
      name: "Security Information & Event Management",
      description:
        "Engineering for log analysis across devices; SIEM ingestion & parsing; incident response & crisis management.",
      programObjectives: [],
      modules: [
        {
          code: "SIE100",
          objectives: [
            "History/progression of SIEMs; core components.",
            "Structured vs unstructured data; use RegEx to parse logs."
          ]
        },
        {
          code: "SIE200",
          objectives: [
            "Roles in SIEM programs; metadata in collection.",
            "Build use cases and content in a SIEM."
          ]
        },
        {
          code: "SIE300",
          objectives: [
            "SIEM analysis in an IR plan; perform basic SIEM analysis."
          ]
        }
      ]
    },
    {
      key: "SYS",
      name: "Systems Security",
      description:
        "Windows/Linux/Mac/mobile architectures; assess exploits & countermeasures; scripting/shell/PowerShell; advanced exploits & hardening.",
      programObjectives: [
        "Compare OS architectures (Windows/Linux/Mac/mobile).",
        "Assess exploits & deduce countermeasures with open-source tools.",
        "Shell/PowerShell scripting; write simple exploits.",
        "Detail advanced exploits and hardening."
      ],
      modules: [
        {
          code: "SYS100",
          objectives: [
            "Windows & Linux OS/filesystems; Linux CLI & xattrs.",
            "IAM in Linux; authentication, Kerberos, AD/LDAP components."
          ]
        },
        {
          code: "SYS200",
          objectives: [
            "Secure coding concepts (OWASP).",
            "Abuse basic Linux commands & defenses; analyze C; compiled-code tooling.",
            "TOCTOU exploits."
          ]
        },
        {
          code: "SYS300",
          objectives: [
            "Use CLI tools to examine memory areas.",
            "Create/use shellcode; build a basic buffer overflow."
          ]
        },
        {
          code: "SYS400",
          objectives: [
            "Explain memory protections in Linux/Windows and related exploits."
          ]
        },
        {
          code: "SYS500",
          objectives: [
            "Virus infection & AV detection; Metasploit/Meterpreter payload crafting.",
            "Fuzzing for DAST; rootkits; harden with STIGs/standards."
          ]
        }
      ]
    },
    {
      key: "CAP",
      name: "Capstone",
      description:
        "Final multi-day scenario synthesizing all courses; documentation suitable for portfolio.",
      programObjectives: [
        "Apply cross-course knowledge in a final scenario.",
        "Produce portfolio-ready documentation."
      ]
    }
  ]
};
