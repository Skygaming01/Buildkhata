
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, ListOrdered, Users, Receipt } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { icon: Home, label: "मुख्य (Home)", href: "/" },
  { icon: ListOrdered, label: "खाता (Ledger)", href: "/transactions" },
  { icon: Receipt, label: "स्कैन (Scan)", href: "/receipts" },
  { icon: Users, label: "ग्राहक (Clients)", href: "/clients" },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-6 pt-2 pointer-events-none">
      <div className="max-w-md mx-auto pointer-events-auto">
        <div className="glass-dark rounded-3xl p-2 flex items-center justify-around shadow-2xl relative overflow-hidden">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative flex flex-col items-center justify-center p-3 rounded-2xl transition-all duration-300",
                  isActive ? "text-primary scale-110" : "text-muted-foreground hover:text-foreground"
                )}
                title={item.label}
              >
                <Icon className={cn("w-6 h-6", isActive && "amber-glow")} />
                {isActive && (
                  <span className="absolute -bottom-1 w-1 h-1 bg-primary rounded-full animate-pulse" />
                )}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
