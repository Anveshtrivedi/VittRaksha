"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Shield } from "lucide-react"

export function Navbar() {
    const pathname = usePathname()

    const routes = [
        {
            href: "/",
            label: "Home",
        },
        {
            href: "/dashboard",
            label: "Dashboard",
        },
        {
            href: "/realtime-guard",
            label: "RealtimeGuard",
        },
        {
            href: "/wallet",
            label: "Wallet",
        },
        {
            href: "/about",
            label: "About",
        },
    ]

    return (
        <header className="fixed top-0 w-full z-50 border-b border-white/5 bg-slate-950/50 backdrop-blur-xl supports-[backdrop-filter]:bg-slate-950/50">
            <div className="container flex h-16 items-center px-4 md:px-6">
                <Link href="/" className="flex items-center gap-2 mr-6">
                    <Shield className="h-6 w-6 text-cyan-500" />
                    <span className="font-bold text-lg tracking-tight text-white">
                        {pathname === "/about" ? "About" : "Vitt Raksha"}
                    </span>
                </Link>
                <nav className="flex items-center gap-6 ml-auto">
                    {routes
                        .filter(route => pathname !== "/about" || route.href === "/")
                        .map((route) => (
                            <Link
                                key={route.href}
                                href={route.href}
                                className={cn(
                                    "text-sm font-medium transition-colors hover:text-cyan-400",
                                    pathname === route.href ? "text-cyan-400" : "text-slate-400"
                                )}
                            >
                                {route.label}
                            </Link>
                        ))}
                </nav>
            </div>
        </header>
    )
}
