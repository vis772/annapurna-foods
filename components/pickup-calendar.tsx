"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react"

interface PickupSlot {
  date: string
  timeSlot: string
  ordersCount: number
  maxCapacity: number
}

export function PickupCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [pickupSlots, setPickupSlots] = useState<PickupSlot[]>([])
  const [selectedDate, setSelectedDate] = useState<string>("")

  useEffect(() => {
    generatePickupSlots()
  }, [currentDate])

  const generatePickupSlots = () => {
    const slots: PickupSlot[] = []
    const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
    const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)

    for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
      const dateString = date.toISOString().split("T")[0]

      // Skip past dates
      if (date < new Date()) continue

      // Generate slots for each time period
      const timeSlots = ["morning", "afternoon", "evening"]
      timeSlots.forEach((timeSlot) => {
        slots.push({
          date: dateString,
          timeSlot,
          ordersCount: Math.floor(Math.random() * 15), // Mock data
          maxCapacity: 20,
        })
      })
    }

    setPickupSlots(slots)
  }

  const navigateMonth = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate)
    if (direction === "prev") {
      newDate.setMonth(currentDate.getMonth() - 1)
    } else {
      newDate.setMonth(currentDate.getMonth() + 1)
    }
    setCurrentDate(newDate)
  }

  const getAvailabilityForDate = (dateString: string) => {
    const daySlots = pickupSlots.filter((slot) => slot.date === dateString)
    const totalOrders = daySlots.reduce((sum, slot) => sum + slot.ordersCount, 0)
    const totalCapacity = daySlots.reduce((sum, slot) => sum + slot.maxCapacity, 0)
    const availabilityRatio = totalOrders / totalCapacity

    if (availabilityRatio < 0.5) return { level: "high", color: "bg-green-100 text-green-800" }
    if (availabilityRatio < 0.8) return { level: "medium", color: "bg-yellow-100 text-yellow-800" }
    return { level: "low", color: "bg-red-100 text-red-800" }
  }

  const getDaysInMonth = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }

    return days
  }

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Pickup Availability
          </span>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={() => navigateMonth("prev")}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium min-w-32 text-center">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </span>
            <Button variant="outline" size="sm" onClick={() => navigateMonth("next")}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-2 mb-4">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="text-center text-sm font-medium text-gray-500 p-2">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {getDaysInMonth().map((date, index) => {
            if (!date) {
              return <div key={index} className="p-2"></div>
            }

            const dateString = date.toISOString().split("T")[0]
            const isPast = date < new Date()
            const availability = getAvailabilityForDate(dateString)

            return (
              <div
                key={dateString}
                className={`
                  p-2 text-center text-sm border rounded cursor-pointer transition-colors
                  ${isPast ? "text-gray-400 bg-gray-50 cursor-not-allowed" : "hover:border-orange-300"}
                  ${selectedDate === dateString ? "border-orange-500 bg-orange-50" : "border-gray-200"}
                `}
                onClick={() => !isPast && setSelectedDate(dateString)}
              >
                <div className="font-medium">{date.getDate()}</div>
                {!isPast && (
                  <Badge className={`text-xs mt-1 ${availability.color}`} variant="secondary">
                    {availability.level}
                  </Badge>
                )}
              </div>
            )
          })}
        </div>

        {selectedDate && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-3">Available slots for {new Date(selectedDate).toLocaleDateString()}</h3>
            <div className="space-y-2">
              {pickupSlots
                .filter((slot) => slot.date === selectedDate)
                .map((slot) => {
                  const availability = (slot.maxCapacity - slot.ordersCount) / slot.maxCapacity
                  const timeSlotNames: Record<string, string> = {
                    morning: "Morning (9:00 AM - 12:00 PM)",
                    afternoon: "Afternoon (12:00 PM - 5:00 PM)",
                    evening: "Evening (5:00 PM - 8:00 PM)",
                  }

                  return (
                    <div key={`${slot.date}-${slot.timeSlot}`} className="flex justify-between items-center">
                      <span className="text-sm">{timeSlotNames[slot.timeSlot]}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">
                          {slot.maxCapacity - slot.ordersCount} slots available
                        </span>
                        <Badge
                          className={
                            availability > 0.5
                              ? "bg-green-100 text-green-800"
                              : availability > 0.2
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }
                          variant="secondary"
                        >
                          {availability > 0.5 ? "Available" : availability > 0.2 ? "Limited" : "Full"}
                        </Badge>
                      </div>
                    </div>
                  )
                })}
            </div>
          </div>
        )}

        <div className="mt-4 flex items-center justify-center space-x-4 text-xs text-gray-500">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-green-100 rounded"></div>
            <span>High availability</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-yellow-100 rounded"></div>
            <span>Medium availability</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-red-100 rounded"></div>
            <span>Low availability</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
