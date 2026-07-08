import logoIcon from "../assets/logo.svg";

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
      <img src={logoIcon} alt="" width={icon} height={icon} aria-hidden="true" />
      <span
        className={`${text} font-black tracking-tight leading-none`}
        style={{ fontFamily: "'Nunito', sans-serif", color: "#e8523a" }}
      >
        langusta
      </span>
    </div>
  );
}
