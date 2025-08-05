import { useState, useEffect, useRef } from 'react';
import init, { PaymentParams } from '@mutinywallet/waila-wasm';
import 'bui/packages/ui/button.js';
import 'bui/packages/ui/input.js';
import 'bui/packages/icons/dist/arrowLeft/lg.js';
import 'bui/packages/icons/dist/arrowRight/lg.js';
import 'bui/packages/icons/dist/scan/lg.js';
import 'bui/packages/icons/dist/clipboard/lg.js';
import 'bui/packages/icons/dist/crossCircle/lg.js';
import './SendScreen.css';

function SendScreen({ onBack, onContinue, amount }) {
  const [destination, setDestination] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [validationMood, setValidationMood] = useState('neutral');
  const [bitcoinWailaReady, setBitcoinWailaReady] = useState(false);
  const pasteButtonRef = useRef(null);
  const scanButtonRef = useRef(null);
  const continueButtonRef = useRef(null);
  const goBackButtonRef = useRef(null);
  const inputRef = useRef(null);

  // Initialize bitcoin-waila WASM module
  useEffect(() => {
    const initWasm = async () => {
      try {
        await init();
        setBitcoinWailaReady(true);
        console.log('Bitcoin WAILA initialized successfully');
      } catch (error) {
        console.error('Failed to initialize Bitcoin WAILA:', error);
      }
    };
    
    initWasm();
  }, []);

  // Validate Bitcoin address/URI using bitcoin-waila
  const validateBitcoinFormat = (value) => {
    if (!bitcoinWailaReady || !value || value.trim() === '') {
      setIsValid(false);
      setValidationError('');
      setValidationMood('neutral');
      return;
    }

    try {
      // Attempt to parse the input with bitcoin-waila
      const params = new PaymentParams(value.trim());
      
      // If we get here, the format is valid
      setIsValid(true);
      setValidationError('');
      setValidationMood('success');
      console.log('Valid Bitcoin format detected:', params);
    } catch (error) {
      // Invalid format
      setIsValid(false);
      setValidationError('Unsupported format. Please enter a valid Bitcoin address, BIP-21 URI, Lightning invoice, or other supported format.');
      setValidationMood('danger');
      console.log('Invalid Bitcoin format:', error?.message || error || 'Unknown validation error');
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setDestination(text);
      validateBitcoinFormat(text);
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
    console.log('Input event:', event);
    console.log('Event detail:', event.detail);
    console.log('Event target:', event.target);
    
    let value = '';
    if (event.detail && event.detail.value !== undefined) {
      value = event.detail.value;
    } else if (event.target && event.target.value !== undefined) {
      value = event.target.value;
    }
    
    console.log('Extracted value:', value);
    setDestination(value);
    validateBitcoinFormat(value);
  };

  const handleClearInput = () => {
    setDestination('');
    setIsValid(false);
    setValidationError('');
    setValidationMood('neutral');
  };

  useEffect(() => {
    const pasteButton = pasteButtonRef.current;
    const scanButton = scanButtonRef.current;
    const continueButton = continueButtonRef.current;
    const goBackButton = goBackButtonRef.current;
    const input = inputRef.current;

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
    if (input) {
      input.addEventListener('input', handleInputChange);
      input.addEventListener('icon-right-click', handleClearInput);
      // Ensure the input value is properly set
      input.value = destination;
      
      // Set the message attribute for error display
      if (validationError) {
        input.setAttribute('message', validationError);
      } else {
        input.removeAttribute('message');
      }
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
      if (input) {
        input.removeEventListener('input', handleInputChange);
        input.removeEventListener('icon-right-click', handleClearInput);
      }
    };
  }, [isValid, destination, validationError]);

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
            <bui-input
              ref={inputRef}
              label="Destination"
              value={destination}
              placeholder="Enter destination address"
              mood={validationMood}
              message={validationError}
              show-icon-right
              icon-right-action="clear"
              wide>
              <bui-cross-circle-lg slot="icon-right"></bui-cross-circle-lg>
            </bui-input>
            
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
            disabled={!isValid}
            wide>
            <bui-arrow-right-lg slot="icon"></bui-arrow-right-lg>
          </bui-button>
          
          <bui-button
            ref={goBackButtonRef}
            style-type="outline"
            size="large"
            label="Go Back"
            content="icon+label"
            wide>
            <bui-arrow-left-lg slot="icon"></bui-arrow-left-lg>
          </bui-button>
        </div>
      </div>
    </div>
  );
}

export default SendScreen; 