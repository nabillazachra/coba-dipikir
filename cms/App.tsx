import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Player} from '@remotion/player';
import {canRenderMediaOnWeb, renderMediaOnWeb} from '@remotion/web-renderer';
import {projectRegistry, type ProjectRegistryEntry} from '../src/project-registry';

type StudioTab = 'preview' | 'edit' | 'render';
type RenderState = 'idle' | 'checking' | 'ready' | 'rendering' | 'done' | 'unsupported' | 'error';

const statusLabel: Record<ProjectRegistryEntry['status'], string> = {
  idea: 'Idea',
  draft: 'Draft',
  review: 'Review',
  published: 'Published',
};

const formatDuration = (project: ProjectRegistryEntry) => {
  const seconds = Math.round(project.durationInFrames / project.fps);
  return `${seconds}s`;
};

const formatSceneTime = (frame: number, fps: number) => {
  const totalSeconds = frame / fps;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
};

const StudioIcon = ({type}: {type: StudioTab | 'library' | 'github'}) => {
  const paths: Record<string, React.ReactNode> = {
    preview: <><path d="M4 6.5h16v11H4z"/><path d="m10 9 5 3-5 3z"/></>,
    edit: <><path d="m4 16 9.7-9.7 4 4L8 20H4z"/><path d="m12.7 7.3 4 4"/></>,
    render: <><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M4 20h16"/></>,
    library: <><path d="M5 4h14v16H5z"/><path d="M9 4v16"/></>,
    github: <><path d="M9 19c-4.5 1.4-4.5-2.5-6-3"/><path d="M15 22v-3.9c0-1.1.1-1.6-.5-2.3 3.1-.3 6.5-1.5 6.5-7a5.4 5.4 0 0 0-1.5-3.8 5 5 0 0 0-.1-3.8S18.2.8 15 2.7a13 13 0 0 0-6 0C5.8.8 4.6 1.2 4.6 1.2A5 5 0 0 0 4.5 5 5.4 5.4 0 0 0 3 8.8c0 5.5 3.4 6.7 6.5 7-.6.6-.6 1.2-.5 2.3V22"/></>,
  };

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {paths[type]}
    </svg>
  );
};

export const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(projectRegistry[0]?.id ?? '');
  const [activeTab, setActiveTab] = useState<StudioTab>('preview');
  const [selectedSceneId, setSelectedSceneId] = useState(projectRegistry[0]?.scenes[0]?.id ?? '');
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

  const selectedScene =
    selected?.scenes.find((scene) => scene.id === selectedSceneId) ?? selected?.scenes[0];

  useEffect(() => {
    if (!selected) return;

    setSelectedSceneId(selected.scenes[0]?.id ?? '');
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
          setRenderMessage(errors || 'Browser belum mendukung render MP4.');
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

  const selectProject = (id: string) => {
    setSelectedId(id);
    setActiveTab('preview');
    if (downloadUrl) {
      URL.revokeObjectURL(downloadUrl);
      setDownloadUrl(null);
    }
  };

  return (
    <div className="studio-shell">
      <aside className="studio-sidebar">
        <div className="studio-brand">
          <div className="brand-mark">( )</div>
          <div>
            <strong>Coba Dipikir</strong>
            <span>Content Studio</span>
          </div>
        </div>

        <div className="sidebar-section-label">Workspace</div>
        <nav className="sidebar-nav">
          <button className="sidebar-nav-item active" type="button">
            <StudioIcon type="library" />
            <span>Episodes</span>
            <b>{projectRegistry.length}</b>
          </button>
        </nav>

        <div className="sidebar-section-label episode-heading">
          <span>Library</span>
          <span>{filteredProjects.length}</span>
        </div>

        <div className="episode-search">
          <span>⌕</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Cari episode..."
          />
        </div>

        <div className="episode-list">
          {filteredProjects.map((project) => (
            <button
              key={project.id}
              type="button"
              className={`episode-item ${project.id === selected.id ? 'active' : ''}`}
              onClick={() => selectProject(project.id)}
            >
              <div className="episode-index">{String(project.episode).padStart(3, '0')}</div>
              <div className="episode-copy">
                <strong>{project.title}</strong>
                <span>{project.coverText}</span>
              </div>
              <span className={`status-dot status-${project.status}`} title={statusLabel[project.status]} />
            </button>
          ))}
        </div>

        <div className="sidebar-footer">
          <a
            href="https://github.com/nabillazachra/coba-dipikir"
            target="_blank"
            rel="noreferrer"
            className="repo-link"
          >
            <StudioIcon type="github" />
            <span>GitHub Repository</span>
          </a>
          <div className="sidebar-version">Studio v0.2</div>
        </div>
      </aside>

      <main className="studio-main">
        <header className="studio-topbar">
          <div className="breadcrumb">
            <span>Episodes</span>
            <i>/</i>
            <strong>#{String(selected.episode).padStart(3, '0')} {selected.title}</strong>
          </div>
          <div className="topbar-actions">
            <span className={`project-status project-status-${selected.status}`}>
              <span />
              {statusLabel[selected.status]}
            </span>
            <a
              className="icon-button"
              href={`https://github.com/nabillazachra/coba-dipikir/tree/main/${selected.folder}`}
              target="_blank"
              rel="noreferrer"
              title="Buka source di GitHub"
            >
              <StudioIcon type="github" />
            </a>
          </div>
        </header>

        <section className="project-hero">
          <div>
            <div className="project-eyebrow">
              EPISODE #{String(selected.episode).padStart(3, '0')} · {selected.category.toUpperCase()}
            </div>
            <h1>{selected.title}</h1>
            <p>{selected.coverText}</p>
          </div>
          <div className="project-metrics">
            <div><strong>{formatDuration(selected)}</strong><span>Duration</span></div>
            <div><strong>{selected.width}×{selected.height}</strong><span>Canvas</span></div>
            <div><strong>{selected.fps}</strong><span>FPS</span></div>
          </div>
        </section>

        <nav className="studio-tabs">
          {([
            ['preview', 'Preview'],
            ['edit', 'Edit'],
            ['render', 'Render & Download'],
          ] as const).map(([id, label]) => (
            <button
              key={id}
              type="button"
              className={activeTab === id ? 'active' : ''}
              onClick={() => setActiveTab(id)}
            >
              <StudioIcon type={id} />
              {label}
              {id === 'render' && downloadUrl ? <span className="tab-ready-dot" /> : null}
            </button>
          ))}
        </nav>

        {activeTab === 'preview' ? (
          <div className="preview-layout">
            <section className="stage-card">
              <div className="card-toolbar">
                <div>
                  <span className="toolbar-label">LIVE PREVIEW</span>
                  <strong>{selected.compositionId}</strong>
                </div>
                <div className="toolbar-pills">
                  <span>9:16</span>
                  <span>MP4</span>
                </div>
              </div>

              <div className="video-stage">
                <div className="player-frame">
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

            <aside className="preview-inspector">
              <section className="inspector-card">
                <div className="inspector-title">
                  <div>
                    <span>SCENES</span>
                    <strong>{selected.scenes.length} scenes</strong>
                  </div>
                  <span className="duration-chip">{formatDuration(selected)}</span>
                </div>

                <div className="scene-list">
                  {selected.scenes.map((scene, index) => (
                    <button
                      key={scene.id}
                      type="button"
                      className={`scene-row ${selectedScene?.id === scene.id ? 'active' : ''}`}
                      onClick={() => setSelectedSceneId(scene.id)}
                    >
                      <span className="scene-number">{String(index + 1).padStart(2, '0')}</span>
                      <span className="scene-copy">
                        <strong>{scene.title}</strong>
                        <small>{scene.label}</small>
                      </span>
                      <span className="scene-time">
                        {formatSceneTime(scene.startFrame, selected.fps)}
                      </span>
                    </button>
                  ))}
                </div>
              </section>

              <section className="inspector-card selected-scene-card">
                <span className="toolbar-label">SELECTED SCENE</span>
                <h3>{selectedScene?.title}</h3>
                <p>{selectedScene?.label}</p>
                <div className="scene-meta">
                  <div>
                    <span>Start</span>
                    <strong>{selectedScene ? formatSceneTime(selectedScene.startFrame, selected.fps) : '-'}</strong>
                  </div>
                  <div>
                    <span>Length</span>
                    <strong>{selectedScene ? Math.round(selectedScene.durationInFrames / selected.fps) : 0}s</strong>
                  </div>
                </div>
                <button className="secondary-action" type="button" onClick={() => setActiveTab('edit')}>
                  Open in Edit
                </button>
              </section>
            </aside>
          </div>
        ) : null}

        {activeTab === 'edit' ? (
          <div className="edit-layout">
            <aside className="edit-scenes-panel">
              <div className="panel-heading-block">
                <span>SCENE NAVIGATOR</span>
                <strong>{selected.scenes.length} scenes</strong>
              </div>
              <div className="scene-list compact">
                {selected.scenes.map((scene, index) => (
                  <button
                    key={scene.id}
                    type="button"
                    className={`scene-row ${selectedScene?.id === scene.id ? 'active' : ''}`}
                    onClick={() => setSelectedSceneId(scene.id)}
                  >
                    <span className="scene-number">{String(index + 1).padStart(2, '0')}</span>
                    <span className="scene-copy"><strong>{scene.title}</strong><small>{scene.label}</small></span>
                  </button>
                ))}
              </div>
            </aside>

            <section className="edit-canvas-card">
              <div className="card-toolbar">
                <div>
                  <span className="toolbar-label">EDIT PREVIEW</span>
                  <strong>{selectedScene?.title ?? 'Scene'}</strong>
                </div>
                <span className="editor-badge">Structured editor</span>
              </div>
              <div className="editor-stage">
                <div className="editor-player-frame">
                  <Player
                    component={selected.component}
                    durationInFrames={selected.durationInFrames}
                    fps={selected.fps}
                    compositionWidth={selected.width}
                    compositionHeight={selected.height}
                    controls
                    style={{width: '100%', height: '100%'}}
                  />
                </div>
              </div>
              <div className="timeline-shell">
                <div className="timeline-ruler">
                  <span>0:00</span><span>0:10</span><span>0:20</span><span>0:30</span><span>0:40</span>
                </div>
                <div className="timeline-track">
                  {selected.scenes.map((scene, index) => (
                    <button
                      key={scene.id}
                      type="button"
                      className={`timeline-clip clip-${(index % 3) + 1} ${selectedScene?.id === scene.id ? 'active' : ''}`}
                      style={{flexGrow: scene.durationInFrames}}
                      onClick={() => setSelectedSceneId(scene.id)}
                    >
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      <strong>{scene.title}</strong>
                    </button>
                  ))}
                </div>
              </div>
            </section>

            <aside className="property-panel">
              <div className="panel-heading-block">
                <span>PROPERTIES</span>
                <strong>{selectedScene?.title ?? 'Scene'}</strong>
              </div>

              <div className="property-group">
                <label>Scene name</label>
                <input value={selectedScene?.title ?? ''} readOnly />
              </div>
              <div className="property-group two-column">
                <div>
                  <label>Start</label>
                  <input value={selectedScene ? formatSceneTime(selectedScene.startFrame, selected.fps) : ''} readOnly />
                </div>
                <div>
                  <label>Duration</label>
                  <input value={selectedScene ? `${Math.round(selectedScene.durationInFrames / selected.fps)} sec` : ''} readOnly />
                </div>
              </div>
              <div className="property-group">
                <label>Content note</label>
                <textarea value={selectedScene?.label ?? ''} readOnly rows={3} />
              </div>

              <div className="editor-info">
                <strong>Visual editor foundation ready</strong>
                <p>
                  Scene selection, timeline, preview, dan property panel sudah disiapkan.
                  Kontrol posisi, scale, text, dan timing akan kita hubungkan ke schema Remotion berikutnya.
                </p>
              </div>
            </aside>
          </div>
        ) : null}

        {activeTab === 'render' ? (
          <div className="render-layout">
            <section className="render-main-card">
              <div className="render-heading">
                <div>
                  <span className="toolbar-label">FINAL OUTPUT</span>
                  <h2>Render video</h2>
                  <p>Render langsung dari browser. Tidak perlu local setup.</p>
                </div>
                <div className="format-badge">MP4 · H.264</div>
              </div>

              <div className="render-summary">
                <div><span>Composition</span><strong>{selected.compositionId}</strong></div>
                <div><span>Resolution</span><strong>{selected.width} × {selected.height}</strong></div>
                <div><span>Frame rate</span><strong>{selected.fps} FPS</strong></div>
                <div><span>Duration</span><strong>{formatDuration(selected)}</strong></div>
                <div><span>Audio</span><strong>Muted</strong></div>
                <div><span>Output</span><strong>{selected.id}.mp4</strong></div>
              </div>

              <div className={`render-console render-console-${renderState}`}>
                <div className="render-console-top">
                  <div>
                    <span className="render-indicator" />
                    <strong>{renderMessage}</strong>
                  </div>
                  <span>{Math.round(renderProgress * 100)}%</span>
                </div>
                <div className="progress-track large">
                  <div className="progress-fill" style={{width: `${Math.round(renderProgress * 100)}%`}} />
                </div>
              </div>

              <div className="render-actions">
                {renderState === 'rendering' ? (
                  <button className="button button-secondary" type="button" onClick={() => abortControllerRef.current?.abort()}>
                    Cancel render
                  </button>
                ) : (
                  <button
                    className="button button-primary render-primary"
                    type="button"
                    onClick={startRender}
                    disabled={renderState === 'checking' || renderState === 'unsupported'}
                  >
                    Render MP4
                  </button>
                )}

                {downloadUrl ? (
                  <a className="button button-download" href={downloadUrl} download={`${selected.id}.mp4`}>
                    Download MP4
                  </a>
                ) : null}

                {renderState === 'unsupported' || renderState === 'error' ? (
                  <a
                    className="button button-secondary"
                    href="https://github.com/nabillazachra/coba-dipikir/actions/workflows/render-video.yml"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Cloud render
                  </a>
                ) : null}
              </div>
            </section>

            <aside className="render-side-card">
              <div className="render-preview-mini">
                <Player
                  component={selected.component}
                  durationInFrames={selected.durationInFrames}
                  fps={selected.fps}
                  compositionWidth={selected.width}
                  compositionHeight={selected.height}
                  controls={false}
                  style={{width: '100%', height: '100%'}}
                />
              </div>
              <div className="render-side-copy">
                <span>READY TO EXPORT</span>
                <strong>{selected.title}</strong>
                <p>{selected.coverText}</p>
              </div>
            </aside>
          </div>
        ) : null}
      </main>
    </div>
  );
};
