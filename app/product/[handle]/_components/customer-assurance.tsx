import { Truck, RotateCcw, Shield } from "lucide-react"

export function CustomerAssurance() {
  return (
    <div className="grid grid-cols-3 gap-4 py-6 border-t border-stone-200 mb-0">
      <div className="text-center space-y-2">
        <Truck className="w-6 h-6 text-stone-600 mx-auto" />
        <h3 className="text-xs font-medium text-stone-800">Free Shipping</h3>
        <p className="text-xs text-stone-600">On orders $200+</p>
      </div>
      <div className="text-center space-y-2">
        <RotateCcw className="w-6 h-6 text-stone-600 mx-auto" />
        <h3 className="text-xs font-medium text-stone-800">Easy Returns</h3>
        <p className="text-xs text-stone-600">30-day policy</p>
      </div>
      <div className="text-center space-y-2">
        <Shield className="w-6 h-6 text-stone-600 mx-auto" />
        <h3 className="text-xs font-medium text-stone-800">Secure Payment</h3>
        <p className="text-xs text-stone-600">Data protected</p>
      </div>
    </div>
  )
}
