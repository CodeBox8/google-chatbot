import { useState } from 'react'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { ChatMessage } from '../components/ChatMessage'
import { LoadingSpinner } from '../components/LoadingSpinner'

const genAI = new GoogleGenerativeAI('AIzaSyArZjkiguS7QvjhUwTW7qdP6BW4I-MHAJE')
const model = genAI.getGenerativeModel({ model: "gemini-pro" })

export const Chat = () => {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim()) return

    setLoading(true)
    setMessages(prev => [...prev, { role: 'user', content: input }])
    
    try {
      const result = await model.generateContent(input)
      const response = await result.response
      const text = response.text()
      
      setMessages(prev => [...prev, { role: 'assistant', content: text }])
    } catch (error) {
      console.error('Error:', error)
    }
    
    setLoading(false)
    setInput('')
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Gemini AI Chatbot</h1>
        
        <div className="bg-white rounded-lg shadow-md p-4 mb-4 h-[500px] overflow-y-auto">
          {messages.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
          {loading && <LoadingSpinner />}
        </div>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Type your message..."
          />
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  )
}