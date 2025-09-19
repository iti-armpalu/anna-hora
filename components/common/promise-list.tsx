interface PromiseListProps {
    items: string[]
  }
  
  export function PromiseList({ items }: PromiseListProps) {
    return (
      <ul className="space-y-2 text-stone-600">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start">
            <span className="w-2 h-2 bg-stone-400 rounded-full mt-2 mr-3 flex-shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    )
  }
  