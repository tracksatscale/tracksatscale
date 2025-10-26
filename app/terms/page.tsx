import { BlogHeader } from '@/components/BlogHeader'
import { BlogFooter } from '@/components/BlogFooter'

export const metadata = {
  title: 'Terms of Service - TrackScale Blog',
  description: 'Terms of Service for TrackScale Blog. Read our terms and conditions for using our website and services.',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <BlogHeader />
      
      <main className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <article className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 sm:p-12">
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-8">
                Terms of Service
              </h1>
              
              <div className="prose prose-lg max-w-none dark:prose-invert">
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  <strong>Last updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>

                <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mt-8 mb-4">Acceptance of Terms</h2>
                <p className="mb-4">
                  By accessing and using TrackScale Blog, you accept and agree to be bound by the 
                  terms and provision of this agreement. If you do not agree to abide by the above, 
                  please do not use this service.
                </p>

                <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mt-8 mb-4">Use License</h2>
                <p className="mb-4">
                  Permission is granted to temporarily download one copy of the materials on TrackScale Blog 
                  for personal, non-commercial transitory viewing only. This is the grant of a license, 
                  not a transfer of title, and under this license you may not:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Modify or copy the materials</li>
                  <li>Use the materials for any commercial purpose or for any public display</li>
                  <li>Attempt to reverse engineer any software contained on the website</li>
                  <li>Remove any copyright or other proprietary notations from the materials</li>
                </ul>

                <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mt-8 mb-4">Content Guidelines</h2>
                <p className="mb-4">
                  Users are prohibited from posting content that:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Is illegal, harmful, threatening, abusive, or defamatory</li>
                  <li>Violates any intellectual property rights</li>
                  <li>Contains spam or unsolicited commercial content</li>
                  <li>Is pornographic or sexually explicit</li>
                  <li>Promotes violence or hatred</li>
                </ul>

                <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mt-8 mb-4">User Accounts</h2>
                <p className="mb-4">
                  When you create an account with us, you must provide information that is accurate, 
                  complete, and current at all times. You are responsible for safeguarding the password 
                  and for all activities that occur under your account.
                </p>

                <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mt-8 mb-4">Intellectual Property</h2>
                <p className="mb-4">
                  The content on TrackScale Blog, including but not limited to text, graphics, logos, 
                  images, and software, is the property of TrackScale and is protected by copyright 
                  and other intellectual property laws.
                </p>

                <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mt-8 mb-4">Advertising and Monetization</h2>
                <p className="mb-4">
                  This website may display advertisements through Google AdSense and other advertising 
                  networks. By using this website, you acknowledge that:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Advertisements may be displayed on the website</li>
                  <li>We may receive compensation for displaying advertisements</li>
                  <li>Advertisements are not endorsements by TrackScale</li>
                  <li>You interact with advertisements at your own risk</li>
                </ul>

                <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mt-8 mb-4">Disclaimer</h2>
                <p className="mb-4">
                  The information on this website is provided on an "as is" basis. To the fullest extent 
                  permitted by law, TrackScale excludes all representations, warranties, conditions 
                  and terms relating to our website and the use of this website.
                </p>

                <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mt-8 mb-4">Limitation of Liability</h2>
                <p className="mb-4">
                  In no event shall TrackScale, nor its directors, employees, partners, agents, suppliers, 
                  or affiliates, be liable for any indirect, incidental, special, consequential, or punitive 
                  damages, including without limitation, loss of profits, data, use, goodwill, or other 
                  intangible losses.
                </p>

                <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mt-8 mb-4">Governing Law</h2>
                <p className="mb-4">
                  These Terms shall be interpreted and governed by the laws of the United States, 
                  without regard to its conflict of law provisions.
                </p>

                <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mt-8 mb-4">Changes to Terms</h2>
                <p className="mb-4">
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any 
                  time. If a revision is material, we will try to provide at least 30 days notice prior 
                  to any new terms taking effect.
                </p>

                <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mt-8 mb-4">Contact Information</h2>
                <p className="mb-4">
                  If you have any questions about these Terms of Service, please contact us at:
                </p>
                <p className="mb-4">
                  Email: legal@trackscale.com<br />
                  Address: TrackScale Blog, Legal Department
                </p>
              </div>
            </article>
          </div>
        </div>
      </main>
      
      <BlogFooter />
    </div>
  )
}



