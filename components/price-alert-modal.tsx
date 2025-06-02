"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Bell } from "lucide-react"
import Image from "next/image"

interface PriceAlertModalProps {
  isOpen: boolean
  onClose: () => void
  product: {
    id: number
    name: string
    price: number
    image: string
  }
}

export function PriceAlertModal({ isOpen, onClose, product }: PriceAlertModalProps) {
  const [alertPrice, setAlertPrice] = useState("")

  const handleSave = () => {
    // Handle saving price alert
    console.log(`Setting price alert for ${product.name} at $${alertPrice}`)
    onClose()
  }

  const handleRemove = () => {
    // Handle removing price alert
    console.log(`Removing price alert for ${product.name}`)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#27253D] border-[#7C3AED]/20 text-[#F4F4F5] max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Bell className="w-5 h-5 text-[#A78BFA]" />
            <span>Price Alert</span>
          </DialogTitle>
          <DialogDescription className="text-[#9CA3AF]">
            Get notified when the price drops below your target
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Product Info */}
          <div className="flex items-center space-x-3 p-3 bg-[#1C1B29]/50 rounded-lg">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              width={60}
              height={60}
              className="rounded-lg object-cover"
            />
            <div className="flex-1">
              <h4 className="font-medium text-[#F4F4F5] text-sm leading-tight">{product.name}</h4>
              <p className="text-[#9CA3AF] text-sm">Current price: ${product.price}</p>
            </div>
          </div>

          {/* Price Input */}
          <div className="space-y-2">
            <Label htmlFor="alert-price" className="text-[#F4F4F5]">
              Alert me when price is under:
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#9CA3AF]">$</span>
              <Input
                id="alert-price"
                type="number"
                placeholder="0.00"
                value={alertPrice}
                onChange={(e) => setAlertPrice(e.target.value)}
                className="pl-8 bg-[#1C1B29]/50 border-[#7C3AED]/30 text-[#F4F4F5] placeholder:text-[#9CA3AF] focus:border-[#7C3AED]"
              />
            </div>
          </div>
        </div>

        <DialogFooter className="flex space-x-2">
          <Button
            variant="outline"
            onClick={handleRemove}
            className="border-red-500/30 text-red-400 hover:bg-red-500/10"
          >
            Remove Alert
          </Button>
          <Button
            onClick={handleSave}
            disabled={!alertPrice || Number.parseFloat(alertPrice) >= product.price}
            className="bg-gradient-to-r from-[#7C3AED] to-[#A78BFA] hover:from-[#6D28D9] hover:to-[#8B5CF6] text-white"
          >
            Save Alert
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
