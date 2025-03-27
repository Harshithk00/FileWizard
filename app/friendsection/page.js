"use client";
import React, { useState } from "react";
import { MessageCircle } from "lucide-react";
import Image from "next/image";
import "./Friendsection.css"; // Importing Vanilla CSS

// Mock friend data
const initialFriends = [
  {
    id: 1,
    username: "GameMaster87",
    status: "online",
    game: "Cyberpunk 2077",
    avatar: "https://www.claudeusercontent.com/api/placeholder/50/50",
  },
  {
    id: 2,
    username: "StrategyQueen",
    status: "offline",
    game: null,
    avatar: "https://www.claudeusercontent.com/api/placeholder/50/50",
  },
  {
    id: 3,
    username: "RPGNinja",
    status: "online",
    game: "Elden Ring",
    avatar: "https://www.claudeusercontent.com/api/placeholder/50/50",
  },
  {
    id: 4,
    username: "FPSWarrior",
    status: "online",
    game: "Call of Duty",
    avatar: "https://www.claudeusercontent.com/api/placeholder/50/50",
  },
  {
    id: 5,
    username: "PuzzlePro",
    status: "offline",
    game: null,
    avatar: "https://www.claudeusercontent.com/api/placeholder/50/50",
  },
  {
    id: 6,
    username: "ArcadeKing",
    status: "online",
    game: "Street Fighter",
    avatar: "https://www.claudeusercontent.com/api/placeholder/50/50",
  },
];

export default function Friendsection() {
  const [friends, setFriends] = useState(initialFriends);

  return (
    <div className="friend-section-container">
      <div className="friend-section">
        <h2 className="friend-title">Friends</h2>
        <div className="friend-grid">
          {friends.map((friend) => (
            <div key={friend.id} className="friend-card">
              <div className="friend-info">
                {/* Avatar with Status */}
                <div className="avatar-container">
                  <Image
                    src={friend.avatar}
                    alt={friend.username}
                    className="avatar"
                    width={40}
                    height={40}
                  />
                  <span
                    className={`status-indicator ${friend.status}`}
                  />
                </div>

                {/* User Info */}
                <div className="user-info">
                  <p className="username">{friend.username}</p>
                  {friend.status === "online" && friend.game && (
                    <p className="game">Playing {friend.game}</p>
                  )}
                  {friend.status === "offline" && (
                    <p className="offline">Offline</p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="actions">
                <button className="message-btn" aria-label="Send Message">
                  <MessageCircle size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}