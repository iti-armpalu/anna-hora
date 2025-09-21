export default function SizeGuideLoading() {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="text-center mb-16">
            <div className="h-12 bg-stone-200 rounded-lg mb-6 animate-pulse"></div>
            <div className="h-6 bg-stone-200 rounded-lg mb-4 max-w-2xl mx-auto animate-pulse"></div>
            <div className="h-4 bg-stone-200 rounded-lg max-w-xl mx-auto animate-pulse"></div>
          </div>
  
          <div className="space-y-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border border-stone-200 rounded-lg p-6">
                <div className="h-8 bg-stone-200 rounded-lg mb-4 max-w-xs animate-pulse"></div>
                <div className="h-32 bg-stone-200 rounded-lg animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
  