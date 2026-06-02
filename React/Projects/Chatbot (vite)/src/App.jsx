import { useState} from 'react'
import { ChatInput } from './components/ChatInput'
import { ChatMessages } from './components/ChatMesages'
import './App.css'

function App() {
  const [chatMessages, setChatMessages] = useState([
    // State outputs 2 values, current data & updated function
    // state is memory for a component that auto refreshes what the user sees when changed
    {
      message: "Hello chatbot",
      sender: "user",
      id: "id1",
    },
    {
      message: "Hello, How can I help you?",
      sender: "robot",
      id: "id2",
    },
    {
      message: "Can you get me todays date?",
      sender: "user",
      id: "id3",
    },
    {
      message: "Todays date is 27th September",
      sender: "robot",
      id: "id4",
    },
  ]);

  return (
    <div className="app-container">
      <ChatMessages chatMessages={chatMessages} />
      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
    </div>
  );
}

export default App
