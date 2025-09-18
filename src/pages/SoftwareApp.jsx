import Overview from "../components/Overview.jsx";

export default function SoftwareApp() {
  return (
    <div className="p-4 sm:p-6">
      <div className="mb-4">
        <h1 className="text-xl font-semibold">Software Development</h1>
        <p className="text-base-content/70">
          This is your Software Dev area. We’ll hook custom themes and notes here next.
        </p>
      </div>
      <Overview />
    </div>
  );
}
