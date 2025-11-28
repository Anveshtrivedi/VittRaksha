"use client"

import * as React from "react"
import { X, Mail, Lock, Smartphone, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth-context"

interface AuthModalProps {
    isOpen: boolean
    onClose: () => void
}

type AuthMode = "login" | "signup" | "otp"

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
    const [mode, setMode] = React.useState<AuthMode>("login")
    const { login } = useAuth()
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")

    if (!isOpen) return null

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        // Simulate API call
        setTimeout(() => {
            login()
            onClose()
        }, 500)
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-grey-950 border border-dark-cyan-800 shadow-2xl">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 z-10 rounded-full p-2 text-dark-cyan-400 hover:bg-dark-cyan-900 hover:text-white transition-colors"
                >
                    <X className="h-5 w-5" />
                </button>

                {/* Header */}
                <div className="p-8 pb-0 text-center">
                    <h2 className="text-2xl font-bold text-white mb-2">
                        {mode === "login" && "Welcome Back"}
                        {mode === "signup" && "Create Account"}
                        {mode === "otp" && "Verify Identity"}
                    </h2>
                    <p className="text-slate-400 text-sm">
                        {mode === "login" && "Enter your credentials to access your account"}
                        {mode === "signup" && "Join us to secure your financial future"}
                        {mode === "otp" && "We sent a code to your device"}
                    </p>
                </div>

                {/* Form */}
                <div className="p-8">
                    <form onSubmit={handleLogin} className="space-y-4">
                        {mode !== "otp" && (
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-grey-500" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all"
                                        placeholder="name@example.com"
                                    />
                                </div>
                            </div>
                        )}

                        {mode === "login" && (
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-dark-cyan-900 border border-dark-cyan-800 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>
                        )}

                        {mode === "signup" && (
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                                    <input
                                        type="password"
                                        className="w-full bg-slate-900 border border-grey-800 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all"
                                        placeholder="Create a password"
                                    />
                                </div>
                            </div>
                        )}

                        {mode === "otp" && (
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">One-Time Password</label>
                                <div className="relative">
                                    <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                                    <input
                                        type="text"
                                        className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all text-center tracking-[0.5em] font-mono text-lg"
                                        placeholder="000000"
                                    />
                                </div>
                            </div>
                        )}

                        <Button
                            type="submit"
                            className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-6 rounded-xl transition-all mt-6"
                        >
                            {mode === "login" && "Sign In"}
                            {mode === "signup" && "Create Account"}
                            {mode === "otp" && "Verify"}
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </form>

                    {/* Footer Links */}
                    <div className="mt-6 flex items-center justify-center gap-4 text-sm text-slate-400">
                        {mode === "login" && (
                            <>
                                <button onClick={() => setMode("signup")} className="hover:text-white transition-colors">Create account</button>
                                <span className="w-1 h-1 rounded-full bg-dark-cyan-700" />
                                <button onClick={() => setMode("otp")} className="hover:text-white transition-colors">Login with OTP</button>
                            </>
                        )}
                        {mode !== "login" && (
                            <button onClick={() => setMode("login")} className="hover:text-white transition-colors">Back to Login</button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
