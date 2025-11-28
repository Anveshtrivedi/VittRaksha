import { Smartphone, Coins } from "lucide-react"

export interface Transaction {
    id: number | string;
    type: string;
    amount: string;
    date: string;
    status: string;
    icon?: any; // Using any for simplicity with Lucide icons passed as components or just mapping them
    mode: "crypto" | "upi";
    hash?: string;
}

interface TransactionHistoryProps {
    transactions: Transaction[];
}

export function TransactionHistory({ transactions }: TransactionHistoryProps) {
    return (
        <div className="bg-slate-950/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 animate-fade-in" style={{ animationDelay: "300ms" }}>
            <h2 className="text-xl font-semibold text-white mb-6">Recent Transactions</h2>

            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                {transactions.length === 0 ? (
                    <p className="text-slate-500 text-center py-4">No transactions yet.</p>
                ) : (
                    transactions.map((tx) => (
                        <div key={tx.id} className="flex items-center justify-between p-4 rounded-xl bg-slate-900/30 border border-white/5 hover:border-[#00C2A8]/30 transition-colors group">
                            <div className="flex items-center gap-4">
                                <div className={`p-3 rounded-full ${tx.mode === 'crypto' ? 'bg-[#00C2A8]/10 text-[#00C2A8]' : 'bg-blue-500/10 text-blue-500'
                                    }`}>
                                    {tx.mode === 'crypto' ? <Coins className="h-5 w-5" /> : <Smartphone className="h-5 w-5" />}
                                </div>
                                <div>
                                    <p className="font-medium text-white">{tx.type}</p>
                                    <p className="text-xs text-slate-500">{tx.date}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className={`font-bold ${tx.amount.startsWith('+') ? 'text-green-500' : 'text-white'
                                    }`}>
                                    {tx.amount}
                                </p>
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-500/10 text-green-500 mt-1">
                                    {tx.status}
                                </span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
