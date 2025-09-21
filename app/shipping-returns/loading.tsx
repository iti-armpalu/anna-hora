export default function ShippingReturnsLoading() {
    return (
      <div className="min-h-screen bg-stone-50">
        <div className="animate-pulse">
          {/* Header skeleton */}
          <div className="h-20 bg-stone-200 border-b border-stone-300" />
  
          {/* Hero skeleton */}
          <div className="bg-white border-b border-stone-200 py-16">
            <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
              <div className="h-12 bg-stone-200 rounded mx-auto max-w-md" />
              <div className="h-6 bg-stone-200 rounded mx-auto max-w-lg" />
              <div className="h-4 bg-stone-200 rounded mx-auto max-w-2xl" />
            </div>
          </div>
  
          {/* Content skeleton */}
          <div className="max-w-6xl mx-auto px-4 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white rounded-lg border border-stone-200 p-8">
                    <div className="h-8 bg-stone-200 rounded mb-6 max-w-xs" />
                    <div className="space-y-3">
                      <div className="h-4 bg-stone-200 rounded" />
                      <div className="h-4 bg-stone-200 rounded max-w-3/4" />
                      <div className="h-4 bg-stone-200 rounded max-w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-8">
                {[1, 2].map((i) => (
                  <div key={i} className="bg-white rounded-lg border border-stone-200 p-6">
                    <div className="h-6 bg-stone-200 rounded mb-4 max-w-xs" />
                    <div className="space-y-2">
                      <div className="h-4 bg-stone-200 rounded" />
                      <div className="h-4 bg-stone-200 rounded max-w-2/3" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  