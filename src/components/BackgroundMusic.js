import React, { useState, useRef } from 'react';
import styled from 'styled-components';

const BackgroundMusic = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <MusicContainer>
      <audio ref={audioRef} loop>
        <source src="/audio/song.m4a" type="audio/mp4" />
        Your browser does not support the audio element.
      </audio>
      <MusicButton onClick={togglePlay}>
        {isPlaying ? '🔇 TẮT' : '🔊 MỞ NHẠC ZUI NHỘN'}
      </MusicButton>
    </MusicContainer>
  );
};

const MusicContainer = styled.div`
font-family: 'Roboto', 'Arial', sans-serif;
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
`;

const MusicButton = styled.button`
font-family: 'Roboto', 'Arial', sans-serif;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 50px;
  padding: 10px 15px;
  font-size: 0.9rem;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  font-family: 'Be Vietnam Pro', 'Roboto', 'Helvetica Neue', sans-serif;
  font-weight: 500;

  &:hover {
    background-color: ${props => props.theme.colors.accent};
    transform: scale(1.05);
  }
`;

export default BackgroundMusic;