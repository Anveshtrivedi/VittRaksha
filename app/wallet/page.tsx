"use client"

import { useState } from "react"
import { WalletHeader } from "@/components/wallet/wallet-header"
import { BalanceCards } from "@/components/wallet/balance-cards"
import { SendPaymentForm } from "@/components/wallet/send-payment-form"
import { TransactionHistory, Transaction } from "@/components/wallet/transaction-history"
import { Navbar } from "@/components/navbar"
import { connectWallet, getSFTBalance, getMaticBalance, sendSFT } from "@/src/blockchain/wallet"

export default function WalletPage() {
    const [address, setAddress] = useState<string | null>(null)
    const [sftBalance, setSftBalance] = useState("0.00")
    const [maticBalance, setMaticBalance] = useState("0.00")
    const [transactions, setTransactions] = useState<Transaction[]>([
        {
            id: 1,
            type: "SFT Transfer",
            amount: "- 50.00 SFT",
            date: "Today, 10:30 AM",
            status: "Success",
            mode: "crypto"
        },
        {
            id: 2,
            type: "UPI Payment",
            amount: "- ₹450.00",
            date: "Yesterday, 2:15 PM",
            status: "Success",
            mode: "upi"
        }
    ])

    const [isConnecting, setIsConnecting] = useState(false)

    const handleConnect = async () => {
        setIsConnecting(true);
        try {
            const addr = await connectWallet();
            setAddress(addr);
            await fetchBalances(addr);
        } catch (error: any) {
            console.error("Connection failed:", error);
            alert(`Failed to connect wallet: ${error.message || "Unknown error"}`);
        } finally {
            setIsConnecting(false);
        }
    }

    const fetchBalances = async (addr: string) => {
        const sft = await getSFTBalance(addr);
        const matic = await getMaticBalance(addr);
        setSftBalance(sft);
        setMaticBalance(matic);
    }

    const handleSendSFT = async (to: string, amount: string) => {
        const hash = await sendSFT(to, amount);

        // Add to transactions
        const newTx: Transaction = {
            id: Date.now(),
            type: "SFT Transfer",
            amount: `- ${amount} SFT`,
            date: new Date().toLocaleString(),
            status: "Success",
            mode: "crypto",
            hash: hash
        };
        setTransactions(prev => [newTx, ...prev]);

        // Refresh balances
        if (address) fetchBalances(address);

        return hash;
    }

    const handleSendUPI = async (upiId: string, amount: string, note: string) => {
        // Mock API call
        try {
            await fetch('/api/mock-upi', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ fromWallet: address, upiId, amount, note })
            });

            const newTx: Transaction = {
                id: Date.now(),
                type: "UPI Payment",
                amount: `- ₹${amount}`,
                date: new Date().toLocaleString(),
                status: "Success",
                mode: "upi"
            };
            setTransactions(prev => [newTx, ...prev]);
        } catch (error) {
            console.error("UPI Payment failed:", error);
            // Even if API fails (since it might not exist yet), we simulate success for the UI demo
            const newTx: Transaction = {
                id: Date.now(),
                type: "UPI Payment (Mock)",
                amount: `- ₹${amount}`,
                date: new Date().toLocaleString(),
                status: "Success",
                mode: "upi"
            };
            setTransactions(prev => [newTx, ...prev]);
        }
    }

    return (
        <div className="min-h-screen bg-[#0B0F10] text-white selection:bg-[#00C2A8]/30">
            <Navbar />

            {/* Background Elements */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#00C2A8]/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-[#8247E5]/10 rounded-full blur-[120px]" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" />
            </div>

            <main className="relative z-10 container mx-auto px-4 pt-24 pb-12 max-w-6xl">
                <WalletHeader onConnect={handleConnect} address={address} isConnecting={isConnecting} />

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column - Balances & Payment */}
                    <div className="lg:col-span-2">
                        <BalanceCards sftBalance={sftBalance} maticBalance={maticBalance} />
                        <SendPaymentForm onSendSFT={handleSendSFT} onSendUPI={handleSendUPI} />
                    </div>

                    {/* Right Column - History */}
                    <div className="lg:col-span-1">
                        <TransactionHistory transactions={transactions} />
                    </div>
                </div>
            </main>
        </div>
    )
}
