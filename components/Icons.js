function base(props) {
  return {
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    ...props,
  };
}

export function SnowflakeIcon(props) {
  return (
    <svg {...base(props)}>
      <path d="M12 2v20M4.5 6l15 12M19.5 6l-15 12" />
      <path d="M12 2l-2 2M12 2l2 2M12 22l-2-2M12 22l2-2" />
      <path d="M4.5 6l2.7-.3M4.5 6l.7 2.6M19.5 6l-2.7-.3M19.5 6l-.7 2.6" />
      <path d="M4.5 18l2.7.3M4.5 18l.7-2.6M19.5 18l-2.7.3M19.5 18l-.7-2.6" />
    </svg>
  );
}

export function FanIcon(props) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none" />
      <path d="M12 10.5c-.8-2.5-.6-6 1.8-7.5 2 1 2.7 4 .6 7" />
      <path d="M13.5 12c2.5-.8 6-.6 7.5 1.8-1 2-4 2.7-7 .6" />
      <path d="M12 13.5c.8 2.5.6 6-1.8 7.5-2-1-2.7-4-.6-7" />
      <path d="M10.5 12c-2.5.8-6 .6-7.5-1.8 1-2 4-2.7 7-.6" />
    </svg>
  );
}

export function FlameIcon(props) {
  return (
    <svg {...base(props)}>
      <path d="M12 2c1 3-3 4-3 8a3 3 0 0 0 6 0c0-1.5-1-2-1-3.5 1.5 1 3 3.2 3 5.9A5.5 5.5 0 0 1 6 12.5C6 8 12 6 12 2z" />
    </svg>
  );
}

export function ThermometerIcon(props) {
  return (
    <svg {...base(props)}>
      <path d="M10 14.8V5a2 2 0 1 1 4 0v9.8a4 4 0 1 1-4 0z" />
      <path d="M12 8v6" />
    </svg>
  );
}

export function WrenchIcon(props) {
  return (
    <svg {...base(props)}>
      <path d="M14.7 6.3a4 4 0 0 0-5.4 5.1L3 18l3 3 6.6-6.3a4 4 0 0 0 5.1-5.4l-2.8 2.8-2.6-.6-.6-2.6z" />
    </svg>
  );
}

export function RulerIcon(props) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="8" width="18" height="8" rx="1.5" />
      <path d="M7 8v3M11 8v3M15 8v3M19 8v3" />
    </svg>
  );
}

export function WavesIcon(props) {
  return (
    <svg {...base(props)}>
      <path d="M2 8c1.5-1.5 3-1.5 4.5 0s3 1.5 4.5 0 3-1.5 4.5 0 3 1.5 4.5 0" />
      <path d="M2 14c1.5-1.5 3-1.5 4.5 0s3 1.5 4.5 0 3-1.5 4.5 0 3 1.5 4.5 0" />
      <path d="M2 20c1.5-1.5 3-1.5 4.5 0s3 1.5 4.5 0 3-1.5 4.5 0 3 1.5 4.5 0" />
    </svg>
  );
}

export function DropletIcon(props) {
  return (
    <svg {...base(props)}>
      <path d="M12 2.5S5.5 10 5.5 14.5a6.5 6.5 0 1 0 13 0C18.5 10 12 2.5 12 2.5z" />
    </svg>
  );
}

export function SparklesIcon(props) {
  return (
    <svg {...base(props)}>
      <path d="M12 3l1.4 4.2L18 8.6l-4.6 1.4L12 14l-1.4-4-4.6-1.4 4.6-1.4L12 3z" />
      <path d="M5 16l.7 2.1L8 19l-2.3.9L5 22l-.7-2.1L2 19l2.3-.9L5 16z" />
      <path d="M19 15l.6 1.8 1.8.6-1.8.6-.6 1.8-.6-1.8-1.8-.6 1.8-.6.6-1.8z" />
    </svg>
  );
}

export function ShieldCheckIcon(props) {
  return (
    <svg {...base(props)}>
      <path d="M12 3l7 3v5c0 4.5-3 7.5-7 10-4-2.5-7-5.5-7-10V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

export function UsersIcon(props) {
  return (
    <svg {...base(props)}>
      <circle cx="9" cy="8" r="3" />
      <path d="M2.5 20c.5-3.5 3-5.5 6.5-5.5s6 2 6.5 5.5" />
      <circle cx="17" cy="9" r="2.4" />
      <path d="M15.5 20c.3-2.8 1.7-4.6 3.6-5.3" />
    </svg>
  );
}

export function ClockIcon(props) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </svg>
  );
}

export function PhoneIcon(props) {
  return (
    <svg {...base(props)}>
      <path d="M5 4h3.2l1.1 4-2 1.5a11 11 0 0 0 5.2 5.2l1.5-2 4 1.1V17a2 2 0 0 1-2.2 2A16 16 0 0 1 3 5.2 2 2 0 0 1 5 4z" />
    </svg>
  );
}

export function MailIcon(props) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3.5 6.5L12 13l8.5-6.5" />
    </svg>
  );
}

export function MapPinIcon(props) {
  return (
    <svg {...base(props)}>
      <path d="M12 21s7-6.5 7-11.5a7 7 0 0 0-14 0C5 14.5 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.3" />
    </svg>
  );
}

export function FacebookIcon(props) {
  return (
    <svg {...base({ ...props, fill: "currentColor", stroke: "none" })}>
      <path d="M14 22v-8h2.7l.4-3.3H14V8.6c0-1 .3-1.6 1.7-1.6H17V4.1C16.7 4 15.8 4 14.7 4 12.4 4 11 5.4 11 8v2.7H8.3v3.3H11v8h3z" />
    </svg>
  );
}

export function ArrowRightIcon(props) {
  return (
    <svg {...base(props)}>
      <path d="M4 12h16M14 6l6 6-6 6" />
    </svg>
  );
}

export function CheckIcon(props) {
  return (
    <svg {...base(props)}>
      <path d="M4 12.5l5 5L20 6" />
    </svg>
  );
}

export function ClipboardIcon(props) {
  return (
    <svg {...base(props)}>
      <rect x="5" y="4.5" width="14" height="17" rx="2" />
      <path d="M9 4.5V3.5a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 3.5v1" />
      <path d="M8.5 11h7M8.5 14.5h7M8.5 18h4.5" />
    </svg>
  );
}

export function ViberIcon(props) {
  return (
    <svg {...base({ ...props, fill: "currentColor", stroke: "none" })}>
      <path d="M12.1 2C7.1 2 3.4 5.3 3.4 9.9c0 2.5 1.1 4.7 3 6.2-.1.9-.4 2.4-1.4 3.6 0 0 1.9-.1 3.7-1.4.9.3 1.9.5 3 .5.4 0 .8 0 1.1-.1-.3-.5-.5-1-.6-1.6-.3 0-.6.1-.9.1-.8 0-1.6-.2-2.3-.4l-.5-.2-.4.3c-.5.4-1.1.7-1.6.9.2-.5.3-1.1.4-1.6l.1-.6-.5-.4c-1.6-1.3-2.5-3.1-2.5-5.2 0-3.7 3-6.4 6.9-6.4s6.9 2.7 6.9 6.4c0 .4 0 .8-.1 1.1.6.1 1.1.3 1.6.6.1-.5.2-1.1.2-1.7C20.4 5.3 16.7 2 12.1 2z" />
      <path d="M9.9 7.3c-.3 0-.5.2-.5.5 0 3 2.4 5.4 5.4 5.4.3 0 .5-.2.5-.5s-.2-.5-.5-.5c-2.4 0-4.4-2-4.4-4.4 0-.3-.2-.5-.5-.5z" />
      <path d="M12.6 9.1c-.2.1-.3.3-.2.5l.6 1.3c.1.2.4.3.6.2.2-.1.3-.4.2-.6l-.6-1.3c-.1-.2-.4-.3-.6-.1z" />
      <path d="M17.5 15.2a1.7 1.7 0 0 0-1.6-1c-.3 0-.6.1-.9.3l-.6.4a10.4 10.4 0 0 1-2.9-2.1"/>
      <circle cx="17.3" cy="17.3" r="4.2" fill="none" stroke="currentColor" strokeWidth="1.3" />
      <path d="M15.6 17.3l1.1 1.1 1.9-2.1" fill="none" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

export function WhatsAppIcon(props) {
  return (
    <svg {...base({ ...props, fill: "currentColor", stroke: "none" })}>
      <path d="M12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.2-1.3c1.4.8 3.1 1.2 4.8 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18.2c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3.1.8.8-3-.2-.3A8.16 8.16 0 0 1 3.8 12c0-4.5 3.7-8.2 8.2-8.2s8.2 3.7 8.2 8.2-3.7 8.2-8.2 8.2z" />
      <path d="M16.5 14.2l-1.9-.6c-.3-.1-.6 0-.8.2l-.5.5c-.2.2-.5.3-.8.1-1-.5-2.3-1.6-3-2.9-.1-.3-.1-.6.1-.8l.4-.5c.2-.2.3-.5.2-.8l-.7-1.9c-.2-.5-.8-.7-1.3-.4-.7.4-1.4 1.1-1.5 2-.2 1.5.6 3.2 2 4.7 1.5 1.7 3.5 2.9 5.1 3 .9.1 1.8-.4 2.3-1.1.4-.6.2-1.3-.3-1.5z" />
    </svg>
  );
}

export function MapPinFilledIcon(props) {
  return (
    <svg {...base({ ...props, fill: "currentColor", stroke: "none" })}>
      <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
    </svg>
  );
}
