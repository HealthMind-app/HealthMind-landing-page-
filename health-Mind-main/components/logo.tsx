"use client";
import Image from "next/image";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  imageUrl: string;
}

export default function Logo({ size = "md", imageUrl }: LogoProps) {
  const sizeMap = {
    sm: 36,
    md: 48,
    lg: 72,
    xl: 128,
  };

  const resolvedUrl =
    imageUrl.startsWith("/") || imageUrl.startsWith("http")
      ? imageUrl
      : `/${imageUrl}`;

  const isSvg = resolvedUrl.toLowerCase().endsWith(".svg");

  if (isSvg) {
    return (
      <img
        src={resolvedUrl}
        alt="HealthMind logo"
        width={sizeMap[size]}
        height={sizeMap[size]}
        className="object-contain"
      />
    );
  }

  return (
    <Image
      src={resolvedUrl}
      alt="HealthMind logo"
      width={sizeMap[size]}
      height={sizeMap[size]}
      priority
      className="object-contain"
    />
  );
}
