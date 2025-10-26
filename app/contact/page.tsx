'use client'

import { useState } from 'react'
import { BlogHeader } from '@/components/BlogHeader'
import { BlogFooter } from '@/components/BlogFooter'
import { Mail, Phone, MapPin, Send } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <BlogHeader />
      
      <main className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 sm:p-12">
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-8 text-center">
                Contact Us
              </h1>
              
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 text-center">
                Have a question, suggestion, or want to collaborate? We'd love to hear from you!
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Contact Information */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-6">
                    Get in Touch
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4">
                      <div className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded-lg">
                        <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900 dark:text-slate-100">Email</h3>
                        <p className="text-slate-600 dark:text-slate-400">hello@trackscale.com</p>
                        <p className="text-sm text-slate-500 dark:text-slate-500">We'll respond within 24 hours</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-green-100 dark:bg-green-900/20 p-3 rounded-lg">
                        <Phone className="h-6 w-6 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900 dark:text-slate-100">Phone</h3>
                        <p className="text-slate-600 dark:text-slate-400">+1 (555) 123-4567</p>
                        <p className="text-sm text-slate-500 dark:text-slate-500">Mon-Fri 9AM-6PM EST</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-purple-100 dark:bg-purple-900/20 p-3 rounded-lg">
                        <MapPin className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900 dark:text-slate-100">Office</h3>
                        <p className="text-slate-600 dark:text-slate-400">
                          123 Tech Street<br />
                          San Francisco, CA 94105
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-700 p-6 rounded-lg">
                    <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
                      Social Media
                    </h3>
                    <div className="flex space-x-4">
                      <a href="#" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                        Twitter
                      </a>
                      <a href="#" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                        LinkedIn
                      </a>
                      <a href="#" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                        GitHub
                      </a>
                    </div>
                  </div>
                </div>

                {/* Contact Form */}
                <div>
                  <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-6">
                    Send us a Message
                  </h2>
                  
                  {isSubmitted ? (
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">
                        Message Sent!
                      </h3>
                      <p className="text-green-700 dark:text-green-300">
                        Thank you for your message. We'll get back to you as soon as possible.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                          Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                          placeholder="Your name"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                          placeholder="your.email@example.com"
                        />
                      </div>

                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                          Subject *
                        </label>
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                          placeholder="What's this about?"
                        />
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                          Message *
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={5}
                          className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                          placeholder="Tell us more about your inquiry..."
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4 mr-2" />
                            Send Message
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <BlogFooter />
    </div>
  )
}



