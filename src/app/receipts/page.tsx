
"use client"

import { useState, useRef } from "react"
import { Camera, Loader2, Receipt, CheckCircle2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { intelligentReceiptProcessor, type IntelligentReceiptProcessorOutput } from "@/ai/flows/intelligent-receipt-processor-flow"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export default function ReceiptScanner() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState<IntelligentReceiptProcessorOutput | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsProcessing(true)
    setResult(null)

    const reader = new FileReader()
    reader.onloadend = () => setPreviewUrl(reader.result as string)
    reader.readAsDataURL(file)

    try {
      const base64 = await new Promise<string>((resolve) => {
        const r = new FileReader()
        r.onloadend = () => resolve(r.result as string)
        r.readAsDataURL(file)
      })

      const response = await intelligentReceiptProcessor({ photoDataUri: base64 })
      setResult(response)
      toast({
        title: "रसीद संसाधित / Processed",
        description: `सफलतापूर्वक ${response.vendorName} निकाला गया`,
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "स्कैनिंग विफल / Failed",
        description: "रसीद नहीं पढ़ी जा सकी। कृपया साफ़ फोटो लें।",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="px-6 pt-8 pb-10 space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-500">
      <header className="space-y-1">
        <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 font-bold mb-2">स्मार्ट एजेंट / AI Agent</Badge>
        <h1 className="text-3xl font-extrabold tracking-tight">AI रसीद स्कैनर / Receipt Scanner</h1>
        <p className="text-muted-foreground">रसीदों से विवरण तुरंत निकालें।</p>
      </header>

      {!previewUrl && (
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="h-80 glass border-dashed border-2 border-primary/20 rounded-3xl flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-white/5 transition-all group"
        >
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center amber-glow group-hover:scale-110 transition-transform">
            <Camera className="w-10 h-10 text-primary" />
          </div>
          <div className="text-center">
            <p className="font-bold text-lg">फोटो लें / Capture Photo</p>
            <p className="text-sm text-muted-foreground">या गैलरी से अपलोड करें</p>
          </div>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/*" 
            className="hidden" 
          />
        </div>
      )}

      {previewUrl && (
        <div className="space-y-6">
          <Card className="glass overflow-hidden rounded-3xl border-white/5 relative">
            <img src={previewUrl} className="w-full h-48 object-cover opacity-50 blur-[2px]" alt="Receipt preview" />
            <div className="absolute inset-0 flex items-center justify-center">
              {isProcessing ? (
                <div className="flex flex-col items-center gap-3">
                  <Loader2 className="w-10 h-10 text-primary animate-spin" />
                  <p className="font-bold tracking-widest text-primary animate-pulse">विश्लेषण / ANALYZING...</p>
                </div>
              ) : (
                <CheckCircle2 className="w-12 h-12 text-emerald-500" />
              )}
            </div>
          </Card>

          {result && (
            <div className="space-y-4 animate-in slide-in-from-bottom-5 duration-500">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Receipt className="w-5 h-5 text-primary" /> निकाला गया डेटा / Extracted Data
              </h3>
              <div className="grid gap-3">
                {[
                  { label: "विक्रेता / Vendor", value: result.vendorName },
                  { label: "कुल राशि / Total Amount", value: `₹ ${result.totalAmount.toLocaleString()}`, highlight: true },
                  { label: "तारीख / Date", value: result.transactionDate },
                  { label: "श्रेणी / Category", value: result.category },
                ].map((row, i) => (
                  <div key={i} className="glass p-4 rounded-2xl flex justify-between items-center">
                    <span className="text-sm text-muted-foreground font-medium uppercase tracking-wider">{row.label}</span>
                    <span className={cn("font-bold", row.highlight && "text-primary text-lg")}>{row.value}</span>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 pt-4 pb-12">
                <Button 
                  className="flex-1 h-14 rounded-2xl bg-primary text-primary-foreground font-bold amber-glow"
                  onClick={() => {
                    toast({ title: "सहेजा गया / Saved", description: "खर्च बहीखाते में जोड़ दिया गया है।" })
                    setPreviewUrl(null)
                    setResult(null)
                  }}
                >
                  पुष्टि करें / Confirm & Save
                </Button>
                <Button 
                  variant="outline" 
                  className="h-14 w-14 rounded-2xl glass border-white/10"
                  onClick={() => {
                    setPreviewUrl(null)
                    setResult(null)
                  }}
                >
                  <AlertCircle className="w-6 h-6" />
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
