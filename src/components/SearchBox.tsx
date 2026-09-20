import { useState } from "react";
import { Search } from "lucide-react";

import useDebounce from "../hooks/useDebounce";

interface SearchBoxProps {
  isDark: boolean;
}

function SearchBox({ isDark }: SearchBoxProps) {
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 500);
  const panelClass = isDark
    ? "border-slate-800 bg-slate-900/80 shadow-xl shadow-slate-950/20"
    : "border-blue-100 bg-white/85 shadow-xl shadow-blue-100/70";
  const labelClass = isDark ? "text-slate-300" : "text-slate-700";
  const mutedClass = isDark ? "text-slate-400" : "text-slate-500";
  const inputClass = isDark
    ? "border-slate-700 bg-slate-950/70 text-slate-100 placeholder:text-slate-500 focus:border-blue-400 focus:ring-blue-400/20"
    : "border-blue-100 bg-sky-50/70 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/20";
  const valueCardClass = isDark
    ? "border-slate-800 bg-slate-950/45"
    : "border-blue-100 bg-sky-50/60";

  return (
    <section className={`mt-6 rounded-3xl border p-4 sm:p-6 ${panelClass}`}>
      <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <p
            className={`text-xs font-medium uppercase tracking-[0.24em] ${mutedClass}`}
          >
            Live filtering
          </p>
          <h2
            className={`mt-2 text-2xl font-bold ${isDark ? "text-white" : "text-slate-900"}`}
          >
            Find your next favorite
          </h2>
        </div>
        <p className={`text-sm ${mutedClass}`}>Updates after 500ms of quiet</p>
      </div>

      <label
        htmlFor="search"
        className={`mb-2 block text-sm font-medium ${labelClass}`}
      >
        Search products
      </label>

      <div className="relative">
        <Search
          className={`pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 ${mutedClass}`}
        />
        <input
          id="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Try headphones, skincare, or lighting"
          className={`w-full rounded-xl border py-3 pl-10 pr-4 outline-none transition focus:ring-4 ${inputClass}`}
        />
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className={`rounded-2xl border p-4 ${valueCardClass}`}>
          <p
            className={`text-xs font-medium uppercase tracking-[0.18em] ${mutedClass}`}
          >
            Raw value
          </p>
          <p
            className={`mt-2 min-h-7 break-words text-lg font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}
          >
            {search || "Waiting for input"}
          </p>
        </div>
        <div className={`rounded-2xl border p-4 ${valueCardClass}`}>
          <p
            className={`text-xs font-medium uppercase tracking-[0.18em] ${mutedClass}`}
          >
            Debounced value
          </p>
          <p
            className={`mt-2 min-h-7 break-words text-lg font-semibold ${isDark ? "text-blue-300" : "text-blue-700"}`}
          >
            {debouncedSearch || "Waiting for input"}
          </p>
        </div>
      </div>
    </section>
  );
}

export default SearchBox;
