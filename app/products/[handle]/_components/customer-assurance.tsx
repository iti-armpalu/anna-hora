import { Truck, RotateCcw, Shield } from "lucide-react"

export function CustomerAssurance() {

  return (
    <div className="grid grid-cols-3 gap-4 py-6 border-y border-stone-200 mb-0">
      <div className="text-center space-y-2">
        <h3 className="text-xs font-medium text-stone-800">Easy Returns</h3>
        <p className="text-xs text-stone-600">14-day policy</p>
      </div>
      <div className="text-center space-y-2">
        <h3 className="text-xs font-medium text-stone-800">Crafted Locally</h3>
        <p className="text-xs text-stone-600">Thoughtfully designed pieces, made in Czechia</p>
      </div>
      <div className="text-center space-y-2">
        <h3 className="text-xs font-medium text-stone-800">Premium Materials</h3>
        <p className="text-xs text-stone-600">Carefully selected fabrics made to last</p>
      </div>
    </div>
  )
}
