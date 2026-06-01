import { useState} from 'react'
import {Chatbot} from 'supersimpledev'
import './ChatInput.css';

export function ChatInput({ chatMessages, setChatMessages }) {
  // convention is 'set' for updated function
  const [inputText, setInputText] = useState("");

  function saveInputText(event) {
    setInputText(event.target.value); // outputs typed element
  }

  function sendMessage() {
    const newChatMessages = [
      ...chatMessages, // spread operator - copied values into new array
      {
        message: inputText,
        sender: "user",
        id: crypto.randomUUID(),
      },
    ];

    setChatMessages(newChatMessages);

    const response = Chatbot.getResponse(inputText);
    setChatMessages([
      ...newChatMessages, // spread operator - copied values into new array
      {
        message: response,
        sender: "robot",
        id: crypto.randomUUID(),
      },
    ]);

    setInputText("");
  }

  return (
    <div className="chat-input-container">
      {/*Fragment groups elements together without creating an extra div*/}
      <input
        placeholder="Send a message to Chatbot"
        size="70"
        onChange={saveInputText}
        value={inputText} // controlled input using value input
        className="message-box"
      />
      <button onClick={sendMessage} className="send-button">
        Send
      </button>
    </div>
  );
}