import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin, Phone, Calendar, Info, CheckCircle } from "lucide-react"

export default function PickupPage() {
  const timeSlots = [
    {
      id: "morning",
      name: "Morning",
      time: "9:00 AM - 12:00 PM",
      description: "Perfect for early birds who want to start their day with fresh groceries",
      availability: "high",
    },
    {
      id: "afternoon",
      name: "Afternoon",
      time: "12:00 PM - 5:00 PM",
      description: "Great for lunch breaks or afternoon shopping",
      availability: "medium",
    },
    {
      id: "evening",
      name: "Evening",
      time: "5:00 PM - 8:00 PM",
      description: "Convenient for after-work pickup",
      availability: "low",
    },
  ]

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "high":
        return "bg-green-100 text-green-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getAvailabilityText = (availability: string) => {
    switch (availability) {
      case "high":
        return "High Availability"
      case "medium":
        return "Medium Availability"
      case "low":
        return "Limited Availability"
      default:
        return "Check Availability"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 text-balance">Pickup Information</h1>
          <p className="text-xl text-gray-600 text-pretty max-w-2xl mx-auto">
            Convenient pickup service for your fresh Indian groceries. Schedule your pickup time and collect your order
            at our store.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Store Information */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-orange-600" />
                  Store Location
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg">Annapurna Foods</h3>
                  <p className="text-gray-600">
                    123 Spice Street
                    <br />
                    Little India, NY 10001
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-orange-600" />
                  <span className="text-gray-600">(555) 123-4567</span>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg">
                  <p className="text-sm text-orange-800">
                    <strong>Free Pickup:</strong> No additional charges for pickup orders. Just place your order online
                    and collect at your convenience.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-orange-600" />
                  Store Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span className="font-medium">9:00 AM - 8:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="font-medium">9:00 AM - 9:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="font-medium">10:00 AM - 7:00 PM</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Pickup Time Slots */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-orange-600" />
                  Available Pickup Time Slots
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {timeSlots.map((slot) => (
                    <div key={slot.id} className="border rounded-lg p-4 hover:border-orange-300 transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{slot.name}</h3>
                          <p className="text-orange-600 font-medium">{slot.time}</p>
                        </div>
                        <Badge className={getAvailabilityColor(slot.availability)}>
                          {getAvailabilityText(slot.availability)}
                        </Badge>
                      </div>
                      <p className="text-gray-600 text-sm">{slot.description}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-blue-800">
                      <p className="font-semibold mb-1">Pickup Guidelines:</p>
                      <ul className="space-y-1 list-disc list-inside">
                        <li>Orders must be placed at least 2 hours before pickup time</li>
                        <li>Please bring a valid ID and your order confirmation</li>
                        <li>Pickup slots are available up to 7 days in advance</li>
                        <li>Contact us if you need to reschedule your pickup</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* How It Works */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>How Pickup Works</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-orange-600 font-bold text-sm">1</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Place Your Order</h3>
                      <p className="text-gray-600 text-sm">
                        Browse our products, add items to your cart, and proceed to checkout. Select your preferred
                        pickup date and time slot.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-orange-600 font-bold text-sm">2</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">We Prepare Your Order</h3>
                      <p className="text-gray-600 text-sm">
                        Our team carefully selects and packs your groceries. We'll send you a confirmation when your
                        order is ready for pickup.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-orange-600 font-bold text-sm">3</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Collect Your Groceries</h3>
                      <p className="text-gray-600 text-sm">
                        Arrive during your selected time slot, show your order confirmation, and we'll have your fresh
                        groceries ready to go!
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Why Choose Pickup?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Always Fresh</h3>
                <p className="text-gray-600 text-sm">
                  We hand-pick the freshest produce and ingredients for your order, ensuring quality every time.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Save Time</h3>
                <p className="text-gray-600 text-sm">
                  Skip the shopping trip. Order online and pick up your groceries in minutes, not hours.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Convenient Location</h3>
                <p className="text-gray-600 text-sm">
                  Located in the heart of Little India with easy parking and quick pickup service.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
