'use client';
import React, { useState } from 'react';
import { Camera, Edit } from 'lucide-react';
import './ProfilePage.css';
import Image from 'next/image';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Commander Shepard',
    email: 'shepard@normandy.com',
    bio: "I'm Commander Shepard, and this is my favorite store on the Citadel.",
    favoriteGame: 'Mass Effect',
    memberSince: '2023',
    level: 42,
    status: 'Online',
    currentlyPlaying: [
      { name: 'Mass Effect Legendary Edition', icon: '🚀' },
      { name: 'Cyberpunk 2077', icon: '🎮' },
      { name: 'The Witcher 3', icon: '⚔️' }
    ],
    friends: [
      { name: 'Garrus Vakarian', status: 'Online', icon: 'GV', color: 'blue' },
      { name: 'Tali\'Zorah', status: 'Away', icon: 'TZ', color: 'yellow' },
      { name: 'Liara T\'Soni', status: 'Offline', icon: 'LT', color: 'gray' }
    ]
  });

  const [profileImage, setProfileImage] = useState('/api/placeholder/150/150');
  const [backgroundImage, setBackgroundImage] = useState('linear-gradient(to right, blue, purple)');

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCurrentlyPlayingChange = (e, index) => {
    const { name, value } = e.target;
    setProfile(prev => {
      const updatedCurrentlyPlaying = [...prev.currentlyPlaying];
      updatedCurrentlyPlaying[index] = {
        ...updatedCurrentlyPlaying[index],
        [name]: value
      };
      return {
        ...prev,
        currentlyPlaying: updatedCurrentlyPlaying
      };
    });
  };

  const handleImageUpload = (setter) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setter(event.target.result);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  return (
    <div className="profile-container">
      {/* Background Image */}
      <div 
        className="background-image" 
        style={{ background: backgroundImage }}
      >
        {isEditing && (
          <button 
            onClick={() => handleImageUpload(setBackgroundImage)}
            className="background-image-edit-btn"
          >
            <Camera className="icon" size={20} />
          </button>
        )}
      </div>

      {/* Profile Section */}
      <div className="profile-content">
        {/* Profile Picture */}
        <div className="profile-picture-container">
          <Image
            src={profileImage} 
            alt="Profile" 
            width={150}
            height={150}
            className="profile-picture"
          />
          {isEditing && (
            <button 
              onClick={() => handleImageUpload(setProfileImage)}
              className="profile-picture-edit-btn"
            >
              <Camera className="icon" size={20} />
            </button>
          )}
        </div>

        {/* Edit Button */}
        <button 
          onClick={handleEditToggle}
          className="edit-btn"
        >
          <Edit size={20} />
        </button>

        {/* Profile Details */}
        <div className="profile-details">
          {isEditing ? (
            <>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleInputChange}
                className="edit-input name-input"
              />
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleInputChange}
                className="edit-input email-input"
              />
              <textarea
                name="bio"
                value={profile.bio}
                onChange={handleInputChange}
                className="edit-input bio-input"
              />
            </>
          ) : (
            <>
              <h2 className="profile-name">{profile.name}</h2>
              <p className="profile-email">{profile.email}</p>
              <p className="profile-bio">{profile.bio}</p>
            </>
          )}
        </div>

        {/* Profile Stats */}
        <div className="profile-stats">
          <div>
            <span>Status: </span>
            <span className="online-status">{profile.status}</span>
          </div>
          <div>
            <span>Member since: </span>
            <span>{profile.memberSince}</span>
          </div>
          <div>
            <span>Level: </span>
            <span className="level">{profile.level}</span>
          </div>
        </div>

        {/* Currently Playing */}
        <div className="currently-playing">
          <h3>Currently Playing</h3>
          <div className="games-grid">
            {isEditing ? (
              profile.currentlyPlaying.map((game, index) => (
                <div key={index} className="game-edit-item">
                  <input
                    type="text"
                    name="name"
                    value={game.name}
                    onChange={(e) => handleCurrentlyPlayingChange(e, index)}
                    className="edit-input game-name-input"
                  />
                  <input
                    type="text"
                    name="icon"
                    value={game.icon}
                    onChange={(e) => handleCurrentlyPlayingChange(e, index)}
                    className="edit-input game-icon-input"
                    placeholder="Emoji Icon"
                  />
                </div>
              ))
            ) : (
              profile.currentlyPlaying.map((game, index) => (
                <div key={index} className="game-item">
                  <div className="game-icon">{game.icon}</div>
                  <p className="game-name">{game.name}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Friends */}
        <div className="friends-section">
          <h3>Friends</h3>
          <div className="friends-grid">
            {profile.friends.map((friend, index) => (
              <div 
                key={index} 
                className={`friend-item ${friend.status.toLowerCase()}`}
              >
                <div 
                  className={`friend-icon ${friend.color}`}
                >
                  {friend.icon}
                </div>
                <p className="friend-name">{friend.name}</p>
                <p className="friend-status">{friend.status}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}