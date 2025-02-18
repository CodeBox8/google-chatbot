import { Link } from 'react-router-dom'

export const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">Welcome to Gemini AI Chatbot</h1>
        <Link
          to="/chat"
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Start Chatting
        </Link>
      </div>
    </div>
  )
}