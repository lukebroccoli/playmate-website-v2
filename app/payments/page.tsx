import { Button } from "@/components/ui/button"
import { PaymentForm } from "@/components/payment-form"

export default function PaymentsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-xl font-semibold text-foreground">PAYMENTS</h1>
          <Button
            variant="ghost"
            className="text-purple-400 hover:text-purple-500 dark:text-purple-400 dark:hover:text-purple-300"
          >
            VERIFY
          </Button>
        </div>
      </div>
      <div className="max-w-4xl mx-auto p-6">
        <PaymentForm />
      </div>
    </div>
  )
}

