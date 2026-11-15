import React from 'react';
import {AbsoluteFill} from 'remotion';
import {LaguMasaLaluEpisode} from './Film';

// Provisional mock overlay for review, not a claim of universal TikTok/Reels UI.
export const LaguMasaLaluSafeQA:React.FC=()=>(
  <AbsoluteFill>
    <LaguMasaLaluEpisode/>
    <svg width="1080" height="1920" viewBox="0 0 1080 1920"
      style={{position:'absolute',inset:0,pointerEvents:'none',zIndex:120}}>
      <rect x="0" y="0" width="1080" height="300" fill="#B83838" opacity=".18"/>
      <rect x="898" y="0" width="182" height="1920" fill="#B83838" opacity=".17"/>
      <rect x="0" y="1625" width="1080" height="295" fill="#B83838" opacity=".22"/>
      <rect x="82" y="1340" width="792" height="168" rx="0"
        fill="none" stroke="#F3B26A" strokeWidth="9" strokeDasharray="19 12"/>
      <rect x="85" y="330" width="784" height="300" fill="none"
        stroke="#4C7F5A" strokeWidth="8" strokeDasharray="18 11"/>
      <path d="M988 770 v55 M965 795 h46 M988 1000 v55 M965 1028 h46"
        stroke="#20251F" strokeWidth="13" strokeLinecap="round" opacity=".35"/>
    </svg>
  </AbsoluteFill>
);
