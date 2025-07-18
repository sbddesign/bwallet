import './App.css'
import 'bui/packages/ui/tokens.css';
import 'bui/packages/ui/button.js';

function App() {
  return (
    <div className="app-container" data-theme="bitcoindesign" data-mode="light">
      <main className="landing-main">
        <h1>Bitcoin Wallet</h1>
        <p className="subtitle">A simple bitcoin wallet for your enjoyment.</p>
        <div className="button-group">
          dfgdfg
          <bui-button
            style-type="filled" 
            size="large" 
            label="Get Started" />
          <bui-button
            style-type="outline" 
            size="large" 
            label="Restore existing wallet" />
        </div>
      </main>
      <footer className="footer">
        Your wallet, your coins. 100% open source & open design.
      </footer>
    </div>
  )
}

export default App
