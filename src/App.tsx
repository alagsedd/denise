import "./App.css";
import { content } from "./content";
import MemoryTimeline from "./components/MemoryTimeline";
import MediaGallery from "./components/MediaGallery";

function App() {
  return (
    <div className="page">
      <header className="hero">
        <div className="container">
          <p className="kicker">A memory timeline</p>
          <h1 className="title">{content.title}</h1>
          <p className="intro">{content.intro}</p>
        </div>
      </header>

      <main className="main">
        <div className="container">
          <MemoryTimeline entries={content.entries} />
          <MediaGallery />
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <p className="footerNote">{content.footerNote}</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
