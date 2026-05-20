
"use client"

import { useState } from "react"
import { Search, Filter, Download, IndianRupee } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export default function Ledger() {
  const [searchTerm, setSearchTerm] = useState("")
  const [transactions] = useState([])

  return (
    <div className="px-6 pt-8 pb-10 space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">बहीखाता / Ledger</h1>
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">लेनदेन विवरण / Transaction Details</p>
        </div>
        <button className="w-10 h-10 rounded-2xl glass flex items-center justify-center border-primary/20">
          <Download className="w-5 h-5 text-primary" />
        </button>
      </header>

      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="खोजें / Search..." 
            className="bg-secondary/30 border-white/5 h-12 pl-10 rounded-2xl"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="w-12 h-12 rounded-2xl glass flex items-center justify-center border-white/5">
          <Filter className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
        {[
          { hi: "सब", en: "All" },
          { hi: "प्राप्त", en: "Received" },
          { hi: "भेजा", en: "Sent" }
        ].map((tag, i) => (
          <Badge 
            key={i} 
            variant={i === 0 ? "default" : "outline"} 
            className={cn(
              "px-5 py-2 rounded-full whitespace-nowrap text-[10px] font-bold uppercase tracking-wider",
              i === 0 ? "bg-primary text-primary-foreground amber-glow" : "glass text-muted-foreground border-white/5"
            )}
          >
            {tag.hi} / {tag.en}
          </Badge>
        ))}
      </div>

      <div className="space-y-4">
        {transactions.length === 0 ? (
          <div className="text-center py-24 glass rounded-3xl space-y-4">
            <div className="w-16 h-16 bg-secondary/30 rounded-full flex items-center justify-center mx-auto opacity-20">
              <IndianRupee className="w-8 h-8 text-muted-foreground" />
            </div>
            <div className="space-y-1 px-4">
              <p className="font-bold text-sm">अभी तक कोई लेनदेन नहीं / No Transactions Yet</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-tight">आपका वित्तीय रिकॉर्ड यहाँ दिखाई देगा</p>
            </div>
          </div>
        ) : (
          transactions.map((t: any) => (
            <div key={t.id} className="glass p-4 rounded-2xl flex items-center justify-between group hover:bg-white/5 transition-colors">
              <div className="space-y-1">
                <p className="font-bold text-sm">{t.name}</p>
                <p className="text-[9px] text-muted-foreground font-black uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded-full inline-block">
                  {t.category}
                </p>
              </div>
              <p className={cn("font-black text-lg tracking-tighter", t.type === 'received' ? "text-emerald-400" : "text-accent")}>
                {t.type === 'received' ? '+' : '-'} ₹{t.amount.toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
