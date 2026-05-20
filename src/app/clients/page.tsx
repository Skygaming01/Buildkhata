
"use client"

import { Search, UserPlus, Phone, MessageSquare, ChevronRight, Star, User } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

export default function Clients() {
  const clients = []

  return (
    <div className="px-6 pt-8 pb-10 space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">ग्राहक / Clients</h1>
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">संपर्क सूची / Contact List</p>
        </div>
        <button className="w-12 h-12 rounded-2xl bg-primary text-primary-foreground amber-glow flex items-center justify-center">
          <UserPlus className="w-6 h-6" />
        </button>
      </header>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input 
          placeholder="खोजें / Search Clients..." 
          className="bg-secondary/30 border-white/5 h-14 pl-12 rounded-2xl font-bold" 
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] px-1 flex items-center gap-2">
          साझेदार / Partnerships
        </h3>
        
        {clients.length === 0 ? (
          <div className="text-center py-24 glass rounded-[40px] space-y-4 border-dashed border-white/5">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto">
              <User className="w-8 h-8 text-muted-foreground opacity-30" />
            </div>
            <div className="space-y-1">
              <p className="font-bold text-sm">कोई ग्राहक नहीं / No Clients Found</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">नए ग्राहक जोड़ने के लिए ऊपर बटन दबाएं</p>
            </div>
          </div>
        ) : (
          clients.map((client: any) => (
            <div key={client.id} className="glass p-5 rounded-3xl space-y-5 group hover:bg-white/5 transition-all">
              <div className="flex justify-between items-start">
                <div className="flex gap-4">
                  <Avatar className="h-14 w-14 border-2 border-primary/20 rounded-2xl">
                    <AvatarImage src={client.avatar} />
                    <AvatarFallback>{client.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-bold text-lg tracking-tight">{client.name}</h4>
                    <p className="text-xs text-muted-foreground font-medium">{client.company}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="w-3 h-3 text-primary fill-primary" />
                      <span className="text-[10px] font-bold text-primary">{client.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1 tracking-widest">दायित्व / Balance</p>
                  <p className={cn(
                    "font-black text-xl tracking-tighter",
                    client.balance > 0 ? "text-primary" : client.balance < 0 ? "text-accent" : "text-muted-foreground"
                  )}>
                    {client.balance === 0 ? "PAID" : `₹${Math.abs(client.balance).toLocaleString()}`}
                  </p>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button className="flex-1 h-12 glass rounded-2xl flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest border-white/5 hover:bg-white/10">
                  <Phone className="w-4 h-4 text-emerald-500" /> Call
                </button>
                <button className="flex-1 h-12 glass rounded-2xl flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest border-white/5 hover:bg-white/10">
                  <MessageSquare className="w-4 h-4 text-primary" /> Text
                </button>
                <button className="w-12 h-12 glass rounded-2xl flex items-center justify-center border-white/5 hover:bg-primary hover:text-primary-foreground transition-colors group">
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
