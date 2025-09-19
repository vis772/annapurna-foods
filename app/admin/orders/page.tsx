import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { OrderStatusButtons } from "@/components/order-status-buttons"

export default async function AdminOrders() {
  const supabase = await createClient()

  // Fetch all orders with customer details
  const { data: orders } = await supabase
    .from("orders")
    .select(`
      *,
      profiles(first_name, last_name),
      order_items(
        quantity,
        unit_price,
        products(name, image_url)
      )
    `)
    .order("created_at", { ascending: false })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "preparing":
        return "bg-blue-100 text-blue-800"
      case "ready":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Order Received"
      case "preparing":
        return "Being Prepared"
      case "ready":
        return "Ready for Pickup"
      case "completed":
        return "Completed"
      default:
        return status
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6 flex items-center gap-4">
            <Link href="/admin">
              <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
              <p className="text-gray-600 mt-2">View and manage customer orders</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {orders?.map((order) => (
            <Card key={order.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Order #{order.id.slice(-8)}</CardTitle>
                    <CardDescription>
                      {order.profiles ? `${order.profiles.first_name} ${order.profiles.last_name}` : "Customer"}
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">${order.total_amount.toFixed(2)}</p>
                    <Badge className={getStatusColor(order.status)}>{getStatusText(order.status)}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">Order Details</h4>
                    <div className="space-y-1 text-sm">
                      <p>
                        <span className="text-gray-600">Order Date:</span>{" "}
                        {new Date(order.created_at).toLocaleDateString()}
                      </p>
                      <p>
                        <span className="text-gray-600">Pickup Date:</span>{" "}
                        {new Date(order.pickup_date).toLocaleDateString()}
                      </p>
                      <p>
                        <span className="text-gray-600">Pickup Time:</span> {order.pickup_time_slot}
                      </p>
                      {order.notes && (
                        <p>
                          <span className="text-gray-600">Notes:</span> {order.notes}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Items Ordered</h4>
                    <div className="space-y-2">
                      {order.order_items?.map((item, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <img
                            src={item.products?.image_url || "/placeholder.svg?height=32&width=32"}
                            alt={item.products?.name || "Product"}
                            className="w-8 h-8 rounded object-cover"
                          />
                          <div className="flex-1 flex justify-between text-sm">
                            <span>
                              {item.products?.name} x{item.quantity}
                            </span>
                            <span className="font-medium">${(item.unit_price * item.quantity).toFixed(2)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t">
                  <OrderStatusButtons orderId={order.id} currentStatus={order.status} />
                </div>
              </CardContent>
            </Card>
          ))}

          {(!orders || orders.length === 0) && (
            <Card>
              <CardContent className="text-center py-12">
                <p className="text-gray-500">No orders found</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
