import { useState, useEffect, useRef } from 'react';
import 'bui/packages/ui/button.js';
import 'bui/packages/icons/dist/arrowLeft/lg.js';
import 'bui/packages/icons/dist/arrowRight/lg.js';
import 'bui/packages/icons/dist/scan/lg.js';
import 'bui/packages/icons/dist/clipboard/lg.js';
import './SendScreen.css';

function SendScreen({ onBack, onContinue, amount }) {
  const [destination, setDestination] = useState('₿fatima@twelve.cash');
  const [isValid, setIsValid] = useState(true);
  const pasteButtonRef = useRef(null);
  const scanButtonRef = useRef(null);
  const continueButtonRef = useRef(null);
  const goBackButtonRef = useRef(null);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setDestination(text);
      setIsValid(text.length > 0);
    } catch (err) {
      console.log('Failed to read clipboard contents: ', err);
    }
  };

  const handleScan = () => {
    // TODO: Implement QR code scanning
    console.log('Scan QR code');
  };

  const handleContinue = () => {
    if (isValid && destination.trim()) {
      onContinue(destination);
    }
  };

  const handleGoBack = () => {
    onBack();
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setDestination(value);
    setIsValid(value.length > 0);
  };

  useEffect(() => {
    const pasteButton = pasteButtonRef.current;
    const scanButton = scanButtonRef.current;
    const continueButton = continueButtonRef.current;
    const goBackButton = goBackButtonRef.current;

    if (pasteButton) {
      pasteButton.addEventListener('click', handlePaste);
    }
    if (scanButton) {
      scanButton.addEventListener('click', handleScan);
    }
    if (continueButton) {
      continueButton.addEventListener('click', handleContinue);
    }
    if (goBackButton) {
      goBackButton.addEventListener('click', handleGoBack);
    }

    return () => {
      if (pasteButton) {
        pasteButton.removeEventListener('click', handlePaste);
      }
      if (scanButton) {
        scanButton.removeEventListener('click', handleScan);
      }
      if (continueButton) {
        continueButton.removeEventListener('click', handleContinue);
      }
      if (goBackButton) {
        goBackButton.removeEventListener('click', handleGoBack);
      }
    };
  }, [isValid, destination]);

  return (
    <div className="send-screen-container" data-theme="conduit" data-mode="light">
      <div className="content-wrapper">
        {/* Header with back button */}
        <div className="header">
          <button className="back-button" onClick={onBack}>
            <bui-arrow-left-lg className="back-icon"></bui-arrow-left-lg>
            <span>Back</span>
          </button>
        </div>

        {/* Main content */}
        <div className="main-content">
          <h1 className="title">Send Bitcoin</h1>
          
          <div className="input-section">
            <div className="input-group">
              <label className="input-label">Destination</label>
              <div className={`input-field ${isValid ? 'valid' : 'invalid'}`}>
                <div className="input-content">
                  <bui-scan-lg className="input-icon success-icon"></bui-scan-lg>
                  <input
                    type="text"
                    value={destination}
                    onChange={handleInputChange}
                    className="text-input"
                    placeholder="Enter destination address"
                  />
                  <bui-arrow-right-lg className="input-icon"></bui-arrow-right-lg>
                </div>
              </div>
            </div>
            
            <div className="action-buttons">
              <bui-button
                ref={pasteButtonRef}
                style-type="outline"
                size="default"
                label="Paste"
                content="label+icon">
                <bui-clipboard-lg slot="icon"></bui-clipboard-lg>
              </bui-button>
              
              <bui-button
                ref={scanButtonRef}
                style-type="outline"
                size="default"
                label="Scan"
                content="label+icon">
                <bui-scan-lg slot="icon"></bui-scan-lg>
              </bui-button>
            </div>
          </div>
        </div>

        {/* Bottom navigation */}
        <div className="bottom-nav">
          <bui-button
            ref={continueButtonRef}
            style-type="filled"
            size="large"
            label="Continue"
            content="label+icon"
            disabled={!isValid}>
            <bui-arrow-right-lg slot="icon"></bui-arrow-right-lg>
          </bui-button>
          
          <bui-button
            ref={goBackButtonRef}
            style-type="outline"
            size="large"
            label="Go Back"
            content="icon+label">
            <bui-arrow-left-lg slot="icon"></bui-arrow-left-lg>
          </bui-button>
        </div>
      </div>
    </div>
  );
}

export default SendScreen; 