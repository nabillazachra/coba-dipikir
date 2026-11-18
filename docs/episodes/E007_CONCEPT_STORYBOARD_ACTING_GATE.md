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

## Gate B V4 proof timing — 8 seconds, 30 fps, 240 frames
| Seconds | Camera + action | Acceptance gate |
|---|---|---|
| 0.00–0.38 | FULL-SCREEN lobby; character approaches while actively on call | Before entering, scenery and elevator doorway visible at once |
| 0.38–2.21 | Side-offset perspective: character crosses into cabin, body reduces in scale and foot passes threshold | Physical crossing reads with NO VO; jamb visibly occludes body while crossing |
| 2.11–2.59 | Door jamb foreground wipes over camera; 2.35 inside cut | No unmotivated hard cut; camera feels like it follows character inside |
| 2.48–3.17 | Interior shot: right hand presses button 12 | Finger contacts button, button depresses, beep |
| 3.17–3.95 | Twin steel leaves close on back wall | Real world door geometry, center seam |
| 3.86–5.43 | Reception declines; actor looks at phone then raises it | Face/phone clearly readable, phone follows left hand |
| 5.51–6.72 | One bar returns; character HOPEFULLY FREEZES | Eyes/eyebrows and scarf timing, tiny signal pop |
| 6.72–8.00 | Bar disappears; prolonged deadpan | Silence, no explanatory VO, tension and visual payoff |

**V4 review focus:** Compare opening (0s, 1.5s, 2s) to the V3 failure. The action MUST read specifically as **entering** an elevator rather than standing in front of a rectangle. The camera handoff at ~2.35s must be evaluated frame-by-frame and on continuous motion. The initial 8-second proof should remain proof-only; full-film vote/reveal remains only storyboard planning.

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
