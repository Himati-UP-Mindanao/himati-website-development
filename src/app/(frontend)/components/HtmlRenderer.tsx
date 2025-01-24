import React from 'react'
import sanitizeHtml from 'sanitize-html'

interface HtmlRendererProps {
  html: string
  className: string
}

const HtmlRenderer: React.FC<HtmlRendererProps> = ({ html, className = ""}) => {

  const cleanHtml = sanitizeHtml(html, {
    allowedTags: ['p', 'strong', 'h1', 'h2', 'h3', 'h4', 'h5']
  })

  return (
    <div className={className} dangerouslySetInnerHTML={{ __html: cleanHtml }} />
  )
}

export default HtmlRenderer