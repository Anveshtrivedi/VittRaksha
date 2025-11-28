"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface AuthContextType {
    isLoggedIn: boolean
    login: () => void
    logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const router = useRouter()

    // Persist auth state (optional, for demo purposes)
    useEffect(() => {
        const storedAuth = localStorage.getItem("isLoggedIn")
        if (storedAuth === "true") {
            setIsLoggedIn(true)
        }
    }, [])

    const login = () => {
        setIsLoggedIn(true)
        localStorage.setItem("isLoggedIn", "true")
        router.push("/dashboard")
    }

    const logout = () => {
        setIsLoggedIn(false)
        localStorage.removeItem("isLoggedIn")
        router.push("/")
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}
