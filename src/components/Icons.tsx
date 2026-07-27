import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function IconBase({ size = 20, children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export function SearchIcon(props: IconProps) { return <IconBase {...props}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.6-3.6" /></IconBase>; }
export function MapPinIcon(props: IconProps) { return <IconBase {...props}><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></IconBase>; }
export function BriefcaseIcon(props: IconProps) { return <IconBase {...props}><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18M10 12v2h4v-2" /></IconBase>; }
export function SparklesIcon(props: IconProps) { return <IconBase {...props}><path d="m12 3 1.2 3.8L17 8l-3.8 1.2L12 13l-1.2-3.8L7 8l3.8-1.2L12 3ZM5 14l.8 2.2L8 17l-2.2.8L5 20l-.8-2.2L2 17l2.2-.8L5 14Zm14-2 .8 2.2L22 15l-2.2.8L19 18l-.8-2.2L16 15l2.2-.8L19 12Z" /></IconBase>; }
export function ArrowRightIcon(props: IconProps) { return <IconBase {...props}><path d="M5 12h14M13 6l6 6-6 6" /></IconBase>; }
export function ArrowLeftIcon(props: IconProps) { return <IconBase {...props}><path d="M19 12H5m6 6-6-6 6-6" /></IconBase>; }
export function ArrowUpIcon(props: IconProps) { return <IconBase {...props}><path d="M12 19V5m-6 6 6-6 6 6" /></IconBase>; }
export function ChevronDownIcon(props: IconProps) { return <IconBase {...props}><path d="m6 9 6 6 6-6" /></IconBase>; }
export function ChevronRightIcon(props: IconProps) { return <IconBase {...props}><path d="m9 18 6-6-6-6" /></IconBase>; }
export function ClockIcon(props: IconProps) { return <IconBase {...props}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></IconBase>; }
export function WalletIcon(props: IconProps) { return <IconBase {...props}><path d="M4 6a2 2 0 0 1 2-2h12v16H6a2 2 0 0 1-2-2V6Z" /><path d="M4 8h14M15 13h6v4h-6a2 2 0 0 1 0-4Z" /></IconBase>; }
export function BookmarkIcon({ fill, ...props }: IconProps) { return <IconBase {...props} fill={fill}><path d="M6 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18l-6-4-6 4V4Z" /></IconBase>; }
export function SlidersIcon(props: IconProps) { return <IconBase {...props}><path d="M4 7h10m4 0h2M4 17h2m4 0h10M14 5v4M6 15v4" /></IconBase>; }
export function GridIcon(props: IconProps) { return <IconBase {...props}><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></IconBase>; }
export function ListIcon(props: IconProps) { return <IconBase {...props}><path d="M8 6h13M8 12h13M8 18h13" /><circle cx="4" cy="6" r="1" fill="currentColor" stroke="none" /><circle cx="4" cy="12" r="1" fill="currentColor" stroke="none" /><circle cx="4" cy="18" r="1" fill="currentColor" stroke="none" /></IconBase>; }
export function BuildingIcon(props: IconProps) { return <IconBase {...props}><path d="M4 21V5l8-3v19M12 8h8v13M8 7v1m0 4v1m0 4v1m8-6v1m0 4v1M2 21h20" /></IconBase>; }
export function UsersIcon(props: IconProps) { return <IconBase {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></IconBase>; }
export function CheckCircleIcon(props: IconProps) { return <IconBase {...props}><circle cx="12" cy="12" r="9" /><path d="m8 12 2.5 2.5L16 9" /></IconBase>; }
export function MenuIcon(props: IconProps) { return <IconBase {...props}><path d="M4 7h16M4 12h16M4 17h16" /></IconBase>; }
export function XIcon(props: IconProps) { return <IconBase {...props}><path d="m6 6 12 12M18 6 6 18" /></IconBase>; }
export function ExternalLinkIcon(props: IconProps) { return <IconBase {...props}><path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /></IconBase>; }
export function MailIcon(props: IconProps) { return <IconBase {...props}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></IconBase>; }
export function ShieldIcon(props: IconProps) { return <IconBase {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /><path d="m9 12 2 2 4-4" /></IconBase>; }
export function ZapIcon(props: IconProps) { return <IconBase {...props}><path d="m13 2-9 12h8l-1 8 9-12h-8l1-8Z" /></IconBase>; }
export function MoonIcon(props: IconProps) { return <IconBase {...props}><path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5 8.5 8.5 0 1 0 20.5 14.5Z" /></IconBase>; }
export function SunIcon(props: IconProps) { return <IconBase {...props}><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" /></IconBase>; }
export function CommandIcon(props: IconProps) { return <IconBase {...props}><path d="M9 6V5a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3v14a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6Z" /></IconBase>; }
export function TagIcon(props: IconProps) { return <IconBase {...props}><path d="M20 13 13 20l-9-9V4h7l9 9Z" /><circle cx="8.5" cy="8.5" r="1.2" /></IconBase>; }
export function HistoryIcon(props: IconProps) { return <IconBase {...props}><path d="M3 12a9 9 0 1 0 3-6.7L3 8" /><path d="M3 3v5h5M12 7v5l3 2" /></IconBase>; }
