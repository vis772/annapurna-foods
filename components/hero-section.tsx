import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-amber-50 to-orange-50 py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight text-balance">
                Fresh Indian Groceries
                <span className="text-primary"> Delivered</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed text-pretty">
                Authentic spices, fresh produce, and traditional ingredients from the heart of India. Order online and
                pick up at your convenience.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/products">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg">
                  Shop Now
                </Button>
              </Link>
              <Link href="/categories">
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 py-3 text-lg border-primary text-primary hover:bg-primary/10 bg-transparent"
                >
                  Browse Categories
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">3000+</div>
                <div className="text-sm text-muted-foreground">Products</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">Fresh</div>
                <div className="text-sm text-muted-foreground">Daily</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">Same Day</div>
                <div className="text-sm text-muted-foreground">Pickup</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10">
              <Image
                src="/colorful-indian-spices-and-fresh-vegetables-in-a-t.jpg"
                alt="Fresh Indian groceries and spices"
                width={500}
                height={600}
                className="rounded-2xl shadow-2xl"
                priority
              />
            </div>
            <div className="absolute -top-4 -right-4 w-full h-full bg-primary/20 rounded-2xl -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
