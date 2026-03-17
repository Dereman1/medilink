"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ShieldCheck as ShieldCheckIcon,
  ClipboardList as ClipboardListIcon,
  Network as NetworkIcon,
  Building as BuildingIcon,
  SearchCheck as SearchCheckIcon,
  LockKeyhole as LockKeyholeIcon,
  ClipboardPlus as ClipboardPlusIcon,
  Shield as ShieldIcon,
  FileAxis3d,
  FileBadge,
  LogOut,
  LayoutDashboard,
} from "lucide-react";

import heroImageUrl from "@/public/recordx_hero.png";
import { useAuthStore } from "@/store/auth-store";
import { logoutUser, getRoleFromUser, getDashboardPathForRole } from "@/lib/auth";
import { toast } from "sonner";

export default function Home() {
  const router = useRouter();
  const { user, accessToken, refreshToken, clearSession, isHydrated } = useAuthStore();

  useEffect(() => {
    if (!isHydrated || !user || !accessToken) return;
    const role = getRoleFromUser(user);
    const dashboardPath = getDashboardPathForRole(role);
    if (dashboardPath !== "/") {
      router.replace(dashboardPath);
    }
  }, [isHydrated, user, accessToken, router]);

  const handleLogout = async () => {
    try {
      if (accessToken && refreshToken) {
        await logoutUser(accessToken, refreshToken);
      }
      clearSession();
      toast.success("Logged out successfully");
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout failed", error);
      clearSession();
      router.push("/");
      router.refresh();
    }
  };

  const getDashboardUrl = () => getDashboardPathForRole(getRoleFromUser(user));

  if (!isHydrated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Fixed Navbar */}
      <header className="border-b border-border/40 fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-20">
          <Link href="/" className="flex items-center gap-2">
            <h1 className="text-3xl md:text-2xl font-bold flex items-center gap-2">
              <FileBadge className="text-primary h-8 w-8" strokeWidth={1.5} />
              <span>Record</span>
              <span className="text-primary italic -ml-2">X</span>
            </h1>
          </Link>
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <Link href={getDashboardUrl()}>
                  <Button
                    variant="outline"
                    size="default"
                    className="text-sm cursor-pointer flex gap-2"
                  >
                    <LayoutDashboard className="size-4" />
                    Dashboard
                  </Button>
                </Link>
                <Button
                  variant="destructive"
                  size="default"
                  className="text-sm cursor-pointer flex gap-2"
                  onClick={handleLogout}
                >
                  <LogOut className="size-4" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button
                    variant="outline"
                    size="default"
                    className="text-sm cursor-pointer"
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button
                    variant="default"
                    size="default"
                    className="text-sm cursor-pointer"
                  >
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="pt-19">
        {" "}
        {/* Add padding top equal to navbar height */}
        {/* Hero Section */}
        <section
          id="home"
          className="flex items-center justify-center mx-auto max-w-7xl px-6 gap-12 lg:px-20"
          style={{
            minHeight: "calc(100vh - 76px)",
            paddingTop: "2rem",
            paddingBottom: "2rem",
          }}
        >
          <div className="space-y-8 w-full flex flex-col items-center justify-center">
            <div className="space-y-6 text-center">
              <h1 className="text-4xl font-bold leading-tight tracking-tight text-slate-900 lg:text-5xl xl:text-6xl">
                Secure Digital Medical Records.
                <span className="text-primary block">In Your Control.</span>
              </h1>
              <p className="max-w-xl mx-auto text-base text-slate-700 lg:text-lg">
                Centralize your history. Grant secure access to providers.
                Better care, reduced costs. Improve healthcare records with our platform.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/register?role=patient">
                <Button
                onClick={() => router.push("/login")}
                  size="lg"
                  className="h-12 cursor-pointer px-6 text-base md:w-fit w-full"
                >
                  Patient Sign Up (Free)
                </Button>
              </Link>
              <Button
                onClick={() => router.push("/login?role=provider")}
                size="lg"
                variant="outline"
                className="h-12 px-6 cursor-pointer text-base md:w-fit w-full"
              >
                Healthcare Provider
              </Button>
            </div>
          </div>
        </section>
        <section className="bg-linear-to-b from-white to-slate-50 py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-20">
            <h2 className="mb-12 text-center text-3xl font-bold text-slate-900">
              Key Benefits
            </h2>

            <div className="grid gap-6 md:grid-cols-3">
              <Card className="p-8 text-center bg-white">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-50">
                  <div className="relative h-16 w-16">
                    <ShieldCheckIcon
                      className="absolute inset-0 h-12 w-12 text-blue-600"
                      strokeWidth={1.5}
                    />
                    <div className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <svg
                        viewBox="0 0 24 24"
                        className="h-5 w-5 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-slate-900">
                  For Patients:
                </h3>
                <p className="text-sm font-medium text-slate-900 ">
                  Your health, in your hands. Securlely store and share records.
                </p>
                
              </Card>

              <Card className="p-8 text-center bg-emerald-50">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
                  <div className="relative h-16 w-16">
                    <ClipboardListIcon
                      className="absolute left-2 top-1 h-10 w-10 text-emerald-600"
                      strokeWidth={1.5}
                    />
                    <div className="absolute right-0 top-0 h-8 w-8 rounded-full bg-emerald-200 flex items-center justify-center">
                      <svg
                        viewBox="0 0 24 24"
                        className="h-5 w-5 text-emerald-700"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 6v6l4 2" />
                      </svg>
                    </div>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-slate-900">
                  For Providers:
                </h3>
                <p className="text-sm font-medium text-slate-900">
                  Full history, seamless care, while accessing patient records with ease.
                </p>
               
              </Card>

              <Card className="p-8 text-center bg-white">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-slate-50">
                  <div className="relative h-16 w-16">
                    <NetworkIcon
                      className="absolute left-1 top-2 h-12 w-12 text-slate-600"
                      strokeWidth={1.5}
                    />
                    <BuildingIcon
                      className="absolute right-0 bottom-0 h-8 w-8 text-slate-700"
                      strokeWidth={2}
                    />
                  </div>
                </div>
                <h3 className="mb-3 text-lg font-semibold text-slate-900">
                  For Facilities:
                </h3>
                <p className="text-sm font-medium text-slate-900 mb-2">
                  Streamlined coordination. Manage your providers.
                </p>
              
              </Card>
            </div>
          </div>
        </section>
        <section id="how-it-works" className="bg-white py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="mb-16 text-center text-3xl font-bold text-slate-900">
              How Record<span className="text-primary italic">X</span> Works
            </h2>

            <div className="grid gap-8 md:grid-cols-4">
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-2xl bg-emerald-50">
                  <SearchCheckIcon
                    className="h-12 w-12 text-emerald-600"
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="mb-2 text-base font-semibold text-slate-900">
                  Sign Up
                </h3>
                <p className="text-sm text-slate-600">
                  Create your secure account
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-2xl bg-blue-50">
                  <LockKeyholeIcon
                    className="h-12 w-12 text-blue-600"
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="mb-2 text-base font-semibold text-slate-900">
                  Store Records
                </h3>
                <p className="text-sm text-slate-600">
                  Upload and organize your medical history
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-2xl bg-slate-50">
                  <ClipboardPlusIcon
                    className="h-12 w-12 text-slate-600"
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="mb-2 text-base font-semibold text-slate-900">
                  Grant Access
                </h3>
                <p className="text-sm text-slate-600">
                  Control who sees your data
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-2xl bg-emerald-50">
                  <ShieldIcon
                    className="h-12 w-12 text-emerald-600"
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="mb-2 text-base font-semibold text-slate-900">
                  Better Care
                </h3>
                <p className="text-sm text-slate-600">
                  Receive informed treatment
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-linear-to-b from-slate-50 to-white py-16">
          <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
            <h2 className="mb-6 text-3xl font-bold text-slate-900">
              Ready to Take Control of Your Medical Records?
            </h2>
            <p className="mb-8 text-lg text-slate-600">
              Join RecordX today and experience secure, accessible healthcare.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button onClick={() => router.push('/register')} size="lg" className="h-12 px-8 text-base cursor-pointer md:w-fit w-full">
                Get Started Now
              </Button>
              <Button
                onClick={() => router.push('/login')} 
                size="lg"
                variant="outline"
                className="h-12 px-8 text-base cursor-pointer md:w-fit w-full"
              >
                Sign In
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/40 bg-slate-50 py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-20">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <FileBadge className="text-primary h-8 w-8" strokeWidth={1.5} />
                <span>Record</span>
                <span className="text-primary italic -ml-2">X</span>
              </h1>
            </div>
            <p className="text-sm text-slate-600">
              © 2026 RecordX. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="#privacy"
                className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="#terms"
                className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
