import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, Calendar, Clock, MapPin, Phone } from "lucide-react"
import Link from "next/link"

export default async function OrderConfirmationPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  // Get user
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    redirect("/auth/login")
  }

  // Get order details
  const { data: order, error } = await supabase
    .from("orders")
    .select(`
      *,
      order_items (
        *,
        products (
          name,
          image_url,
          unit
        )
      )
    `)
    .eq("id", id)
    .eq("user_id", user.id)
    .single()

  if (error || !order) {
    redirect("/")
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatTimeSlot = (slot: string) => {
    const slots: Record<string, string> = {
      morning: "9:00 AM - 12:00 PM",
      afternoon: "12:00 PM - 5:00 PM",
      evening: "5:00 PM - 8:00 PM",
    }
    return slots[slot] || slot
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
            <p className="text-gray-600">Thank you for your order. We'll have your groceries ready for pickup.</p>
          </div>

          {/* Order Details */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-sm text-gray-500">Order Number</p>
                    <p className="font-semibold">#{order.id.slice(0, 8).toUpperCase()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Order Date</p>
                    <p className="font-semibold">{formatDate(order.created_at)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Amount</p>
                    <p className="font-semibold">${order.total_amount.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <p className="font-semibold capitalize">{order.status}</p>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="space-y-3">
                  <h3 className="font-semibold">Items Ordered</h3>
                  {order.order_items.map((item: any) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{item.products.name}</p>
                        <p className="text-sm text-gray-500">
                          Quantity: {item.quantity} {item.products.unit} × ${item.unit_price}
                        </p>
                      </div>
                      <p className="font-semibold">${item.total_price.toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Pickup Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Pickup Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-orange-600" />
                    <div>
                      <p className="font-semibold">Pickup Date</p>
                      <p className="text-gray-600">{formatDate(order.pickup_date)}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-orange-600" />
                    <div>
                      <p className="font-semibold">Pickup Time</p>
                      <p className="text-gray-600">{formatTimeSlot(order.pickup_time_slot)}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-orange-600 mt-0.5" />
                    <div>
                      <p className="font-semibold">Pickup Location</p>
                      <p className="text-gray-600">
                        Annapurna Foods
                        <br />
                        123 Spice Street
                        <br />
                        Little India, NY 10001
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-orange-600" />
                    <div>
                      <p className="font-semibold">Store Phone</p>
                      <p className="text-gray-600">(555) 123-4567</p>
                    </div>
                  </div>
                </div>

                {order.notes && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <p className="font-semibold mb-2">Special Instructions</p>
                    <p className="text-gray-600">{order.notes}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card>
              <CardHeader>
                <CardTitle>What's Next?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-orange-600 font-semibold text-xs">1</span>
                    </div>
                    <p>We'll prepare your order and send you a confirmation when it's ready for pickup.</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-orange-600 font-semibold text-xs">2</span>
                    </div>
                    <p>Arrive at the store during your selected time slot.</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-orange-600 font-semibold text-xs">3</span>
                    </div>
                    <p>Show your order confirmation and we'll have your groceries ready!</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <Button variant="outline" className="w-full sm:w-auto bg-transparent">
                  Continue Shopping
                </Button>
              </Link>
              <Link href="/profile">
                <Button className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700">View Order History</Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
