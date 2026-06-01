import { useRef, useEffect } from 'react'
import { ChatMessage } from './ChatMessage';
import './ChatMessages.css'

export function ChatMessages({ chatMessages }) {
  const chatMessagesRef = useRef(null); // useRef stores value without re-rendering

  useEffect(() => {
    // useEffect runs when component renders or when react updates page
    const containerElem = chatMessagesRef.current;
    if (containerElem) {
      containerElem.scrollTop = containerElem.scrollHeight;
    }
  }, [chatMessages]); // dependency array - controls when useEffect runs, runs when chatMessages is run

  return (
    <div className="chat-messages-container" ref={chatMessagesRef}>
      {chatMessages.map((chatMessage) => (
        <ChatMessage
          key={chatMessage.id}
          message={chatMessage.message}
          sender={chatMessage.sender}
        />
      ))}
    </div>
  );
}