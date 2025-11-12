export default function Loading() {
    return (
      <div className="min-h-screen bg-stone-50 py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <div className="h-12 bg-stone-200 rounded animate-pulse mb-6 max-w-md mx-auto"></div>
            <div className="h-6 bg-stone-200 rounded animate-pulse max-w-2xl mx-auto"></div>
          </div>
  
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="bg-white border border-stone-200 rounded-lg p-8">
                <div className="h-8 bg-stone-200 rounded animate-pulse mb-6 max-w-xs"></div>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="h-10 bg-stone-200 rounded animate-pulse"></div>
                    <div className="h-10 bg-stone-200 rounded animate-pulse"></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="h-10 bg-stone-200 rounded animate-pulse"></div>
                    <div className="h-10 bg-stone-200 rounded animate-pulse"></div>
                  </div>
                  <div className="h-32 bg-stone-200 rounded animate-pulse"></div>
                  <div className="h-12 bg-stone-200 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
  
            <div className="space-y-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white border border-stone-200 rounded-lg p-6">
                  <div className="h-6 bg-stone-200 rounded animate-pulse mb-4 max-w-xs"></div>
                  <div className="space-y-3">
                    <div className="h-4 bg-stone-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-stone-200 rounded animate-pulse max-w-3/4"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
  