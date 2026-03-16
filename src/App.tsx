import "./App.css";
import { useEffect, useState } from "react";
import { content } from "./content";
import MemoryTimeline from "./components/MemoryTimeline";
import MediaGallery from "./components/MediaGallery";

const popupMessages = [
  "Sometimes you make me so sad, but even then I have never changed my mind about spending the rest of my life with you.",
  "I still want us to get married, build our home, and choose each other every single day.",
  "Happy Birthday, my love. You are still my forever, and I cannot wait to call you my wife.",
];

function App() {
  const [popupIndex, setPopupIndex] = useState(0);
  const [isPopupVisible, setIsPopupVisible] = useState(true);

  useEffect(() => {
    let hideTimer = window.setTimeout(() => {
      setIsPopupVisible(false);
    }, 2200);

    const interval = window.setInterval(() => {
      setPopupIndex(
        (previousIndex) => (previousIndex + 1) % popupMessages.length,
      );
      setIsPopupVisible(true);

      window.clearTimeout(hideTimer);
      hideTimer = window.setTimeout(() => {
        setIsPopupVisible(false);
      }, 2200);
    }, 4000);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(hideTimer);
    };
  }, []);

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

      <aside
        className={`lovePopup ${isPopupVisible ? "isVisible" : ""}`}
        role="status"
        aria-live="polite"
      >
        <p className="lovePopupBadge">For My Future Wife</p>
        <p className="lovePopupText">{popupMessages[popupIndex]}</p>
      </aside>
    </div>
  );
}

export default App;
