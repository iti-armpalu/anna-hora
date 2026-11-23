/** List with thin dash markers — the brand's quiet alternative to bullets or icons. */
export function DashList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-tight">
      {items.map((item) => (
        <li key={item} className="flex items-baseline gap-3 text-small text-foreground">
          {/* translate keeps the 1px dash on the text's x-height rather than its baseline */}
          <span className="h-px w-4 shrink-0 -translate-y-1 bg-foreground" aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  )
}
