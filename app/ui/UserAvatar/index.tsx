"use client";

import { useEffect, useState } from "react";
import { hexToUrl } from "@/app/lib/db2/avatar";
import styles from "./UserAvatar.module.css";

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function resolveSrc(src?: string): string | null {
  if (!src) return null;
  if (
    src.startsWith("data:") ||
    src.startsWith("blob:") ||
    src.startsWith("http")
  ) {
    return src;
  }
  return hexToUrl(src);
}

type UserAvatarProps = {
  name: string;
  size?: "lg";
  src?: string;
};

export default function UserAvatar({ name, size, src }: UserAvatarProps) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  const url = !failed ? resolveSrc(src) : null;

  const className = [
    styles.avatar,
    size === "lg" ? styles["size-lg"] : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div aria-hidden className={className}>
      {url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          alt=""
          className={styles.img}
          onError={() => setFailed(true)}
          src={url}
        />
      ) : (
        initials(name)
      )}
    </div>
  );
}
