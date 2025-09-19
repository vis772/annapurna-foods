"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Package, Calendar, Clock, MapPin, Edit, LogOut } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface Order {
  id: string
  total_amount: number
  status: string
  pickup_date: string
  pickup_time_slot: string
  created_at: string
  order_items: Array<{
    quantity: number
    unit_price: number
    total_price: number
    products: {
      name: string
      unit: string
    }
  }>
}

interface Profile {
  id: string
  first_name: string
  last_name: string
  phone: string
}

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
  })

  useEffect(() => {
    const supabase = createClient()

    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        router.push("/auth/login")
        return
      }
      setUser(user)
      fetchProfile(user.id)
      fetchOrders(user.id)
    })
  }, [router])

  const fetchProfile = async (userId: string) => {
    try {
      const supabase = createClient()
      const { data: profile } = await supabase.from("profiles").select("*").eq("id", userId).single()

      if (profile) {
        setProfile(profile)
        setFormData({
          firstName: profile.first_name || "",
          lastName: profile.last_name || "",
          phone: profile.phone || "",
        })
      }
    } catch (error) {
      console.error("Error fetching profile:", error)
    }
  }

  const fetchOrders = async (userId: string) => {
    try {
      const supabase = createClient()
      const { data: orders } = await supabase
        .from("orders")
        .select(`
          *,
          order_items (
            quantity,
            unit_price,
            total_price,
            products (
              name,
              unit
            )
          )
        `)
        .eq("user_id", userId)
        .order("created_at", { ascending: false })

      setOrders(orders || [])
    } catch (error) {
      console.error("Error fetching orders:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    try {
      const supabase = createClient()
      const { error } = await supabase.from("profiles").upsert({
        id: user.id,
        first_name: formData.firstName,
        last_name: formData.lastName,
        phone: formData.phone,
      })

      if (error) throw error

      setProfile({
        id: user.id,
        first_name: formData.firstName,
        last_name: formData.lastName,
        phone: formData.phone,
      })
      setEditMode(false)
      alert("Profile updated successfully!")
    } catch (error) {
      console.error("Error updating profile:", error)
      alert("Failed to update profile")
    }
  }

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/")
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "confirmed":
        return "bg-blue-100 text-blue-800"
      case "ready":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-gray-100 text-gray-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">Loading...</div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Account</h1>
              <p className="text-gray-600">Manage your profile and view your order history</p>
            </div>
            <Button variant="outline" onClick={handleSignOut} className="bg-transparent">
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="orders">Order History</TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center">
                      <User className="h-5 w-5 mr-2" />
                      Profile Information
                    </CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditMode(!editMode)}
                      className="bg-transparent"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      {editMode ? "Cancel" : "Edit"}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {editMode ? (
                    <form onSubmit={handleUpdateProfile} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">First Name</Label>
                          <Input
                            id="firstName"
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                            id="lastName"
                            value={formData.lastName}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" value={user?.email || ""} disabled />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          required
                        />
                      </div>
                      <div className="flex gap-4">
                        <Button type="submit" className="bg-orange-600 hover:bg-orange-700">
                          Save Changes
                        </Button>
                        <Button type="button" variant="outline" onClick={() => setEditMode(false)}>
                          Cancel
                        </Button>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm text-gray-500">First Name</Label>
                          <p className="font-medium">{profile?.first_name || "Not provided"}</p>
                        </div>
                        <div>
                          <Label className="text-sm text-gray-500">Last Name</Label>
                          <p className="font-medium">{profile?.last_name || "Not provided"}</p>
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm text-gray-500">Email</Label>
                        <p className="font-medium">{user?.email}</p>
                      </div>
                      <div>
                        <Label className="text-sm text-gray-500">Phone Number</Label>
                        <p className="font-medium">{profile?.phone || "Not provided"}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Package className="h-5 w-5 mr-2" />
                    Order History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {orders.length === 0 ? (
                    <div className="text-center py-8">
                      <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No orders yet</h3>
                      <p className="text-gray-600 mb-4">Start shopping to see your orders here</p>
                      <Button onClick={() => router.push("/products")} className="bg-orange-600 hover:bg-orange-700">
                        Start Shopping
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <Card key={order.id} className="border">
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <h3 className="font-semibold text-lg">Order #{order.id.slice(0, 8).toUpperCase()}</h3>
                                <p className="text-sm text-gray-500">Placed on {formatDate(order.created_at)}</p>
                              </div>
                              <Badge className={getStatusColor(order.status)}>{order.status.toUpperCase()}</Badge>
                            </div>

                            <div className="grid md:grid-cols-3 gap-4 mb-4">
                              <div className="flex items-center space-x-2">
                                <Calendar className="h-4 w-4 text-orange-600" />
                                <div>
                                  <p className="text-sm text-gray-500">Pickup Date</p>
                                  <p className="font-medium">{formatDate(order.pickup_date)}</p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Clock className="h-4 w-4 text-orange-600" />
                                <div>
                                  <p className="text-sm text-gray-500">Pickup Time</p>
                                  <p className="font-medium">{formatTimeSlot(order.pickup_time_slot)}</p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <MapPin className="h-4 w-4 text-orange-600" />
                                <div>
                                  <p className="text-sm text-gray-500">Total Amount</p>
                                  <p className="font-medium">${order.total_amount.toFixed(2)}</p>
                                </div>
                              </div>
                            </div>

                            <Separator className="my-4" />

                            <div>
                              <h4 className="font-medium mb-2">Items ({order.order_items.length})</h4>
                              <div className="space-y-1">
                                {order.order_items.slice(0, 3).map((item, index) => (
                                  <div key={index} className="flex justify-between text-sm">
                                    <span>
                                      {item.products.name} × {item.quantity} {item.products.unit}
                                    </span>
                                    <span>${item.total_price.toFixed(2)}</span>
                                  </div>
                                ))}
                                {order.order_items.length > 3 && (
                                  <p className="text-sm text-gray-500">+{order.order_items.length - 3} more items</p>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  )
}
