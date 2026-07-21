export default function Logo({ className }) {
  return (
    <svg
      viewBox="0 0 178 58"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="currentColor"
      aria-label="Hvac Technology"
    >
      <rect x="14" y="9" width="7" height="26" />
      <rect x="29" y="9" width="7" height="26" />
      <rect x="14" y="18" width="22" height="7" />
      <rect x="10" y="47" width="30" height="6" />
      <text x="48" y="26" fontFamily="Arial, Helvetica, sans-serif" fontWeight="800" fontSize="24" letterSpacing="0.5">
        HVAC
      </text>
      <text x="48" y="47" fontFamily="Arial, Helvetica, sans-serif" fontWeight="700" fontSize="14" letterSpacing="2.5">
        TECHNOLOGY
      </text>
    </svg>
  );
}
