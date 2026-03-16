import "./MediaGallery.css";
import { useEffect, useRef } from "react";

type MediaKind = "image" | "video";

type MediaItem = {
  url: string;
  path: string;
  kind: MediaKind;
  label: string;
  caption: string;
};

const videoCaptions = [
  "Mamacita, I replay this because hearing your joy feels like medicine to my soul.",
  "Denise, watching you exist is one of my favorite ways to thank God.",
  "Mamacita, this is the kind of moment that makes forever feel too short.",
  "I love you, Denise, in all the seconds between here and eternity.",
  "Mamacita, your presence quiets every fear I carry.",
  "Denise Achana Wenawome, you make my heart feel seen and safe.",
  "Mamacita, I could watch you laugh for a lifetime and still want one more minute.",
  "Denise, even my hardest days soften when I hear your voice.",
  "Mamacita, this is the love I used to write about before I ever met you.",
  "Denise, every frame here is my heart saying yes to you again.",
  "Mamacita, on repeat because loving you never gets old.",
  "Denise, if forever has a name, it is yours in my mouth.",
];

const imageCaptions = [
  "Mamacita, you look like love made visible.",
  "Denise, you are the prettiest peace my heart has ever touched.",
  "Mamacita, I fall in love with you here all over again.",
  "Denise Achana Wenawome, you make my heart feel protected and understood.",
  "Mamacita, your smile is my sunrise after every dark night.",
  "Denise, you turn simple moments into treasures I would never trade.",
  "Mamacita, happiness looks so good on us.",
  "Denise, being yours is my safest address.",
  "Mamacita, this memory is stitched into my soul forever.",
  "Denise, you are my softness and my courage.",
  "Mamacita, your eyes speak a language my heart is fluent in.",
  "Denise, you make love feel pure and unafraid.",
  "Mamacita, in every season, I remain grateful for you.",
  "Denise Achana Wenawome, you are my answered prayer with a heartbeat.",
  "Mamacita, I could look at you forever and still ask for one more look.",
  "Denise, you make ordinary days feel unforgettable.",
  "Mamacita, my love for you is louder than anything I can write.",
  "Denise, you are the sweetest chapter and the best ending.",
  "Mamacita, your beauty is gentle and endlessly deep.",
  "Denise, you are the love I will guard with my whole heart.",
  "Mamacita, with you I feel both home and wonder.",
  "Denise, you are still my favorite yes.",
  "Mamacita, this photo is proof that miracles can wear a smile.",
  "Denise, I will always be proud to love you publicly and privately.",
  "Mamacita, I choose you in joy, in storms, in everything.",
  "Denise, loving you is my heart's favorite rhythm.",
  "Mamacita, your beauty is rare because your heart is rare.",
  "Denise Achana Wenawome, every day with you makes my love deeper.",
];

const mediaByPath = import.meta.glob(
  "../assets/**/*.{jpg,jpeg,png,webp,gif,mp4,webm,mov}",
  { eager: true, query: "?url", import: "default" },
);

const items: MediaItem[] = (() => {
  const sorted = Object.entries(mediaByPath)
    .map(([path, url]) => ({ path, url: String(url) }))
    .sort((a, b) => a.path.localeCompare(b.path));

  let videoIndex = 0;
  let imageIndex = 0;
  return sorted.map(({ path, url }) => {
    const kind: MediaKind = isVideo(path) ? "video" : "image";
    const label = prettifyLabel(path);

    const caption =
      kind === "video"
        ? (videoCaptions[videoIndex++] ??
          `Mamacita, I love this video — ${videoIndex}.`)
        : (imageCaptions[imageIndex++] ??
          `Mamacita, I love this photo — ${imageIndex}.`);

    return {
      url,
      path,
      kind,
      label,
      caption,
    };
  });
})();

export default function MediaGallery() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const visibleVideosRef = useRef<Set<HTMLVideoElement>>(new Set());

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const videos = Array.from(section.querySelectorAll("video"));
    if (videos.length === 0) return;

    const tryPlay = (video: HTMLVideoElement) => {
      video.muted = true;
      video.defaultMuted = true;
      video.volume = 0;
      video.autoplay = true;
      video.loop = true;
      video.playsInline = true;
      video.setAttribute("muted", "");
      video.setAttribute("playsinline", "");

      // If metadata hasn't loaded yet, nudging load() helps some Android devices.
      if (video.readyState === 0) {
        try {
          video.load();
        } catch {
          // ignore
        }
      }

      const playPromise = video.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => {
          // Autoplay can be blocked until a user gesture.
        });
      }
    };

    const kickVisibleVideos = () => {
      for (const video of visibleVideosRef.current) {
        tryPlay(video);
      }
    };

    // iOS/Safari often requires a user gesture even when muted.
    window.addEventListener("pointerdown", kickVisibleVideos, { once: true });
    window.addEventListener("touchstart", kickVisibleVideos, {
      once: true,
      passive: true,
    });

    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        kickVisibleVideos();
      } else {
        for (const video of visibleVideosRef.current) {
          video.pause();
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            visibleVideosRef.current.add(video);
            tryPlay(video);
          } else {
            visibleVideosRef.current.delete(video);
            video.pause();
          }
        }
      },
      {
        threshold: 0.2,
        rootMargin: "200px 0px",
      },
    );

    for (const video of videos) {
      // Apply required autoplay-friendly settings upfront.
      video.muted = true;
      video.autoplay = true;
      video.loop = true;
      video.playsInline = true;
      video.setAttribute("muted", "");
      video.setAttribute("playsinline", "");
      observer.observe(video);
    }

    return () => {
      window.removeEventListener("pointerdown", kickVisibleVideos);
      window.removeEventListener("touchstart", kickVisibleVideos);
      document.removeEventListener("visibilitychange", handleVisibility);
      observer.disconnect();
      visibleVideosRef.current.clear();
    };
  }, []);

  return (
    <section
      className="gallery"
      aria-label="All photos and videos"
      ref={sectionRef}
    >
      <header className="galleryHeader">
        <h2 className="galleryTitle">Every memory</h2>
        <p className="gallerySubtitle">
          Denise Achana Wenawome — my Mamacita. I wanted every photo and every
          video here.
        </p>
      </header>

      <ul className="galleryGrid">
        {items.map((item) => (
          <li className="galleryItem" key={item.path}>
            <article className="galleryCard">
              <div className="galleryMedia">
                {item.kind === "video" ? (
                  <video
                    className="galleryVideo"
                    src={item.url}
                    autoPlay
                    loop
                    muted
                    playsInline
                    controls
                    preload="metadata"
                    onCanPlay={(e) => {
                      const video = e.currentTarget;
                      if (visibleVideosRef.current.has(video)) {
                        const p = video.play();
                        if (p && typeof p.catch === "function")
                          p.catch(() => {});
                      }
                    }}
                    onLoadedMetadata={(e) => {
                      // Helps with browsers that need the media loaded first.
                      const video = e.currentTarget;
                      if (visibleVideosRef.current.has(video)) {
                        const p = video.play();
                        if (p && typeof p.catch === "function")
                          p.catch(() => {});
                      }
                    }}
                  />
                ) : (
                  <img
                    className="galleryImage"
                    src={item.url}
                    alt={item.label}
                    loading="lazy"
                  />
                )}
              </div>

              <div className="galleryBody">
                <h3 className="galleryLabel">{item.label}</h3>
                <p className="galleryCaption">{item.caption}</p>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}

function isVideo(path: string) {
  return /\.(mp4|webm|mov)$/i.test(path);
}

function prettifyLabel(path: string) {
  const file = path.split("/").pop() ?? path;
  const withoutExt = file.replace(/\.[^.]+$/, "");
  return withoutExt
    .replace(/^WhatsApp\s+/i, "")
    .replace(/\s+at\s+/i, " • ")
    .replace(/\s+PM/i, " PM")
    .replace(/\s+AM/i, " AM");
}
