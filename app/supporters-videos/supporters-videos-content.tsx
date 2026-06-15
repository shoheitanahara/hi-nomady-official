'use client';

import { useEffect, useMemo, useRef } from 'react';

const YOUTUBE_PLAYING_STATE = 1;
const YOUTUBE_IFRAME_API_SRC = 'https://www.youtube.com/iframe_api';

type YouTubePlayer = {
  pauseVideo?: () => void;
  destroy?: () => void;
};

type YouTubeReadyEvent = {
  target: YouTubePlayer;
};

type YouTubeStateChangeEvent = {
  data: number;
  target: YouTubePlayer;
};

type YouTubePlayerConstructor = new (
  elementId: string,
  options: {
    events: {
      onReady: (event: YouTubeReadyEvent) => void;
      onStateChange: (event: YouTubeStateChangeEvent) => void;
    };
  }
) => YouTubePlayer;

declare global {
  interface Window {
    YT?: {
      Player: YouTubePlayerConstructor;
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

let iframeApiPromise: Promise<void> | null = null;

function loadYouTubeIframeApi() {
  if (window.YT?.Player) {
    return Promise.resolve();
  }

  if (iframeApiPromise) {
    return iframeApiPromise;
  }

  iframeApiPromise = new Promise((resolve) => {
    const previousReadyCallback = window.onYouTubeIframeAPIReady;

    window.onYouTubeIframeAPIReady = () => {
      previousReadyCallback?.();
      resolve();
    };

    const hasScript = document.querySelector(
      `script[src="${YOUTUBE_IFRAME_API_SRC}"]`
    );

    if (!hasScript) {
      const script = document.createElement('script');
      script.src = YOUTUBE_IFRAME_API_SRC;
      script.async = true;
      document.body.appendChild(script);
    }
  });

  return iframeApiPromise;
}

function getControllableVideoUrl(src: string) {
  const videoUrl = new URL(src);
  videoUrl.searchParams.set('enablejsapi', '1');
  return videoUrl.toString();
}

interface SupportersVideosContentProps {
  videos: string[];
}

export default function SupportersVideosContent({
  videos,
}: SupportersVideosContentProps) {
  const playerRefs = useRef<YouTubePlayer[]>([]);
  const readyPlayerRefs = useRef<Set<YouTubePlayer>>(new Set());
  const iframeIds = useMemo(
    () => videos.map((_, index) => `supporters-video-${index}`),
    [videos]
  );
  const [latestVideo, ...otherVideos] = videos;

  useEffect(() => {
    let isMounted = true;
    const readyPlayers = readyPlayerRefs.current;

    loadYouTubeIframeApi().then(() => {
      if (!isMounted || !window.YT?.Player) {
        return;
      }

      playerRefs.current = iframeIds.map(
        (iframeId) =>
          new window.YT!.Player(iframeId, {
            events: {
              onReady: (event) => {
                readyPlayers.add(event.target);
              },
              onStateChange: (event) => {
                if (event.data !== YOUTUBE_PLAYING_STATE) {
                  return;
                }

                playerRefs.current.forEach((player) => {
                  if (
                    player !== event.target &&
                    readyPlayers.has(player) &&
                    typeof player.pauseVideo === 'function'
                  ) {
                    player.pauseVideo();
                  }
                });
              },
            },
          })
      );
    });

    return () => {
      isMounted = false;
      playerRefs.current.forEach((player) => {
        if (typeof player.destroy === 'function') {
          player.destroy();
        }
      });
      playerRefs.current = [];
      readyPlayers.clear();
    };
  }, [iframeIds]);

  return (
    <main className="min-h-screen px-4 py-24 sm:px-8 lg:px-12">
      <section className="mx-auto w-full max-w-6xl">
        <div className="mb-8">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-red-500">
            Hi-NOMADY
          </p>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Supporters Videos
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
            応援してくれる皆さんが投稿してくれているライブ映像や関連動画をまとめています。
            いつも応援ありがとうございます。ぜひ動画をチェックして、Hi-NOMADYのライブの空気を広めてもらえたら嬉しいです。
          </p>
        </div>

        {latestVideo ? (
          <section className="mb-10">
            <div className="mb-3 flex items-center gap-3">
              <span className="rounded-full bg-red-600 px-3 py-1 text-xs font-extrabold uppercase tracking-[0.2em] text-white">
                Latest
              </span>
              <h2 className="text-xl font-extrabold">最新動画</h2>
            </div>
            <VideoFrame
              id={iframeIds[0]}
              src={latestVideo}
              title="Latest supporters video"
            />
          </section>
        ) : null}

        <section>
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-extrabold">Videos</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {videos.length} 本の動画
              </p>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {otherVideos.map((videoUrl, index) => {
              const videoNumber = index + 2;

              return (
                <article
                  key={videoUrl}
                  className="group overflow-hidden rounded-xl border border-white/20 bg-black shadow shadow-black/40 transition-colors hover:bg-white/5"
                >
                  <VideoFrame
                    id={iframeIds[index + 1]}
                    src={videoUrl}
                    title={`Supporter&apos;s video ${videoNumber}`}
                    loading="lazy"
                  />
                </article>
              );
            })}
          </div>
        </section>
      </section>
    </main>
  );
}

function VideoFrame({
  id,
  src,
  title,
  loading,
}: {
  id: string;
  src: string;
  title: string;
  loading?: 'eager' | 'lazy';
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/20 bg-black">
      <iframe
        id={id}
        className="aspect-video w-full"
        src={getControllableVideoUrl(src)}
        title={title}
        loading={loading}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
