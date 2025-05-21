import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";

interface LogoProps {
  className?: string;
  iconClassName?: string;
  textClassName?: string;
  showText?: boolean;
  href?: string;
}

/**
 * Logo component that uses the site configuration
 * This component makes it easy to display a consistent logo throughout the application
 */
export function Logo({
  className = "flex items-center gap-2 font-medium",
  iconClassName = "flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground",
  textClassName = "",
  showText = true,
  href = siteConfig.links.home,
}: LogoProps) {
  return (
    <Link href={href} className={className}>
      <div className={iconClassName}>
        <img
          src={siteConfig.logo.image}
          alt={siteConfig.logo.text}
          width={24}
          height={24}
        />
      </div>
      {showText && (
        <span className={textClassName}>{siteConfig.logo.text}</span>
      )}
    </Link>
  );
}
