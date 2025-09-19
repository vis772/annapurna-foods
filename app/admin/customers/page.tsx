import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Phone } from "lucide-react"
import Link from "next/link"

export default async function AdminCustomers() {
  const supabase = await createClient()

  const { data: customers } = await supabase
    .from("profiles")
    .select(`
      *,
      orders(count)
    `)
    .eq("is_admin", false)
    .order("created_at", { ascending: false })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6 flex items-center gap-4">
            <Link href="/admin">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Customer Management</h1>
              <p className="text-gray-600 mt-2">View and manage customer accounts</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {customers?.map((customer) => (
            <Card key={customer.id}>
              <CardHeader>
                <CardTitle className="text-lg">
                  {customer.first_name && customer.last_name
                    ? `${customer.first_name} ${customer.last_name}`
                    : "Customer"}
                </CardTitle>
                <CardDescription>Member since {new Date(customer.created_at).toLocaleDateString()}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {customer.phone && (
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span>{customer.phone}</span>
                    </div>
                  )}

                  <div className="pt-2">
                    <Badge variant="secondary">{customer.orders?.[0]?.count || 0} orders</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {(!customers || customers.length === 0) && (
            <div className="col-span-full">
              <Card>
                <CardContent className="text-center py-12">
                  <p className="text-gray-500">No customers found</p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
