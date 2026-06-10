export function WolfeLogo({ color = 'currentColor' }: { color?: string }) {
  return (
    <div className="flex flex-col items-center gap-[3px]">
      <svg width="28" height="24" viewBox="0 0 32 28" fill="none" aria-hidden="true">
        <path
          d="M16 1 L7 10 L10 10 L4 20 L10 20 L6 27 L16 20 L26 27 L22 20 L28 20 L22 10 L25 10 Z"
          fill={color}
          opacity="0.9"
        />
        <path
          d="M12 8 Q16 4 20 8"
          stroke={color}
          strokeWidth="0.8"
          fill="none"
          opacity="0.5"
        />
      </svg>
      <span
        className="font-body text-[12px] font-medium tracking-[0.32em] uppercase"
        style={{ color }}
      >
        WOLFE
      </span>
    </div>
  );
}
