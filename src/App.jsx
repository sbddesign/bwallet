import { useState, useEffect, useRef, useCallback } from 'react';
import './App.css'
import 'bui/packages/ui/tokens.css';
import 'bui/packages/ui/button.js';
import 'bui/packages/icons/dist/arrowRight/lg.js';
import BeforeWeBegin from './BeforeWeBegin.jsx';
import WalletHome from './WalletHome.jsx';

function App() {
  const [currentScreen, setCurrentScreen] = useState('landing');
  const createWalletButtonRef = useRef(null);

  const handleCreateWallet = useCallback(() => {
    setCurrentScreen('before-we-begin');
  }, []);

  const handleBack = useCallback(() => {
    if (currentScreen === 'before-we-begin') {
      setCurrentScreen('landing');
    } else if (currentScreen === 'wallet-home') {
      setCurrentScreen('before-we-begin');
    }
  }, [currentScreen]);

  const handleNext = useCallback(() => {
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
    return <WalletHome onBack={handleBack} />;
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
              content="label+icon">
              <bui-arrow-right-lg slot="icon"></bui-arrow-right-lg>
            </bui-button>
            <bui-button
              style-type="outline" 
              size="large" 
              label="Restore wallet" />
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
