import {staticFile} from 'remotion';

export const publicAsset = (path: string) => {
  const cleanPath = path.replace(/^\/+/, '');

  if (
    typeof window !== 'undefined' &&
    window.location.hostname.endsWith('github.io') &&
    window.location.pathname.startsWith('/coba-dipikir/')
  ) {
    return `${window.location.origin}/coba-dipikir/${cleanPath}`;
  }

  return staticFile(cleanPath);
};
