"use client";

export default function UserProfile() {
  return (
    <div className="fixed top-5 right-6 z-[100] flex items-center gap-3 user-profile-badge">
      {/* User Avatar */}
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#a3e048]/20 to-[#5a8c3a]/30 border border-white/10 flex items-center justify-center">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/70">
          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      </div>
      {/* User Name */}
      <span className="text-[10px] uppercase tracking-[0.15em] text-white/50 font-sans hidden md:block">
        Guest
      </span>
    </div>
  );
}
