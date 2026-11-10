# Coba Dipikir — Repository-wide Production Instructions

This repo contains the original **Coba Dipikir** 2D animated short-series.

**Read [docs/COBA_DIPIKIR_CREATIVE_STANDARD_V2.md](docs/COBA_DIPIKIR_CREATIVE_STANDARD_V2.md) before implementing or changing any episode.** It is the canonical creative / technical brief for contributors and coding agents.

## Non-negotiable
1. **Episode 002 (Kulkas) is the minimum creative benchmark.** Maintain expressive, character-driven, physical storytelling — not text-and-icons infographic motion.
2. Preserve existing 002 master character at `src/projects/002-kulkas/Character.tsx`; use `src/brand/tokens.ts` for palette/fonts.
3. Concept gate → 5–8s acting proof → complete film production → full visual/audio QA → explicit human review. CI green is *not* quality signoff.
4. **Full-bleed 9:16 (1080×1920) cinematic world is mandatory.** Scene scenery extends naturally to every canvas edge; NEVER put a main environment in a rounded rectangle, isolated card, mini map, or top-aligned box above a giant empty lower half. Diegetic frames such as an actual phone/window are allowed only within a surrounding continuous environment. Maintain foreground/midground/background and character-prop scale; use depth and camera movement when justified by story. See master standard §5A.
4a. **Social overlay safe areas are mandatory.** Keep critical headline/text below the top profile/username region, away from right-side buttons and bottom navigation/captions. Use a 1080×1920 TikTok/Reels overlay for QA. Starting guide: top ~300px scenery-only, essential text around y330–620, captions around y1340–1500; adjust based on actual platform UI rather than assuming fixed crop.
5. VO/onscreen caption text must match verbatim; playback must be natural **1.00x**, never time-stretch to fix schedule. Fix script, starts or duration.
6. Strong 1–2s action hook, clear physical interaction, escalating reaction, one memorable signature scene, one comic payoff.
7. Check current GitHub projects/branches before creating another project. No surprise rebuilds; no silent MP4 export, merging or publishing.
8. For facts, use qualified explanations based on reliable sources. Don't claim guaranteed virality.
9. Compare results to Episode 002 using actual retention, replay, completion, share and audience response — not views alone.

If a short user request says "lanjut", "episode selanjutnya" or "perbaiki", apply this standard by default.
