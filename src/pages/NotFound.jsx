import ThemeIllustration from "../components/ThemeIllustration.jsx";

export default function NotFound() {
  return (
    <div className="p-6 grid place-items-center">
      <div className="w-full max-w-3xl text-center">
        <ThemeIllustration className="mx-auto mb-4" />
        <h1 className="text-2xl font-semibold mb-2">Hmm… can’t find that page</h1>
        <p className="text-base-content/70 mb-6">
          The route you tried doesn’t exist. Try heading back to the hub or jump to a subject.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <a href="#/" className="btn btn-primary">Go to Hub</a>
          <a href="#/cyber" className="btn btn-ghost">Cybersecurity</a>
          <a href="#/software" className="btn btn-ghost">Software Dev</a>
        </div>
      </div>
    </div>
  );
}
