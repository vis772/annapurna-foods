"use client"

import { useState, useEffect } from "react"
import { ProductList } from "@/components/product-list"
import { ProductForm } from "@/components/product-form"

interface Category {
  id: string
  name: string
}

interface Product {
  id?: string
  name: string
  description: string
  price: number
  category_id: string
  image_url: string
  stock_quantity: number
  unit: string
  is_active: boolean
}

export default function ProductsPage() {
  const [view, setView] = useState<"list" | "form">("list")
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories")
      const { categories } = await response.json()
      setCategories(categories)
    } catch (error) {
      console.error("Error fetching categories:", error)
    }
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setView("form")
  }

  const handleAdd = () => {
    setEditingProduct(null)
    setView("form")
  }

  const handleSubmit = async (productData: Omit<Product, "id">) => {
    try {
      const url = editingProduct ? `/api/products/${editingProduct.id}` : "/api/products"
      const method = editingProduct ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      })

      if (!response.ok) throw new Error("Failed to save product")

      setView("list")
      setEditingProduct(null)
    } catch (error) {
      console.error("Error saving product:", error)
      throw error
    }
  }

  const handleCancel = () => {
    setView("list")
    setEditingProduct(null)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {view === "list" ? (
        <ProductList onEdit={handleEdit} onAdd={handleAdd} />
      ) : (
        <ProductForm
          product={editingProduct || undefined}
          categories={categories}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      )}
    </div>
  )
}
