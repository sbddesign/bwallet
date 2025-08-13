import { useRef, useEffect } from 'react';
import 'bui/packages/ui/button.js';
import 'bui/packages/icons/dist/arrowLeft/lg.js';
import 'bui/packages/icons/dist/arrowRight/lg.js';
import './SendReviewScreen.css';

function SendReviewScreen({ onBack, onSend, amount, destination }) {
  const sendButtonRef = useRef(null);
  const goBackButtonRef = useRef(null);

  // Format destination for display (truncate if too long)
  const formatDestination = (dest) => {
    if (!dest) return '';
    if (dest.length <= 20) return dest;
    return `${dest.substring(0, 8)} ... ${dest.substring(dest.length - 8)}`;
  };

  // Mock data for demonstration - in real app this would come from actual calculations
  const estimatedAmount = {
    bitcoin: '0.01 948 594',
    usd: '1,971.02'
  };

  const estimatedFee = {
    bitcoin: '0.00 001 023',
    usd: '1.03'
  };

  const maxFee = {
    bitcoin: '0.00 002 104',
    usd: '2.13'
  };

  const handleSend = () => {
    if (onSend) {
      onSend({ amount, destination, estimatedAmount, estimatedFee, maxFee });
    }
  };

  const handleGoBack = () => {
    if (onBack) {
      onBack();
    }
  };

  useEffect(() => {
    const sendButton = sendButtonRef.current;
    const goBackButton = goBackButtonRef.current;

    if (sendButton) {
      sendButton.addEventListener('click', handleSend);
    }
    if (goBackButton) {
      goBackButton.addEventListener('click', handleGoBack);
    }

    return () => {
      if (sendButton) {
        sendButton.removeEventListener('click', handleSend);
      }
      if (goBackButton) {
        goBackButton.removeEventListener('click', handleGoBack);
      }
    };
  }, [amount, destination]);

  return (
    <div className="send-review-screen-container" data-theme="conduit" data-mode="light">
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
          <h1 className="title">Review Before Sending</h1>
          
          <div className="review-details">
            {/* Estimated Amount */}
            <div className="detail-item">
              <div className="detail-header">
                <span className="detail-label">Estimated Amount</span>
              </div>
              <div className="detail-value">
                <span className="bitcoin-amount">~₿ {estimatedAmount.bitcoin}</span>
                <span className="usd-amount">~${estimatedAmount.usd}</span>
              </div>
              <p className="detail-note">This amount will have a fee subtracted from it.</p>
            </div>

            {/* Destination */}
            <div className="detail-item">
              <div className="detail-header">
                <span className="detail-label">Destination</span>
              </div>
              <div className="destination-value">
                <span className="destination-text">{formatDestination(destination)}</span>
              </div>
            </div>

            {/* Estimated Fee */}
            <div className="detail-item">
              <div className="detail-header">
                <span className="detail-label">Estimated Fee</span>
              </div>
              <div className="detail-value">
                <span className="bitcoin-amount">₿ {estimatedFee.bitcoin}</span>
                <span className="usd-amount">${estimatedFee.usd}</span>
              </div>
            </div>

            {/* Maximum Fee */}
            <div className="detail-item">
              <div className="detail-header">
                <span className="detail-label">Maximum Fee</span>
              </div>
              <div className="detail-value">
                <span className="bitcoin-amount">₿ {maxFee.bitcoin}</span>
                <span className="usd-amount">${maxFee.usd}</span>
              </div>
            </div>
          </div>

          <p className="warning-text">
            Please double-check these details as there is no way to reverse this payment.
          </p>
        </div>

        {/* Bottom navigation */}
        <div className="bottom-nav">
          <bui-button
            ref={sendButtonRef}
            style-type="filled"
            size="large"
            label="Send"
            content="label+icon"
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

export default SendReviewScreen; 