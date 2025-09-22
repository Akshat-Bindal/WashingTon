"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function SessionPersistence({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);
  const [hasRedirected, setHasRedirected] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Save last visited page for authenticated users
  useEffect(() => {
    if (mounted && pathname) {
      const token = localStorage.getItem("token");
      const isGuestMode = searchParams.get("guest") === "true";
      
      if (token && !isGuestMode && !isAuthPage(pathname) && !isPublicPage(pathname)) {
        localStorage.setItem("lastPage", pathname);
      }
    }
  }, [pathname, mounted, searchParams]);

  // Main auth redirect logic
  useEffect(() => {
    if (!mounted || hasRedirected) return;

    const token = localStorage.getItem("token");
    const isGuestMode = searchParams.get("guest") === "true";
    
    const authPage = isAuthPage(pathname);
    const publicPage = isPublicPage(pathname);
    const mainAppPage = isMainAppPage(pathname);

    console.log("Auth check:", { 
      token: !!token, 
      isGuestMode, 
      pathname, 
      authPage, 
      publicPage, 
      mainAppPage 
    });

    // If user has token and tries to access auth pages, redirect to app
    if (token && authPage && !isGuestMode) {
      const lastPage = localStorage.getItem("lastPage");
      setHasRedirected(true);
      router.push(lastPage || "/");
    }
    
    // If user has token and on intro page, redirect to app
    else if (token && pathname === "/intro" && !isGuestMode) {
      setHasRedirected(true);
      router.push("/");
    }
    
    // If no token, not guest mode, and trying to access main app pages, redirect to intro
    else if (!token && !isGuestMode && mainAppPage) {
      setHasRedirected(true);
      router.push("/intro");
    }
    
    // Guest mode: allow access to main app pages without token
    // No redirect needed for guest mode
    
  }, [mounted, pathname, router, hasRedirected, searchParams]);

  useEffect(() => {
    setHasRedirected(false);
  }, [pathname]);

  if (!mounted) {
    return <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="spinner-border text-warning" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>;
  }

  return <>{children}</>;
}

function isAuthPage(pathname: string): boolean {
  return ["/login", "/register", "/otp-confirm", "/forget-password", "/forget-password-success"].includes(pathname);
}

function isPublicPage(pathname: string): boolean {
  return ["/intro", "/about-us", "/contact", "/privacy-policy"].includes(pathname);
}

function isMainAppPage(pathname: string): boolean {
  // Pages that require auth OR can be accessed as guest
  return [
    "/", "/home", 
    "/shop-grid", "/shop-list", "/flash-sale",
    "/cart", "/checkout", "/my-order", "/wishlist-list",
    "/profile", "/edit-profile", "/settings", "/notifications",
    "/message", "/support"
  ].includes(pathname);
}