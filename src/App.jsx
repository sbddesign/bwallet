import './App.css'
import 'bui/packages/ui/tokens.css';
import 'bui/packages/ui/button.js';
import 'bui/packages/icons/dist/arrowRight/lg.js';

function App() {
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
              style-type="filled" 
              size="large" 
              label="Create new wallet"
              content="label+icon"
            >
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
