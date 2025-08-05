import { useState, useEffect, useRef } from 'react';
import 'bui/packages/ui/button.js';
import 'bui/packages/ui/button-cluster.js';
import 'bui/packages/ui/numpad-button.js';
import 'bui/packages/ui/bitcoin-value.js';
import 'bui/packages/ui/money-value.js';
import 'bui/packages/icons/dist/arrowLeft/lg.js';
import 'bui/packages/icons/dist/arrowDown/lg.js';
import 'bui/packages/icons/dist/arrowUp/lg.js';
import 'bui/packages/icons/dist/scan/lg.js';
import './WalletHome.css';

function WalletHome({ onBack, onSend }) {
  const [amount, setAmount] = useState('0');
  const [usdAmount, setUsdAmount] = useState('0');
  const numpadRefs = useRef({});
  const sendMaxButtonRef = useRef(null);
  const receiveButtonRef = useRef(null);
  const sendIconButtonRef = useRef(null);
  const sendButtonRef = useRef(null);

  const handleNumPadClick = (event) => {
    const { number, content } = event.detail;
    
    if (content === 'icon') {
      // Backspace functionality
      if (amount.length > 1) {
        const newAmount = amount.slice(0, -1);
        setAmount(newAmount);
        setUsdAmount(calculateUsdAmount(newAmount));
      } else {
        setAmount('0');
        setUsdAmount('0');
      }
    } else {
      // Number input
      if (amount === '0') {
        setAmount(number);
        setUsdAmount(calculateUsdAmount(number));
      } else {
        const newAmount = amount + number;
        setAmount(newAmount);
        setUsdAmount(calculateUsdAmount(newAmount));
      }
    }
  };

  const calculateUsdAmount = (btcAmount) => {
    // Mock conversion rate - in real app this would come from API
    const btcToUsd = 45000; // $45,000 per BTC
    const btcValue = parseFloat(btcAmount) / 100000000; // Convert satoshis to BTC
    return Math.round(btcValue * btcToUsd).toString();
  };

  const handleSendMax = () => {
    // Mock max amount - in real app this would be the wallet balance
    const maxAmount = '100000000'; // 1 BTC in satoshis
    setAmount(maxAmount);
    setUsdAmount(calculateUsdAmount(maxAmount));
  };

  const handleReceive = () => {
    // TODO: Navigate to receive screen
    console.log('Receive clicked');
  };

  const handleSend = () => {
    // Navigate to send screen with current amount
    onSend(amount);
  };

  useEffect(() => {
    // Add event listeners to all numpad buttons
    const numpadButtons = Object.values(numpadRefs.current);
    numpadButtons.forEach(button => {
      if (button) {
        button.addEventListener('numpad-click', handleNumPadClick);
      }
    });

    // Add event listeners to action buttons
    const sendMaxButton = sendMaxButtonRef.current;
    const receiveButton = receiveButtonRef.current;
    const sendIconButton = sendIconButtonRef.current;
    const sendButton = sendButtonRef.current;

    if (sendMaxButton) {
      sendMaxButton.addEventListener('click', handleSendMax);
    }
    if (receiveButton) {
      receiveButton.addEventListener('click', handleReceive);
    }
    if (sendIconButton) {
      sendIconButton.addEventListener('click', handleSend);
    }
    if (sendButton) {
      sendButton.addEventListener('click', handleSend);
    }

    return () => {
      numpadButtons.forEach(button => {
        if (button) {
          button.removeEventListener('numpad-click', handleNumPadClick);
        }
      });

      if (sendMaxButton) {
        sendMaxButton.removeEventListener('click', handleSendMax);
      }
      if (receiveButton) {
        receiveButton.removeEventListener('click', handleReceive);
      }
      if (sendIconButton) {
        sendIconButton.removeEventListener('click', handleSend);
      }
      if (sendButton) {
        sendButton.removeEventListener('click', handleSend);
      }
    };
  }, [amount]);

  const formatBtcAmount = (satoshis) => {
    const btc = parseFloat(satoshis) / 100000000;
    return `₿ ${btc.toFixed(8)}`;
  };

  return (
    <div className="wallet-home-container" data-theme="conduit" data-mode="light">
      <div className="content-wrapper">
        <div className="amount-section">
          <div className="amount-display">
            
            
            <div className="btc-amount">
              <bui-bitcoin-value format="bip177" amount={amount} />
            </div>
            <div className="usd-amount">
              <bui-money-value symbol="$" format="bip177" amount={usdAmount} />
            </div>
          </div>
          
          <bui-button
            ref={sendMaxButtonRef}
            style-type="outline"
            size="small"
            label="Send Max" />
        </div>

        <div className="numpad-section">
          <div className="numpad-grid">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
              <bui-numpad-button
                key={num}
                ref={el => numpadRefs.current[`num${num}`] = el}
                number={num.toString()}
                content="number">
              </bui-numpad-button>
            ))}
            
            {/* Empty space */}
            <div className="numpad-empty"></div>
            
            <bui-numpad-button
              ref={el => numpadRefs.current.num0 = el}
              number="0"
              content="number">
            </bui-numpad-button>
            
            <bui-numpad-button
              ref={el => numpadRefs.current.backspace = el}
              content="icon">
              <bui-arrow-left-lg slot="icon"></bui-arrow-left-lg>
            </bui-numpad-button>
          </div>
        </div>

        <div className="bottom-nav">
          <bui-button-cluster direction="horizontal">
            <bui-button
              ref={receiveButtonRef}
              style-type="outline"
              size="large"
              label="Receive"
              wide
              content="icon+label">
              <bui-arrow-down-lg slot="icon"></bui-arrow-down-lg>
            </bui-button>
            
            <bui-button
              ref={sendIconButtonRef}
              style-type="filled"
              size="large"
              content="icon">
              <bui-scan-lg slot="icon"></bui-scan-lg>
            </bui-button>
            
            <bui-button
              ref={sendButtonRef}
              style-type="outline"
              size="large"
              label="Send"
              wide
              content="label+icon">
              <bui-arrow-up-lg slot="icon"></bui-arrow-up-lg>
            </bui-button>
          </bui-button-cluster>
        </div>
      </div>
    </div>
  );
}

export default WalletHome; 