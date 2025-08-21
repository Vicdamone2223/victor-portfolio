export default function Logo({ className = '' }: { className?: string }) {
  return (
    <div className={className} aria-label="Victor Digital Media">
      <svg width="120" height="28" viewBox="0 0 180 40" xmlns="http://www.w3.org/2000/svg">
        <g fill="none" stroke="#79FFE1" strokeWidth="2" strokeLinecap="round">
          <path d="M10 10 L10 30 M26 10 L26 30"/>
          <path d="M16 14 L22 20 L16 26"/>
        </g>
        <text x="40" y="26" fontFamily="Inter, system-ui" fontSize="16" fill="#E6EDF3">
          Victor Digital Media
        </text>
      </svg>
    </div>
  );
}
