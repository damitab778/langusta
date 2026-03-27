type Size = "sm" | "md" | "lg";

const sizes = {
  sm: { icon: 28, text: "text-lg", gap: "gap-1.5" },
  md: { icon: 38, text: "text-2xl", gap: "gap-2" },
  lg: { icon: 56, text: "text-4xl", gap: "gap-3" },
};

export default function Logo({ size = "md" }: { size?: Size }) {
  const { icon, text, gap } = sizes[size];
  return (
    <div className={`flex items-center ${gap} select-none`}>
      <LobsterIcon size={icon} />
      <span
        className={`${text} font-black tracking-tight leading-none`}
        style={{ fontFamily: "'Nunito', sans-serif", color: "#e8523a" }}
      >
        langusta
      </span>
    </div>
  );
}

function LobsterIcon({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 82"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* ── ANTENNAE (behind everything) ── */}
      <path
        d="M33 24 C22 16 10 9 1 4"
        stroke="#e8523a"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M47 24 C58 16 70 9 79 4"
        stroke="#e8523a"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
      {/* short antennules */}
      <path
        d="M35 26 C27 22 18 20 12 18"
        stroke="#f0614a"
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M45 26 C53 22 62 20 68 18"
        stroke="#f0614a"
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
      />

      {/* ── WALKING LEGS (behind body) ── */}
      <line
        x1="30"
        y1="54"
        x2="18"
        y2="66"
        stroke="#c93f28"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="32"
        y1="59"
        x2="21"
        y2="72"
        stroke="#c93f28"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="34"
        y1="64"
        x2="26"
        y2="76"
        stroke="#c93f28"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="50"
        y1="54"
        x2="62"
        y2="66"
        stroke="#c93f28"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="48"
        y1="59"
        x2="59"
        y2="72"
        stroke="#c93f28"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="46"
        y1="64"
        x2="54"
        y2="76"
        stroke="#c93f28"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* ── BODY / CARAPACE ── */}
      <ellipse cx="40" cy="53" rx="14" ry="16" fill="#c93f28" />
      <ellipse cx="40" cy="51" rx="12" ry="14" fill="#e8523a" />
      {/* keel + segment lines */}
      <line
        x1="40"
        y1="39"
        x2="40"
        y2="65"
        stroke="#c93f28"
        strokeWidth="0.8"
      />
      <path
        d="M28 49 Q40 51 52 49"
        stroke="#c93f28"
        strokeWidth="0.7"
        fill="none"
      />
      <path
        d="M28 55 Q40 57 52 55"
        stroke="#c93f28"
        strokeWidth="0.7"
        fill="none"
      />
      <path
        d="M29 61 Q40 63 51 61"
        stroke="#c93f28"
        strokeWidth="0.7"
        fill="none"
      />

      {/* ── HEAD ── */}
      <ellipse cx="40" cy="37" rx="11" ry="10" fill="#c93f28" />
      <ellipse cx="40" cy="36" rx="9.5" ry="8.5" fill="#e8523a" />

      {/* ── EYE STALKS ── */}
      <line
        x1="35"
        y1="29"
        x2="29"
        y2="20"
        stroke="#c93f28"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <line
        x1="45"
        y1="29"
        x2="51"
        y2="20"
        stroke="#c93f28"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Left eye */}
      <circle cx="28" cy="19" r="4.5" fill="#1a2744" />
      <circle cx="27" cy="18" r="1.6" fill="white" />
      {/* Right eye */}
      <circle cx="52" cy="19" r="4.5" fill="#1a2744" />
      <circle cx="51" cy="18" r="1.6" fill="white" />

      {/* ── MONOCLE on right eye ── */}
      <circle
        cx="52"
        cy="19"
        r="7"
        stroke="#f0c040"
        strokeWidth="1.8"
        fill="none"
      />
      {/* chain */}
      <path
        d="M58 24 C63 32 61 40 57 44"
        stroke="#f0c040"
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
        strokeDasharray="2 2"
      />

      {/* ── LEFT BIG RAISED CLAW ── */}
      {/* arm */}
      <path
        d="M28 42 C22 33 16 22 13 15"
        stroke="#c93f28"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      {/* crusher claw body — large oval pointing up */}
      <path
        d="M6 5 C2 11 3 23 10 26 C17 28 24 23 23 15 C22 7 15 3 10 3 C8 3 6 4 6 5Z"
        fill="#e8523a"
      />
      {/* lower pincher jaw */}
      <path d="M13 15 C10 20 15 28 20 26" fill="#d44832" />
      {/* claw highlight/ridge */}
      <path
        d="M7 7 C5 14 7 21 11 24"
        stroke="#c93f28"
        strokeWidth="1"
        fill="none"
      />
      <path
        d="M11 3 C15 5 18 9 18 14"
        stroke="#f0614a"
        strokeWidth="0.8"
        fill="none"
      />

      {/* ── RIGHT ARM towards book ── */}
      <path
        d="M52 44 C58 50 63 54 65 58"
        stroke="#c93f28"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* claw fingers gripping book spine */}
      <path
        d="M63 56 C60 59 61 66 65 67 C68 68 71 65 70 61 C69 57 65 54 63 56Z"
        fill="#e8523a"
      />
      <path d="M65 55 C69 53 73 56 71 61" fill="#d44832" />

      {/* ── OPEN BOOK (right claw) ── */}
      {/* left page — angled slightly */}
      <path d="M56 57 L55 72 L66 70 L67 56 Z" fill="#1a2744" />
      {/* right page */}
      <path d="M67 56 L66 70 L77 72 L78 57 Z" fill="#243358" />
      {/* spine */}
      <line
        x1="67"
        y1="56"
        x2="66"
        y2="70"
        stroke="#e8523a"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* left page text lines */}
      <line
        x1="57"
        y1="60"
        x2="65"
        y2="59"
        stroke="white"
        strokeWidth="0.9"
        opacity="0.55"
      />
      <line
        x1="57"
        y1="63"
        x2="65"
        y2="62"
        stroke="white"
        strokeWidth="0.9"
        opacity="0.55"
      />
      <line
        x1="57"
        y1="66"
        x2="65"
        y2="65"
        stroke="white"
        strokeWidth="0.9"
        opacity="0.55"
      />
      <line
        x1="57"
        y1="69"
        x2="63"
        y2="68"
        stroke="white"
        strokeWidth="0.9"
        opacity="0.35"
      />
      {/* right page text lines */}
      <line
        x1="68"
        y1="59"
        x2="76"
        y2="60"
        stroke="white"
        strokeWidth="0.9"
        opacity="0.55"
      />
      <line
        x1="68"
        y1="62"
        x2="76"
        y2="63"
        stroke="white"
        strokeWidth="0.9"
        opacity="0.55"
      />
      <line
        x1="68"
        y1="65"
        x2="76"
        y2="66"
        stroke="white"
        strokeWidth="0.9"
        opacity="0.55"
      />
      <line
        x1="68"
        y1="68"
        x2="74"
        y2="69"
        stroke="white"
        strokeWidth="0.9"
        opacity="0.35"
      />
    </svg>
  );
}
