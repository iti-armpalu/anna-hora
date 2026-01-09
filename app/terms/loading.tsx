export default function TermsLoading() {
    return (
      <div className="min-h-screen bg-background">
        {/* Hero Section Skeleton */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-stone-200 rounded-full mb-6 animate-pulse" />
              </div>
              <div className="h-12 bg-stone-200 rounded-lg mb-6 animate-pulse" />
              <div className="h-6 bg-stone-200 rounded-lg mb-8 max-w-2xl mx-auto animate-pulse" />
              <div className="h-4 bg-stone-200 rounded-lg max-w-xs mx-auto animate-pulse" />
            </div>
          </div>
        </section>
  
        {/* Content Skeleton */}
        <section className="pb-16 lg:pb-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-8">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="bg-card rounded-lg p-8 border border-border">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-8 h-8 bg-stone-200 rounded-full animate-pulse" />
                    <div className="h-8 bg-stone-200 rounded-lg flex-1 animate-pulse" />
                  </div>
                  <div className="space-y-4">
                    <div className="h-4 bg-stone-200 rounded-lg animate-pulse" />
                    <div className="h-4 bg-stone-200 rounded-lg animate-pulse" />
                    <div className="h-4 bg-stone-200 rounded-lg w-3/4 animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    )
  }
  