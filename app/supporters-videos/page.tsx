import { supportersVideos } from '@/app/api/supporters/data';

export const metadata = {
  title: 'Supporters Videos | Hi-NOMADY Official',
  description: 'Hi-NOMADY の Supporters Videos をまとめて視聴できます。',
};

export default function SupportersVideosPage() {
  const [latestVideo, ...otherVideos] = supportersVideos;

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
            <VideoFrame src={latestVideo} title="Latest supporters video" />
          </section>
        ) : null}

        <section>
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-extrabold">Videos</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {supportersVideos.length} 本の動画
              </p>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {otherVideos.map((videoUrl, index) => (
              <article
                key={videoUrl}
                className="group overflow-hidden rounded-xl border border-white/20 bg-black shadow shadow-black/40 transition-colors hover:bg-white/5"
              >
                <VideoFrame
                  src={videoUrl}
                  title={`Supporters video ${index + 2}`}
                  loading="lazy"
                />
                <div className="p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                    Supporters Video
                  </p>
                  <h3 className="mt-1 text-lg font-extrabold">
                    Video #{String(index + 2).padStart(2, '0')}
                  </h3>
                </div>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}

function VideoFrame({
  src,
  title,
  loading,
}: {
  src: string;
  title: string;
  loading?: 'eager' | 'lazy';
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/20 bg-black">
      <iframe
        className="aspect-video w-full"
        src={src}
        title={title}
        loading={loading}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
