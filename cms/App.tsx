import React, {useMemo, useState} from 'react';
import {Player} from '@remotion/player';
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

export const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(projectRegistry[0]?.id ?? '');

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

  if (!selected) {
    return <div className="empty-state">Belum ada project Remotion.</div>;
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-block">
          <div className="eyebrow">VIDEO CMS</div>
          <h1>Coba Dipikir</h1>
          <p>Yang biasa, belum tentu sederhana.</p>
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
              onClick={() => setSelectedId(project.id)}
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
            <a
              className="button button-primary"
              href="https://github.com/nabillazachra/coba-dipikir/actions/workflows/render-video.yml"
              target="_blank"
              rel="noreferrer"
            >
              Render MP4
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
                  <span className="panel-kicker">PROJECT</span>
                  <h3>Metadata</h3>
                </div>
              </div>

              <dl className="metadata-grid">
                <div><dt>Status</dt><dd>{statusLabel[selected.status]}</dd></div>
                <div><dt>Kategori</dt><dd>{selected.category}</dd></div>
                <div><dt>Durasi</dt><dd>{formatDuration(selected)}</dd></div>
                <div><dt>FPS</dt><dd>{selected.fps}</dd></div>
                <div><dt>Resolusi</dt><dd>{selected.width} × {selected.height}</dd></div>
                <div><dt>Composition</dt><dd>{selected.compositionId}</dd></div>
              </dl>
            </section>

            <section className="panel render-panel">
              <span className="panel-kicker">RENDER</span>
              <h3>MP4 via GitHub Actions</h3>
              <p>
                CMS tidak menyimpan GitHub token di browser. Tombol render membuka workflow aman di GitHub,
                lalu hasil MP4 tersedia sebagai artifact.
              </p>
              <a
                className="button button-primary full-width"
                href="https://github.com/nabillazachra/coba-dipikir/actions/workflows/render-video.yml"
                target="_blank"
                rel="noreferrer"
              >
                Buka render workflow
              </a>
              <button className="button button-disabled full-width" type="button" disabled>
                Download MP4 — setelah render
              </button>
              <small className="helper-text">
                Tahap berikutnya: hubungkan daftar artifact ke CMS agar download bisa satu klik dari halaman ini.
              </small>
            </section>
          </aside>
        </div>
      </main>
    </div>
  );
};
