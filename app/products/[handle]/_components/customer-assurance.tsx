const items = [
  { title: "Easy Returns", description: "14-day policy" },
  { title: "Crafted Locally", description: "Thoughtfully designed pieces, made in Czechia" },
  { title: "Premium Materials", description: "Carefully selected fabrics made to last" },
]

export function CustomerAssurance() {
  return (
    <div className="grid grid-cols-3 gap-4 py-6 border-y border-stone-200">
      {items.map((item) => (
        <div key={item.title} className="text-center space-y-2">
          <p className="text-xs font-medium text-stone-800">{item.title}</p>
          <p className="text-xs text-stone-500">{item.description}</p>
        </div>
      ))}
    </div>
  )
}
