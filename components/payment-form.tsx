"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Bitcoin, CreditCard } from "lucide-react"

export function PaymentForm() {
  const [paymentMethod, setPaymentMethod] = useState<"card" | "crypto">("card")

  return (
    <div className="grid gap-6">
      <div>
        <h2 className="text-lg font-medium mb-2 text-foreground">ADD FUNDS TO YOUR WALLET</h2>
        <div className="flex gap-2">
          <Button
            variant={paymentMethod === "card" ? "default" : "outline"}
            className="flex-1"
            onClick={() => setPaymentMethod("card")}
          >
            <CreditCard className="mr-2 h-4 w-4" />
            Card
          </Button>
          <Button
            variant={paymentMethod === "crypto" ? "default" : "outline"}
            className="flex-1"
            onClick={() => setPaymentMethod("crypto")}
          >
            <Bitcoin className="mr-2 h-4 w-4" />
            Crypto
          </Button>
        </div>
      </div>

      {paymentMethod === "card" ? (
        <div className="space-y-6">
          <Card className="p-6 bg-card">
            <h3 className="text-lg font-medium mb-4 text-foreground">BILLING DETAILS</h3>
            <p className="text-sm text-muted-foreground mb-4">
              We are fully compliant with Payment Card Industry Data Security Standards.
            </p>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Country</Label>
                  <Input defaultValue="Thailand" />
                </div>
                <div>
                  <Label>State / Province</Label>
                  <Input defaultValue="Uttaradit" />
                </div>
              </div>
              <div>
                <Label>Address</Label>
                <Input />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>City</Label>
                  <Input />
                </div>
                <div>
                  <Label>ZIP / Postal Code</Label>
                  <Input />
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">CARD DETAILS</h3>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Email</Label>
                  <Input />
                </div>
                <div>
                  <Label>Name on card</Label>
                  <Input />
                </div>
              </div>
              <div>
                <Label>Card Number</Label>
                <Input />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Expiration</Label>
                  <Input placeholder="MM / YY" />
                </div>
                <div>
                  <Label>CVC</Label>
                  <Input />
                </div>
              </div>
            </div>
          </Card>

          <div className="flex items-center gap-2">
            <input type="checkbox" id="age-check" className="rounded border-gray-400" />
            <label htmlFor="age-check" className="text-sm">
              Tick here to confirm that you are at least 18 years old and the age of majority in your place of residence
            </label>
          </div>

          <Button className="w-full bg-purple-600 hover:bg-purple-700">Submit</Button>
        </div>
      ) : (
        <Card className="p-6 bg-card">
          <h3 className="text-lg font-medium mb-4 text-foreground">CRYPTO PAYMENT</h3>
          <p className="text-sm text-muted-foreground mb-4">Select your preferred cryptocurrency to make a payment.</p>
          <div className="grid gap-4">
            <Button variant="outline" className="justify-start">
              <Bitcoin className="mr-2 h-4 w-4" />
              Bitcoin (BTC)
            </Button>
            <Button variant="outline" className="justify-start">
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z" />
              </svg>
              Ethereum (ETH)
            </Button>
          </div>
        </Card>
      )}
    </div>
  )
}

