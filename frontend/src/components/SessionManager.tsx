"use client";

import { useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";

const TIMEOUT_MS = 5 * 60 * 1000; // 5 minutes

export default function SessionManager() {
  const router = useRouter();
  const pathname = usePathname();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // We don't want to auto-logout if we are already on login or root intro page
  const isAuthPage = pathname === "/" || pathname.startsWith("/login") || pathname.startsWith("/enroll");

  const resetTimer = () => {
    if (isAuthPage) return;
    
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    
    timeoutRef.current = setTimeout(() => {
      // Clear fake session
      sessionStorage.removeItem("faceflow_session");
      localStorage.removeItem("faceflow_session");
      // Redirect to login
      router.push("/login?timeout=true");
    }, TIMEOUT_MS);
  };

  useEffect(() => {
    if (isAuthPage) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      return;
    }

    // Start timer initially
    resetTimer();

    // Event listeners to detect activity
    const events = ["mousemove", "keydown", "scroll", "click"];
    events.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      events.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
    };
  }, [pathname, isAuthPage]);

  return null;
}
