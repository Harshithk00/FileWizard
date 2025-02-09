"use client";
import classes from "./chat.module.css";
import Message from "@/components/Message";
import { useEffect, useState } from "react";

export default function Chat({ userId }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const fetchChatMessages = async () => {
    const res = await fetch(`/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ rows: 100 }),
    });
    const data = await res.json();
    console.log(data);
    const items = data.chatHistory;
    const reversedItems = items.slice().reverse();
    setMessages(reversedItems);
  };

  useEffect(() => {
    fetchChatMessages();
  }, [userId]);

  async function chatHandler(e) {
    try {
      e.preventDefault();
      console.log(message);
      const response = await fetch("/api/pushchat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) throw new Error("Failed to send message");

      setMessage("");
      fetchChatMessages();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }

  return (
    <div className={classes.all}>
      <div className={classes.chatDiv}>
        {messages.map((user, index) => {
          return <Message key={index} user={user} />;
        })}
      </div>
      <form onSubmit={chatHandler}>
        <div className={classes.inputDiv}>
          <input
            type="text"
            className={classes.input}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          ></input>
        </div>
      </form>
    </div>
  );
}
