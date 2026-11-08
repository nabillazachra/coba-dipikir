import React, {useEffect, useMemo, useState} from 'react';

const SESSION_KEY = 'coba-dipikir-auth';
const SESSION_HOURS = 8;
const PBKDF2_ITERATIONS = 310000;

const decodeBase64 = (value: string) => {
  const binary = atob(value);
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
};

const encodeBase64 = (bytes: ArrayBuffer) => {
  const view = new Uint8Array(bytes);
  let binary = '';
  for (const byte of view) binary += String.fromCharCode(byte);
  return btoa(binary);
};

const derivePasswordHash = async (password: string, saltBase64: string) => {
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    'PBKDF2',
    false,
    ['deriveBits'],
  );

  const bits = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: decodeBase64(saltBase64),
      iterations: PBKDF2_ITERATIONS,
      hash: 'SHA-256',
    },
    keyMaterial,
    256,
  );

  return encodeBase64(bits);
};

const safeEqual = (a: string, b: string) => {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
};

type LoginGateProps = {
  children: React.ReactNode;
};

const LoginBrand = () => (
  <div className="login-brand-panel">
    <div className="login-brand-top">
      <img className="login-brand-logo" src={`${import.meta.env.BASE_URL}brand/coba-dipikir-logo.webp`} alt="Coba Dipikir" />
      <div>
        <strong>Coba Dipikir</strong>
        <span>Content Studio</span>
      </div>
    </div>

    <div className="login-brand-copy">
      <span className="login-overline">PRIVATE WORKSPACE</span>
      <h1>Ide di chat.<br />Jadi video di sini.</h1>
      <p>
        Preview, revisi, render, dan download seluruh episode Coba Dipikir
        dalam satu workspace.
      </p>
    </div>

    <div className="login-brand-footer">
      <span className="login-status-dot" />
      <span>Personal studio · GitHub powered</span>
    </div>
  </div>
);

export const LoginGate: React.FC<LoginGateProps> = ({children}) => {
  const expectedEmail = useMemo(
    () => (import.meta.env.VITE_CMS_EMAIL ?? '').trim().toLowerCase(),
    [],
  );
  const expectedPasswordHash = import.meta.env.VITE_CMS_PASSWORD_HASH ?? '';
  const passwordSalt = import.meta.env.VITE_CMS_PASSWORD_SALT ?? '';

  const [authenticated, setAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const configured = Boolean(expectedEmail && expectedPasswordHash && passwordSalt);

  useEffect(() => {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return;

    try {
      const stored = JSON.parse(raw) as {expiresAt?: number};
      if (stored.expiresAt && stored.expiresAt > Date.now()) {
        setAuthenticated(true);
      } else {
        sessionStorage.removeItem(SESSION_KEY);
      }
    } catch {
      sessionStorage.removeItem(SESSION_KEY);
    }
  }, []);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!configured || submitting) return;

    setSubmitting(true);
    setError('');

    try {
      const emailMatches = email.trim().toLowerCase() === expectedEmail;
      const candidateHash = await derivePasswordHash(password, passwordSalt);
      const passwordMatches = safeEqual(candidateHash, expectedPasswordHash);

      if (!emailMatches || !passwordMatches) {
        setError('Email atau password tidak cocok.');
        setPassword('');
        return;
      }

      sessionStorage.setItem(
        SESSION_KEY,
        JSON.stringify({
          expiresAt: Date.now() + SESSION_HOURS * 60 * 60 * 1000,
        }),
      );
      setAuthenticated(true);
    } catch {
      setError('Login gagal diproses. Coba lagi.');
    } finally {
      setSubmitting(false);
    }
  };

  const logout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setAuthenticated(false);
    setPassword('');
  };

  if (!configured) {
    return (
      <div className="login-screen">
        <div className="login-shell">
          <LoginBrand />
          <div className="login-form-panel">
            <div className="login-form-inner">
              <span className="login-overline">SETUP REQUIRED</span>
              <h2>Studio belum siap masuk</h2>
              <p className="login-form-subtitle">
                Kredensial belum terbaca pada build ini. Setelah konfigurasi GitHub selesai,
                halaman ini otomatis berubah menjadi form login.
              </p>

              <div className="login-setup-note">
                <div className="setup-number">01</div>
                <div>
                  <strong>CMS_EMAIL</strong>
                  <span>Email pribadi untuk masuk</span>
                </div>
              </div>
              <div className="login-setup-note">
                <div className="setup-number">02</div>
                <div>
                  <strong>CMS_PASSWORD</strong>
                  <span>Password pribadi untuk masuk</span>
                </div>
              </div>

              <div className="login-config-state">
                <span />
                Waiting for credentials
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="login-screen">
        <div className="login-shell">
          <LoginBrand />

          <div className="login-form-panel">
            <form className="login-form-inner" onSubmit={submit}>
              <span className="login-overline">WELCOME BACK</span>
              <h2>Masuk ke studio</h2>
              <p className="login-form-subtitle">
                Gunakan akun pribadi kamu untuk mengakses project Coba Dipikir.
              </p>

              <label className="login-field">
                <span>Email</span>
                <div className="login-input-wrap">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M4 6h16v12H4z" />
                    <path d="m4 7 8 6 8-6" />
                  </svg>
                  <input
                    type="email"
                    autoComplete="username"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="nama@email.com"
                    required
                  />
                </div>
              </label>

              <label className="login-field">
                <span>Password</span>
                <div className="login-input-wrap">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="5" y="10" width="14" height="10" rx="2" />
                    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                  </svg>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Masukkan password"
                    required
                  />
                  <button
                    className="password-toggle"
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </label>

              {error ? <div className="login-error">{error}</div> : null}

              <button className="login-primary-button" type="submit" disabled={submitting}>
                <span>{submitting ? 'Memeriksa...' : 'Masuk ke Studio'}</span>
                <span className="login-arrow">→</span>
              </button>

              <div className="login-session-note">
                Session tersimpan selama {SESSION_HOURS} jam di browser ini.
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <button className="logout-button" type="button" onClick={logout}>
        Keluar
      </button>
      {children}
    </>
  );
};
