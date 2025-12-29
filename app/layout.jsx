import ThemeProvider from "@/src/theme/ThemeProvider";
import ThemeSwitcher from "@/src/components/ThemeSwitcher";
import "@/src/index.css";

export const metadata = {
  title: "Cyber Notes",
  description: "Digital notepad for cybersecurity and software engineering"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-dvh bg-base-100 text-base-content">
        <ThemeProvider>
          <div className="navbar px-4 border-b border-base-300/60 justify-end">
            <ThemeSwitcher />
          </div>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
