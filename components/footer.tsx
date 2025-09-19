import Link from "next/link"
import { Facebook, Instagram, Twitter, Phone, Mail, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-100">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">A</span>
              </div>
              <span className="text-xl font-bold">Annapurna Foods</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Your trusted source for authentic Indian groceries, spices, and fresh produce. Bringing the flavors of
              India to your kitchen.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-slate-400 hover:text-white cursor-pointer" />
              <Instagram className="h-5 w-5 text-slate-400 hover:text-white cursor-pointer" />
              <Twitter className="h-5 w-5 text-slate-400 hover:text-white cursor-pointer" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products" className="text-slate-400 hover:text-white">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-slate-400 hover:text-white">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-400 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-400 hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/help" className="text-slate-400 hover:text-white">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/pickup" className="text-slate-400 hover:text-white">
                  Pickup Information
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-slate-400 hover:text-white">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-slate-400 hover:text-white">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-slate-400">(555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-slate-400">info@annapurnafoods.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-primary mt-0.5" />
                <span className="text-slate-400">
                  123 Spice Street
                  <br />
                  Little India, NY 10001
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 text-center">
          <p className="text-slate-400 text-sm">© 2024 Annapurna Foods. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
