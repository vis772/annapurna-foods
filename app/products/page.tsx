"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductGrid } from "@/components/product-grid"
import { ProductFilters } from "@/components/product-filters"

function ProductsContent() {
  const searchParams = useSearchParams()
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    category: searchParams.get("category") || "",
    search: searchParams.get("search") || "",
    minPrice: "",
    maxPrice: "",
    sortBy: "name",
  })

  useEffect(() => {
    fetchCategories()
    fetchProducts()
  }, [filters])

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories")
      const { categories } = await response.json()
      setCategories(categories)
    } catch (error) {
      console.error("Error fetching categories:", error)
    }
  }

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (filters.category) params.append("category", filters.category)
      if (filters.search) params.append("search", filters.search)

      const response = await fetch(`/api/products?${params}`)
      const { products } = await response.json()

      let filteredProducts = products

      // Apply price filters
      if (filters.minPrice) {
        filteredProducts = filteredProducts.filter((p: any) => p.price >= Number.parseFloat(filters.minPrice))
      }
      if (filters.maxPrice) {
        filteredProducts = filteredProducts.filter((p: any) => p.price <= Number.parseFloat(filters.maxPrice))
      }

      // Apply sorting
      filteredProducts.sort((a: any, b: any) => {
        switch (filters.sortBy) {
          case "price-low":
            return a.price - b.price
          case "price-high":
            return b.price - a.price
          case "name":
          default:
            return a.name.localeCompare(b.name)
        }
      })

      setProducts(filteredProducts)
    } catch (error) {
      console.error("Error fetching products:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {filters.search ? `Search results for "${filters.search}"` : "All Products"}
          </h1>
          <p className="text-gray-600">Discover our wide selection of authentic Indian groceries</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <ProductFilters categories={categories} filters={filters} onFiltersChange={setFilters} />
          </div>
          <div className="lg:col-span-3">
            <ProductGrid products={products} loading={loading} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductsContent />
    </Suspense>
  )
}
