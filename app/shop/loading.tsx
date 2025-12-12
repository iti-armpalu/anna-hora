export default function Loading() {
  return (
    <div className="min-h-screen px-4 py-12">
      <div className="animate-pulse space-y-6">
        <div className="h-8 w-48 bg-neutral-200" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-64 bg-neutral-200" />
          ))}
        </div>
      </div>
    </div>
  );
}
