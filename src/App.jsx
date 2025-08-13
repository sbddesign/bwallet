import { useState, useEffect, useRef, useCallback } from 'react';
import './App.css'
import 'bui/packages/ui/tokens.css';
import 'bui/packages/ui/button.js';
import 'bui/packages/icons/dist/arrowRight/lg.js';
import BeforeWeBegin from './BeforeWeBegin.jsx';
import WalletHome from './WalletHome.jsx';
import SendScreen from './SendScreen.jsx';
import SendReviewScreen from './SendReviewScreen.jsx';

function App() {
  const [currentScreen, setCurrentScreen] = useState('landing');
  const [sendAmount, setSendAmount] = useState('0');
  const [sendDestination, setSendDestination] = useState('');
  const createWalletButtonRef = useRef(null);

  const handleCreateWallet = useCallback(() => {
    setCurrentScreen('before-we-begin');
  }, []);

  const handleBack = useCallback(() => {
    if (currentScreen === 'before-we-begin') {
      setCurrentScreen('landing');
    } else if (currentScreen === 'wallet-home') {
      setCurrentScreen('before-we-begin');
    } else if (currentScreen === 'send') {
      setCurrentScreen('wallet-home');
    } else if (currentScreen === 'send-review') {
      setCurrentScreen('send');
    }
  }, [currentScreen]);

  const handleNext = useCallback(() => {
    setCurrentScreen('wallet-home');
  }, []);

  const handleSendAmount = useCallback((amount) => {
    setSendAmount(amount);
    setCurrentScreen('send');
  }, []);

  const handleSendContinue = useCallback((destination) => {
    setSendDestination(destination);
    setCurrentScreen('send-review');
  }, []);

  const handleSend = useCallback((sendData) => {
    // TODO: Implement actual send functionality
    console.log('Sending transaction:', sendData);
    // For now, just go back to wallet home
    setCurrentScreen('wallet-home');
  }, []);

  useEffect(() => {
    const button = createWalletButtonRef.current;
    if (button) {
      const handleClick = () => {
        handleCreateWallet();
      };
      button.addEventListener('click', handleClick);
      return () => {
        button.removeEventListener('click', handleClick);
      };
    }
  }, [handleCreateWallet]);

  if (currentScreen === 'before-we-begin') {
    return <BeforeWeBegin onBack={handleBack} onNext={handleNext} />;
  }

  if (currentScreen === 'wallet-home') {
    return <WalletHome onBack={handleBack} onSend={handleSendAmount} />;
  }

  if (currentScreen === 'send') {
    return <SendScreen onBack={handleBack} onContinue={handleSendContinue} amount={sendAmount} />;
  }

  if (currentScreen === 'send-review') {
    return <SendReviewScreen onBack={handleBack} onSend={handleSend} amount={sendAmount} destination={sendDestination} />;
  }

  return (
    <div className="page-container" data-theme="conduit" data-mode="light">
      <main className="landing-main">
        <div className="landing-content-wrapper">
          <div className="text-content">
            <h1 className="title title-large">bwallet</h1>
            <p className="subtitle">Start sending & receiving bitcoin today</p>
          </div>
        <div className="button-group">
          <bui-button
              ref={createWalletButtonRef}
            style-type="filled" 
            size="large" 
              label="Create new wallet"
              content="label+icon"
              wide>
              <bui-arrow-right-lg slot="icon"></bui-arrow-right-lg>
            </bui-button>
          <bui-button
            style-type="outline" 
            size="large" 
            label="Restore wallet"
            wide />
          </div>
        </div>
      </main>
      <footer className="footer">
        <p className="footer-text">A simple, open-source bitcoin wallet.</p>
        <a href="#" className="learn-more">Learn More →</a>
      </footer>
    </div>
  )
}

export default App
