
"use client"

import { useState } from "react"
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  TrendingUp, 
  Wallet, 
  ShieldCheck,
  Zap
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

export default function Dashboard() {
  const [isBiometricVerified, setIsBiometricVerified] = useState(false)

  if (!isBiometricVerified) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center space-y-8 animate-in fade-in zoom-in duration-500">
        <div className="w-24 h-24 rounded-3xl glass flex items-center justify-center amber-glow animate-float">
          <ShieldCheck className="w-12 h-12 text-primary" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-gradient">BuildKhata</h1>
          <p className="text-muted-foreground font-medium">सुरक्षित पहुंच / Secure Access</p>
        </div>
        <button 
          onClick={() => setIsBiometricVerified(true)}
          className="w-full h-16 rounded-2xl glass hover:bg-white/5 transition-colors border-primary/20 flex items-center justify-center gap-3 font-semibold text-lg"
        >
          <Zap className="w-5 h-5 text-primary fill-primary/20" /> पहचान सत्यापित करें / Verify Identity
        </button>
        <p className="text-[10px] text-muted-foreground/60 uppercase tracking-widest">Face ID / Fingerprint Simulate</p>
      </div>
    )
  }

  return (
    <div className="px-6 pt-8 pb-10 space-y-8 animate-in slide-in-from-bottom-10 duration-700">
      <header className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-xs font-medium text-muted-foreground">नमस्ते / Namaste,</p>
          <h1 className="text-2xl font-bold tracking-tight">Studio ArchiTech</h1>
        </div>
        <Avatar className="h-12 w-12 border-2 border-primary/20 amber-glow">
          <AvatarImage src="https://picsum.photos/seed/studio/100/100" />
          <AvatarFallback>SA</AvatarFallback>
        </Avatar>
      </header>

      <Card className="glass overflow-hidden rounded-3xl border-white/5 relative group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl -mr-16 -mt-16 rounded-full group-hover:scale-150 transition-transform duration-700" />
        <CardContent className="p-8 space-y-4">
          <div className="flex items-center gap-2">
            <Wallet className="w-4 h-4 text-primary" />
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">कुल नगदी / Total Liquidity</span>
          </div>
          <div className="space-y-1">
            <h2 className="text-5xl font-extrabold tracking-tighter">₹0<span className="text-primary/60 text-2xl">.00</span></h2>
            <div className="flex items-center gap-2 text-muted-foreground text-[10px] font-bold uppercase tracking-wider">
              <TrendingUp className="w-3 h-3" />
              <span>शुरुआत करें / Get Started</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-4">
        <div className="glass p-5 rounded-3xl border-emerald-500/10 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
            <ArrowDownLeft className="w-5 h-5 text-emerald-500" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">प्राप्त / Received</p>
            <p className="text-lg font-bold text-emerald-400">₹0</p>
          </div>
        </div>
        <div className="glass p-5 rounded-3xl border-accent/10 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
            <ArrowUpRight className="w-5 h-5 text-accent" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">भेजा गया / Sent</p>
            <p className="text-lg font-bold text-accent">₹0</p>
          </div>
        </div>
      </div>

      <section className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-sm font-bold tracking-widest uppercase flex items-center gap-2 text-muted-foreground">
            हाल का बहीखाता / Recent Ledger <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 text-[8px] py-0 px-1 font-bold">LIVE</Badge>
          </h3>
          <Link href="/transactions" className="text-[10px] font-bold text-primary uppercase tracking-wider">सब देखें / View all</Link>
        </div>
        <div className="text-center py-16 glass rounded-3xl border-dashed border-white/10 flex flex-col items-center justify-center space-y-2">
          <p className="text-sm font-bold opacity-40">कोई लेनदेन नहीं मिला / No transactions found</p>
          <p className="text-[10px] text-muted-foreground/60 uppercase tracking-tighter">पहला लेनदेन जोड़ने के लिए '+' बटन दबाएं</p>
        </div>
      </section>
    </div>
  )
}
