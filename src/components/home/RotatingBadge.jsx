import { LogoMark } from "@/components/site/Logo";
import { useSiteContent } from "@/context/SiteContentContext";

export const RotatingBadge = ({ size = "h-24 w-24" }) => {
  const { config } = useSiteContent();
  const text = config?.hero?.badgeText || "Pure · Radiant · Graceful · iOS ·";

  return (
    <div className={`relative ${size}`}>
      <svg viewBox="0 0 100 100" className="spin-slow h-full w-full">
        <defs><path id="badge-circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" /></defs>
        <text className="fill-current font-mono text-[9.4px] uppercase tracking-[0.18em]">
          <textPath href="#badge-circle">{text}</textPath>
        </text>
      </svg>
      <LogoMark className="absolute inset-0 m-auto h-8 w-8" />
    </div>
  );
};
