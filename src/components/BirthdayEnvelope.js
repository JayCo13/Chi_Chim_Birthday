import React, { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import Confetti from 'react-confetti';
import styled, { keyframes } from 'styled-components';
import { useWindowSize } from '../hooks/useWindowSize';
import capybaraAnimation from '../animations/capybara.json';
import catAnimation from '../animations/cat.json';
import mouseAnimation from '../animations/mouse.json';

const BirthdayEnvelope = ({ recipientName = 'Friend' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState(0);
  const { width, height } = useWindowSize();
  
  const animations = [capybaraAnimation, catAnimation, mouseAnimation];

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true);
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen]);
  
  const handleOpenEnvelope = () => {
    setIsOpen(true);
  };
  
  const handleChangeAnimation = () => {
    setCurrentAnimation((prev) => (prev + 1) % animations.length);
  };
  
  return (
    <EnvelopeContainer>
      {showConfetti && <Confetti width={width} height={height} recycle={false} />}
      
      {!isOpen ? (
        <ClosedEnvelope onClick={handleOpenEnvelope}>
          <EnvelopeFront>
            <EnvelopeFlap />
            <EnvelopeBody>
              <ClickToOpenText>
                <span>Mở nhạc</span>
                <span>ở dưới</span>
                <span>trước đi</span>
                <span>2 ơiii!</span>
                <span>Xong gòi</span>
                <span>click vào đâyyyy</span>
              </ClickToOpenText>
            </EnvelopeBody>
          </EnvelopeFront>
        </ClosedEnvelope>
      ) : (
        <OpenEnvelopeWrapper>
          <AnimationsLayer>
            <TopAnimation>
              <Lottie 
                animationData={animations[0]}
                loop={true} 
                autoplay={true}
              />
            </TopAnimation>
            <LeftAnimation>
              <Lottie 
                animationData={animations[1]}
                loop={true} 
                autoplay={true}
              />
            </LeftAnimation>
            <RightAnimation>
              <Lottie 
                animationData={animations[2]}
                loop={true} 
                autoplay={true}
              />
            </RightAnimation>
          </AnimationsLayer>
          <OpenEnvelope>
            <BirthdayCard>
              <BirthdayMessage>
                <h1>Happy Birthday 🎉</h1>
                <h2>Dear {recipientName}!</h2>
                <p>Chúc mừng sinh nhật chị nhóooo!
Em và anh Tài chúc c tuổi mới luôn tràn đầy năng lượng tích cực, mỗi ngày thức dậy đều cảm thấy yêu đời, nhẹ nhàng và vui vẻ. Mong chị luôn giữ được nụ cười tươi và luôn hạnh phúc nhoa!

Chúc chị luôn có những khoảnh khắc tuyệt vời bên gia đình nhỏ của mình, luôn được yêu thương và an yên❤️

Và cuối cùng, điều mà tụi em mong chờ và hy vọng nhất: chúc chị và anh Duy mau mau có bấy bii dễ thương nha kkk 🍼

Chúc chị có một ngày sinh nhật thật ấm áp, ngập tràn niềm vui và yêu thương!

— Em và anh Tài —</p>
              </BirthdayMessage>
            </BirthdayCard>
          </OpenEnvelope>
        </OpenEnvelopeWrapper>
      )}
    </EnvelopeContainer>
  );
};

const EnvelopeContainer = styled.div`
  width: 100%;
  max-width: 800px;
  display: flex;
  justify-content: center;
  align-items: center;
  perspective: 1000px;
  padding: 20px;
  box-sizing: border-box;
  
  @media (max-width: 480px) {
    padding: 10px;
  }
`;

const ClosedEnvelope = styled.div`
  width: 90%;
  max-width: 600px;
  cursor: pointer;
  transform-style: preserve-3d;
  transition: transform 0.5s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const EnvelopeFront = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 75%;
`;

const EnvelopeFlap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 50%;
  background-color: ${props => props.theme.colors.primary};
  clip-path: polygon(0 0, 100% 0, 50% 100%);
  z-index: 2;
  border-top-left-radius: ${props => props.theme.borderRadius};
  border-top-right-radius: ${props => props.theme.borderRadius};
`;

const EnvelopeBody = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.colors.secondary};
  border-radius: ${props => props.theme.borderRadius};
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const ClickToOpenText = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${props => props.theme.colors.accent};
  margin-top: 40px;
  text-align: center;
  width: 90%;
  max-width: 600px;
  padding: 0 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
  font-family: 'Roboto', 'Arial', sans-serif;

  span {
    display: inline-block;
    white-space: nowrap;
  }
  
  @media (max-width: 480px) {
    font-size: 1.2rem;
    width: 95%;
    padding: 0 10px;
    gap: 6px;
  }
`;

const OpenEnvelope = styled.div`
  width: 90%;
  max-width: 600px;
  animation: popOut 0.5s ease forwards;
  
  @keyframes popOut {
    0% { transform: scale(0.8); opacity: 0; }
    100% { transform: scale(1); opacity: 1; }
  }
`;

const BirthdayCard = styled.div`
  width: 100%;
  background-color: white;
  border-radius: ${props => props.theme.borderRadius};
  padding: 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  font-family: 'Roboto', 'Arial', sans-serif;
  min-height: 500px;
  
  @media (max-width: 768px) {
    padding: 30px;
    min-height: 400px;
  }
`;

const BirthdayMessage = styled.div`
  text-align: center;
  margin-bottom: 30px;
  max-width: 500px;
  width: 100%;
  font-family: 'Roboto', 'Arial', sans-serif;
  
  h1 {
    color: ${props => props.theme.colors.accent};
    margin-bottom: 20px;
    font-size: 2.5rem;
    
    @media (max-width: 768px) {
      font-size: 1.8rem;
      margin-bottom: 15px;
    }
    
    @media (max-width: 480px) {
      font-size: 1.4rem;
      margin-bottom: 10px;
    }
  }
  
  h2 {
    color: ${props => props.theme.colors.primary};
    margin-bottom: 25px;
    font-size: 2rem;
    
    @media (max-width: 768px) {
      font-size: 1.5rem;
      margin-bottom: 15px;
    }
    
    @media (max-width: 480px) {
      font-size: 1.1rem;
      margin-bottom: 10px;
    }
  }
  
  p {
    font-size: 1.4rem;
    line-height: 1.6;
    padding: 0 20px;
    
    @media (max-width: 768px) {
      font-size: 1.1rem;
      line-height: 1.4;
    }
    
    @media (max-width: 480px) {
      font-size: 0.9rem;
      padding: 0 5px;
      line-height: 1.3;
    }
  }
`;

const AnimationWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const AnimationContainer = styled.div`
  width: 100%;
  max-width: 400px;
  height: 300px;
  margin-top: 20px;
  cursor: pointer;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
  
  @media (max-width: 768px) {
    max-width: 300px;
    height: 200px;
  }
  
  @media (max-width: 480px) {
    height: 150px;
  }
`;

const AnimationHint = styled.p`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.accent};
  background-color: rgba(255, 255, 255, 0.9);
  padding: 4px 12px;
  border-radius: 20px;
  margin: 0;
  opacity: 0.8;
  transition: opacity 0.3s ease;
  
  &:hover {
    opacity: 1;
  }
`;

const OpenEnvelopeWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 800px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AnimationsLayer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 2;
`;

// Add these keyframes
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const floatTopKeyframes = keyframes`
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50% { transform: translateX(-50%) translateY(-10px); }
`;

const floatLeftKeyframes = keyframes`
  0%, 100% { transform: translateY(-50%) rotate(-15deg) translateX(0); }
  50% { transform: translateY(-50%) rotate(-15deg) translateX(-10px); }
`;

const floatRightKeyframes = keyframes`
  0%, 100% { transform: translateY(-50%) rotate(15deg) translateX(0); }
  50% { transform: translateY(-50%) rotate(15deg) translateX(10px); }
`;

const TopAnimation = styled.div`
  position: absolute;
  top: -120px;
  left: 50%;
  transform: translateX(-50%);
  width: 150px;
  height: 150px;
  opacity: 0;
  animation: ${fadeIn} 0.5s ease-out forwards, 
             ${floatTopKeyframes} 3s ease-in-out infinite;
  
  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
    top: -60px;
  }
  
  @media (max-width: 480px) {
    width: 60px;
    height: 60px;
    top: -40px;
  }
`;

const LeftAnimation = styled.div`
  position: absolute;
  left: -80px;
  bottom: 20%;
  transform: translateY(-50%) rotate(-15deg);
  width: 150px;
  height: 150px;
  opacity: 0;
  animation: ${fadeIn} 0.5s ease-out 0.3s forwards,
             ${floatLeftKeyframes} 3s ease-in-out infinite 0.5s;
  
  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
    left: -40px;
    bottom: 30%;
  }
  
  @media (max-width: 480px) {
    width: 50px;
    height: 50px;
    left: -25px;
    bottom: 40%;
  }
`;

const RightAnimation = styled.div`
  position: absolute;
  right: -80px;
  top: 20%;
  transform: translateY(-50%) rotate(15deg);
  width: 150px;
  height: 150px;
  opacity: 0;
  animation: ${fadeIn} 0.5s ease-out 0.6s forwards,
             ${floatRightKeyframes} 3s ease-in-out infinite 1s;
  
  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
    right: -40px;
    top: 30%;
  }
  
  @media (max-width: 480px) {
    width: 50px;
    height: 50px;
    right: -25px;
    top: 40%;
  }
`;

export default BirthdayEnvelope;
