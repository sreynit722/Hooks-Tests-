import {
  Moon,
  ShoppingBag,
  Sparkles,
  SunMedium,
  UserCircle2,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

interface NavBarProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

function NavBar({ isDark, onToggleTheme }: NavBarProps) {
  const { user, signIn, signOut } = useAuth();

  const navClass = isDark
    ? "rounded-2xl border border-slate-800 bg-slate-900/80 px-4 py-3 shadow-lg shadow-slate-950/20 backdrop-blur-sm sm:px-6"
    : "rounded-2xl border border-blue-100 bg-white/80 px-4 py-3 shadow-lg shadow-blue-100/70 backdrop-blur-sm sm:px-6";

  const brandTextClass = isDark ? "text-slate-100" : "text-slate-900";
  const badgeClass = isDark
    ? "border border-slate-700 bg-slate-800/70 text-slate-300"
    : "border border-blue-100 bg-blue-50 text-blue-700";
  const actionClass = isDark
    ? "border border-slate-700 bg-slate-800 px-4 py-2 text-slate-100 hover:bg-slate-700"
    : "border border-blue-200 bg-white px-4 py-2 text-slate-700 hover:bg-blue-50";

  return (
    <nav className={navClass}>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/30">
            <ShoppingBag className="h-5 w-5" />
          </div>
          <div>
            <p
              className={
                isDark
                  ? "text-xs font-medium uppercase tracking-[0.24em] text-blue-300/80"
                  : "text-xs font-medium uppercase tracking-[0.24em] text-blue-700/80"
              }
            >
              Storefront
            </p>
            <h1 className={`text-lg font-semibold ${brandTextClass}`}>
              Modern Cart
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div
            className={`hidden items-center gap-2 rounded-full px-3 py-2 text-sm sm:flex ${badgeClass}`}
          >
            <Sparkles
              className={
                isDark ? "h-4 w-4 text-blue-400" : "h-4 w-4 text-blue-600"
              }
            />
            Curated picks
          </div>

          <button
            type="button"
            onClick={onToggleTheme}
            className={
              isDark
                ? "inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 bg-slate-800 text-slate-100 transition hover:bg-slate-700"
                : "inline-flex h-10 w-10 items-center justify-center rounded-full border border-blue-200 bg-white text-slate-700 transition hover:bg-blue-50"
            }
            aria-label="Toggle dark and light mode"
          >
            {isDark ? (
              <SunMedium className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>

          {user ? (
            <>
              <div
                className={`hidden items-center gap-2 rounded-full px-3 py-2 text-sm sm:flex ${badgeClass}`}
              >
                <UserCircle2
                  className={
                    isDark ? "h-4 w-4 text-cyan-400" : "h-4 w-4 text-blue-600"
                  }
                />
                {user.email}
              </div>
              <button type="button" onClick={signOut} className={actionClass}>
                Sign out
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => signIn("user@example.com")}
              className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-500"
            >
              Sign in
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
