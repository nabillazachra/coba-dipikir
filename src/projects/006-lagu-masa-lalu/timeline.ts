// Timings are in seconds at 30fps; scene boundaries are contiguous.
// These are editorial groups, NOT individual slide-style cuts.
export const DURATION_SECONDS = 67;
export const scenePlan = [
  {id:'hook',start:0,end:7,description:'physical recognition and room-to-memory hero motion'},
  {id:'bus',start:7,end:19,description:'lived-in bus journey with shared earbud and moving city'},
  {id:'return',start:19,end:26,description:'bus pole wipe back to present and question'},
  {id:'cue',start:26,end:42,description:'memory cue shown by room objects physically responding'},
  {id:'wrong',start:42,end:49,description:'failed attempt, pause and dry comedic reaction'},
  {id:'surprise',start:49,end:54,description:'unexpected noodles-and-homework memory'},
  {id:'payoff',start:54,end:61,description:'bittersweet self and friend in late-day bus'},
  {id:'ending',start:61,end:67,description:'cringe dance smash back to room and brand continuation'},
] as const;
