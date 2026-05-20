
"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function QuickAdd() {
  const [open, setOpen] = useState(false)
  const [type, setType] = useState<"received" | "sent">("received")

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button 
          className="fixed bottom-24 right-6 w-14 h-14 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-2xl amber-glow z-50 flex items-center justify-center group"
          aria-label="Add Transaction"
        >
          <Plus className="w-8 h-8 group-hover:rotate-90 transition-transform duration-300" />
        </button>
      </DialogTrigger>
      <DialogContent className="glass border-white/10 max-w-sm rounded-3xl p-6">
        <DialogHeader className="text-left">
          <DialogTitle className="text-xl font-extrabold tracking-tight">
            <span className="text-primary block">नया लेनदेन / New Transaction</span>
            <span className="text-[10px] uppercase text-muted-foreground tracking-[0.2em] font-black">ब्यौरा दर्ज करें / Enter Details</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 pt-2">
          <Tabs defaultValue="received" className="w-full" onValueChange={(v) => setType(v as any)}>
            <TabsList className="grid w-full grid-cols-2 bg-secondary/50 rounded-2xl h-12 p-1">
              <TabsTrigger 
                value="received" 
                className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider"
              >
                प्राप्त / Received
              </TabsTrigger>
              <TabsTrigger 
                value="sent" 
                className="rounded-xl data-[state=active]:bg-accent data-[state=active]:text-accent-foreground flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider"
              >
                भेजा / Sent
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="space-y-5">
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest ml-1">राशि / Amount (₹)</Label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-black text-primary">₹</span>
                <input 
                  type="number" 
                  placeholder="0.00" 
                  className="w-full bg-secondary/30 border-white/5 h-16 pl-10 text-3xl font-black rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 text-foreground" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest ml-1">नाम या प्रोजेक्ट / Name or Project</Label>
              <input 
                placeholder="नाम लिखें / Enter name..." 
                className="w-full bg-secondary/30 border-white/5 h-14 px-4 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 text-sm font-bold" 
              />
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest ml-1">श्रेणी / Category</Label>
              <Select>
                <SelectTrigger className="bg-secondary/30 border-white/5 h-14 rounded-2xl text-sm font-bold">
                  <SelectValue placeholder="श्रेणी चुनें / Category" />
                </SelectTrigger>
                <SelectContent className="glass-dark border-white/10 rounded-2xl">
                  <SelectItem value="materials" className="font-bold">सामग्री / Materials</SelectItem>
                  <SelectItem value="labor" className="font-bold">मजदूरी / Labor</SelectItem>
                  <SelectItem value="consulting" className="font-bold">परामर्श / Consulting</SelectItem>
                  <SelectItem value="interior" className="font-bold">इंटीरियर / Interior</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            className="w-full h-16 rounded-2xl bg-primary text-primary-foreground font-black text-sm uppercase tracking-[0.1em] amber-glow mt-4"
            onClick={() => setOpen(false)}
          >
            सहेजें / Save Transaction
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
