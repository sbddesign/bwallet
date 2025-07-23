import { useState, useEffect, useRef } from 'react';
import 'bui/packages/ui/toggle.js';
import 'bui/packages/ui/button.js';
import 'bui/packages/icons/dist/arrowLeft/lg.js';
import 'bui/packages/icons/dist/arrowRight/lg.js';
import './BeforeWeBegin.css';

function BeforeWeBegin({ onBack, onNext }) {
  const [toggle1Active, setToggle1Active] = useState(false);
  const [toggle2Active, setToggle2Active] = useState(false);
  const toggle1Ref = useRef(null);
  const toggle2Ref = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const toggle1 = toggle1Ref.current;
    const toggle2 = toggle2Ref.current;
    const button = buttonRef.current;

    const handleToggle1 = (event) => {
      setToggle1Active(event.detail.active);
    };

    const handleToggle2 = (event) => {
      setToggle2Active(event.detail.active);
    };

    const handleButtonClick = () => {
      if (isNextEnabled) {
        onNext();
      }
    };

    if (toggle1) {
      toggle1.addEventListener('toggle', handleToggle1);
    }
    if (toggle2) {
      toggle2.addEventListener('toggle', handleToggle2);
    }
    if (button) {
      button.addEventListener('click', handleButtonClick);
    }

    return () => {
      if (toggle1) {
        toggle1.removeEventListener('toggle', handleToggle1);
      }
      if (toggle2) {
        toggle2.removeEventListener('toggle', handleToggle2);
      }
      if (button) {
        button.removeEventListener('click', handleButtonClick);
      }
    };
  }, [onNext]);

  const isNextEnabled = toggle1Active && toggle2Active;

  return (
    <div className="before-we-begin-container" data-theme="conduit" data-mode="light">
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
          <h1 className="title">Before we continue</h1>
          
          <div className="toggle-section">
            <div className="toggle-item">
              <div className="toggle-text">
                <p>
                  With bitcoin, you are your own bank. No one else has access
                  to your private keys.
                </p>
              </div>
              <bui-toggle 
                ref={toggle1Ref}
                size="small" 
                className="toggle-component">
              </bui-toggle>
            </div>
            
            <div className="toggle-item">
              <div className="toggle-text">
                <p>
                  If you lose access to this app, and the backup we will help
                  you create, your bitcoin cannot be recovered.
                </p>
              </div>
              <bui-toggle 
                ref={toggle2Ref}
                size="small" 
                className="toggle-component">
              </bui-toggle>
            </div>
          </div>
        </div>

        {/* Bottom navigation */}
        <div className="bottom-nav">
          <bui-button
            ref={buttonRef}
            style-type="filled"
            size="large"
            label="Next"
            content="label+icon"
            disabled={!isNextEnabled}>
            <bui-arrow-right-lg slot="icon"></bui-arrow-right-lg>
          </bui-button>
        </div>
      </div>
    </div>
  );
}

export default BeforeWeBegin; 