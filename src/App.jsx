import { useState, useEffect, useRef } from 'react';
import './App.css'
import 'bui/packages/ui/tokens.css';
import 'bui/packages/ui/button.js';
import 'bui/packages/icons/dist/arrowRight/lg.js';
import BeforeWeBegin from './BeforeWeBegin.jsx';

function App() {
  const [currentScreen, setCurrentScreen] = useState('landing');
  const createWalletButtonRef = useRef(null);

  const handleCreateWallet = () => {
    setCurrentScreen('before-we-begin');
  };

  const handleBack = () => {
    setCurrentScreen('landing');
  };

  const handleNext = () => {
    // TODO: Navigate to next screen
    console.log('Next button clicked');
  };

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
  }, []);

  if (currentScreen === 'before-we-begin') {
    return <BeforeWeBegin onBack={handleBack} onNext={handleNext} />;
  }

  return (
    <div className="app-container" data-theme="conduit" data-mode="light">
      <main className="landing-main">
        <div className="content-wrapper">
          <div className="text-content">
            <h1 className="title">bwallet</h1>
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
