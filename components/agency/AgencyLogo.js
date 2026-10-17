import Link from "next/link";

export default function AgencyLogo({ className = "", onClick }) {
  return (
    <Link
      href="/agency-demo"
      onClick={onClick}
      className={`inline-flex items-center gap-2 ${className}`}
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 text-sm font-black text-white">
        L
      </span>
      <span className="text-lg font-black tracking-tight text-white">
        LUMORA
        <span className="text-violet-400">.</span>
      </span>
    </Link>
  );
}
