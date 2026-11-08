import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Player} from '@remotion/player';
import {canRenderMediaOnWeb, renderMediaOnWeb} from '@remotion/web-renderer';
import {projectRegistry, type ProjectRegistryEntry} from '../src/project-registry';

const formatDuration = (project: ProjectRegistryEntry) => {
  const seconds = Math.round(project.durationInFrames / project.fps);
  return `${seconds} detik`;
};

const statusLabel: Record<ProjectRegistryEntry['status'], string> = {
  idea: 'Idea',
  draft: 'Draft',
  review: 'Review',
  published: 'Published',
};

type RenderState = 'idle' | 'checking' | 'ready' | 'rendering' | 'done' | 'unsupported' | 'error';

export const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(projectRegistry[0]?.id ?? '');
  const [renderState, setRenderState] = useState<RenderState>('checking');
  const [renderProgress, setRenderProgress] = useState(0);
  const [renderMessage, setRenderMessage] = useState('Memeriksa kemampuan browser...');
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const filteredProjects = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return projectRegistry;

    return projectRegistry.filter((project) =>
      [project.title, project.coverText, project.category, project.id]
        .join(' ')
        .toLowerCase()
        .includes(normalized),
    );
  }, [query]);

  const selected =
    projectRegistry.find((project) => project.id === selectedId) ?? projectRegistry[0];

  useEffect(() => {
    if (!selected) return;

    let active = true;

    const check = async () => {
      setRenderState('checking');
      setRenderMessage('Memeriksa kemampuan browser...');
      setRenderProgress(0);

      try {
        const result = await canRenderMediaOnWeb({
          width: selected.width,
          height: selected.height,
          container: 'mp4',
          videoCodec: 'h264',
          muted: true,
        });

        if (!active) return;

        if (result.canRender) {
          setRenderState('ready');
          setRenderMessage('Browser siap render MP4.');
        } else {
          const errors = result.issues
            .filter((issue) => issue.severity === 'error')
            .map((issue) => issue.message)
            .join(' ');
          setRenderState('unsupported');
          setRenderMessage(errors || 'Browser ini belum mendukung render MP4.');
        }
      } catch (error) {
        if (!active) return;
        setRenderState('error');
        setRenderMessage(error instanceof Error ? error.message : 'Gagal memeriksa browser.');
      }
    };

    check();

    return () => {
      active = false;
    };
  }, [selected]);

  useEffect(() => {
    return () => {
      if (downloadUrl) URL.revokeObjectURL(downloadUrl);
      abortControllerRef.current?.abort();
    };
  }, [downloadUrl]);

  if (!selected) {
    return <div className="empty-state">Belum ada project Remotion.</div>;
  }

  const startRender = async () => {
    if (renderState === 'rendering') return;

    if (downloadUrl) {
      URL.revokeObjectURL(downloadUrl);
      setDownloadUrl(null);
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;
    setRenderState('rendering');
    setRenderProgress(0);
    setRenderMessage('Menyiapkan frame...');

    try {
      const result = await renderMediaOnWeb({
        composition: {
          id: selected.compositionId,
          component: selected.component,
          width: selected.width,
          height: selected.height,
          fps: selected.fps,
          durationInFrames: selected.durationInFrames,
        },
        container: 'mp4',
        videoCodec: 'h264',
        muted: true,
        signal: controller.signal,
        onProgress: ({progress}) => {
          const normalized = Math.max(0, Math.min(1, progress));
          setRenderProgress(normalized);
          setRenderMessage(`Rendering... ${Math.round(normalized * 100)}%`);
        },
      });

      const blob = await result.getBlob();
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
      setRenderProgress(1);
      setRenderState('done');
      setRenderMessage('Render selesai. MP4 siap di-download.');
    } catch (error) {
      if (controller.signal.aborted) {
        setRenderState('ready');
        setRenderProgress(0);
        setRenderMessage('Render dibatalkan.');
        return;
      }

      setRenderState('error');
      setRenderMessage(error instanceof Error ? error.message : 'Render gagal.');
    } finally {
      abortControllerRef.current = null;
    }
  };

  const cancelRender = () => {
    abortControllerRef.current?.abort();
  };

  const downloadFilename = `${selected.id}.mp4`;

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-block">
          <div className="eyebrow">VIDEO RENDERER</div>
          <h1>Coba Dipikir</h1>
          <p>Preview, render, dan download episode tanpa local setup.</p>
        </div>

        <label className="search-box">
          <span>Cari episode</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="gratis ongkir, belanja..."
          />
        </label>

        <div className="project-count">{filteredProjects.length} episode</div>

        <div className="project-list">
          {filteredProjects.map((project) => (
            <button
              key={project.id}
              className={`project-card ${project.id === selected.id ? 'active' : ''}`}
              onClick={() => {
                setSelectedId(project.id);
                if (downloadUrl) {
                  URL.revokeObjectURL(downloadUrl);
                  setDownloadUrl(null);
                }
              }}
              type="button"
            >
              <div className="project-card-topline">
                <span>#{String(project.episode).padStart(3, '0')}</span>
                <span className={`status status-${project.status}`}>
                  {statusLabel[project.status]}
                </span>
              </div>
              <strong>{project.title}</strong>
              <small>{project.coverText}</small>
            </button>
          ))}
        </div>
      </aside>

      <main className="workspace">
        <header className="workspace-header">
          <div>
            <div className="eyebrow">
              EPISODE #{String(selected.episode).padStart(3, '0')}
            </div>
            <h2>{selected.title}</h2>
            <p>{selected.coverText}</p>
          </div>

          <div className="header-actions">
            <a
              className="button button-secondary"
              href={`https://github.com/nabillazachra/coba-dipikir/tree/main/${selected.folder}`}
              target="_blank"
              rel="noreferrer"
            >
              Buka files
            </a>
          </div>
        </header>

        <div className="workspace-grid">
          <section className="preview-panel panel">
            <div className="panel-heading">
              <div>
                <span className="panel-kicker">PREVIEW</span>
                <h3>Remotion Player</h3>
              </div>
              <span className="ratio-badge">9:16</span>
            </div>

            <div className="phone-stage">
              <div className="player-wrap">
                <Player
                  component={selected.component}
                  durationInFrames={selected.durationInFrames}
                  fps={selected.fps}
                  compositionWidth={selected.width}
                  compositionHeight={selected.height}
                  controls
                  loop
                  style={{width: '100%', height: '100%'}}
                />
              </div>
            </div>
          </section>

          <aside className="details-column">
            <section className="panel details-panel">
              <div className="panel-heading compact">
                <div>
                  <span className="panel-kicker">VIDEO</span>
                  <h3>Output</h3>
                </div>
              </div>

              <dl className="metadata-grid">
                <div><dt>Status</dt><dd>{statusLabel[selected.status]}</dd></div>
                <div><dt>Durasi</dt><dd>{formatDuration(selected)}</dd></div>
                <div><dt>Resolusi</dt><dd>{selected.width} × {selected.height}</dd></div>
                <div><dt>FPS</dt><dd>{selected.fps}</dd></div>
                <div><dt>Format</dt><dd>MP4 · H.264</dd></div>
                <div><dt>Composition</dt><dd>{selected.compositionId}</dd></div>
              </dl>
            </section>

            <section className="panel render-panel">
              <span className="panel-kicker">BROWSER RENDER</span>
              <h3>Render MP4</h3>
              <p>
                Video dirender langsung di browser menggunakan Remotion. Tidak perlu Node,
                FFmpeg, atau Remotion Studio di laptop.
              </p>

              <div className={`render-status render-status-${renderState}`}>
                <div className="render-status-row">
                  <span>{renderMessage}</span>
                  {renderState === 'rendering' ? <strong>{Math.round(renderProgress * 100)}%</strong> : null}
                </div>
                <div className="progress-track">
                  <div className="progress-fill" style={{width: `${Math.round(renderProgress * 100)}%`}} />
                </div>
              </div>

              {renderState === 'rendering' ? (
                <button className="button button-secondary full-width" type="button" onClick={cancelRender}>
                  Batalkan render
                </button>
              ) : (
                <button
                  className="button button-primary full-width"
                  type="button"
                  onClick={startRender}
                  disabled={renderState === 'checking' || renderState === 'unsupported'}
                >
                  Render video
                </button>
              )}

              {downloadUrl ? (
                <a
                  className="button button-download full-width"
                  href={downloadUrl}
                  download={downloadFilename}
                >
                  Download MP4
                </a>
              ) : null}

              {renderState === 'unsupported' || renderState === 'error' ? (
                <a
                  className="button button-secondary full-width"
                  href="https://github.com/nabillazachra/coba-dipikir/actions/workflows/render-video.yml"
                  target="_blank"
                  rel="noreferrer"
                >
                  Gunakan cloud render
                </a>
              ) : null}

              <small className="helper-text">
                Untuk episode tanpa audio, render saat ini dibuat muted. Audio bisa ditambahkan
                kemudian saat aset voice-over dan musik sudah tersedia.
              </small>
            </section>
          </aside>
        </div>
      </main>
    </div>
  );
};
