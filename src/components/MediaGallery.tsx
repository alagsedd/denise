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
  "Mamacita, I replay this because it feels like home.",
  "Denise, the way you move through life is beautiful to watch.",
  "Mamacita, this is my favorite kind of ‘us’.",
  "I love you, Denise — every second with you is a gift.",
  "Mamacita, your vibe is my peace.",
  "Denise Achana Wenawome, you make my heart smile.",
  "Mamacita, I could watch you laugh forever.",
  "Denise, you’re the sweetest part of my day.",
  "Mamacita, this is the kind of love I prayed for.",
  "Denise, you’re my favorite memory in motion.",
  "Mamacita, on repeat — because I never get tired of you.",
  "Denise, you’re my forever.",
];

const imageCaptions = [
  "Mamacita, you look like love in real life.",
  "Denise, you’re the prettiest peace I’ve ever known.",
  "Mamacita, I fall for you all over again here.",
  "Denise Achana Wenawome, you make my heart feel safe.",
  "Mamacita, your smile is my favorite sunrise.",
  "Denise, you make the simple moments feel expensive.",
  "Mamacita, I love the way we look when we’re happy.",
  "Denise, being yours is my favorite place to be.",
  "Mamacita, this is the kind of memory I keep forever.",
  "Denise, you’re my softness and my strength.",
  "Mamacita, I love the way your eyes tell the truth.",
  "Denise, you make love feel gentle.",
  "Mamacita, I’m grateful for you in every timeline.",
  "Denise Achana Wenawome, you’re my answered prayer.",
  "Mamacita, you’re my favorite view, every day.",
  "Denise, you turn ordinary into unforgettable.",
  "Mamacita, I love you louder than words.",
  "Denise, you’re the sweetest chapter in my life.",
  "Mamacita, your beauty is calm, not noisy.",
  "Denise, you’re the kind of love I’ll protect.",
  "Mamacita, you feel like home and adventure.",
  "Denise, you’re my favorite yes.",
  "Mamacita, this photo is proof that love is real.",
  "Denise, I’m proud to love you openly.",
  "Mamacita, I choose you — again and again.",
  "Denise, you’re my heart’s favorite habit.",
  "Mamacita, you’re beautiful in a way that’s rare.",
  "Denise Achana Wenawome, I love you more than yesterday.",
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
                        if (p && typeof p.catch === "function") p.catch(() => {});
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
