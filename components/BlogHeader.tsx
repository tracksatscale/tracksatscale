import Link from 'next/link'

// TrackScale Logo Component
function TrackScaleLogo({ className = "h-8" }: { className?: string }) {
  return (
    <div className={`flex items-center ${className}`}>
      <span className="text-[#1e3a8a] font-bold text-xl tracking-tight" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        tr
        <span className="inline-flex items-center justify-center w-5 h-5 mx-0.5 rounded-sm bg-gradient-to-r from-orange-500 to-red-500">
          {/* House/Building Icon */}
          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
          </svg>
        </span>
        cksc
        <span className="inline-flex items-center justify-center w-5 h-5 mx-0.5 rounded-sm bg-gradient-to-r from-orange-500 to-red-500">
          {/* Target/Camera Lens Icon */}
          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="4"/>
            <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="1"/>
            <path d="M12 2v4m0 12v4m10-10h-4m-12 0H2" stroke="currentColor" strokeWidth="1" fill="none"/>
          </svg>
        </span>
        le
      </span>
    </div>
  )
}

export function BlogHeader() {

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/60 bg-white/80 backdrop-blur-md dark:border-slate-700/60 dark:bg-slate-900/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center">
            <TrackScaleLogo className="h-8" />
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors"
            >
              Home
            </Link>
            <Link 
              href="/about" 
              className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors"
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors"
            >
              Contact
            </Link>
          </nav>

        </div>
      </div>
    </header>
  )
}
