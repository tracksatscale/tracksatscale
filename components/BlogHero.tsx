export function BlogHero() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-32">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-6xl">
            Welcome to{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              TrackScale
            </span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-400 sm:text-xl">
            Discover insights, tutorials, and stories about technology, development, and innovation. 
            Join our community of developers and tech enthusiasts.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="#articles"
              className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors"
            >
              Read Articles
            </a>
            <a
              href="/about"
              className="text-sm font-semibold leading-6 text-slate-900 dark:text-slate-100 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
            >
              Learn more <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

