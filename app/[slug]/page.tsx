import { notFound } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { Calendar, Clock, User } from 'lucide-react'

interface ArticlePageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  // Check if Supabase is configured
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL === 'https://placeholder.supabase.co') {
    return []
  }

  try {
    const { data: articles } = await supabase
      .from('articles')
      .select('slug')
      .eq('status', 'published')

    return articles?.map((article: any) => ({
      slug: article.slug,
    })) || []
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const { slug } = await params
  
  // Check if Supabase is configured
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL === 'https://placeholder.supabase.co') {
    return {
      title: 'Article Not Found',
    }
  }

  try {
    const { data: article } = await supabase
      .from('articles')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single()

    if (!article) {
      return {
        title: 'Article Not Found',
      }
    }

    // Clean HTML tags from content for description
    const cleanContent = article.content.replace(/<[^>]*>/g, '').substring(0, 160)
    const description = article.excerpt || cleanContent

    return {
      title: article.title,
      description: description,
      keywords: article.tags?.join(', ') || '',
      openGraph: {
        title: article.title,
        description: description,
        type: 'article',
        publishedTime: article.published_at,
        authors: ['TrackScale'],
        tags: article.tags || [],
      },
      twitter: {
        card: 'summary_large_image',
        title: article.title,
        description: description,
      },
      alternates: {
        canonical: `/${article.slug}`,
      },
    }
  } catch (error) {
    return {
      title: 'Article Not Found',
    }
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params
  
  // Check if Supabase is configured
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL === 'https://placeholder.supabase.co') {
    notFound()
  }

  try {
    const { data: article } = await supabase
      .from('articles')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single()

    if (!article) {
      notFound()
    }

    const formatDate = (dateString: string) => {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }

    const getReadingTime = (content: string) => {
      const wordsPerMinute = 200
      // Remove HTML tags and get actual text content
      const textContent = content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
      const wordCount = textContent.split(' ').filter(word => word.length > 0).length
      const readingTime = Math.ceil(wordCount / wordsPerMinute)
      // Cap at reasonable maximum
      return Math.min(readingTime, 30)
    }

    // Generate structured data for SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": article.title,
      "description": article.excerpt || article.content.replace(/<[^>]*>/g, '').substring(0, 160),
      "image": article.featured_image || undefined,
      "author": {
        "@type": "Person",
        "name": article.user_profiles?.full_name || "TrackScale Author"
      },
      "publisher": {
        "@type": "Organization",
        "name": "TrackScale Blog",
        "logo": {
          "@type": "ImageObject",
          "url": "/logo.png"
        }
      },
      "datePublished": article.published_at || article.created_at,
      "dateModified": article.updated_at,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `/${article.slug}`
      },
      "keywords": article.tags?.join(', ') || '',
      "articleSection": article.tags?.[0] || 'General',
      "wordCount": article.content.split(' ').length
    }

    return (
      <div className="min-h-screen bg-white dark:bg-slate-900">
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        
        {/* Remove hash from URL */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (window.location.hash) {
                window.history.replaceState(null, null, window.location.pathname);
              }
            `
          }}
        />
        
        {/* Simple Header */}
        <header className="sticky top-0 z-50 w-full border-b border-slate-200/60 bg-white/95 backdrop-blur-md dark:border-slate-700/60 dark:bg-slate-900/95">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <Link href="/" className="flex items-center">
                <div className="flex items-center">
                  <span className="text-[#1e3a8a] font-bold text-xl tracking-tight" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                    tr
                    <span className="inline-flex items-center justify-center w-5 h-5 mx-0.5 rounded-sm bg-gradient-to-r from-orange-500 to-red-500">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                      </svg>
                    </span>
                    cksc
                    <span className="inline-flex items-center justify-center w-5 h-5 mx-0.5 rounded-sm bg-gradient-to-r from-orange-500 to-red-500">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="4"/>
                        <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="1"/>
                        <path d="M12 2v4m0 12v4m10-10h-4m-12 0H2" stroke="currentColor" strokeWidth="1" fill="none"/>
                      </svg>
                    </span>
                    le
                  </span>
                </div>
              </Link>
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors px-4 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Home
              </Link>
            </div>
          </div>
        </header>
        
        <main className="py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <article className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
              <div className="p-8 sm:p-12">
                <header className="mb-8">
                  <h1 
                    className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-slate-900 dark:text-slate-100 leading-tight"
                    dangerouslySetInnerHTML={{ __html: article.title }}
                  />
                  
                  {/* Excerpt */}
                  {article.excerpt && (
                    <div className="mb-6">
                      <p 
                        className="text-lg leading-relaxed text-slate-600 dark:text-slate-400"
                        dangerouslySetInnerHTML={{ __html: article.excerpt }}
                      />
                    </div>
                  )}
                  
                  <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 dark:text-slate-400 mb-6">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {formatDate(article.published_at || article.created_at)}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {getReadingTime(article.content)} min read
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      TrackScale Blog
                    </div>
                  </div>

                  {/* Tags */}
                  {article.tags && article.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-8">
                      {article.tags.map((tag: string) => (
                        <span
                          key={tag}
                          className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/20 dark:text-blue-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </header>

                <div className="prose prose-lg max-w-none dark:prose-invert 
                  prose-headings:text-slate-900 dark:prose-headings:text-slate-100 
                  prose-p:text-slate-700 dark:prose-p:text-slate-300 
                  prose-a:text-blue-600 dark:prose-a:text-blue-400 
                  prose-strong:text-slate-900 dark:prose-strong:text-slate-100 
                  prose-code:text-slate-900 dark:prose-code:text-slate-100 
                  prose-pre:bg-slate-100 dark:prose-pre:bg-slate-800 
                  prose-blockquote:border-slate-300 dark:prose-blockquote:border-slate-600 
                  prose-blockquote:text-slate-700 dark:prose-blockquote:text-slate-300 
                  prose-img:rounded-lg prose-img:shadow-md 
                  [&_h1]:text-slate-900 dark:[&_h1]:text-slate-100 
                  [&_h2]:text-slate-900 dark:[&_h2]:text-slate-100 
                  [&_h3]:text-slate-900 dark:[&_h3]:text-slate-100 
                  [&_h4]:text-slate-900 dark:[&_h4]:text-slate-100 
                  [&_h5]:text-slate-900 dark:[&_h5]:text-slate-100 
                  [&_h6]:text-slate-900 dark:[&_h6]:text-slate-100
                  [&_h2]:border-b [&_h2]:border-slate-200 [&_h2]:pb-2 [&_h2]:mb-4
                  dark:[&_h2]:border-slate-700
                  [&_h3]:mt-8 [&_h3]:mb-4
                  [&_p]:mb-4 [&_p]:leading-relaxed
                  [&_ul]:mb-4 [&_ol]:mb-4
                  [&_li]:mb-2
                  [&_blockquote]:my-6 [&_blockquote]:pl-4 [&_blockquote]:border-l-4
                  [&_table]:my-6 [&_table]:w-full [&_table]:border-collapse
                  [&_th]:bg-slate-50 [&_th]:dark:bg-slate-800 [&_th]:font-semibold
                  [&_td]:border [&_td]:border-slate-200 [&_td]:dark:border-slate-700
                  [&_pre]:my-6 [&_pre]:overflow-x-auto
                  [&_code]:bg-slate-100 [&_code]:dark:bg-slate-800 [&_code]:px-2 [&_code]:py-1 [&_code]:rounded">
                  <div dangerouslySetInnerHTML={{ __html: article.content }} />
                </div>
              </div>
            </article>
          </div>
        </main>
      </div>
    )
  } catch (error) {
    notFound()
  }
}
