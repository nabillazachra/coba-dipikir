# Episode 006 — Director Review / Revision 1
**Date:** 2026-11-15. **Status:** CREATIVE QA PENDING. **DO NOT MERGE, EXPORT MP4 OR PUBLISH.**

## Inspected
- AGENTS.md; docs/COBA_DIPIKIR_CREATIVE_STANDARD_V2.md (Episode 002 benchmark).
- Seven-second approved acting-proof contact sheet and animated WebP preview.
- Full-draft 22-frame contact sheet, the eight world scenes, captions,
  VO manifest, score and Foley source, QA workflows, Remotion and CMS registration.
- Source reports a **69-second** episode (2070 frames at 30fps), despite the old
  PR text saying 67 seconds.

## Revisions on the full-episode review branch
1. **26–42s / CueRoom:** camera now stages a continuous physical
   room → drawer focus → ticket close-up → return, without a detached graphic.
2. **42–49s / WrongSong:** the room speaker/window gives an anticipatory
   near-memory light bloom that fizzles out, followed by a deadpan actor push-in.
3. **Subtitles:** 50px (previously 45px), at y1340 in the reserved social-safe
   region, rendered verbatim from the existing measured natural VO.
4. **CMS:** the episode is now registered as `review`, with correct 69-second
   duration and eight editorial scenes. Original Episode 002 assets unchanged.

## Editorial hold points
- [ ] CI TypeScript and representative stills PASS on revised commit.
- [ ] Watch 26–42s ticket and hand interaction in actual motion.
- [ ] Watch 42–49s gag muted for cause → failure → reaction legibility.
- [ ] Check every caption (especially long phrases) with social-overlay QA
      on a phone-sized 1080×1920 video.
- [ ] Audition natural 1.00x VO, score and SFX mix; check transitions and gaps.
- [ ] Watch final 61–69s dance and reaction at full 30fps.
- [ ] Approve creative quality against Episode 002 before merge or publishing.

**This revision does not change the approved 7s proof branch, does not
merge into main, and does not export an MP4.** CI green does not imply
creative quality approved.
