'use client'

import { useEffect, useState } from 'react'
import { Article } from '@/lib/supabase'
import { BlogHeader } from '@/components/BlogHeader'
import { BlogFooter } from '@/components/BlogFooter'
import { Calendar, Clock, User } from 'lucide-react'

export default function PreviewPage() {
  const [article, setArticle] = useState<Article | null>(null)

  useEffect(() => {
    const previewData = sessionStorage.getItem('previewArticle')
    if (previewData) {
      setArticle(JSON.parse(previewData))
    }
  }, [])

  if (!article) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            No Preview Available
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            This preview page is only accessible from the article editor.
          </p>
        </div>
      </div>
    )
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
    const wordCount = content.split(' ').length
    return Math.ceil(wordCount / wordsPerMinute)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <BlogHeader />
      
      <main className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="mb-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <p className="text-sm text-yellow-800 dark:text-yellow-300">
                <strong>Preview Mode:</strong> This is how your article will look when published.
              </p>
            </div>

            <article className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden">
              {article.featured_image && (
                <div className="aspect-[16/9]">
                  <img
                    src={article.featured_image}
                    alt={article.title}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
              
              <div className="p-8 sm:p-12">
                <header className="mb-8">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mb-6">
                    {article.title}
                  </h1>
                  
                  <div className="flex flex-wrap items-center gap-6 text-sm text-slate-600 dark:text-slate-400 mb-6">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {formatDate(article.created_at)}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {getReadingTime(article.content)} min read
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Author
                    </div>
                  </div>

                  {article.tags && article.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {article.tags.map((tag) => (
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

                <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-slate-900 dark:prose-headings:text-slate-100 prose-p:text-slate-700 dark:prose-p:text-slate-300 prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-strong:text-slate-900 dark:prose-strong:text-slate-100 prose-code:text-slate-900 dark:prose-code:text-slate-100 prose-pre:bg-slate-100 dark:prose-pre:bg-slate-800 prose-blockquote:border-slate-300 dark:prose-blockquote:border-slate-600 prose-blockquote:text-slate-700 dark:prose-blockquote:text-slate-300">
                  <div dangerouslySetInnerHTML={{ __html: article.content }} />
                </div>
              </div>
            </article>
          </div>
        </div>
      </main>
      
      <BlogFooter />
    </div>
  )
}



