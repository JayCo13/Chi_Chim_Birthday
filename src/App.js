import React, { useState } from 'react';
import BirthdayEnvelope from './components/BirthdayEnvelope';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';
import BackgroundMusic from './components/BackgroundMusic';

const theme = {
  colors: {
    primary: '#FFB6C1', // Light pink
    secondary: '#FFF0F5', // Lavender blush
    accent: '#FF69B4', // Hot pink
    text: '#4A4A4A', // Dark gray
    background: '#FFF8F8', // Very light pink
  },
  fonts: {
    main: "'Comic Sans MS', 'Bubblegum Sans', cursive",
  },
  borderRadius: '20px',
};

function App() {
  const [recipientName, setRecipientName] = useState('Friend');
  
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <div className="App">
        <BirthdayEnvelope recipientName={recipientName} />
      </div>
      <BackgroundMusic audioSrc="/path-to-your-music.mp3" />
    </ThemeProvider>
  );
}

export default App;