'use client'

export default function DebugEnvPage() {
  const envVars = {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Set' : 'Not Set',
    NEXT_PUBLIC_ADMIN_EMAIL: process.env.NEXT_PUBLIC_ADMIN_EMAIL,
    NEXT_PUBLIC_ADMIN_PASSWORD: process.env.NEXT_PUBLIC_ADMIN_PASSWORD ? 'Set' : 'Not Set',
  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Environment Variables Debug</h1>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
          <pre className="text-sm">
            {JSON.stringify(envVars, null, 2)}
          </pre>
        </div>
        <div className="mt-4 text-sm text-slate-600 dark:text-slate-400">
          <p>If NEXT_PUBLIC_ADMIN_EMAIL or NEXT_PUBLIC_ADMIN_PASSWORD show as "Not Set", 
          you need to add them to Vercel environment variables and redeploy.</p>
        </div>
      </div>
    </div>
  )
}
