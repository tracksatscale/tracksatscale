const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

// Read .env.local file
let supabaseUrl, supabaseKey
try {
  const envPath = path.join(__dirname, '.env.local')
  const envContent = fs.readFileSync(envPath, 'utf8')
  const lines = envContent.split('\n')
  
  lines.forEach(line => {
    if (line.startsWith('NEXT_PUBLIC_SUPABASE_URL=')) {
      supabaseUrl = line.split('=')[1].trim()
    } else if (line.startsWith('NEXT_PUBLIC_SUPABASE_ANON_KEY=')) {
      supabaseKey = line.split('=')[1].trim()
    }
  })
} catch (error) {
  console.error('Error reading .env.local file:', error.message)
  console.log('\nPlease make sure .env.local exists with:')
  console.log('NEXT_PUBLIC_SUPABASE_URL=your_url')
  console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key')
  process.exit(1)
}

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials in .env.local file.')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

// The sidebar HTML structure
const sidebarHTML = `<div class="sidebar">
  <h3>Table of Contents</h3>
  <ul>
    <li><a href="#introduction">Introduction & First Impressions</a></li>
    <li><a href="#product-overview">Product Overview</a></li>
    <li><a href="#design-quality">Design & Quality</a></li>
    <li><a href="#performance">Performance Analysis</a></li>
    <li><a href="#user-experience">User Experience</a></li>
    <li><a href="#competitive-analysis">Competitive Analysis</a></li>
    <li><a href="#pros-cons">Pros and Cons</a></li>
    <li><a href="#evolution-updates">Evolution & Updates</a></li>
    <li><a href="#who-should-buy">Who Should Buy</a></li>
    <li><a href="#where-to-buy">Where to Buy</a></li>
    <li><a href="#final-verdict">Final Verdict</a></li>
    <li><a href="#evidence-proof">Evidence & Proof</a></li>
  </ul>
</div>
`

async function fixBrainSongArticle() {
  try {
    console.log('Fetching Brain Song article...')
    
    // Fetch the article
    const { data: article, error: fetchError } = await supabase
      .from('articles')
      .select('*')
      .eq('slug', 'the-brain-song-review-2025-does-it-really-work-expert-analysis')
      .single()

    if (fetchError) {
      console.error('Error fetching article:', fetchError)
      return
    }

    if (!article) {
      console.log('Article not found!')
      return
    }

    console.log('Article found!')
    console.log('Current content length:', article.content.length)
    
    // Check if sidebar already exists
    if (article.content.includes('class="sidebar"')) {
      console.log('✅ Sidebar already exists in the content!')
      return
    }

    console.log('Adding sidebar to article...')
    
    // Add sidebar at the beginning of the content
    const updatedContent = sidebarHTML + '\n\n' + article.content

    // Update the article
    const { error: updateError } = await supabase
      .from('articles')
      .update({
        content: updatedContent,
        updated_at: new Date().toISOString()
      })
      .eq('id', article.id)

    if (updateError) {
      console.error('Error updating article:', updateError)
      return
    }

    console.log('✅ Successfully added sidebar to Brain Song article!')
    console.log('New content length:', updatedContent.length)
    console.log('\nThe sidebar should now be visible at:')
    console.log('https://tracksatscale.vercel.app/the-brain-song-review-2025-does-it-really-work-expert-analysis')
  } catch (error) {
    console.error('Unexpected error:', error)
  }
}

fixBrainSongArticle()

