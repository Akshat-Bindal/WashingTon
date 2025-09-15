"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function SessionPersistence({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  // ✅ Save last visited page
  useEffect(() => {
    if (pathname) {
      localStorage.setItem("lastPage", pathname);
    }
  }, [pathname]);

  // ✅ On first load, check token and redirect
  useEffect(() => {
    const token = localStorage.getItem("token");
    const lastPage = localStorage.getItem("lastPage");

    if (!token && pathname !== "/login" && pathname !== "/register") {
      router.push("/login"); // redirect to login if no token
    } else if (token && lastPage && lastPage !== pathname) {
      router.push(lastPage); // redirect to last visited page
    }
  }, [pathname, router]);

  return <>{children}</>;
}
