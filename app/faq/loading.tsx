export default function FAQLoading() {
    return (
      <div className="min-h-screen bg-stone-50">
        {/* Header Skeleton */}
        <div className="bg-white border-b border-stone-200">
          <div className="max-w-4xl mx-auto px-4 py-16 text-center">
            <div className="h-12 bg-stone-200 rounded-lg mx-auto mb-6 max-w-md animate-pulse" />
            <div className="h-6 bg-stone-200 rounded-lg mx-auto mb-2 max-w-2xl animate-pulse" />
            <div className="h-6 bg-stone-200 rounded-lg mx-auto max-w-xl animate-pulse" />
          </div>
        </div>
  
        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Search Bar Skeleton */}
          <div className="h-14 bg-white border border-stone-200 rounded-lg mb-12 animate-pulse" />
  
          {/* FAQ Categories Skeleton */}
          <div className="space-y-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm border border-stone-200">
                <div className="p-6 border-b border-stone-100">
                  <div className="h-8 bg-stone-200 rounded-lg max-w-xs animate-pulse" />
                </div>
  
                <div className="divide-y divide-stone-100">
                  {[1, 2, 3].map((j) => (
                    <div key={j} className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="h-6 bg-stone-200 rounded-lg flex-1 mr-4 animate-pulse" />
                        <div className="w-5 h-5 bg-stone-200 rounded animate-pulse" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
  