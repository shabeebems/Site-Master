'use client'
import React, { useEffect, useState } from "react";

const chatsData = [
  {
    id: 1,
    name: "Alice",
    image: "https://i.pravatar.cc/40?img=1",
    messages: [
      { sender: "Alice", text: "Hey there!", time: "10:00 AM" },
      { sender: "You", text: "Hi Alice!", time: "10:01 AM" },
      { sender: "Alice", text: "How are you?", time: "10:02 AM" },
    ],
  },
  {
    id: 2,
    name: "Bob",
    image: "https://i.pravatar.cc/40?img=2",
    messages: [
      { sender: "Bob", text: "Yo!", time: "9:30 AM" },
      { sender: "You", text: "What's up?", time: "9:31 AM" },
    ],
  },
];

const Content = () => {

  const [selectedChatId, setSelectedChatId] = useState(chatsData[0].id);
  const [searchTerm, setSearchTerm] = useState("");

  const selectedChat = chatsData.find((chat) => chat.id === selectedChatId);
  const filteredChats = chatsData.filter((chat) =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Sidebar */}
      <div className="w-1/3 bg-white border-r overflow-y-auto">
        <div className="p-4 border-b">
          <input
            type="text"
            placeholder="Search chats..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring"
          />
        </div>
        <ul>
          {filteredChats.map((chat) => (
            <li
              key={chat.id}
              onClick={() => setSelectedChatId(chat.id)}
              className={`flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-100 ${
                selectedChatId === chat.id ? "bg-gray-200" : ""
              }`}
            >
              <img
                src={chat.image}
                alt={chat.name}
                className="w-10 h-10 rounded-full"
              />
              <span className="font-medium">{chat.name}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Right Chat Area */}
      <div className="w-2/3 p-6 flex flex-col">
  <h2 className="text-xl font-bold mb-4 border-b pb-2">
    Chat with {selectedChat?.name}
  </h2>

  <div className="flex-1 overflow-y-auto space-y-4 pr-2">
    {selectedChat?.messages.map((msg, index) => (
      <div
        key={index}
        className={`flex flex-col ${
          msg.sender === "You" ? "items-end" : "items-start"
        }`}
      >
        <div
          className={`px-4 py-2 rounded-lg max-w-xs text-sm shadow ${
            msg.sender === "You"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          {msg.text}
        </div>
        <span className="text-xs text-gray-500 mt-1">{msg.time}</span>
      </div>
    ))}
  </div>

  {/* Input & Button at the bottom */}
  <div className="mt-4 border-t pt-4 flex items-center gap-2">
    <input
      type="text"
      placeholder="Type your message..."
      className="flex-1 px-4 py-2 border rounded-lg text-sm outline-none"
      // value={messageText}
      // onChange={(e) => setMessageText(e.target.value)}
    />
    <button
      // onClick={handleSendMessage}
      className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
    >
      Send
    </button>
  </div>
</div>

    </div>

  )
}

export default Content
