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
        setError('Email atau password salah.');
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
        <div className="login-card">
          <div className="eyebrow">COBA DIPIKIR</div>
          <h1>Login belum dikonfigurasi</h1>
          <p>
            Tambahkan GitHub Actions Secrets <code>CMS_EMAIL</code> dan <code>CMS_PASSWORD</code>,
            lalu jalankan deploy ulang.
          </p>
        </div>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="login-screen">
        <form className="login-card" onSubmit={submit}>
          <div className="eyebrow">COBA DIPIKIR</div>
          <h1>Masuk ke Video Renderer</h1>
          <p>Gunakan email dan password pribadi kamu.</p>

          <label>
            <span>Email</span>
            <input
              type="email"
              autoComplete="username"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="nama@email.com"
              required
            />
          </label>

          <label>
            <span>Password</span>
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="••••••••••••"
              required
            />
          </label>

          {error ? <div className="login-error">{error}</div> : null}

          <button className="button button-primary login-submit" type="submit" disabled={submitting}>
            {submitting ? 'Memeriksa...' : 'Masuk'}
          </button>
        </form>
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
