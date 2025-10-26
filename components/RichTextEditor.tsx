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
  Type
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

      {/* Textarea */}
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-96 p-4 border-0 resize-none focus:outline-none bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400"
        style={{ minHeight: '350px' }}
      />
      
      {/* Help text */}
      <div className="px-4 py-2 bg-slate-50 dark:bg-slate-800 text-xs text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700">
        💡 <strong>Tip:</strong> You can paste your complete HTML content here, including DOCTYPE, head, body tags, and custom styles. 
        The editor will preserve all your HTML formatting and styling.
      </div>
    </div>
  )
}
