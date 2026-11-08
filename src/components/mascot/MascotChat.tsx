'use client'

import React, { useState, useEffect, useRef } from 'react'
import { X, Send, Code2, FolderGit2, Mail, Award } from 'lucide-react'
import { askMascot, ChatMessage } from '@/lib/ai'
import { MascotSound } from './mascotSound'
import styles from './MascotChat.module.css'

interface MascotChatProps {
  isOpen: boolean
  onClose: () => void
  triggerTyping: () => void
  stopTyping: () => void
  triggerHappy: () => void
}

const SUGGESTIONS = [
  { label: 'Skills', icon: Code2, query: 'Apa saja keahlian Rayhan?' },
  { label: 'Projects', icon: FolderGit2, query: 'Proyek apa saja yang sudah dibuat?' },
  { label: 'Contact', icon: Mail, query: 'Bagaimana cara menghubungi Rayhan?' },
  { label: 'Certificates', icon: Award, query: 'Sertifikat apa saja yang dimiliki?' },
]

export const MascotChat: React.FC<MascotChatProps> = ({
  isOpen,
  onClose,
  triggerTyping,
  stopTyping,
  triggerHappy,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'bot',
      text: 'Halo! Saya **Jean**, asisten AI portofolio **M. Rayhan Zulkarnain**. Saya bisa membantu menjawab pertanyaanmu seputar keterampilan, proyek, sertifikasi, atau cara menghubungi Rayhan. Ada yang ingin kamu ketahui?',
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState('')
  const [isThinking, setIsThinking] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  // Play typing ticks in a loop while thinking
  useEffect(() => {
    if (!isThinking) return
    const id = setInterval(() => {
      MascotSound.play('typing')
    }, 120 + Math.random() * 80)
    return () => clearInterval(id)
  }, [isThinking])

  const messageEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isThinking])

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 300)
    }
  }, [isOpen])

  if (!isOpen && !isClosing) return null

  const handleClose = () => {
    MascotSound.play('click')
    setIsClosing(true)
    setTimeout(() => {
      onClose()
      setIsClosing(false)
    }, 200) // matches .panelClosing duration in CSS
  }

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || isThinking) return

    MascotSound.play('click')

    // Add user message
    const userMsg: ChatMessage = {
      sender: 'user',
      text: textToSend,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMsg])
    setInputValue('')
    setIsThinking(true)
    triggerTyping() // Make mascot start typing/shivering

    try {
      // Get AI response
      const responseText = await askMascot(textToSend, messages)
      
      const botMsg: ChatMessage = {
        sender: 'bot',
        text: responseText,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMsg])
      triggerHappy() // Make mascot bounce happily on reply
      MascotSound.play('happy')
    } catch (error) {
      console.error(error)
      const errorMsg: ChatMessage = {
        sender: 'bot',
        text: 'Maaf, sepertinya saya sedang mengalami gangguan koneksi. Silakan coba sesaat lagi ya!',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMsg])
    } finally {
      setIsThinking(false)
      stopTyping() // Stop mascot typing/shivering
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSend(inputValue)
  }

  // Helper function to parse markdown-like bold/italic/code/link tags inside messages
  const parseInlineFormatting = (text: string): React.ReactNode[] => {
    const tokenRegex = /(\*\*[^*]+\*\*|\*[^*\n]+\*|`[^`\n]+`|\[[^\]]+\]\([^)]+\))/g
    const parts = text.split(tokenRegex)
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
        return <strong key={index}>{part.slice(2, -2)}</strong>
      }
      if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
        return <em key={index}>{part.slice(1, -1)}</em>
      }
      if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
        return (
          <code
            key={index}
            style={{
              background: 'rgba(255,255,255,0.08)',
              padding: '1px 5px',
              borderRadius: '4px',
              fontFamily: 'var(--font-mono), monospace',
              fontSize: '0.9em',
            }}
          >
            {part.slice(1, -1)}
          </code>
        )
      }
      const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/)
      if (linkMatch) {
        return (
          <a
            key={index}
            href={linkMatch[2]}
            target="_blank"
            rel="noopener noreferrer"
          >
            {linkMatch[1]}
          </a>
        )
      }
      return part
    })
  }

  // Helper function to render paragraphs, headings, and lists
  const renderMessageContent = (text: string) => {
    return text.split('\n\n').map((rawParagraph, pIdx) => {
      const paragraph = rawParagraph.trim()
      if (!paragraph) return null

      // Strip leading markdown heading markers (e.g. ### Heading)
      if (/^#{1,6}\s+/.test(paragraph) && !paragraph.includes('\n')) {
        const headingText = paragraph.replace(/^#{1,6}\s+/, '')
        return (
          <p key={pIdx} style={{ margin: '0 0 0.4rem 0', fontWeight: 700 }} className="last:mb-0">
            {parseInlineFormatting(headingText)}
          </p>
        )
      }

      // Unordered list checks (supports •, -, and * bullets)
      if (/^[•\-*]\s+/.test(paragraph)) {
        const items = paragraph
          .split('\n')
          .map((item) => item.trim().replace(/^[•\-*]\s+/, ''))
          .filter(Boolean)
        return (
          <ul key={pIdx} style={{ listStyleType: 'disc', paddingLeft: '1.25rem', marginBottom: '0.5rem' }}>
            {items.map((item, iIdx) => (
              <li key={iIdx} style={{ marginBottom: '0.25rem' }}>
                {parseInlineFormatting(item)}
              </li>
            ))}
          </ul>
        )
      }

      // Ordered list checks
      if (/^\d+\.\s+/.test(paragraph)) {
        const items = paragraph
          .split(/\n(?=\d+\.\s+)/)
          .map((item) => item.trim().replace(/^\d+\.\s+/, '').replace(/\n\s+/g, ' '))
          .filter(Boolean)
        return (
          <ol key={pIdx} style={{ listStyleType: 'decimal', paddingLeft: '1.25rem', marginBottom: '0.5rem' }}>
            {items.map((item, iIdx) => (
              <li key={iIdx} style={{ marginBottom: '0.35rem' }}>
                {parseInlineFormatting(item)}
              </li>
            ))}
          </ol>
        )
      }

      // Default paragraphs
      return (
        <p key={pIdx} style={{ margin: '0 0 0.5rem 0' }} className="last:mb-0">
          {parseInlineFormatting(paragraph)}
        </p>
      )
    })
  }

  return (
    <div className={`${styles.chatPanel} ${isClosing ? styles.panelClosing : ''}`} data-lenis-prevent>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.botInfo}>
          <div className={styles.avatar}>
            J
            <span className={`${styles.statusDot} ${isThinking ? styles.statusThinking : ''}`} />
          </div>
          <div className={styles.botTitle}>
            <span className={styles.botName}>Jean</span>
            <span className={styles.botSub}>Rayhan&apos;s Assistant</span>
          </div>
        </div>
        <button onClick={handleClose} className={styles.closeBtn} aria-label="Close chat">
          <X size={18} />
        </button>
      </div>

      {/* Message History */}
      <div className={styles.messageList} data-lenis-prevent>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`${styles.msgRow} ${
              msg.sender === 'bot' ? styles.msgBot : styles.msgUser
            }`}
          >
            <div
              className={`${styles.bubble} ${
                msg.sender === 'bot' ? styles.bubbleBot : styles.bubbleUser
              }`}
            >
              {renderMessageContent(msg.text)}
            </div>
          </div>
        ))}

        {isThinking && (
          <div className={`${styles.msgRow} ${styles.msgBot}`}>
            <div className={styles.typingBubble}>
              <span className={styles.typingDot} />
              <span className={styles.typingDot} />
              <span className={styles.typingDot} />
            </div>
          </div>
        )}
        <div ref={messageEndRef} />
      </div>

      {/* Quick Suggestions Chips */}
      <div className={styles.suggestions}>
        {SUGGESTIONS.map((sug, index) => {
          const Icon = sug.icon
          return (
            <button
              key={index}
              onClick={() => handleSend(sug.query)}
              disabled={isThinking}
              className={`${styles.chip} flex items-center gap-1.5`}
            >
              <Icon size={13} className="text-accent-cyan" />
              <span>{sug.label}</span>
            </button>
          )
        })}
      </div>

      {/* Form Input */}
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputWrapper}>
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isThinking}
            placeholder={isThinking ? 'Jean sedang mengetik...' : 'Tanyakan tentang Rayhan...'}
            className={styles.input}
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isThinking}
            className={`${styles.sendBtn} ${
              inputValue.trim() && !isThinking ? styles.sendBtnActive : ''
            }`}
          >
            <Send size={16} />
          </button>
        </div>
      </form>
    </div>
  )
}
