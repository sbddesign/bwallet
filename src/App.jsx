import './App.css'

function App() {
  return (
    <div className="app-container">
      <main className="landing-main">
        <h1>Bitcoin Wallet</h1>
        <p className="subtitle">A simple bitcoin wallet for your enjoyment.</p>
        <div className="button-group">
          <button className="primary">Create a new wallet</button>
          <button className="secondary">Restore existing wallet</button>
        </div>
      </main>
      <footer className="footer">
        Your wallet, your coins. 100% open source & open design.
      </footer>
    </div>
  )
}

export default App
