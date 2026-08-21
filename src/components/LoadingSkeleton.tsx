function LoadingSkeleton() {
    return (
      <div className="overflow-hidden rounded-2xl border border-black/5 bg-white">
        <div className="aspect-square animate-pulse bg-gray-200" />
  
        <div className="space-y-3 p-4">
          <div className="h-3 w-20 animate-pulse rounded bg-gray-200" />
  
          <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
  
          <div className="h-3 w-24 animate-pulse rounded bg-gray-200" />
  
          <div className="h-5 w-20 animate-pulse rounded bg-gray-200" />
  
          <div className="h-10 w-full animate-pulse rounded-xl bg-gray-200" />
        </div>
      </div>
    );
  }
  
  export default LoadingSkeleton;