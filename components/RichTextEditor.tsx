'use client'

import { useState, useRef } from 'react'
import { 
  Bold, 
  Italic, 
  Underline, 
  List, 
  ListOrdered, 
  Quote, 
  Code, 
  Link,
  Image,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Type,
  FileText,
  Eye,
  EyeOff,
  Download,
  Upload
} from 'lucide-react'

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function RichTextEditor({ value, onChange, placeholder = 'Write your article...' }: RichTextEditorProps) {
  const [isBold, setIsBold] = useState(false)
  const [isItalic, setIsItalic] = useState(false)
  const [isUnderline, setIsUnderline] = useState(false)
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value)
    textareaRef.current?.focus()
  }

  const insertText = (text: string) => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const newValue = value.substring(0, start) + text + value.substring(end)
    
    onChange(newValue)
    
    // Set cursor position after inserted text
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + text.length, start + text.length)
    }, 0)
  }

  const insertHTML = (html: string) => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = value.substring(start, end)
    const newValue = value.substring(0, start) + html.replace('{{content}}', selectedText || 'Your text here') + value.substring(end)
    
    onChange(newValue)
    
    // Set cursor position after inserted HTML
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + html.length, start + html.length)
    }, 0)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      const content = e.target?.result as string
      if (content) {
        onChange(content)
      }
    }
    reader.readAsText(file)
  }

  const downloadContent = () => {
    const blob = new Blob([value], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'article-content.html'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const insertCompleteHTML = () => {
    const completeHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Article Title</title>
    <meta name="description" content="Your article description">
    <style>
        /* Your custom CSS styles here */
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.7;
            color: #1f2937;
            background-color: #ffffff;
            font-size: 18px;
        }
        
        .container {
            max-width: 900px;
            margin: 0 auto;
            padding: 40px 20px;
        }
        
        h1, h2, h3, h4, h5, h6 {
            color: #1f2937;
            margin-bottom: 1rem;
        }
        
        p {
            margin-bottom: 1rem;
        }
        
        /* Add more styles as needed */
    </style>
</head>
<body>
    <div class="container">
        <h1>Your Article Title</h1>
        <p>Start writing your article content here...</p>
    </div>
</body>
</html>`
    
    onChange(completeHTML)
  }

  const ToolbarButton = ({ 
    onClick, 
    icon: Icon, 
    isActive = false, 
    title 
  }: { 
    onClick: () => void
    icon: any
    isActive?: boolean
    title: string
  }) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors ${
        isActive ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400'
      }`}
    >
      <Icon className="h-4 w-4" />
    </button>
  )

  return (
    <div className="border border-slate-300 dark:border-slate-600 rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center gap-1 p-2 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        {/* HTML Template */}
        <ToolbarButton
          onClick={insertCompleteHTML}
          icon={FileText}
          title="Insert Complete HTML Template"
        />
        <div className="w-px h-6 bg-slate-300 dark:bg-slate-600 mx-1" />
        
        {/* File Operations */}
        <label className="p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-slate-600 dark:text-slate-400 cursor-pointer" title="Upload HTML File">
          <Upload className="h-4 w-4" />
          <input
            type="file"
            accept=".html,.htm,.txt"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
        <ToolbarButton
          onClick={downloadContent}
          icon={Download}
          title="Download as HTML"
        />
        <div className="w-px h-6 bg-slate-300 dark:bg-slate-600 mx-1" />
        
        {/* Preview Toggle */}
        <ToolbarButton
          onClick={() => setIsPreviewMode(!isPreviewMode)}
          icon={isPreviewMode ? EyeOff : Eye}
          isActive={isPreviewMode}
          title={isPreviewMode ? "Exit Preview" : "Preview HTML"}
        />
        <div className="w-px h-6 bg-slate-300 dark:bg-slate-600 mx-1" />
        
        {/* Basic Formatting */}
        <ToolbarButton
          onClick={() => insertHTML('<h1>{{content}}</h1>')}
          icon={Type}
          title="Heading 1"
        />
        <ToolbarButton
          onClick={() => insertHTML('<h2>{{content}}</h2>')}
          icon={Type}
          title="Heading 2"
        />
        <div className="w-px h-6 bg-slate-300 dark:bg-slate-600 mx-1" />
        <ToolbarButton
          onClick={() => insertHTML('<strong>{{content}}</strong>')}
          icon={Bold}
          title="Bold"
        />
        <ToolbarButton
          onClick={() => insertHTML('<em>{{content}}</em>')}
          icon={Italic}
          title="Italic"
        />
        <ToolbarButton
          onClick={() => insertHTML('<u>{{content}}</u>')}
          icon={Underline}
          title="Underline"
        />
        <div className="w-px h-6 bg-slate-300 dark:bg-slate-600 mx-1" />
        <ToolbarButton
          onClick={() => insertHTML('<ul><li>{{content}}</li></ul>')}
          icon={List}
          title="Bullet List"
        />
        <ToolbarButton
          onClick={() => insertHTML('<ol><li>{{content}}</li></ol>')}
          icon={ListOrdered}
          title="Numbered List"
        />
        <ToolbarButton
          onClick={() => insertHTML('<blockquote>{{content}}</blockquote>')}
          icon={Quote}
          title="Quote"
        />
        <ToolbarButton
          onClick={() => insertHTML('<code>{{content}}</code>')}
          icon={Code}
          title="Code"
        />
        <div className="w-px h-6 bg-slate-300 dark:bg-slate-600 mx-1" />
        <ToolbarButton
          onClick={() => insertHTML('<a href="https://example.com">{{content}}</a>')}
          icon={Link}
          title="Link"
        />
        <ToolbarButton
          onClick={() => insertHTML('<img src="https://example.com/image.jpg" alt="Image" />')}
          icon={Image}
          title="Image"
        />
      </div>

      {/* Content Area */}
      {isPreviewMode ? (
        <div className="w-full h-96 p-4 border-0 bg-white dark:bg-slate-900 overflow-auto" style={{ minHeight: '350px' }}>
          <div 
            dangerouslySetInnerHTML={{ __html: value }}
            className="prose prose-lg max-w-none"
          />
        </div>
      ) : (
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full h-96 p-4 border-0 resize-none focus:outline-none bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 font-mono text-sm"
          style={{ minHeight: '350px' }}
        />
      )}
      
      {/* Help text */}
      <div className="px-4 py-2 bg-slate-50 dark:bg-slate-800 text-xs text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700">
        💡 <strong>Tip:</strong> You can paste your complete HTML content here, including DOCTYPE, head, body tags, and custom styles. 
        Use the preview mode to see how your HTML will look when rendered. The editor will preserve all your HTML formatting and styling.
      </div>
    </div>
  )
}
