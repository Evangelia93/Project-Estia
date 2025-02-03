import React, { useState } from "react";

function Forum() {
  const [messages, setMessages] = useState([
    { id: 1, user: "Alice", content: "Welcome to the forum!" },
    { id: 2, user: "Bob", content: "This is a cool place!" }
  ]);

  const [newMessage, setNewMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    const newMessageObj = {
      id: messages.length + 1,
      user: "Anonymous",
      content: newMessage,
    };

    setMessages([...messages, newMessageObj]);
    setNewMessage(""); 
  };

  const handleDelete = (id) => {
    setMessages(messages.filter((message) => message.id !== id));
  };

  return (
    <div className="forum-container">
      <h1>Forum</h1>

      {/* Form for submitting new message */}
      <form onSubmit={handleSubmit}>
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Write a new message..."
          rows="4"
          cols="50"
        />
        <br />
        <button type="submit" className="post-button">Post Message</button>
      </form>

      {/* Messages list */}
      <div className="messages-container">
        {messages.map((message) => (
          <div key={message.id} className="message-card">
            <div className="message-header">
              {/* User Icon */}
              <i className="fas fa-user-circle user-icon"></i>
              <p><strong>{message.user}</strong>: {message.content}</p>
            </div>
            <button
              className="delete-button"
              onClick={() => handleDelete(message.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      <style>
        {`
          .forum-container {
            padding: 20px;
            font-family: 'Quicksand', sans-serif;
          }
          h1 {
            text-align: center;
            color: #93b795;
          }
          form {
            margin-bottom: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          textarea {
            width: 80%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            margin-bottom: 10px;
          }
          /* Post Message Button */
          .post-button {
            background-color: #93B795;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 30px;
            cursor: pointer;
            font-size: 16px;
            transition: all 0.3s ease;
          }

          .post-button:hover {
            background-color: #769f7d;
            transform: scale(1.05);
          }

          /* Message Card */
          .messages-container {
            margin-top: 20px;
          }
          .message-card {
            background-color: #fafafa;
            padding: 15px;
            margin: 10px 0;
            border-radius: 5px;
            border: 1px solid #ddd;
          }
          .message-card:hover {
            background-color: #f4f4f4;
          }

          .message-header {
            display: flex;
            align-items: center;
            gap: 10px;
          }

          .user-icon {
            font-size: 30px;
            color: #93b795;
          }

          /* Delete Button */
          .delete-button {
            background-color: #ff6b6b;
            color: white;
            padding: 5px 15px;
            border: none;
            border-radius: 20px;
            cursor: pointer;
            font-size: 14px;
            transition: all 0.3s ease;
          }

          .delete-button:hover {
            background-color: #e04e4e;
            transform: scale(1.05);
          }

          /* Mobile Responsiveness */
          @media (max-width: 768px) {
            textarea {
              width: 90%;
            }
            .post-button {
              width: 100%;
            }
          }
        `}
      </style>
    </div>
  );
}

export default Forum;
