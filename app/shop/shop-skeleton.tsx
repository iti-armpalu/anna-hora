export default function ShopSkeleton() {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-64 bg-neutral-200 animate-pulse" />
        ))}
      </div>
    );
  }