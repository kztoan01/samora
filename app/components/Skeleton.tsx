export default function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-gray-200 rounded-lg ${className}`} />
  );
}

export function CategorySkeleton() {
  return (
    <div className="min-h-screen w-full max-w-8xl mx-auto p-2 sm:p-4 space-y-2 sm:space-y-3 bg-white">
      {/* Moving banner skeleton */}
      <div className="bg-zinc-100 p-4 md:p-6 rounded-xl overflow-hidden relative">
        <Skeleton className="h-8 w-1/3 mx-auto" />
      </div>

      {/* Main Content Container skeleton */}
      <div className="relative rounded-xl overflow-hidden">
        <div className="max-w-8xl mx-auto relative overflow-hidden">
          {/* Layout grid */}
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-3 sm:gap-4">
            {/* Left Side - full width on mobile */}
            <div className="relative rounded-lg overflow-hidden h-[50vh] lg:h-[calc(100vh-140px)]">
              <Skeleton className="h-full w-full" />
              <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 z-20 max-w-md">
                <div className="bg-green-700/30 p-3 sm:p-6 rounded-2xl">
                  <Skeleton className="h-6 w-32 mb-2" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
            </div>

            {/* Right Side - full width on mobile */}
            <div className="flex flex-col h-auto gap-3 sm:gap-4">
              {/* Top Section */}
              <div className="flex flex-col sm:grid sm:grid-cols-3 gap-3 sm:gap-4">
                {/* Top Left Image */}
                <div className="w-full sm:col-span-2 relative rounded-lg overflow-hidden shadow-lg h-[30vh] sm:h-[25vh] lg:h-[calc((100vh-140px)/2-8px)]">
                  <Skeleton className="h-full w-full" />
                </div>

                {/* Top Right Card */}
                <div className="w-full sm:col-span-1 bg-green-700/30 p-3 sm:p-4 md:p-6 rounded-lg flex flex-col h-auto sm:h-[25vh] lg:h-[calc((100vh-140px)/2-8px)]">
                  <Skeleton className="h-6 w-32 mb-2" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <div className="mt-auto">
                    <Skeleton className="h-4 w-20" />
                  </div>
                </div>
              </div>

              {/* Bottom Section */}
              <div className="flex flex-col-reverse sm:grid sm:grid-cols-3 gap-3 sm:gap-4">
                {/* Bottom Left Card */}
                <div className="w-full sm:col-span-1 bg-green-700/30 p-3 sm:p-4 md:p-6 rounded-lg flex flex-col h-auto sm:h-[25vh] lg:h-[calc((100vh-140px)/2-8px)]">
                  <Skeleton className="h-6 w-32 mb-2" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <div className="mt-auto">
                    <Skeleton className="h-4 w-20" />
                  </div>
                </div>

                {/* Bottom Right Image */}
                <div className="w-full sm:col-span-2 relative rounded-lg overflow-hidden shadow-lg h-[30vh] sm:h-[25vh] lg:h-[calc((100vh-140px)/2-8px)]">
                  <Skeleton className="h-full w-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AboutSkeleton() {
  return (
    <div className="w-full max-w-8xl mx-auto p-4 space-y-4">
      <Skeleton className="h-12 w-1/4" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Skeleton className="h-64 w-full" />
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
        </div>
      </div>
    </div>
  );
}

export function ContactSkeleton() {
  return (
    <div className="w-full max-w-8xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
        <Skeleton className="h-64 w-full" />
      </div>
    </div>
  );
}

function ProductCardSkeleton() {
  return (
    <div className="flex-shrink-0 transition-opacity duration-300 md:p-2 p-1 relative">
      <div className="absolute z-10">
        {/* Top right square box */}
        <div className="absolute -right-4">
          <div className="w-4 h-4 relative bg-white/0">
            <div
              className="absolute top-0 right-0 w-4 h-4 bg-white"
              style={{
                clipPath: 'path("M16 0C7.16344 0 0 8.83656 0 16L0 0L16 0Z")'
              }}
            />
          </div>
        </div>

        <nav className="bg-white rounded-br-3xl">
          <ul className="flex">
            <li>
              <div className="block px-4 py-2 text-[0.60rem] md:text-sm">
                <Skeleton className="h-4 w-16" />
              </div>
            </li>
          </ul>
        </nav>
        {/* Bottom square box */}
        <div className="w-4 h-4 relative bg-white/0">
          <div
            className="absolute top-0 right-0 w-4 h-4 bg-white"
            style={{
              clipPath: 'path("M16 0C7.16344 0 0 8.83656 0 16L0 0L16 0Z")'
            }}
          />
        </div>
      </div>
      <div className="bg-white rounded-xl overflow-hidden transition-opacity duration-300 relative group">
        <div className="absolute inset-0 bg-gradient-to-t from-green-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <div className="w-full h-[15rem] sm:h-[20rem] md:h-[25rem] lg:h-[30rem] xl:h-[35rem] bg-gray-200 animate-pulse" />

        {/* New white box in bottom right */}
        <div className="absolute bottom-0 right-0 bg-white p-2 rounded-tl-3xl">
          <div className="absolute -left-4 bottom-0">
            <div className="w-4 h-4 relative bg-white/0">
              <div
                className="absolute top-0 left-0 w-4 h-4 bg-white"
                style={{
                  clipPath: 'path("M0 16C8.83656 16 16 7.16344 16 0L16 16L0 16Z")'
                }}
              />
            </div>
          </div>
          <div className="text-[0.60rem] md:text-sm flex flex-col">
            <Skeleton className="h-4 w-20 mb-1" />
            {/* <Skeleton className="h-[2px] w-16 mt-0.5" /> Minimal line under product name */}
          </div>
          <div className="absolute md:bottom-9 bottom-7 right-0">
            <div className="w-4 h-4 relative bg-white/0">
              <div
                className="absolute bottom-0 left-0 w-4 h-4 bg-white"
                style={{
                  clipPath: 'path("M0 16C8.83656 16 16 7.16344 16 0L16 16L0 16Z")'
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductListSkeleton({ count = 8 }) {
  return (
    <div className="max-w-8xl mx-auto mt-4 relative overflow-hidden">
      {/* Leaf decorations */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-10">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-16 h-16 md:w-24 md:h-24 transition-all duration-1000 ease-in-out"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 360}deg) scale(${0.5 + Math.random() * 0.5})`,
              opacity: 0.5,
              zIndex: Math.floor(Math.random() * 100) % 2 === 0 ? 10 : 0,
            }}
          >
            <div className="w-full h-full rounded-full bg-green-100 animate-pulse" />
          </div>
        ))}
      </div>

      {/* Background effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-green-50/30 to-green-100/20 pointer-events-none"></div>

      {/* Cards container */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-0 md:gap-0 relative z-20">
        {Array.from({ length: count }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

export function ProductsSkeleton() {
  return (
    <div className="h-full w-full max-w-8xl mx-auto p-2 space-y-3 bg-white">
      {/* Moving banner skeleton */}
      <Skeleton className="h-16 w-full rounded-xl" />
      {/* Our Favorite banner skeleton */}
      <Skeleton className="h-12 w-full rounded-xl" />
      {/* Product grid skeleton */}
      <ProductListSkeleton count={8} />
      {/* View all products button skeleton */}
      <div className="mt-8 text-center">
        <Skeleton className="h-10 w-48 mx-auto rounded-md" />
      </div>
    </div>
  );
}

export function ShopSkeleton() {
  return (
    <div className="h-full w-full max-w-8xl mx-auto p-1 md:p-4 mt-1 bg-white">
     
      
      <div className="bg-green-100 animate-pulse rounded-xl h-[16rem] mb-4" />
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i}>
            <Skeleton className="h-10 w-full rounded-full" />
          </div>
        ))}
      </div>
      
      <div className="relative rounded-xl overflow-hidden">
        <ProductListSkeleton count={8} />
      </div>
    </div>
  );
}

export function ProductDetailSkeleton({ showVolume = true }: { showVolume?: boolean } = {}) {
  return (
    <>
      
      <div className="flex flex-col md:flex-row h-screen">
        <div className="md:w-3/5 h-1/2 md:h-screen md:sticky md:top-0">
          <div className="h-full flex items-center justify-center relative md:p-3 p-2 rounded-xl">
            
            <div className="relative h-full w-full overflow-hidden">
              <Skeleton className="h-full w-full rounded-[2.5rem]" />
            </div>
            
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 p-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-16 w-16 border-2 border-gray-200 rounded-md overflow-hidden">
                  <Skeleton className="h-full w-full" />
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="w-full md:w-2/5 md:py-3 px-2 md:px-3 md:pr-3 overflow-y-auto">
          <div className="bg-zinc-100 p-4 md:p-12 rounded-xl overflow-hidden relative">
            <div className="mb-6 md:mb-12">
              <div className="flex items-center">
                <div className="w-3 h-3 mr-1 bg-gray-300 animate-pulse rounded-full"></div>
                <Skeleton className="h-4 w-40" />
              </div>
            </div>
            
            <Skeleton className="h-10 w-full rounded-lg mb-6" />
            
            <div className="mt-4 md:mt-6 flex flex-wrap items-center">
              <Skeleton className="h-8 w-32 rounded-lg" />
              <div className="ml-2 md:ml-4">
                <Skeleton className="h-6 w-20 rounded-md bg-green-100" />
              </div>
            </div>
            
            <div className="mt-4 md:mt-6">
              <Skeleton className="h-4 w-full rounded-lg mb-2" />
              <Skeleton className="h-4 w-5/6 rounded-lg mb-2" />
              <Skeleton className="h-4 w-full rounded-lg mb-2" />
              <Skeleton className="h-4 w-4/5 rounded-lg" />
            </div>
            
            {showVolume && (
              <div className="mt-8 lg:mt-10">
                <Skeleton className="h-5 w-40 rounded-lg mb-4" />
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="px-4 py-2 border border-gray-300 rounded-md">
                      <div className="flex flex-col items-center">
                        <Skeleton className="h-4 w-16 mb-1" />
                        <Skeleton className="h-3 w-12" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="mt-8 lg:mt-10 flex flex-col lg:flex-row items-start lg:items-center gap-4">
              <div className="flex items-center">
                <Skeleton className="h-5 w-20 mr-3" />
                <div className="flex items-center border border-gray-300 rounded-md">
                  <div className="px-3 py-2 border-r border-gray-300">
                    <Skeleton className="h-5 w-3" />
                  </div>
                  <div className="px-4 py-2 min-w-[40px] text-center">
                    <Skeleton className="h-5 w-5 mx-auto" />
                  </div>
                  <div className="px-3 py-2 border-l border-gray-300">
                    <Skeleton className="h-5 w-3" />
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-auto lg:ml-8">
                <Skeleton className="h-12 w-full lg:w-48 rounded-md bg-green-300" />
              </div>
            </div>
          </div>
          
          <div className="bg-green-600 p-3 mt-4 rounded-xl overflow-hidden relative">
            <div className="h-6 bg-green-400 animate-pulse rounded-lg w-full opacity-50" />
          </div>
          
          <div className="mt-4 space-y-2">
            {["Công Dụng", "Thành Phần", "Hướng Dẫn Sử Dụng", "Cách Bảo Quản"].map((title, i) => (
              <div key={i} className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="p-4 bg-gray-50 flex justify-between items-center">
                  <Skeleton className="h-5 w-32" />
                  <div className="w-5 h-5 rounded-full bg-gray-200 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
        <div className="mt-8">
        <Skeleton className="h-20 w-full" />
      </div>
    </>
  );
}

export function IntroSkeleton() {
  return (
    <div className="h-full w-full max-w-8xl mx-auto p-4 space-y-3 bg-white">
      {/* Title banner */}
      <Skeleton className="h-14 w-full rounded-xl" />
      
      {/* First section */}
      <div className="rounded-xl overflow-hidden">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Image */}
          <div className="md:w-7/12 relative rounded-xl">
            <Skeleton className="h-[28rem] md:h-[40rem] rounded-lg" />
          </div>
          
          {/* Text content */}
          <div className="md:w-5/12 rounded-xl">
            <Skeleton className="h-[28rem] md:h-[40rem] rounded-lg" />
          </div>
        </div>
      </div>
      
      {/* Second section */}
      <div className="rounded-xl overflow-hidden">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Text content */}
          <div className="md:w-5/12 rounded-xl">
            <Skeleton className="h-[28rem] md:h-[40rem] rounded-lg" />
          </div>
          
          {/* Image */}
          <div className="md:w-7/12 relative rounded-xl">
            <Skeleton className="h-[28rem] md:h-[40rem] rounded-lg" />
          </div>
        </div>
      </div>
      
      {/* Title banner for products */}
      <Skeleton className="h-14 w-full rounded-xl" />
      
      {/* Product list */}
      <div className="relative rounded-xl overflow-hidden">
        <ProductListSkeleton count={8} />
      </div>
    </div>
  );
} 

export function RuouLaSamSkeleton() {
    return (
    <div className="h-full w-full max-w-8xl mx-auto p-2 space-y-3 bg-white">
      <ProductListSkeleton count={8} />
      <div className="mt-8 text-center">
        <Skeleton className="h-10 w-48 mx-auto rounded-md" />
      </div>
    </div>
  );
}

export function RuouHoaSamSkeleton() {
    return (
        <div className="h-full w-full max-w-8xl mx-auto p-2 space-y-3 bg-white">
      <ProductListSkeleton count={8} />
      <div className="mt-8 text-center">
        <Skeleton className="h-10 w-48 mx-auto rounded-md" />
      </div>
    </div>
    )
}
