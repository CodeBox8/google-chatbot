export const ChatMessage = ({ message }) => {
    return (
      <div
        className={`mb-4 ${
          message.role === 'user' ? 'text-right' : 'text-left'
        }`}
      >
        <div
          className={`inline-block p-3 rounded-lg ${
            message.role === 'user'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-800'
          }`}
        >
          {message.content}
        </div>
      </div>
    )
  }