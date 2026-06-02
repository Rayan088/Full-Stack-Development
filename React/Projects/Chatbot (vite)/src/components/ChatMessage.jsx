import RobotProfileImage from '../assets/robot.png'
import UserProfileImage from '../assets/user.png'
import './ChatMessage.css'

export function ChatMessage(props) {
  // props is short for properties and make our components reusable
  // props contains all arributes given to component
  const { message, sender } = props; // cleaner way of writing the below
  // const message = props.message
  // const sender = props.sender

  return (
    <div
      className={
        sender === "user" ? "chat-message-user" : "chat-message-robot"
      }
    >
      {sender === "robot" && ( // Implementing and operator
        <img src={RobotProfileImage} className="chat-message-pfp"></img>
      )}
      <div className="chat-message-text">{message}</div>
      {sender === "user" && (
        <img src={UserProfileImage} className="chat-message-pfp"></img>
      )}
    </div>
  );
}