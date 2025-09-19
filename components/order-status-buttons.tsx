"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

interface OrderStatusButtonsProps {
  orderId: string
  currentStatus: string
}

export function OrderStatusButtons({ orderId, currentStatus }: OrderStatusButtonsProps) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const updateOrderStatus = async (newStatus: string) => {
    setLoading(true)
    try {
      const { error } = await supabase.from("orders").update({ status: newStatus }).eq("id", orderId)

      if (error) throw error

      router.refresh()
    } catch (error) {
      console.error("Error updating order status:", error)
      alert("Failed to update order status")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex gap-2">
      {currentStatus === "pending" && (
        <Button size="sm" variant="outline" onClick={() => updateOrderStatus("preparing")} disabled={loading}>
          Start Preparing
        </Button>
      )}

      {currentStatus === "preparing" && (
        <Button size="sm" variant="default" onClick={() => updateOrderStatus("ready")} disabled={loading}>
          Mark as Ready
        </Button>
      )}

      {currentStatus === "ready" && (
        <Button size="sm" variant="default" onClick={() => updateOrderStatus("completed")} disabled={loading}>
          Mark as Completed
        </Button>
      )}

      {currentStatus !== "completed" && currentStatus !== "cancelled" && (
        <Button size="sm" variant="destructive" onClick={() => updateOrderStatus("cancelled")} disabled={loading}>
          Cancel Order
        </Button>
      )}
    </div>
  )
}
