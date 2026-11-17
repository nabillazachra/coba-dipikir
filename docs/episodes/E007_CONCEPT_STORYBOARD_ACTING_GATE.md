# Coba Dipikir 007 — Satu Bar, Sejuta Harapan
**Status:** Creative Gate A documented; isolated Gate B acting proof awaiting human visual sign-off.
**Working title:** Kenapa sinyal HP suka hilang pas masuk lift?
**Benchmark:** Episode 002, especially prop contact, repeated action loop, expressions, and silence.

## Concept review
- **Hook:** Talking on a call while walking into an elevator; no title card.
- **Objective:** Keep hearing the person on the phone during the ride.
- **Main prop:** A physically held smartphone with visible connection state.
- **Obstacle:** Reception becomes unreliable as doors close and the cabin moves.
- **Action loop:** Seek signal -> gain hope -> lose it -> try somewhere else.
- **Signature gag:** A single bar appears. Character freezes in a ridiculous raised-phone pose; even a tiny movement seems dangerous. One syllable later, it vanishes.
- **Reveal:** Radio waves can be weakened or redirected by building materials and the elevator's metal components; indoor network and shaft position also matter. No perfect Faraday cage or universal 100% blockage claim.
- **Payoff:** Doors open, bars return; contact on the call asks, "Jadi dari tadi gue ngomong sendiri?"
- **Next-episode vote (only AFTER payoff):** A ambulance Doppler sound / B fogged car windshield; two mini-worlds integrated with full-screen scenery, no cards.

## Full-episode storyboard plan — NOT IMPLEMENTED
| Beat | World and action | Camera / sound | Essential performance |
|---|---|---|---|
| 01 Hook | Full-bleed lobby; phone call; character enters elevator | Side tracking; DING | Talking -> curious |
| 02 Contact | Press floor 12; real contact and button travel | Medium / insert; BEEP | Casual gesture |
| 03 Problem | Door closes; bars 4 -> 3 -> 2 -> 1 | Interior medium; door slide, call stutters | Eyebrow raise -> confused |
| 04 Attempt 1 | Raise phone; one bar briefly returns | Keep face dominant | Hopeful -> annoyed |
| 05 Attempts 2–3 | Try door, corner, tilt phone then body | Wide only while needed | Embarrassed improvisation |
| 06 Attempt 4 | Tiptoe; freeze on single bar; blink/music stop; bar vanishes | Held medium/close; lift hum | Desperate -> deadpan |
| 07 Question | Awkward look to camera in lift | Motivated phone push-in | "Kenapa sih sinyal HP suka hilang pas masuk lift?" |
| 08 Reveal | Follow radio wave through continuous building cutaway | Pull through shaft, show reflection/weakening | Environment shows mechanism; not a diagram card |
| 09 Callback | Back to actor, raises phone, briefly gets one bar, loses it | Push back into elevator | Silent deadpan repeat |
| 10 Variation | Door cracks open; 2 bars; closes; lost again | Door-driven wipe | Conditions vary |
| 11 Payoff | At 12, doors open, bars return; awkward phone conversation | DING, reconnection | Relief -> guilty smile |
| 12 Vote | Corridor branches into A city ambulance / B rainy car interior | Two connected cinematic mini-worlds | Choose A/B in comments |
| 13 Closing | Both worlds simplify; character remains in center | Continuous scene, not blank end card | COBA DIPIKIR + tagline |

## Gate B proof timing — 7.5 s, 30 fps, 225 frames
| Seconds | Action | Validation target |
|---|---|---|
| 0.00–1.30 | Character enters while holding an active call | Full-screen lobby/cabin, character scale and walking |
| 1.30–1.90 | Reach and press floor 12 | Finger/hand and button contact, button depresses |
| 2.10–3.10 | Door panels slide shut behind actor | Physical panels, readable architecture |
| 2.85–4.21 | Reception drops from 4 to 1 | Phone screen readable, actor notices |
| 3.65–4.98 | Character raises phone; momentary loss | Phone linked to hand endpoint, scarf follow-through |
| 4.98–6.22 | One bar appears; total comic freeze | No blinking, no busy music, one-bar tension |
| 6.22–7.50 | Signal disappears; awkward deadpan | Eyebrows/pose/stillness readable without VO |

### Current implementation boundary
- Source: \`src/projects/007-sinyal-lift/ActingProof.tsx\`.
- Compositions: \`E007-Lift-Signal-Acting-Proof\` and \`E007-Lift-Signal-Acting-Proof-QA\`.
- Same E002 master protagonist, imported from source, no redesign or copy.
- QA version places translucent platform-danger overlays on top/profile, right actions, bottom controls, and subtitles zone.
- Acting proof uses **original procedural SFX only**. No final VO/subtitles; full VO must be 1.0x with verbatim subtitles once production is authorized.
- No full film, no MP4 export, no publishing, no merge.

### Human creative review — REQUIRED BEFORE FULL EPISODE
- [ ] Same large expressive character as E002
- [ ] Phone truly attached to hand, thumb/contact clear
- [ ] Finger presses 12 (contact + travel + confirmation)
- [ ] Door closes in depth, not a flattened graphic
- [ ] Full-screen 1080x1920 world, not a boxed set
- [ ] One-bar beat and freeze produce tension with SOUND OFF
- [ ] Expression changes are micro-acted, not robotic
- [ ] Phone and face survive TikTok/Reels overlay
- [ ] Character size comparable to E002
- [ ] Timing and audio cues work at 1.00x
- [ ] Real playback watched; not merely build/CI green

**STOP after acting proof and review.** No full episode until explicit human sign-off.
